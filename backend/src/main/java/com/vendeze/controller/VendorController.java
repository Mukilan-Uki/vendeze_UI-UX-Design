package com.vendeze.controller;

import com.vendeze.dto.VendorDetailDto;
import com.vendeze.model.Vendor;
import com.vendeze.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    private final VendorRepository vendorRepository;
    private final ServicePackageRepository packageRepository;
    private final PortfolioItemRepository portfolioRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public VendorController(
        VendorRepository vendorRepository,
        ServicePackageRepository packageRepository,
        PortfolioItemRepository portfolioRepository
    ) {
        this.vendorRepository = vendorRepository;
        this.packageRepository = packageRepository;
        this.portfolioRepository = portfolioRepository;
    }

    @GetMapping
    public List<Vendor> list(@RequestParam(required = false) String categoryId) {
        if (categoryId != null) {
            return vendorRepository.findByCategoryIdOrderByRatingDesc(categoryId);
        }
        return vendorRepository.findAll();
    }

    @GetMapping("/{id}")
    public VendorDetailDto detail(@PathVariable Long id) {
        Vendor vendor = vendorRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Vendor " + id + " not found"));

        List<String> blocked = entityManager
            .createNativeQuery("SELECT blocked_date FROM vendor_blocked_dates WHERE vendor_id = :vid")
            .setParameter("vid", id)
            .getResultList()
            .stream()
            .map(d -> d.toString())
            .toList();

        return VendorDetailDto.of(
            vendor,
            packageRepository.findByVendorId(id),
            portfolioRepository.findByVendorId(id),
            blocked
        );
    }

    /**
     * Mirrors the prototype's availability check: a date is unavailable if
     * the vendor explicitly blocked it, OR if another customer already has
     * an active (HELD/CONFIRMED) hold on that vendor for that date — the
     * real version of the "locked to one customer" rule.
     */
    @GetMapping("/{id}/availability")
    public java.util.Map<String, Object> availability(
        @PathVariable Long id, @RequestParam String date
    ) {
        LocalDate checkDate = LocalDate.parse(date);

        boolean blocked = ((Number) entityManager
            .createNativeQuery("SELECT COUNT(*) FROM vendor_blocked_dates WHERE vendor_id = :vid AND blocked_date = :d")
            .setParameter("vid", id)
            .setParameter("d", checkDate)
            .getSingleResult()).longValue() > 0;

        boolean heldByOther = ((Number) entityManager
            .createNativeQuery(
                "SELECT COUNT(*) FROM cart_holds ch JOIN events e ON ch.event_id = e.id " +
                "WHERE ch.vendor_id = :vid AND e.event_date = :d AND ch.status IN ('HELD','CONFIRMED')"
            )
            .setParameter("vid", id)
            .setParameter("d", checkDate)
            .getSingleResult()).longValue() > 0;

        String status = (blocked || heldByOther) ? "booked" : "available";
        return java.util.Map.of("status", status);
    }
}
