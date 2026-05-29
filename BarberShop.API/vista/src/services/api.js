import axios from 'axios';

const API_URL = 'http://localhost:5005/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Barberos
export const getBarberos = () => api.get('/barberos');
export const createBarbero = (data) => api.post('/barberos', data);
export const updateBarbero = (id, data) => api.put(`/barberos/${id}`, data);
export const deleteBarbero = (id) => api.delete(`/barberos/${id}`);

// Categorias
export const getCategorias = () => api.get('/categorias');
export const createCategoria = (data) => api.post('/categorias', data);
export const updateCategoria = (id, data) => api.put(`/categorias/${id}`, data);
export const deleteCategoria = (id) => api.delete(`/categorias/${id}`);

// Servicios
export const getServicios = () => api.get('/servicios');
export const createServicio = (data) => api.post('/servicios', data);
export const updateServicio = (id, data) => api.put(`/servicios/${id}`, data);
export const deleteServicio = (id) => api.delete(`/servicios/${id}`);

// Productos
export const getProductos = () => api.get('/productos');
export const getProductosBajoStock = () => api.get('/productos/bajo-stock');
export const createProducto = (data) => api.post('/productos', data);
export const updateProducto = (id, data) => api.put(`/productos/${id}`, data);
export const deleteProducto = (id) => api.delete(`/productos/${id}`);

// Ventas
export const getVentas = () => api.get('/ventas');
export const getVentasHoy = () => api.get('/ventas/hoy');
export const getVentasPorRango = (inicio, fin) => api.get(`/ventas/rango?inicio=${inicio}&fin=${fin}`);
export const createVenta = (data) => api.post('/ventas', data);

// Reportes
export const getReporteDiario = (fecha) => api.get(`/reportes/diario/${fecha}`);
export const getReporteMensual = (anio, mes) => api.get(`/reportes/mensual/${anio}/${mes}`);
export const getReporteSemanal = (inicio, fin) => api.get(`/reportes/semanal?inicio=${inicio}&fin=${fin}`);
export const getComisiones = (anio, mes) => api.get(`/reportes/comisiones/${anio}/${mes}`);

export default api;