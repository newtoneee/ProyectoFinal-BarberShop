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
    if (carrito.find(c => c.servicioId === s.id)) return;
    setCarrito([...carrito, { servicioId: s.id, nombre: s.nombre, precio: s.precio, cantidad: 1, tipo: 'Servicio' }]);
  };

  const agregarProducto = (p) => {
    if (carrito.find(c => c.productoId === p.id)) return;
    setCarrito([...carrito, { productoId: p.id, nombre: p.nombre, precio: p.precio, cantidad: 1, tipo: 'Producto' }]);
  };

  const quitarItem = (index) => setCarrito(carrito.filter((_, i) => i !== index));
  const total = carrito.reduce((sum, c) => sum + c.precio * c.cantidad, 0);

  const cobrar = async () => {
    if (!barberoId || carrito.length === 0) return alert('Selecciona un barbero y agrega al menos un servicio o producto');
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
      <div className="page-header">
        <h1>Nueva Venta</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
        <div>
          {/* Datos */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Datos de la Venta
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Barbero</label>
                <select value={barberoId} onChange={e => setBarberoId(e.target.value)}>
                  {barberos.map(b => <option key={b.id} value={b.id}>{b.nombre}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Método de Pago</label>
                <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                  <option>Transferencia</option>
                </select>
              </div>
              <div>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cliente (opcional)</label>
                <input value={nombreCliente} onChange={e => setNombreCliente(e.target.value)} placeholder="Nombre del cliente" />
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Servicios
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {servicios.map(s => (
                <button key={s.id} onClick={() => agregarServicio(s)} style={{
                  padding: '0.9rem 1rem',
                  backgroundColor: carrito.find(c => c.servicioId === s.id) ? '#1a1a0a' : 'var(--bg-secondary)',
                  border: carrito.find(c => c.servicioId === s.id) ? '1px solid var(--gold-dark)' : '1px solid var(--border-light)',
                  borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left'
                }}>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{s.nombre}</div>
                  <div style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>${s.precio}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Productos */}
          <div className="card">
            <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Productos
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {productos.map(p => (
                <button key={p.id} onClick={() => agregarProducto(p)} style={{
                  padding: '0.9rem 1rem',
                  backgroundColor: carrito.find(c => c.productoId === p.id) ? '#1a1a0a' : 'var(--bg-secondary)',
                  border: carrito.find(c => c.productoId === p.id) ? '1px solid var(--gold-dark)' : '1px solid var(--border-light)',
                  borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left'
                }}>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{p.nombre}</div>
                  <div style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>${p.precio}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>Stock: {p.stock}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Carrito */}
        <div className="card" style={{ position: 'sticky', top: '2rem' }}>
          <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Resumen
          </h3>

          {carrito.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem 0' }}>
              Selecciona servicios o productos
            </p>
          ) : (
            carrito.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.nombre}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{item.tipo}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>${item.precio}</span>
                  <button onClick={() => quitarItem(i)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>
                    ×
                  </button>
                </div>
              </div>
            ))
          )}

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total</span>
              <span style={{ color: 'var(--gold)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em' }}>${total.toFixed(2)}</span>
            </div>
            <button className="btn-primary" onClick={cobrar} style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', letterSpacing: '0.05em' }}>
              COBRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevaVenta;