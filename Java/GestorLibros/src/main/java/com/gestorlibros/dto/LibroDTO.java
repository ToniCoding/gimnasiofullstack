package com.gestorlibros.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LibroDTO {
    private Long id;
    private String titulo;
    private String autor;
    private BigDecimal precio;
    private LocalDate fechaPublicacion;
    private String rutaPortada;
}
