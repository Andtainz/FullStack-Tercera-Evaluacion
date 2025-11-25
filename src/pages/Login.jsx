import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar dominios permitidos
    const dominiosValidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    const emailValido = dominiosValidos.some(dominio => formData.email.endsWith(dominio));
    
    if (!emailValido) {
      setMensaje('Dominio de correo no válido. Use @duoc.cl, @profesor.duoc.cl o @gmail.com');
      return;
    }

    if (formData.password.length < 4 || formData.password.length > 10) {
      setMensaje('La contraseña debe tener entre 4 y 10 caracteres');
      return;
    }

    // Simular login (guardar en sessionStorage)
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === formData.email);

    if (usuario && usuario.password === formData.password) {
      sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
      alert('¡Inicio de sesión exitoso!');
      navigate('/');
    } else {
      setMensaje('Credenciales incorrectas');
    }
  };

  return (
    <div className="container" style={{ marginTop: '120px', maxWidth: '450px', marginBottom: '50px' }}>
      <div className="card shadow">
        <div className="card-body p-5">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          
          {mensaje && (
            <div className="alert alert-danger">{mensaje}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="tu@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <small className="text-muted">
                Dominios válidos: @duoc.cl, @profesor.duoc.cl, @gmail.com
              </small>
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <small className="text-muted">Entre 4 y 10 caracteres</small>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Iniciar sesión
            </button>

            <div className="text-center mb-3">
              <Link to="#" className="text-decoration-none">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <hr />

            <div className="text-center mb-3">
              <small className="text-muted">Acceso administrativo</small>
            </div>
            <Link to="/admin" className="btn btn-danger w-100 mb-3">
              🔒 Acceso Administrador
            </Link>

            <div className="text-center">
              <small>¿No tienes cuenta? </small>
              <Link to="/registro">Crear una cuenta</Link>
            </div>

            <div className="text-center mt-3">
              <Link to="/" className="btn btn-outline-secondary w-100">
                ← Volver al Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}