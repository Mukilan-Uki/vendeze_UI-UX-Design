package com.vendeze.repository;

import com.vendeze.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
}
