package co.edu.unbosque.Trading.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Column(name = "reset_token")
    private String resetToken;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    private String role;  // USER o ADMIN

    private String name;
    private String lastName;
    private String dni;
    private String email;
    private String phoneNumber;

    
    private Boolean notificationsEnabled;
    private String reportFrequency; // DAILY, WEEKLY, etc.

    private Integer failedLoginAttempts;
    private Boolean accountLocked;
}
