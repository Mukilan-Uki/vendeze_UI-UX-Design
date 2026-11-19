package com.vendeze.repository;

import com.vendeze.model.ServicePackage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServicePackageRepository extends JpaRepository<ServicePackage, Long> {
    List<ServicePackage> findByVendorId(Long vendorId);
}
