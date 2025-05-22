package co.edu.unbosque.controller;

import com.fasterxml.jackson.databind.JsonNode;
import co.edu.unbosque.service.api.AlpacaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @PostMapping("/orden")
    public JsonNode realizarOrden(@RequestParam String symbol,
                                   @RequestParam int qty,
                                   @RequestParam String side,      // "buy" o "sell"
                                   @RequestParam String type,      // "market", "limit", etc.
                                   @RequestParam String timeInForce) throws Exception {
        return alpacaService.placeOrder(symbol, qty, side, type, timeInForce);
    }
}