package org.gimnasiofullstack.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModificationResponse {
    private Integer resultado;
    private String nombre;
    private String apellidos;
    private String email;
    private String username;
    private LocalDate fechaNacimiento;
    private String genero;
}
