import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarrito(carritoGuardado);
    setLoading(false);
  };

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    const envio = subtotal > 30000 ? 0 : 5000;                 
    return subtotal + envio;
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    
    const carritoActualizado = carrito.map(item => 
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    );
    
    setCarrito(carritoActualizado);
    localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    
    // Actualizar el contador del navbar
    window.dispatchEvent(new Event('carritoActualizado'));

  };

  const eliminarProducto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto del carrito?')) {
      const carritoActualizado = carrito.filter(item => item.id !== id);
      setCarrito(carritoActualizado);
      localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
      
      // Actualizar el contador del navbar
      window.dispatchEvent(new Event('storage'));
    }
  };

  const vaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
      setCarrito([]);
      localStorage.removeItem('carrito');
      window.dispatchEvent(new Event('storage'));
    }
  };

  const procesarCompra = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    alert('¡Compra procesada exitosamente! Gracias por tu compra.');
    vaciarCarrito();
  };

  if (loading) {
    return (
      <div className="container text-center" style={{ marginTop: '150px' }}>
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  const subtotal = calcularSubtotal();
  const envio = subtotal > 30000 ? 0 : 5000;
  const total = calcularTotal();

  return (
    <div className="container" style={{ marginTop: '100px', marginBottom: '50px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Tu Carrito de Compras 🛒</h1>
        <Link to="/productos" className="btn btn-outline-secondary">
          ← Seguir comprando
        </Link>
      </div>

      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <div className="display-1 mb-4">🛒</div>
          <h3 className="mb-3">Tu carrito está vacío</h3>
          <p className="text-muted mb-4">
            ¡Agrega productos para comenzar tu compra!
          </p>
          <Link to="/productos" className="btn btn-success btn-lg">
            Ver Productos
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* Lista de productos */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Productos ({carrito.length})</h5>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={vaciarCarrito}
                  >
                    🗑️ Vaciar carrito
                  </button>
                </div>
                
                <hr />

                {carrito.map(item => (
                  <div key={item.id} className="row align-items-center mb-3 pb-3 border-bottom">
                    {/* Imagen del producto */}
                    <div className="col-md-2 col-3 text-center">
                      <div 
                        className="bg-light rounded d-flex align-items-center justify-content-center"
                        style={{ height: '80px' }}
                      >
                        <span style={{ fontSize: '2rem' }}>📦</span>
                      </div>
                    </div>

                    {/* Info del producto */}
                    <div className="col-md-4 col-9">
                      <h6 className="mb-1">{item.nombre}</h6>
                      <p className="text-muted small mb-0">
                        {item.descripcion?.substring(0, 50) || 'Sin descripción'}
                      </p>
                    </div>

                    {/* Precio unitario */}
                    <div className="col-md-2 col-4 text-center">
                      <small className="text-muted d-block">Precio</small>
                      <strong>${item.precio.toLocaleString()}</strong>
                    </div>

                    {/* Cantidad */}
                    <div className="col-md-2 col-4">
                      <div className="input-group input-group-sm">
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          className="form-control text-center" 
                          value={item.cantidad}
                          onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                          style={{ maxWidth: '60px' }}
                        />
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal y eliminar */}
                    <div className="col-md-2 col-4 text-end">
                      <div className="mb-2">
                        <strong className="text-success">
                          ${(item.precio * item.cantidad).toLocaleString()}
                        </strong>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarProducto(item.id)}
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '100px' }}>
              <div className="card-body">
                <h5 className="card-title mb-4">Resumen de Compra</h5>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <strong>${subtotal.toLocaleString()}</strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <strong className={envio === 0 ? 'text-success' : ''}>
                    {envio === 0 ? 'GRATIS' : `$${envio.toLocaleString()}`}
                  </strong>
                </div>

                {subtotal < 30000 && (
                  <small className="text-muted d-block mb-3">
                    💡 Compra ${(30000 - subtotal).toLocaleString()} más para envío gratis
                  </small>
                )}

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <h5>Total:</h5>
                  <h5 className="text-success">${total.toLocaleString()}</h5>
                </div>

                <button 
                  className="btn btn-success w-100 mb-3"
                  onClick={procesarCompra}
                >
                  Procesar Compra 💳
                </button>

                <Link to="/productos" className="btn btn-outline-secondary w-100">
                  Seguir comprando
                </Link>

                {/* Información adicional */}
                <div className="bg-light rounded p-3 mt-3">
                  <small className="d-block mb-2">
                    <strong>✓</strong> Compra segura
                  </small>
                  <small className="d-block mb-2">
                    <strong>✓</strong> Envío a todo Chile
                  </small>
                  <small className="d-block">
                    <strong>✓</strong> Devolución gratis
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}