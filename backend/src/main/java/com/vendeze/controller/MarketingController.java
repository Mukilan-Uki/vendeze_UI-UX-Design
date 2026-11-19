package com.vendeze.controller;

import com.vendeze.model.Ad;
import com.vendeze.model.Notification;
import com.vendeze.model.Role;
import com.vendeze.model.SitePopup;
import com.vendeze.repository.AdRepository;
import com.vendeze.repository.NotificationRepository;
import com.vendeze.repository.SitePopupRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MarketingController {

    private final AdRepository adRepository;
    private final SitePopupRepository popupRepository;
    private final NotificationRepository notificationRepository;

    public MarketingController(
        AdRepository adRepository, SitePopupRepository popupRepository, NotificationRepository notificationRepository
    ) {
        this.adRepository = adRepository;
        this.popupRepository = popupRepository;
        this.notificationRepository = notificationRepository;
    }

    // --- public, read-only: what the customer Home screen shows ---

    @GetMapping("/ads")
    public List<Ad> activeAds() {
        return adRepository.findByActiveTrue();
    }

    @GetMapping("/popup")
    public SitePopup popup() {
        return popupRepository.findById(1).orElse(null);
    }

    // --- admin-only: managing the above ---

    public record AdRequest(String body) {}

    @PostMapping("/admin/ads")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER')")
    public Ad addAd(@RequestBody AdRequest req) {
        return adRepository.save(Ad.builder().label("AD").body(req.body()).active(true).build());
    }

    @DeleteMapping("/admin/ads/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER')")
    public ResponseEntity<?> removeAd(@PathVariable Long id) {
        adRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    public record PopupUpdateRequest(Boolean enabled, String title, String body, String cta) {}

    @PutMapping("/admin/popup")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER')")
    public SitePopup updatePopup(@RequestBody PopupUpdateRequest req) {
        SitePopup popup = popupRepository.findById(1).orElseGet(() -> SitePopup.builder().id(1).build());
        if (req.enabled() != null) popup.setEnabled(req.enabled());
        if (req.title() != null) popup.setTitle(req.title());
        if (req.body() != null) popup.setBody(req.body());
        if (req.cta() != null) popup.setCta(req.cta());
        return popupRepository.save(popup);
    }

    public record BroadcastRequest(String audience, String title, String body) {} // audience: "CUSTOMER" | "VENDOR"

    @PostMapping("/admin/notifications/broadcast")
    @PreAuthorize("hasAnyRole('ADMIN','DEVELOPER')")
    public ResponseEntity<?> broadcast(@RequestBody BroadcastRequest req) {
        Role audience;
        try {
            audience = Role.valueOf(req.audience().toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "audience must be CUSTOMER or VENDOR"));
        }
        // vendorId/customerId left null on purpose — null means "everyone in
        // this audience," per the NotificationRepository feed queries
        Notification n = notificationRepository.save(Notification.builder()
            .audience(audience)
            .icon("bell")
            .title(req.title())
            .body(req.body() != null ? req.body() : req.title())
            .build());
        return ResponseEntity.ok(n);
    }
}
