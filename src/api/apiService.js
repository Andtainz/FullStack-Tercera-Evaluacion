// src/api/apiService.js

const API_BASE_URL = 'http://localhost:8080/api';

// Función helper para manejar errores
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(errorData.error || errorData.message || 'Error en la petición');
  }
  
  // Si es 204 No Content, no hay body
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

export const apiService = {
  // ==================== PRODUCTOS ====================
  
  async getProductos() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  async getProductoById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },

  async crearProducto(producto) {
    const productoFormatted = {
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: parseInt(producto.precio),
      stock: parseInt(producto.stock) || 0,
      activo: producto.activo !== undefined ? producto.activo : true,
      imagenUrl: producto.imagenUrl || null,
      categoria: producto.categoriaId ? { id: parseInt(producto.categoriaId) } : null
    };

    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(productoFormatted)
    });

    return handleResponse(response);
  },

  async actualizarProducto(id, producto) {
    const productoFormatted = {
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: parseInt(producto.precio),
      stock: parseInt(producto.stock) || 0,
      activo: producto.activo,
      imagenUrl: producto.imagenUrl || null,
      categoria: producto.categoriaId ? { id: parseInt(producto.categoriaId) } : null
    };

    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(productoFormatted)
    });

    return handleResponse(response);
  },

  async desactivarProducto(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}/desactivar`, {
      method: 'PATCH',
      headers: { 'Accept': 'application/json' }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al desactivar producto:', error);
    throw error;
  }
},

async activarProducto(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}/activar`, {
      method: 'PATCH',
      headers: { 'Accept': 'application/json' }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al activar producto:', error);
    throw error;
  }
},


  async eliminarProducto(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: 'DELETE'
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  },

  // ==================== CATEGORÍAS ====================
  
  async getCategorias() {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  async getCategoriaById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al obtener categoría:', error);
      throw error;
    }
  },

  async crearCategoria(categoria) {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(categoria)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al crear categoría:', error);
      throw error;
    }
  },

  async actualizarCategoria(id, categoria) {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(categoria)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      throw error;
    }
  },

  async eliminarCategoria(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: 'DELETE'
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      throw error;
    }
  },

  // ==================== AUTENTICACIÓN ====================
  
  validateAdmin(password) {
    return password === 'admin123'; // Contraseña fija para admin
  },

  // ==================== UTILIDADES ====================
  
  async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos`);
      return response.ok;
    } catch (error) {
      console.error('Error de conexión con el backend:', error);
      return false;
    }
  }
};