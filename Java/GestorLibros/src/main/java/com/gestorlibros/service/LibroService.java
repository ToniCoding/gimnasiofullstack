package com.gestorlibros.service;

import com.gestorlibros.dto.LibroDTO;
import com.gestorlibros.dto.LibroRequestDTO;
import com.gestorlibros.entity.Libro;
import com.gestorlibros.exception.LibroNoEncontradoException;
import com.gestorlibros.repository.LibroRepository;
import com.gestorlibros.service.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LibroService {

    private final LibroRepository libroRepository;
    private final StorageService storageService;

    public LibroDTO crearLibro(LibroRequestDTO libroRequest) {
        Libro libro = new Libro();
        BeanUtils.copyProperties(libroRequest, libro);
        Libro guardado = libroRepository.save(libro);
        return convertirADTO(guardado);
    }

    public List<LibroDTO> obtenerTodos() {
        return libroRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public LibroDTO obtenerPorId(Long id) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new LibroNoEncontradoException(id));
        return convertirADTO(libro);
    }

    public LibroDTO actualizarLibro(Long id, LibroRequestDTO libroRequest) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new LibroNoEncontradoException(id));

        BeanUtils.copyProperties(libroRequest, libro, obtenerPropiedadesNulas(libroRequest));
        Libro actualizado = libroRepository.save(libro);
        return convertirADTO(actualizado);
    }

    public void eliminarLibro(Long id) throws IOException {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new LibroNoEncontradoException(id));

        if (libro.getRutaPortada() != null) {
            storageService.delete(libro.getRutaPortada());
        }

        libroRepository.deleteById(id);
    }

    public LibroDTO subirPortada(Long id, MultipartFile archivo) throws IOException {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new LibroNoEncontradoException(id));

        if (libro.getRutaPortada() != null) {
            storageService.delete(libro.getRutaPortada());
        }

        String nombreArchivo = storageService.store(archivo);
        libro.setRutaPortada(nombreArchivo);

        Libro actualizado = libroRepository.save(libro);
        return convertirADTO(actualizado);
    }

    public byte[] descargarPortada(Long id) throws IOException {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new LibroNoEncontradoException(id));

        if (libro.getRutaPortada() == null) {
            throw new RuntimeException("El libro no tiene portada");
        }

        return storageService.load(libro.getRutaPortada());
    }

    private LibroDTO convertirADTO(Libro libro) {
        LibroDTO dto = new LibroDTO();
        BeanUtils.copyProperties(libro, dto);
        return dto;
    }

    private String[] obtenerPropiedadesNulas(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> nombresNulos = new HashSet<>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) nombresNulos.add(pd.getName());
        }
        return nombresNulos.toArray(new String[0]);
    }
}
