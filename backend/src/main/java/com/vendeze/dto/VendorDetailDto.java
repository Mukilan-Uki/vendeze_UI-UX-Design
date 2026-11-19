package com.vendeze.dto;

import com.vendeze.model.PortfolioItem;
import com.vendeze.model.ServicePackage;
import com.vendeze.model.Vendor;

import java.math.BigDecimal;
import java.util.List;

/** Everything the vendor detail screen needs in one response. */
public record VendorDetailDto(
    Long id,
    String name,
    String categoryId,
    String area,
    BigDecimal rating,
    Integer reviewsCount,
    BigDecimal priceFrom,
    String priceUnit,
    String blurb,
    String status,
    List<ServicePackage> packages,
    List<PortfolioItem> portfolio,
    List<String> blockedDates // ISO yyyy-MM-dd strings
) {
    public static VendorDetailDto of(
        Vendor v, List<ServicePackage> packages, List<PortfolioItem> portfolio, List<String> blockedDates
    ) {
        return new VendorDetailDto(
            v.getId(), v.getName(), v.getCategoryId(), v.getArea(),
            v.getRating(), v.getReviewsCount(), v.getPriceFrom(), v.getPriceUnit(),
            v.getBlurb(), v.getStatus().name(), packages, portfolio, blockedDates
        );
    }
}
