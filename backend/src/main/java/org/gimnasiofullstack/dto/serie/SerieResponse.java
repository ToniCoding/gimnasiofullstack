package org.gimnasiofullstack.dto.serie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerieResponse {
    private Long id;
    private Double kg;
    private Integer repeticiones;
    private Integer orden;
}
