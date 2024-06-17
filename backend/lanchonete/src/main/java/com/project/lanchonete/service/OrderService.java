package com.project.lanchonete.service;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.lanchonete.dto.OrderDTO;
import com.project.lanchonete.dto.OrderItemDTO;
import com.project.lanchonete.model.Order;
import com.project.lanchonete.model.OrderItem;
import com.project.lanchonete.model.OrderStatus;
import com.project.lanchonete.model.Product;
import com.project.lanchonete.repository.OrderItemRepository;
import com.project.lanchonete.repository.OrderRepository;
import com.project.lanchonete.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public Page<OrderDTO> findAll(Pageable pageable) {
        Page<Order> result = repository.findAll(pageable);
        return result.map(x -> new OrderDTO(x));
    }

    @Transactional
    public OrderDTO insert(OrderDTO dto) {

        Order order = new Order();

        order.setMoment(Instant.now());
        order.setStatus(OrderStatus.WAITING_PAYMENT);

        for (OrderItemDTO itemDto : dto.getItems()) {
            Product product = productRepository.getReferenceById(itemDto.getProductId());
            OrderItem item = new OrderItem(order, product, itemDto.getQuantity(), product.getPrice());
            order.getItems().add(item);
        }

        repository.save(order);
        orderItemRepository.saveAll(order.getItems());

        return new OrderDTO(order);
    }

}
