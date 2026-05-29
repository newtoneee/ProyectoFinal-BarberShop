import { useState, useEffect } from 'react';
import { getVentasHoy, getProductosBajoStock, getBarberos } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [ventasHoy, setVentasHoy] = useState([]);
  const [bajoStock, setBajoStock] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [vH, bS, barb] = await Promise.all([
          getVentasHoy(),
          getProductosBajoStock(),
          getBarberos()
        ]);
        setVentasHoy(vH.data);
        setBajoStock(bS.data);
        setBarberos(barb.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const totalHoy = ventasHoy.reduce((sum, v) => sum + v.total, 0);

  const ventasPorBarbero = barberos.map(b => ({
    nombre: b.nombre.split(' ')[0],
    ventas: ventasHoy.filter(v => v.barberoId === b.id).reduce((s, v) => s + v.total, 0)
  }));

  if (loading) return <p style={{ color: '#aaa' }}>Cargando...</p>;

  return (
    <div>
      <h1 style={{ color: '#f59e0b', marginBottom: '2rem' }}>📊 Dashboard</h1>

      {/* Tarjetas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <Tarjeta titulo="💰 Ingresos Hoy" valor={`$${totalHoy.toFixed(2)}`} color="#10b981" />
        <Tarjeta titulo="🧾 Ventas Hoy" valor={ventasHoy.length} color="#3b82f6" />
        <Tarjeta titulo="⚠️ Bajo Stock" valor={bajoStock.length} color="#ef4444" />
      </div>

      {/* Gráfica */}
      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Ventas por Barbero Hoy</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ventasPorBarbero}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="nombre" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }} />
            <Bar dataKey="ventas" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Alertas bajo stock */}
      {bajoStock.length > 0 && (
        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>⚠️ Productos con Bajo Stock</h3>
          {bajoStock.map(p => (
            <div key={p.id} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '0.75rem', backgroundColor: '#2a1a1a',
              borderRadius: '8px', marginBottom: '0.5rem'
            }}>
              <span style={{ color: '#fff' }}>{p.nombre}</span>
              <span style={{ color: '#ef4444' }}>Stock: {p.stock} / Mínimo: {p.stockMinimo}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Tarjeta({ titulo, valor, color }) {
  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      borderRadius: '12px',
      padding: '1.5rem',
      borderLeft: `4px solid ${color}`
    }}>
      <p style={{ color: '#aaa', margin: 0, fontSize: '0.9rem' }}>{titulo}</p>
      <h2 style={{ color: '#fff', margin: '0.5rem 0 0', fontSize: '2rem' }}>{valor}</h2>
    </div>
  );
}

export default Dashboard;
