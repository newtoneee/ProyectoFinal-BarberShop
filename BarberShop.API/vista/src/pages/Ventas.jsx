import { useState, useEffect } from 'react';
import { getVentas } from '../services/api';
import { Link } from 'react-router-dom';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    getVentas().then(res => setVentas(res.data));
  }, []);

  const ventasFiltradas = ventas.filter(v =>
    v.barbero?.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    v.nombreCliente?.toLowerCase().includes(filtro.toLowerCase()) ||
    v.metodoPago.toLowerCase().includes(filtro.toLowerCase())
  );

  const total = ventasFiltradas.reduce((sum, v) => sum + v.total, 0);

  return (
    <div>
      <div className="page-header">
        <h1>Historial de Ventas</h1>
        <Link to="/nueva-venta" className="btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.9rem' }}>
          + Nueva Venta
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
        <input
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          placeholder="Buscar por barbero, cliente o método de pago..."
          style={{ maxWidth: '400px' }}
        />
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
          {ventasFiltradas.length} ventas — <span style={{ color: 'var(--gold)' }}>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Barbero</th>
              <th>Método</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {ventasFiltradas.map(v => (
              <tr key={v.id}>
                <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{v.id}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{new Date(v.fecha).toLocaleDateString('es-MX')}</td>
                <td>{v.nombreCliente || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                <td style={{ fontWeight: 500 }}>{v.barbero?.nombre}</td>
                <td><span className="badge-blue">{v.metodoPago}</span></td>
                <td style={{ color: 'var(--gold)', fontWeight: 600 }}>${v.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {ventasFiltradas.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem', fontSize: '0.9rem' }}>
            No hay ventas registradas
          </p>
        )}
      </div>
    </div>
  );
}

export default Ventas;