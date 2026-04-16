package org.gimnasiofullstack.dto.exercise;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gimnasiofullstack.dto.serie.SerieResponse;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseResponse {
    private Long id;
    private String nombre;
    private String descripcion;
    private Integer orden;
    private List<SerieResponse> series;
}
