package co.edu.unbosque.service.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.edu.unbosque.model.AssetDTO;
import co.edu.unbosque.model.BarDTO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Iterator;


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

public List<AssetDTO> getAllAssets() throws Exception {
    String assetsUrl = "https://paper-api.alpaca.markets/v2/assets";
    HttpEntity<Void> entity = new HttpEntity<>(buildHeaders());
    ResponseEntity<String> assetsResponse = restTemplate.exchange(assetsUrl, HttpMethod.GET, entity, String.class);

    JsonNode assetsArray = mapper.readTree(assetsResponse.getBody());

    List<String> symbols = new ArrayList<>();
    Map<String, AssetDTO> assetInfoMap = new HashMap<>();
    for (JsonNode asset : assetsArray) {
        if ("active".equals(asset.get("status").asText()) &&
            asset.get("tradable").asBoolean() &&
            "us_equity".equalsIgnoreCase(asset.get("class").asText())) {  // <--- ESTE FILTRO ES EL QUE TRAE UNICAMENTE ACCIONES

            String symbol = asset.get("symbol").asText();
            symbols.add(symbol);

            AssetDTO dto = new AssetDTO();
            dto.setSymbol(symbol);
            dto.setName(asset.get("name").asText());
            dto.setExchange(asset.get("exchange").asText());
            assetInfoMap.put(symbol, dto);
        }
    }


    if (symbols.isEmpty()) {
        System.out.println("No se encontraron activos válidos.");
        return Collections.emptyList();
    }

    // Fetch snapshots de los símbolos recolectados
    String symbolsParam = String.join(",", symbols);
    String snapshotsUrl = "https://data.alpaca.markets/v2/stocks/snapshots?symbols=" + symbolsParam;

    ResponseEntity<String> snapshotsResponse = restTemplate.exchange(snapshotsUrl, HttpMethod.GET, entity, String.class);
    JsonNode rootNode = mapper.readTree(snapshotsResponse.getBody());

    if (rootNode != null && rootNode.size() > 0) {
        Iterator<String> fieldNames = rootNode.fieldNames();
        while (fieldNames.hasNext()) {
            String symbol = fieldNames.next();
            JsonNode snapshot = rootNode.get(symbol);

            if (snapshot != null && snapshot.has("latestTrade") && snapshot.has("prevDailyBar") && snapshot.has("dailyBar")) {
                double lastPrice = snapshot.get("latestTrade").get("p").asDouble();
                double prevClose = snapshot.get("prevDailyBar").get("c").asDouble();
                long volume = snapshot.get("dailyBar").get("v").asLong();

                double change = lastPrice - prevClose;
                double changePercent = (change / prevClose) * 100.0;

                AssetDTO dto = assetInfoMap.get(symbol);
                if (dto != null) {
                    dto.setLastPrice(lastPrice);
                    dto.setChange(change);
                    dto.setChangePercent(changePercent);
                    dto.setVolume(volume);
                }
            } else {
                System.out.println("Info: Datos de snapshot no disponibles para " + symbol + ", posiblemente sin actividad reciente.");
            }
        }
    } else {
        System.out.println("Advertencia: respuesta vacía de snapshots o JSON inválido.");
    }

    return new ArrayList<>(assetInfoMap.values());
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


public List<BarDTO> getBarsForSymbolMinute(String symbol) throws Exception {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");
    ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);
    ZonedDateTime startDateTime = now.toLocalDate().atStartOfDay(ZoneOffset.UTC);
    ZonedDateTime endDateTime = now;

    String barsUrl = "https://data.alpaca.markets/v2/stocks/" + symbol +
            "/bars?timeframe=1Min&start=" + startDateTime.format(formatter) +
            "&end=" + endDateTime.format(formatter) + "&feed=iex";

    HttpEntity<Void> entity = new HttpEntity<>(buildHeaders());

    ResponseEntity<String> barsResponse = restTemplate.exchange(barsUrl, HttpMethod.GET, entity, String.class);
    JsonNode rootNode = mapper.readTree(barsResponse.getBody());

    List<BarDTO> barsList = new ArrayList<>();
    if (rootNode != null && rootNode.has("bars")) {
        for (JsonNode bar : rootNode.get("bars")) {
            BarDTO dto = new BarDTO();
            dto.setT(bar.get("t").asText());
            dto.setO(bar.get("o").asDouble());
            dto.setH(bar.get("h").asDouble());
            dto.setL(bar.get("l").asDouble());
            dto.setC(bar.get("c").asDouble());
            dto.setV(bar.get("v").asLong());
            barsList.add(dto);
        }
    }

    return barsList;
}


public List<BarDTO> getBarsForSymbolDays(String symbol) throws Exception {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    LocalDate endDate = LocalDate.now();
    LocalDate startDate = endDate.minusMonths(3);

    String barsUrl = "https://data.alpaca.markets/v2/stocks/" + symbol +
            "/bars?timeframe=1Min&start=" + startDate.format(formatter) +
            "&end=" + endDate.format(formatter) + "&feed=iex";

    HttpEntity<Void> entity = new HttpEntity<>(buildHeaders());

    ResponseEntity<String> barsResponse = restTemplate.exchange(barsUrl, HttpMethod.GET, entity, String.class);
    JsonNode rootNode = mapper.readTree(barsResponse.getBody());

    List<BarDTO> barsList = new ArrayList<>();
    if (rootNode != null && rootNode.has("bars")) {
        for (JsonNode bar : rootNode.get("bars")) {
            BarDTO dto = new BarDTO();
            dto.setT(bar.get("t").asText());
            dto.setO(bar.get("o").asDouble());
            dto.setH(bar.get("h").asDouble());
            dto.setL(bar.get("l").asDouble());
            dto.setC(bar.get("c").asDouble());
            dto.setV(bar.get("v").asLong());
            barsList.add(dto);
        }
    }

    return barsList;
}

}
