package com.vendeze.repository;

import com.vendeze.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
    List<Vendor> findByCategoryIdOrderByRatingDesc(String categoryId);
    List<Vendor> findByOwnerUserId(Long ownerUserId);
}
