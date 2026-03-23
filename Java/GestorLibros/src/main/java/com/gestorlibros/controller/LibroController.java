package com.gestorlibros.controller;

import com.gestorlibros.dto.LibroDTO;
import com.gestorlibros.dto.LibroRequestDTO;
import com.gestorlibros.service.LibroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/libros")
@RequiredArgsConstructor
public class LibroController {

    private final LibroService libroService;

    @GetMapping
    public ResponseEntity<List<LibroDTO>> listarTodos() {
        return ResponseEntity.ok(libroService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LibroDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(libroService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<LibroDTO> crearLibro(@RequestBody LibroRequestDTO libroRequest) {
        return ResponseEntity.ok(libroService.crearLibro(libroRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LibroDTO> actualizarLibro(
            @PathVariable Long id,
            @RequestBody LibroRequestDTO libroRequest) {
        return ResponseEntity.ok(libroService.actualizarLibro(id, libroRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable Long id) throws IOException {
        libroService.eliminarLibro(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/{id}/portada", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<LibroDTO> subirPortada(
            @PathVariable Long id,
            @RequestParam("archivo") MultipartFile archivo) throws IOException {
        return ResponseEntity.ok(libroService.subirPortada(id, archivo));
    }

    @GetMapping("/{id}/portada")
    public ResponseEntity<byte[]> descargarPortada(@PathVariable Long id) throws IOException {
        byte[] imagen = libroService.descargarPortada(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return ResponseEntity.ok().headers(headers).body(imagen);
    }
}
