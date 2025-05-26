package co.edu.unbosque.Trading.service;

import co.edu.unbosque.Trading.model.LoginRequestDTO;
import co.edu.unbosque.Trading.model.User;
import co.edu.unbosque.Trading.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(User nuevoUsuario) {
        // Bloqueamos intento de crear ADMIN desde /register
        if (nuevoUsuario.getRole() != null && nuevoUsuario.getRole().equalsIgnoreCase("ADMIN")) {
            return "No tienes permiso para registrar administradores";
        }

        if (userRepository.existsByUsername(nuevoUsuario.getUsername())) {
            return "Usuario ya existe";
        }

        nuevoUsuario.setPassword(passwordEncoder.encode(nuevoUsuario.getPassword()));
        nuevoUsuario.setFailedLoginAttempts(0); // Inicia en 0
        nuevoUsuario.setAccountLocked(false);   // No bloqueado por defecto
        userRepository.save(nuevoUsuario);
        return "Usuario registrado correctamente";
    }

    public String login(LoginRequestDTO loginRequest) {
        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
        if (user.isPresent()) {
            User usuario = user.get();

            if (Boolean.TRUE.equals(usuario.getAccountLocked())) {
                return "Cuenta bloqueada. Contacta con soporte.";
            }

            if (passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {
                // Reset failed attempts
                usuario.setFailedLoginAttempts(0);
                userRepository.save(usuario);
                return "Inicio de sesión exitoso";
            } else {
                // Increment failed attempts
                int attempts = usuario.getFailedLoginAttempts() == null ? 0 : usuario.getFailedLoginAttempts();
                attempts++;
                usuario.setFailedLoginAttempts(attempts);

                if (attempts >= 5) {
                    usuario.setAccountLocked(true);
                    // Enviar correo notificando bloqueo
                }

                userRepository.save(usuario);
                return attempts >= 5
                        ? "Cuenta bloqueada por múltiples intentos fallidos"
                        : "Contraseña incorrecta";
            }
        } else {
            return "Usuario no encontrado";
        }
    }
}
