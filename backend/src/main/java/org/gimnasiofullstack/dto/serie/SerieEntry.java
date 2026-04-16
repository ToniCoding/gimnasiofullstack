package org.gimnasiofullstack.dto.serie;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerieEntry {
    @PositiveOrZero(message = "Los kilogramos no pueden ser negativos")
    private Double kg;

    @NotNull(message = "Las repeticiones son obligatorias")
    @Positive(message = "Las repeticiones deben ser positivas")
    private Integer repeticiones;
}
