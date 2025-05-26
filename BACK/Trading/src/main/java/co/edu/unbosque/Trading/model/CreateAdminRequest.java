package co.edu.unbosque.Trading.model;

import lombok.Data;

@Data
public class CreateAdminRequest {
    private String username;
    private String password;
    private String name;
    private String lastName;
    private String dni;
    private String email;
    private String phoneNumber;
}
