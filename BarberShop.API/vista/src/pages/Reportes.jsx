import { useState } from 'react';
import { getReporteMensual, getReporteSemanal } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

function Reportes() {
  const [modo, setModo] = useState('mensual');
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  const [reporte, setReporte] = useState(null);

  const buscar = async () => {
    if (modo === 'mensual') {
      const res = await getReporteMensual(anio, mes);
      setReporte(res.data);
    } else {
      const res = await getReporteSemanal(inicio, fin);
      setReporte(res.data);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#f59e0b', marginBottom: '2rem' }}>📈 Reportes</h1>

      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Tipo</label>
            <select value={modo} onChange={e => setModo(e.target.value)} style={inputStyle}>
              <option value="mensual">Mensual</option>
              <option value="semanal">Semanal</option>
            </select>
          </div>
          {modo === 'mensual' ? <>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Año</label>
              <input type="number" value={anio} onChange={e => setAnio(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Mes</label>
              <select value={mes} onChange={e => setMes(e.target.value)} style={inputStyle}>
                {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map((m, i) => (
                  <option key={i+1} value={i+1}>{m}</option>
                ))}
              </select>
            </div>
          </> : <>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Inicio</label>
              <input type="date" value={inicio} onChange={e => setInicio(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Fin</label>
              <input type="date" value={fin} onChange={e => setFin(e.target.value)} style={inputStyle} />
            </div>
          </>}
          <button onClick={buscar} style={btnStyle}>Generar Reporte</button>
        </div>
      </div>

      {reporte && <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <Tarjeta titulo="Total Ventas" valor={reporte.totalVentas} color="#3b82f6" />
          <Tarjeta titulo="Total Ingresos" valor={`$${reporte.totalIngresos?.toFixed(2)}`} color="#10b981" />
          <Tarjeta titulo="Promedio por Venta" valor={`$${(reporte.totalIngresos / reporte.totalVentas || 0).toFixed(2)}`} color="#f59e0b" />
        </div>

        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Ingresos por Día</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={reporte.porDia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey={modo === 'mensual' ? 'dia' : 'fecha'} stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }} />
              <Line type="monotone" dataKey="totalIngresos" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Ingresos por Barbero</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={reporte.porBarbero}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="barbero" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }} />
              <Bar dataKey="totalIngresos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>}
    </div>
  );
}

function Tarjeta({ titulo, valor, color }) {
  return (
    <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', borderLeft: `4px solid ${color}` }}>
      <p style={{ color: '#aaa', margin: 0, fontSize: '0.9rem' }}>{titulo}</p>
      <h2 style={{ color: '#fff', margin: '0.5rem 0 0', fontSize: '1.8rem' }}>{valor}</h2>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '0.6rem', backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', borderRadius: '8px', color: '#fff', marginTop: '0.3rem' };
const btnStyle = { padding: '0.6rem 1.2rem', backgroundColor: '#f59e0b', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 };

export default Reportes;