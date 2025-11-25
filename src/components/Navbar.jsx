import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  // Función que calcula el total de productos en el carrito
  const actualizarContador = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const total = carrito.reduce((sum, item) => sum + (item.cantidad || 0), 0);
    setCartCount(total);
  };

  useEffect(() => {
    // Inicializar contador al montar
    actualizarContador();

    // Escuchar cambios del localStorage y evento personalizado
    const handleStorageChange = () => actualizarContador();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('carritoActualizado', handleStorageChange);

    // Cleanup al desmontar
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('carritoActualizado', handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/">🍃 Sativamente</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          </ul>

          <div className="d-flex align-items-center">
            <Link to="/carrito" className="nav-link me-3">
              Carrito ({cartCount})
            </Link>

            <div className="dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Iniciar sesión
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/login">Iniciar sesión</Link></li>
                <li><Link className="dropdown-item" to="/registro">Registrarse</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/admin">Acceder como Admin</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
