package com.investing.forecastbackend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.investing.forecastbackend.model.ForecastRequest;
import com.investing.forecastbackend.model.ForecastResponse;
import com.investing.forecastbackend.model.InvestmentDetail;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Slf4j
@RequiredArgsConstructor
public class InvestingForecastService {

    public List<InvestmentDetail> getInvestmentOptions() throws IOException {
        // TODO read investment options from investment-details.json
        ObjectMapper objectMapper = new ObjectMapper();

        ArrayList read = (ArrayList) objectMapper.readValue(Paths
                .get("/home/fetenh/DeepPockets/eng-possibilities-svcs/src/main/resources/data/investment-details.json")
                .toFile(), Map.class).get("Investments");

        String str = objectMapper.writeValueAsString(read);
        return objectMapper.readValue(str, new TypeReference<List<InvestmentDetail>>() {
        });
    }


    public ForecastResponse getInvestmentOptions(final ForecastRequest request) throws IOException {
        List<InvestmentDetail> details = getInvestmentOptions();
        // TODO write algorithm to calculate investment forecast from request configuration
        List<Double> result = getForeCast(request.getRequest(), details);
        ForecastResponse response = new ForecastResponse();
        response.setResponse(result);
        return response;
    }

    public List<Double> getForeCast(Map<String, Double> userRequest, List<InvestmentDetail> details) {
        Map<Integer, Double> totalYearAmount = new HashMap<>();
        for (InvestmentDetail i : details) {
            //user input for category i
            double userInvestmentPercentage = userRequest.get(i.getCategory());
            double userInvestmentDollars = (userInvestmentPercentage / 100) * 10000;
            for (int x = 0; x < 10; x++) {

                //historical interest data for category i in year x
                double historicalInterest = Double.valueOf(i.getData().get(x));
                double currentInterest = (historicalInterest / 100) * userInvestmentDollars;

                userInvestmentDollars = userInvestmentDollars + currentInterest;

                Double currentYearTotal = totalYearAmount.getOrDefault(x, 0.0);
                //add total amount for category i in year x in Map<Integer, Double> totalYearAmount
                //continuously sum total for each investment i in year x
                totalYearAmount.put(x, currentYearTotal + userInvestmentDollars);
            }
        }
        return new ArrayList<>(totalYearAmount.values());
    }
}

