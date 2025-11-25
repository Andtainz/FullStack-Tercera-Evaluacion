package com.vivitasol.projectbackend.repositories;

import com.vivitasol.projectbackend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepositories extends JpaRepository<Usuario, Long> {

    // Buscaremos por email (login con email)
    Optional<Usuario> findByEmail(String email);
}
