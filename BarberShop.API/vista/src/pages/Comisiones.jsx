import { useState } from 'react';
import { getComisiones } from '../services/api';

const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function Comisiones() {
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [comisiones, setComisiones] = useState([]);
  const [buscado, setBuscado] = useState(false);

  const buscar = async () => {
    const res = await getComisiones(anio, mes);
    setComisiones(res.data);
    setBuscado(true);
  };

  const totalComisiones = comisiones.reduce((sum, c) => sum + c.comision, 0);
  const totalIngresos = comisiones.reduce((sum, c) => sum + c.totalIngresos, 0);

  return (
    <div>
      <div className="page-header">
        <h1>Comisiones</h1>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Año</label>
            <input type="number" value={anio} onChange={e => setAnio(e.target.value)} style={{ width: '100px' }} />
          </div>
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mes</label>
            <select value={mes} onChange={e => setMes(e.target.value)} style={{ width: 'auto' }}>
              {meses.map((m, i) => <option key={i+1} value={i+1}>{m}</option>)}
            </select>
          </div>
          <button className="btn-primary" onClick={buscar}>Calcular</button>
        </div>
      </div>

      {buscado && <>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ borderTop: '2px solid var(--success-text)' }}>
            <p className="stat-label">Total Ingresos del Mes</p>
            <p className="stat-value">${totalIngresos.toFixed(2)}</p>
          </div>
          <div className="stat-card" style={{ borderTop: '2px solid var(--gold)' }}>
            <p className="stat-label">Total a Pagar en Comisiones</p>
            <p className="stat-value stat-accent">${totalComisiones.toFixed(2)}</p>
          </div>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th>Barbero</th>
                <th>Ventas</th>
                <th>Total Generado</th>
                <th>Comisión</th>
                <th>A Cobrar</th>
              </tr>
            </thead>
            <tbody>
              {comisiones.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{c.barbero}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{c.totalVentas}</td>
                  <td>${c.totalIngresos.toFixed(2)}</td>
                  <td><span className="badge-blue">{c.porcentajeComision}%</span></td>
                  <td style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.05rem' }}>${c.comision.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {comisiones.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem', fontSize: '0.9rem' }}>
              Sin ventas en este período
            </p>
          )}
        </div>
      </>}
    </div>
  );
}

export default Comisiones;