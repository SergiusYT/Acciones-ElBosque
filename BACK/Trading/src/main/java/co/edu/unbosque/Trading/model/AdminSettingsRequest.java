package co.edu.unbosque.Trading.model;

import lombok.Data;

@Data
public class AdminSettingsRequest {
    private Boolean notificationsEnabled;
    private String reportFrequency;
}
