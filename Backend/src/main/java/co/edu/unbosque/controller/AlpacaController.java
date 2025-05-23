package co.edu.unbosque.controller;

import com.fasterxml.jackson.databind.JsonNode;

import co.edu.unbosque.model.*;
import co.edu.unbosque.service.api.AlpacaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Collections;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/alpaca")
public class AlpacaController {

    @Autowired
    private AlpacaService alpacaService;

    @GetMapping("/cuenta")
    public JsonNode obtenerCuenta() throws Exception {
        return alpacaService.getAccountDetails();
    }

    @GetMapping("/cuentas")
    public ResponseEntity<?> getCuentasAlpaca() {
        try {
            JsonNode cuentas = alpacaService.getAllBrokerAccounts();
            return ResponseEntity.ok(cuentas);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", e.getMessage()));
        }
    }


    @GetMapping("/activos")
    public ResponseEntity<?> getTodosLosActivos() {
        try {
            List<AssetDTO> activos = alpacaService.getAllAssets();
            return ResponseEntity.ok(activos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }


    @PostMapping("/orden")
    public JsonNode realizarOrden(@RequestParam String symbol,
                                   @RequestParam int qty,
                                   @RequestParam String side,      // "buy" o "sell"
                                   @RequestParam String type,      // "market", "limit", etc.
                                   @RequestParam String timeInForce) throws Exception {
        return alpacaService.placeOrder(symbol, qty, side, type, timeInForce);
    }


    @GetMapping("/barsMinute/{symbol}")
    public ResponseEntity<Map<String, Object>> getBars(@PathVariable String symbol) {
        try {
            List<BarDTO> bars = alpacaService.getBarsForSymbolMinute(symbol);
            Map<String, Object> response = new HashMap<>();
            response.put("bars", bars);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}