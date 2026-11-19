package com.vendeze.repository;

import com.vendeze.model.Notification;
import com.vendeze.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Long AND/OR derived method names are easy to get wrong (operator
    // precedence reads differently than it looks), so these use explicit
    // JPQL instead — each query's intent is unambiguous on the page.

    /** A customer's feed: platform-wide customer notices, or ones addressed to them specifically. */
    @Query("SELECT n FROM Notification n WHERE n.audience = com.vendeze.model.Role.CUSTOMER " +
           "AND (n.customerId IS NULL OR n.customerId = :customerId) " +
           "ORDER BY n.createdAt DESC")
    List<Notification> findCustomerFeed(@Param("customerId") Long customerId);

    /** A vendor's feed: platform-wide vendor notices, or ones addressed to their vendorId specifically. */
    @Query("SELECT n FROM Notification n WHERE n.audience = com.vendeze.model.Role.VENDOR " +
           "AND (n.vendorId IS NULL OR n.vendorId = :vendorId) " +
           "ORDER BY n.createdAt DESC")
    List<Notification> findVendorFeed(@Param("vendorId") Long vendorId);

    List<Notification> findByAudienceOrderByCreatedAtDesc(Role audience);
}
