package com.vendeze.controller;

import com.vendeze.model.Notification;
import com.vendeze.model.Role;
import com.vendeze.repository.NotificationRepository;
import com.vendeze.security.VendezePrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /** The same audience-filtered feed concept the prototype used in-memory, now backed by the DB. */
    @GetMapping("/mine")
    public List<Notification> mine(@AuthenticationPrincipal VendezePrincipal principal) {
        Role role = Role.valueOf(principal.role());
        return switch (role) {
            case CUSTOMER -> notificationRepository.findCustomerFeed(principal.userId());
            case VENDOR -> notificationRepository.findVendorFeed(principal.vendorId());
            case ADMIN, DEVELOPER -> notificationRepository.findByAudienceOrderByCreatedAtDesc(role);
        };
    }

    @PostMapping("/mark-all-read")
    public ResponseEntity<?> markAllRead(@AuthenticationPrincipal VendezePrincipal principal) {
        Role role = Role.valueOf(principal.role());
        List<Notification> mine = switch (role) {
            case CUSTOMER -> notificationRepository.findCustomerFeed(principal.userId());
            case VENDOR -> notificationRepository.findVendorFeed(principal.vendorId());
            case ADMIN, DEVELOPER -> notificationRepository.findByAudienceOrderByCreatedAtDesc(role);
        };
        mine.forEach(n -> n.setIsRead(true));
        notificationRepository.saveAll(mine);
        return ResponseEntity.ok().build();
    }
}
