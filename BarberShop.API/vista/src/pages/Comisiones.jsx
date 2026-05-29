import { useState } from 'react';
import { getComisiones } from '../services/api';

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
      <h1 style={{ color: '#f59e0b', marginBottom: '2rem' }}>💰 Comisiones</h1>

      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
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
          <button onClick={buscar} style={btnStyle}>Calcular Comisiones</button>
        </div>
      </div>

      {buscado && <>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
            <p style={{ color: '#aaa', margin: 0 }}>Total Ingresos del Mes</p>
            <h2 style={{ color: '#fff', margin: '0.5rem 0 0' }}>${totalIngresos.toFixed(2)}</h2>
          </div>
          <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', borderLeft: '4px solid #f59e0b' }}>
            <p style={{ color: '#aaa', margin: 0 }}>Total a Pagar en Comisiones</p>
            <h2 style={{ color: '#fff', margin: '0.5rem 0 0' }}>${totalComisiones.toFixed(2)}</h2>
          </div>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#2a2a2a' }}>
                {['Barbero', 'Ventas', 'Total Generado', 'Comisión %', 'A Cobrar'].map(h => (
                  <th key={h} style={{ padding: '1rem', color: '#aaa', textAlign: 'left', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comisiones.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #2a2a2a' }}>
                  <td style={{ padding: '1rem', color: '#fff', fontWeight: 600 }}>{c.barbero}</td>
                  <td style={{ padding: '1rem', color: '#aaa' }}>{c.totalVentas}</td>
                  <td style={{ padding: '1rem', color: '#fff' }}>${c.totalIngresos.toFixed(2)}</td>
                  <td style={{ padding: '1rem', color: '#3b82f6' }}>{c.porcentajeComision}%</td>
                  <td style={{ padding: '1rem', color: '#f59e0b', fontWeight: 700, fontSize: '1.1rem' }}>${c.comision.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {comisiones.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No hay ventas en este período</p>
          )}
        </div>
      </>}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '0.6rem', backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', borderRadius: '8px', color: '#fff', marginTop: '0.3rem' };
const btnStyle = { padding: '0.6rem 1.2rem', backgroundColor: '#f59e0b', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 };

export default Comisiones;