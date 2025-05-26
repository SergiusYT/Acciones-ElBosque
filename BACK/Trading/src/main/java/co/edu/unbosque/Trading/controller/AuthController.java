package co.edu.unbosque.Trading.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unbosque.Trading.model.AdminSettingsRequest;
import co.edu.unbosque.Trading.model.AssetDTO;
import co.edu.unbosque.Trading.model.BarDTO;
import co.edu.unbosque.Trading.model.CreateAdminRequest;
import co.edu.unbosque.Trading.model.LoginRequestDTO;
import co.edu.unbosque.Trading.model.User;
import co.edu.unbosque.Trading.repository.UserRepository;
import co.edu.unbosque.Trading.service.AuthService;
import co.edu.unbosque.Trading.service.MarketDataService;


@RestController
@RequestMapping("/api")
public class AuthController {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(AuthController.class);
    private static final org.slf4j.Logger splunkLogger = org.slf4j.LoggerFactory.getLogger("splunk");

    @Autowired
    private AuthService authService;

    @Autowired
    private MarketDataService marketDataService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User nuevoUsuario) {

        // 🚨 Nueva validación: Si alguien intenta registrarse como ADMIN, lo rechazamos
        if (nuevoUsuario.getRole() != null && nuevoUsuario.getRole().equalsIgnoreCase("ADMIN")) {
            splunkLogger.info("intento de registro admin");
            return ResponseEntity.status(403)
                    .body(Map.of("message", "No tienes permiso para registrarte como administrador"));        
        }

        // Si no mandan ningún rol o mandan otro valor, lo forzamos a USER
        nuevoUsuario.setRole("USER");

        String mensaje = authService.register(nuevoUsuario);

        if (mensaje.equals("Usuario ya existe")) {
            return ResponseEntity.badRequest().body(Map.of("message", mensaje));
        } else {
            return ResponseEntity.ok(Map.of("message", "Usuario registrado correctamente"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        String mensaje = authService.login(request);
        if (mensaje.equals("Inicio de sesión exitoso")) {
            logger.info("✅ Prueba de log enviada a Splunk desde Acciones ElBosque");
            splunkLogger.info("Login exitoso a la aplicacion");
            return ResponseEntity.ok(Map.of("message", mensaje));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", mensaje));
        }
    }

    @PostMapping("/admin/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createAdmin(@RequestBody CreateAdminRequest request) {

        User admin = User.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .role("ADMIN")
                .name(request.getName())
                .lastName(request.getLastName())
                .dni(request.getDni())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .notificationsEnabled(false)
                .reportFrequency("WEEKLY")
                .failedLoginAttempts(0)
                .accountLocked(false)
                .build();

        String mensaje = authService.register(admin);

        if (mensaje.equals("Usuario ya existe")) {
            return ResponseEntity.badRequest().body(Map.of("message", mensaje));
        } else if (mensaje.equals("No tienes permiso para registrar administradores")) {
            return ResponseEntity.status(403).body(Map.of("message", mensaje));
        } else {
            return ResponseEntity.ok(Map.of("message", "Administrador creado correctamente"));
        }
    }

    @DeleteMapping("/admin/delete/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAdmin(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado"));
        }

        if (!user.get().getRole().equalsIgnoreCase("ADMIN")) {
            return ResponseEntity.badRequest().body(Map.of("message", "El usuario no es un administrador"));
        }

        userRepository.delete(user.get());
        return ResponseEntity.ok(Map.of("message", "Administrador eliminado correctamente"));
    }

    @PutMapping("/admin/settings/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateAdminSettings(@PathVariable String username,
            @RequestBody AdminSettingsRequest request) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado"));
        }

        if (!user.get().getRole().equalsIgnoreCase("ADMIN")) {
            return ResponseEntity.badRequest().body(Map.of("message", "El usuario no es un administrador"));
        }

        User admin = user.get();
        admin.setNotificationsEnabled(request.getNotificationsEnabled());
        admin.setReportFrequency(request.getReportFrequency());
        userRepository.save(admin);

        return ResponseEntity.ok(Map.of("message", "Preferencias actualizadas"));
    }

    @PutMapping("/account/unlock/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> unlockAccount(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado"));
        }

        User usuario = user.get();
        usuario.setAccountLocked(false);
        usuario.setFailedLoginAttempts(0);
        userRepository.save(usuario);

        return ResponseEntity.ok(Map.of("message", "Cuenta desbloqueada correctamente"));
    }

    @GetMapping("/assets")
    public ResponseEntity<?> getAssetsInfo() {
        try {
            List<AssetDTO> assets = marketDataService.fetchAssetsInfo();
            return ResponseEntity.ok(assets);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error al obtener los activos"));
        }
    }

    @GetMapping("/bars/{symbol}")
    public ResponseEntity<List<BarDTO>> getBarsForSymbol(@PathVariable String symbol) {
        try {
            List<BarDTO> bars = marketDataService.fetchBarsForSymbol(symbol);
            return ResponseEntity.ok(bars);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    
}
