package com.gestorlibros.exception;

public class LibroNoEncontradoException extends RuntimeException {

    public LibroNoEncontradoException(String mensaje) {
        super(mensaje);
    }

    public LibroNoEncontradoException(Long id) {
        super("Libro no encontrado con id: " + id);
    }
}
