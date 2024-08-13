package com.project.lanchonete.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_material")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double quantity;
    private String unit;
    private Double cost;

    @ManyToOne
    private TechnicalSheet technicalSheet;

    public Material() {
    }

    public Material(Long id, String name, Double quantity, String unit, Double cost, TechnicalSheet technicalSheet) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.cost = cost;
        this.technicalSheet = technicalSheet;
    }

    public TechnicalSheet getTechnicalSheet() {
        return technicalSheet;
    }

    public void setTechnicalSheet(TechnicalSheet technicalSheet) {
        this.technicalSheet = technicalSheet;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }
}
