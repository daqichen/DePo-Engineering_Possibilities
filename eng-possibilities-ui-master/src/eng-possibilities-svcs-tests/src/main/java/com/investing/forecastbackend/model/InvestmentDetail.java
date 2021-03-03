package com.investing.forecastbackend.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class InvestmentDetail {
    private String category;
    private String minimum;
    private List<String> data;
}

