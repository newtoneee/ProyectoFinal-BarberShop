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
          getVentasHoy(), getProductosBajoStock(), getBarberos()
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
    ingresos: ventasHoy.filter(v => v.barberoId === b.id).reduce((s, v) => s + v.total, 0)
  }));

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <p style={{ color: 'var(--text-muted)', letterSpacing: '0.1em', fontSize: '0.85rem' }}>CARGANDO...</p>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            {new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="stat-card" style={{ borderTop: '2px solid var(--gold)' }}>
          <p className="stat-label">Ingresos Hoy</p>
          <p className="stat-value stat-accent">${totalHoy.toFixed(2)}</p>
        </div>
        <div className="stat-card" style={{ borderTop: '2px solid #6aaed6' }}>
          <p className="stat-label">Ventas Realizadas</p>
          <p className="stat-value">{ventasHoy.length}</p>
        </div>
        <div className="stat-card" style={{ borderTop: '2px solid var(--danger-text)' }}>
          <p className="stat-label">Alertas de Stock</p>
          <p className="stat-value" style={{ color: bajoStock.length > 0 ? 'var(--danger-text)' : 'var(--text-primary)' }}>
            {bajoStock.length}
          </p>
        </div>
      </div>

      {/* Grafica */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Ingresos por Barbero — Hoy
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ventasPorBarbero} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
            <XAxis dataKey="nombre" stroke="#444" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '8px', fontSize: '0.85rem' }}
              cursor={{ fill: '#ffffff08' }}
            />
            <Bar dataKey="ingresos" fill="#c9a84c" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bajo stock */}
      {bajoStock.length > 0 && (
        <div className="card" style={{ borderLeft: '3px solid var(--danger-text)' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Productos con Stock Bajo
          </h3>
          {bajoStock.map(p => (
            <div key={p.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.75rem 0', borderBottom: '1px solid var(--border)'
            }}>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{p.nombre}</span>
              <span style={{ color: 'var(--danger-text)', fontSize: '0.85rem' }}>
                {p.stock} unidades — mínimo {p.stockMinimo}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;