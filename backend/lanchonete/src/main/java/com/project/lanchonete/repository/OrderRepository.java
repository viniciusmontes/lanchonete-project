package com.project.lanchonete.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.lanchonete.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
}
