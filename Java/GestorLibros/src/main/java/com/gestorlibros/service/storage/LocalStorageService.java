package com.gestorlibros.service.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class LocalStorageService implements StorageService {

    private final Path rootLocation;

    public LocalStorageService(@Value("${storage.location:portadas}") String location) {
        this.rootLocation = Paths.get(location);
        init();
    }

    private void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("No se puede crear el directorio de almacenamiento", e);
        }
    }

    @Override
    public String store(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("Archivo vacío");
        }

        String extension = file.getOriginalFilename()
                .substring(file.getOriginalFilename().lastIndexOf("."));
        String filename = UUID.randomUUID() + extension;

        Path destination = rootLocation.resolve(filename);
        Files.copy(file.getInputStream(), destination);

        return filename;
    }

    @Override
    public byte[] load(String filename) throws IOException {
        Path file = rootLocation.resolve(filename);
        return Files.readAllBytes(file);
    }

    @Override
    public void delete(String filename) throws IOException {
        Path file = rootLocation.resolve(filename);
        Files.deleteIfExists(file);
    }
}