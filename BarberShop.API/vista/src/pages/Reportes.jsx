import { useState } from 'react';
import { getReporteMensual, getReporteSemanal } from '../services/api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function Reportes() {
  const [modo, setModo] = useState('mensual');
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [reporte, setReporte] = useState(null);

  const buscar = async () => {
    const res = modo === 'mensual'
      ? await getReporteMensual(anio, mes)
      : await getReporteSemanal(inicio, fin);
    setReporte(res.data);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Reportes</h1>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tipo</label>
            <select value={modo} onChange={e => setModo(e.target.value)} style={{ width: 'auto' }}>
              <option value="mensual">Mensual</option>
              <option value="semanal">Semanal</option>
            </select>
          </div>
          {modo === 'mensual' ? <>
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
          </> : <>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Inicio</label>
              <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} style={{ width: 'auto' }} />
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fin</label>
              <input type="date" value={fin} onChange={e => setFin(e.target.value)} style={{ width: 'auto' }} />
            </div>
          </>}
          <button className="btn-primary" onClick={buscar}>Generar</button>
        </div>
      </div>

      {reporte && <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="stat-card" style={{ borderTop: '2px solid var(--gold)' }}>
            <p className="stat-label">Total Ingresos</p>
            <p className="stat-value stat-accent">${reporte.totalIngresos?.toFixed(2)}</p>
          </div>
          <div className="stat-card" style={{ borderTop: '2px solid #6aaed6' }}>
            <p className="stat-label">Total Ventas</p>
            <p className="stat-value">{reporte.totalVentas}</p>
          </div>
          <div className="stat-card" style={{ borderTop: '2px solid var(--success-text)' }}>
            <p className="stat-label">Promedio por Venta</p>
            <p className="stat-value">${(reporte.totalIngresos / reporte.totalVentas || 0).toFixed(2)}</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Ingresos por Día
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={reporte.porDia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
              <XAxis dataKey={modo === 'mensual' ? 'dia' : 'fecha'} stroke="#333" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#333" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '8px', fontSize: '0.85rem' }} cursor={{ stroke: '#c9a84c33' }} />
              <Line type="monotone" dataKey="totalIngresos" stroke="#c9a84c" strokeWidth={2} dot={{ fill: '#c9a84c', r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Ingresos por Barbero
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={reporte.porBarbero} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
              <XAxis dataKey="barbero" stroke="#333" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#333" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '8px', fontSize: '0.85rem' }} cursor={{ fill: '#ffffff05' }} />
              <Bar dataKey="totalIngresos" fill="#6aaed6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>}
    </div>
  );
}

export default Reportes;