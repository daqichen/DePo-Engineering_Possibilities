package com.investing.forecastbackend.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

// TODO Model for the request for investment forecast
@Data
@Getter
@Setter
public class ForecastRequest {
    private Map<String, Double> request;

}
