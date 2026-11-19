package com.vendeze.controller;

import com.vendeze.model.Booking;
import com.vendeze.model.CartHold;
import com.vendeze.repository.BookingRepository;
import com.vendeze.repository.CartHoldRepository;
import com.vendeze.security.VendezePrincipal;
import com.vendeze.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BookingController {

    private final BookingService bookingService;
    private final CartHoldRepository cartHoldRepository;
    private final BookingRepository bookingRepository;

    public BookingController(
        BookingService bookingService,
        CartHoldRepository cartHoldRepository,
        BookingRepository bookingRepository
    ) {
        this.bookingService = bookingService;
        this.cartHoldRepository = cartHoldRepository;
        this.bookingRepository = bookingRepository;
    }

    public record HoldRequest(Long vendorId, Long eventId, Long packageId) {}

    @PostMapping("/cart-holds")
    public ResponseEntity<?> hold(
        @AuthenticationPrincipal VendezePrincipal principal,
        @RequestBody HoldRequest req
    ) {
        try {
            CartHold hold = bookingService.createHold(
                principal.userId(), req.vendorId(), req.eventId(), req.packageId()
            );
            return ResponseEntity.ok(hold);
        } catch (BookingService.VendorUnavailableException e) {
            return ResponseEntity.status(409).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/cart-holds/mine")
    public List<CartHold> myHolds(@AuthenticationPrincipal VendezePrincipal principal) {
        return cartHoldRepository.findByCustomerIdAndStatus(principal.userId(), CartHold.HoldStatus.HELD);
    }

    public record CheckoutRequest(String paymentType, String customerName) {}

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(
        @AuthenticationPrincipal VendezePrincipal principal,
        @RequestBody CheckoutRequest req
    ) {
        try {
            Booking.PaymentType type = Booking.PaymentType.valueOf(req.paymentType().toUpperCase());
            List<Booking> bookings = bookingService.checkout(principal.userId(), req.customerName(), type);
            return ResponseEntity.ok(bookings);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/bookings/mine")
    public List<Booking> myBookings(@AuthenticationPrincipal VendezePrincipal principal) {
        return bookingRepository.findByCustomerIdOrderByCreatedAtDesc(principal.userId());
    }

    @GetMapping("/vendor-dashboard/bookings")
    public List<Booking> vendorBookings(@AuthenticationPrincipal VendezePrincipal principal) {
        return bookingRepository.findByVendorIdOrderByCreatedAtDesc(principal.vendorId());
    }
}
