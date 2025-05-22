package co.edu.unbosque.service.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Collections;

@Service
public class AlpacaService {

    @Value("${alpaca.broker.api.key}")
    private String brokerApiKey;

    @Value("${alpaca.broker.api.secret}")
    private String brokerApiSecret;

    
    @Value("${alpaca.api.key}")
    private String apiKey;

    @Value("${alpaca.api.secret}")
    private String apiSecret;

    private final String baseUrl = "https://paper-api.alpaca.markets";


private final String brokerBaseUrl = "https://broker-api.sandbox.alpaca.markets";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    private HttpHeaders buildHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("APCA-API-KEY-ID", apiKey);
        headers.set("APCA-API-SECRET-KEY", apiSecret);
        return headers;
    }



    public JsonNode getAllBrokerAccounts() throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        
        String credentials = brokerApiKey + ":" + brokerApiSecret;
        String base64Creds = Base64.getEncoder().encodeToString(credentials.getBytes());
        headers.set("Authorization", "Basic " + base64Creds);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
            brokerBaseUrl + "/v1/accounts",
            HttpMethod.GET,
            entity,
            String.class
        );

    return mapper.readTree(response.getBody());
}

    public JsonNode getAccountDetails() throws Exception {
        HttpEntity<String> entity = new HttpEntity<>(buildHeaders());
        ResponseEntity<String> response = restTemplate.exchange(
            baseUrl + "/v2/account", HttpMethod.GET, entity, String.class);
        return mapper.readTree(response.getBody());
    }

    public JsonNode placeOrder(String symbol, int qty, String side, String type, String timeInForce) throws Exception {
        HttpHeaders headers = buildHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = String.format("{\"symbol\":\"%s\",\"qty\":%d,\"side\":\"%s\",\"type\":\"%s\",\"time_in_force\":\"%s\"}",
                                     symbol, qty, side, type, timeInForce);

        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.exchange(
            baseUrl + "/v2/orders", HttpMethod.POST, entity, String.class);
        return mapper.readTree(response.getBody());
    }
}
