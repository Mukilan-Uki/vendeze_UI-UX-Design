package com.vendeze.security;

/** What @AuthenticationPrincipal resolves to in every controller method. */
public record VendezePrincipal(Long userId, String email, String role, Long vendorId) {
}
