import { useState, useEffect } from 'react';
import { getVentas } from '../services/api';
import { Link } from 'react-router-dom';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const res = await getVentas();
    setVentas(res.data);
  };

  const ventasFiltradas = ventas.filter(v =>
    v.barbero?.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    v.nombreCliente?.toLowerCase().includes(filtro.toLowerCase()) ||
    v.metodoPago.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#f59e0b', margin: 0 }}>🧾 Historial de Ventas</h1>
        <Link to="/nueva-venta" style={{ ...btnStyle, textDecoration: 'none' }}>+ Nueva Venta</Link>
      </div>

      <input value={filtro} onChange={e => setFiltro(e.target.value)}
        placeholder="Buscar por barbero, cliente o método de pago..."
        style={{ ...inputStyle, marginBottom: '1.5rem', width: '100%' }} />

      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#2a2a2a' }}>
              {['#', 'Fecha', 'Cliente', 'Barbero', 'Método Pago', 'Total'].map(h => (
                <th key={h} style={{ padding: '1rem', color: '#aaa', textAlign: 'left', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ventasFiltradas.map(v => (
              <tr key={v.id} style={{ borderBottom: '1px solid #2a2a2a' }}>
                <td style={{ padding: '1rem', color: '#666' }}>#{v.id}</td>
                <td style={{ padding: '1rem', color: '#aaa' }}>{new Date(v.fecha).toLocaleDateString('es-MX')}</td>
                <td style={{ padding: '1rem', color: '#fff' }}>{v.nombreCliente || 'Sin nombre'}</td>
                <td style={{ padding: '1rem', color: '#fff' }}>{v.barbero?.nombre}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ backgroundColor: '#2a2a2a', padding: '0.2rem 0.6rem', borderRadius: '999px', color: '#aaa', fontSize: '0.8rem' }}>
                    {v.metodoPago}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: '#10b981', fontWeight: 600 }}>${v.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {ventasFiltradas.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No hay ventas registradas</p>
        )}
      </div>
    </div>
  );
}

const inputStyle = { padding: '0.6rem 1rem', backgroundColor: '#1a1a1a', border: '1px solid #3a3a3a', borderRadius: '8px', color: '#fff' };
const btnStyle = { padding: '0.6rem 1.2rem', backgroundColor: '#f59e0b', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 };

export default Ventas;