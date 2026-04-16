package org.gimnasiofullstack.dto.exercise;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gimnasiofullstack.dto.serie.SerieEntry;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseEntry {
    @NotBlank(message = "El nombre del ejercicio es obligatorio")
    private String nombreEjercicio;

    private String descripcion;

    @NotNull(message = "La lista de series es obligatoria")
    private List<SerieEntry> series;
}
