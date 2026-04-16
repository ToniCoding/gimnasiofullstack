package org.gimnasiofullstack.service;

import org.gimnasiofullstack.dto.user.UserModificationRequest;
import org.gimnasiofullstack.dto.user.UserModificationResponse;
import org.gimnasiofullstack.dto.user.UserRegisterRequest;
import org.gimnasiofullstack.dto.user.UserRegisterResponse;
import org.gimnasiofullstack.model.User;
import org.gimnasiofullstack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserRegisterResponse registerUser(UserRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return createRegisterResponse("El email ya está registrado");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return createRegisterResponse("El nombre de usuario ya está en uso");
        }

        User user = User.builder()
                .nombre(request.getNombre())
                .apellidos(request.getApellidos())
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fechaNacimiento(request.getFechaNacimiento())
                .genero(request.getGenero())
                .rol("ROLE_USER")
                .build();

        userRepository.save(user);

        return createRegisterResponse("Usuario registrado correctamente");
    }

    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));
    }

    @Transactional(readOnly = true)
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con username: " + username));
    }

    @Transactional(readOnly = true)
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }

    @Transactional
    public UserModificationResponse updateUser(Long userId, UserModificationRequest request) {
        User user = getUserById(userId);

        if (request.getNombre() != null) {
            user.setNombre(request.getNombre());
        }
        if (request.getApellidos() != null) {
            user.setApellidos(request.getApellidos());
        }
        if (request.getEmail() != null) {
            if (userRepository.existsByEmail(request.getEmail()) && !user.getEmail().equals(request.getEmail())) {
                return createModificationResponse(0, user);
            }
            user.setEmail(request.getEmail());
        }
        if (request.getFechaNacimiento() != null) {
            user.setFechaNacimiento(request.getFechaNacimiento());
        }

        User saved = userRepository.save(user);
        return createModificationResponse(1, saved);
    }

    @Transactional(readOnly = true)
    public UserModificationResponse getUserProfile(Long userId) {
        User user = getUserById(userId);
        return createModificationResponse(1, user);
    }

    private UserRegisterResponse createRegisterResponse(String mensaje) {
        UserRegisterResponse response = new UserRegisterResponse();
        response.setResultado(mensaje);
        return response;
    }

    private UserModificationResponse createModificationResponse(Integer resultado, User user) {
        UserModificationResponse response = new UserModificationResponse();
        response.setResultado(resultado);
        response.setNombre(user.getNombre());
        response.setApellidos(user.getApellidos());
        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        response.setFechaNacimiento(user.getFechaNacimiento());
        response.setGenero(user.getGenero());
        return response;
    }
}
