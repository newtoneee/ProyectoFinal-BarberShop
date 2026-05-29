import { useState, useEffect } from 'react';
import { getBarberos, getServicios, getProductos, createVenta } from '../services/api';
import { useNavigate } from 'react-router-dom';

function NuevaVenta() {
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [barberoId, setBarberoId] = useState('');
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [nombreCliente, setNombreCliente] = useState('');
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      const [b, s, p] = await Promise.all([getBarberos(), getServicios(), getProductos()]);
      setBarberos(b.data);
      setServicios(s.data);
      setProductos(p.data);
      if (b.data.length > 0) setBarberoId(b.data[0].id);
    };
    cargar();
  }, []);

  const agregarServicio = (s) => {
    const existe = carrito.find(c => c.servicioId === s.id);
    if (existe) return;
    setCarrito([...carrito, { servicioId: s.id, nombre: s.nombre, precio: s.precio, cantidad: 1 }]);
  };

  const agregarProducto = (p) => {
    const existe = carrito.find(c => c.productoId === p.id);
    if (existe) return;
    setCarrito([...carrito, { productoId: p.id, nombre: p.nombre, precio: p.precio, cantidad: 1 }]);
  };

  const quitarItem = (index) => setCarrito(carrito.filter((_, i) => i !== index));

  const total = carrito.reduce((sum, c) => sum + c.precio * c.cantidad, 0);

  const cobrar = async () => {
    if (!barberoId || carrito.length === 0) return alert('Selecciona barbero y agrega items');
    await createVenta({
      barberoId: parseInt(barberoId),
      metodoPago,
      nombreCliente,
      detalles: carrito.map(c => ({
        servicioId: c.servicioId || null,
        productoId: c.productoId || null,
        cantidad: c.cantidad
      }))
    });
    navigate('/ventas');
  };

  return (
    <div>
      <h1 style={{ color: '#f59e0b', marginBottom: '2rem' }}>✂️ Nueva Venta</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>

        {/* Panel izquierdo */}
        <div>
          <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Datos de la venta</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Barbero</label>
                <select value={barberoId} onChange={e => setBarberoId(e.target.value)} style={inputStyle}>
                  {barberos.map(b => <option key={b.id} value={b.id}>{b.nombre}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Método de Pago</label>
                <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)} style={inputStyle}>
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                  <option>Transferencia</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Cliente (opcional)</label>
                <input value={nombreCliente} onChange={e => setNombreCliente(e.target.value)} style={inputStyle} placeholder="Nombre del cliente" />
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>💈 Servicios</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {servicios.map(s => (
                <button key={s.id} onClick={() => agregarServicio(s)} style={{
                  padding: '0.75rem', backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a',
                  borderRadius: '8px', color: '#fff', cursor: 'pointer', textAlign: 'left'
                }}>
                  <div style={{ fontWeight: 600 }}>{s.nombre}</div>
                  <div style={{ color: '#10b981', fontSize: '0.9rem' }}>${s.precio}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem' }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>📦 Productos</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {productos.map(p => (
                <button key={p.id} onClick={() => agregarProducto(p)} style={{
                  padding: '0.75rem', backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a',
                  borderRadius: '8px', color: '#fff', cursor: 'pointer', textAlign: 'left'
                }}>
                  <div style={{ fontWeight: 600 }}>{p.nombre}</div>
                  <div style={{ color: '#10b981', fontSize: '0.9rem' }}>${p.precio}</div>
                  <div style={{ color: '#666', fontSize: '0.8rem' }}>Stock: {p.stock}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Carrito */}
        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '2rem' }}>
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>🛒 Carrito</h3>
          {carrito.length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center' }}>Agrega servicios o productos</p>
          ) : (
            carrito.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #2a2a2a' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: '0.9rem' }}>{item.nombre}</div>
                  <div style={{ color: '#10b981', fontSize: '0.85rem' }}>${item.precio}</div>
                </div>
                <button onClick={() => quitarItem(i)} style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
              </div>
            ))
          )}
          <div style={{ borderTop: '2px solid #f59e0b', marginTop: '1rem', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#aaa' }}>Total</span>
              <span style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 700 }}>${total.toFixed(2)}</span>
            </div>
            <button onClick={cobrar} style={{ ...btnStyle, width: '100%', fontSize: '1rem', padding: '0.8rem' }}>
              💰 Cobrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '0.6rem', backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', borderRadius: '8px', color: '#fff', marginTop: '0.3rem' };
const btnStyle = { padding: '0.6rem 1.2rem', backgroundColor: '#f59e0b', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 };

export default NuevaVenta;