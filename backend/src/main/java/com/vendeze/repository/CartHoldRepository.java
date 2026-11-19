package com.vendeze.repository;

import com.vendeze.model.CartHold;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CartHoldRepository extends JpaRepository<CartHold, Long> {
    List<CartHold> findByCustomerIdAndStatus(Long customerId, CartHold.HoldStatus status);

    /**
     * Locks any existing active hold row for this vendor+date while the
     * transaction runs, so two simultaneous requests for the same vendor
     * can't both pass the "is it free?" check — the second one blocks
     * until the first commits or rolls back, then sees the up-to-date row.
     * This is what actually enforces "one customer at a time per vendor,"
     * not the database schema (see the note in schema.sql).
     *
     * statuses is passed in as a bind parameter (always [HELD, CONFIRMED]
     * in practice — see BookingService) rather than written as enum
     * literals in the query string, since JPQL enum-literal syntax varies
     * by Hibernate version and a bind parameter is unambiguous either way.
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT ch FROM CartHold ch JOIN Event e ON ch.eventId = e.id " +
           "WHERE ch.vendorId = :vendorId AND e.eventDate = :date AND ch.status IN :statuses")
    Optional<CartHold> findActiveHoldForUpdate(
        @Param("vendorId") Long vendorId,
        @Param("date") LocalDate date,
        @Param("statuses") List<CartHold.HoldStatus> statuses
    );
}
