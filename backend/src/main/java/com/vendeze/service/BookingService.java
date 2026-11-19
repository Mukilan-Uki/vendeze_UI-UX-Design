package com.vendeze.service;

import com.vendeze.model.*;
import com.vendeze.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private static final List<CartHold.HoldStatus> ACTIVE_STATUSES =
        List.of(CartHold.HoldStatus.HELD, CartHold.HoldStatus.CONFIRMED);

    private final CartHoldRepository cartHoldRepository;
    private final BookingRepository bookingRepository;
    private final VendorRepository vendorRepository;
    private final EventRepository eventRepository;
    private final NotificationRepository notificationRepository;
    private final org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    public BookingService(
        CartHoldRepository cartHoldRepository,
        BookingRepository bookingRepository,
        VendorRepository vendorRepository,
        EventRepository eventRepository,
        NotificationRepository notificationRepository,
        org.springframework.jdbc.core.JdbcTemplate jdbcTemplate
    ) {
        this.cartHoldRepository = cartHoldRepository;
        this.bookingRepository = bookingRepository;
        this.vendorRepository = vendorRepository;
        this.eventRepository = eventRepository;
        this.notificationRepository = notificationRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    public static class VendorUnavailableException extends RuntimeException {
        public VendorUnavailableException(String msg) { super(msg); }
    }

    /**
     * Holds a vendor for a customer's event. Locks out any concurrent
     * attempt to hold the SAME vendor for the SAME date until this
     * transaction finishes (see CartHoldRepository.findActiveHoldForUpdate).
     */
    @Transactional
    public CartHold createHold(Long customerId, Long vendorId, Long eventId, Long packageId) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new IllegalArgumentException("Event not found"));
        LocalDate date = event.getEventDate();

        // vendor's own blocked dates
        Integer blockedCount = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM vendor_blocked_dates WHERE vendor_id = ? AND blocked_date = ?",
            Integer.class, vendorId, date
        );
        if (blockedCount != null && blockedCount > 0) {
            throw new VendorUnavailableException("This vendor is not available on that date.");
        }

        // the locking check — see CartHoldRepository for why this (not a
        // unique constraint) is what actually makes this safe under concurrency
        var existing = cartHoldRepository.findActiveHoldForUpdate(vendorId, date, ACTIVE_STATUSES);
        if (existing.isPresent() && !existing.get().getCustomerId().equals(customerId)) {
            throw new VendorUnavailableException("Another customer already holds this vendor for that date.");
        }
        if (existing.isPresent()) {
            return existing.get(); // this same customer already holds it — idempotent
        }

        CartHold hold = CartHold.builder()
            .customerId(customerId)
            .vendorId(vendorId)
            .eventId(eventId)
            .packageId(packageId)
            .status(CartHold.HoldStatus.HELD)
            .build();
        return cartHoldRepository.save(hold);
    }

    /**
     * Converts every HELD item for this customer into a real Booking with
     * its own share of the payment, and notifies both the customer and each
     * specific vendor who was booked — the live, database-backed version of
     * what the prototype simulated in one shared in-memory array.
     */
    @Transactional
    public List<Booking> checkout(Long customerId, String customerName, Booking.PaymentType paymentType) {
        List<CartHold> holds = cartHoldRepository.findByCustomerIdAndStatus(customerId, CartHold.HoldStatus.HELD);
        if (holds.isEmpty()) {
            throw new IllegalStateException("Nothing is on hold to check out.");
        }

        BigDecimal total = BigDecimal.ZERO;
        for (CartHold h : holds) {
            Vendor v = vendorRepository.findById(h.getVendorId()).orElseThrow();
            total = total.add(v.getPriceFrom());
        }
        BigDecimal ratio = paymentType == Booking.PaymentType.ADVANCE
            ? new BigDecimal("0.25")
            : BigDecimal.ONE;

        List<Booking> bookings = new java.util.ArrayList<>();
        for (CartHold h : holds) {
            Vendor vendor = vendorRepository.findById(h.getVendorId()).orElseThrow();
            Event event = eventRepository.findById(h.getEventId()).orElseThrow();
            BigDecimal amount = vendor.getPriceFrom();
            BigDecimal paid = amount.multiply(ratio).setScale(2, RoundingMode.HALF_UP);
            BigDecimal due = amount.subtract(paid);

            Booking booking = bookingRepository.save(Booking.builder()
                .customerId(customerId)
                .vendorId(vendor.getId())
                .eventId(event.getId())
                .packageId(h.getPackageId())
                .amount(amount)
                .paymentType(paymentType)
                .amountPaid(paid)
                .amountDue(due)
                .status(Booking.BookingStatus.CONFIRMED)
                .source(Booking.Source.APP)
                .build());
            bookings.add(booking);

            h.setStatus(CartHold.HoldStatus.CONFIRMED);
            cartHoldRepository.save(h);

            // the specific vendor who was booked gets their own notification
            String paymentLine = paymentType == Booking.PaymentType.ADVANCE
                ? String.format("Rs. %,.0f (25%%) paid by %s for \"%s\". Rs. %,.0f due on %s.",
                    paid, customerName, event.getName(), due, event.getEventDate())
                : String.format("Rs. %,.0f paid in full by %s for \"%s\" — nothing due later.",
                    paid, customerName, event.getName());

            notificationRepository.save(Notification.builder()
                .audience(Role.VENDOR)
                .vendorId(vendor.getId())
                .icon("check")
                .title("New booking received")
                .body(customerName + " booked you for \"" + event.getName() + "\" — Rs. " + amount + ".")
                .build());
            notificationRepository.save(Notification.builder()
                .audience(Role.VENDOR)
                .vendorId(vendor.getId())
                .icon("sparkle")
                .title(paymentType == Booking.PaymentType.ADVANCE ? "Advance payment received" : "Full payment received")
                .body(paymentLine)
                .build());
        }

        notificationRepository.save(Notification.builder()
            .audience(Role.CUSTOMER)
            .customerId(customerId)
            .icon("check")
            .title("Booking confirmed")
            .body("Your booking is confirmed. " + (bookings.size() > 1 ? "Vendors have" : "The vendor has") + " been notified.")
            .build());

        return bookings;
    }
}
