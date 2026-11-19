package com.vendeze.controller;

import com.vendeze.model.Event;
import com.vendeze.repository.EventRepository;
import com.vendeze.security.VendezePrincipal;
import jakarta.validation.constraints.NotBlank;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public record CreateEventRequest(
        @NotBlank String name, String type, @NotBlank String date, @NotBlank String time, String location
    ) {}

    @PostMapping
    public Event create(
        @AuthenticationPrincipal VendezePrincipal principal,
        @org.springframework.web.bind.annotation.RequestBody CreateEventRequest req
    ) {
        Event event = Event.builder()
            .customerId(principal.userId())
            .name(req.name())
            .type(req.type())
            .eventDate(LocalDate.parse(req.date()))
            .eventTime(LocalTime.parse(req.time()))
            .location(req.location())
            .build();
        return eventRepository.save(event);
    }

    @GetMapping("/mine")
    public List<Event> mine(@AuthenticationPrincipal VendezePrincipal principal) {
        return eventRepository.findByCustomerIdOrderByCreatedAtDesc(principal.userId());
    }
}
