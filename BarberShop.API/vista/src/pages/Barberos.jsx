import { useState, useEffect } from 'react';
import { getBarberos, createBarbero, updateBarbero, deleteBarbero } from '../services/api';

function Barberos() {
  const [barberos, setBarberos] = useState([]);
  const [form, setForm] = useState({ nombre: '', telefono: '', porcentajeComision: 50 });
  const [editando, setEditando] = useState(null);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const res = await getBarberos();
    setBarberos(res.data);
  };

  const guardar = async () => {
    if (editando) {
      await updateBarbero(editando.id, { ...form, id: editando.id, activo: true, fechaIngreso: editando.fechaIngreso });
    } else {
      await createBarbero({ ...form, activo: true, fechaIngreso: new Date() });
    }
    setForm({ nombre: '', telefono: '', porcentajeComision: 50 });
    setEditando(null);
    cargar();
  };

  const editar = (b) => {
    setEditando(b);
    setForm({ nombre: b.nombre, telefono: b.telefono, porcentajeComision: b.porcentajeComision });
  };

  const eliminar = async (id) => {
    if (confirm('¿Eliminar barbero?')) {
      await deleteBarbero(id);
      cargar();
    }
  };

  return (
    <div>
      <h1 style={{ color: '#f59e0b', marginBottom: '2rem' }}>👤 Barberos</h1>

      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>{editando ? 'Editar Barbero' : 'Nuevo Barbero'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Nombre</label>
            <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })}
              style={inputStyle} placeholder="Nombre completo" />
          </div>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Teléfono</label>
            <input value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })}
              style={inputStyle} placeholder="6621234567" />
          </div>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Comisión %</label>
            <input type="number" value={form.porcentajeComision} onChange={e => setForm({ ...form, porcentajeComision: parseFloat(e.target.value) })}
              style={inputStyle} />
          </div>
          <button onClick={guardar} style={btnStyle}>
            {editando ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#2a2a2a' }}>
              {['Nombre', 'Teléfono', 'Comisión', 'Acciones'].map(h => (
                <th key={h} style={{ padding: '1rem', color: '#aaa', textAlign: 'left', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {barberos.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid #2a2a2a' }}>
                <td style={{ padding: '1rem', color: '#fff' }}>{b.nombre}</td>
                <td style={{ padding: '1rem', color: '#aaa' }}>{b.telefono}</td>
                <td style={{ padding: '1rem', color: '#10b981' }}>{b.porcentajeComision}%</td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => editar(b)} style={{ ...btnStyle, backgroundColor: '#3b82f6', padding: '0.4rem 0.8rem' }}>Editar</button>
                  <button onClick={() => eliminar(b.id)} style={{ ...btnStyle, backgroundColor: '#ef4444', padding: '0.4rem 0.8rem' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '0.6rem', backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', borderRadius: '8px', color: '#fff', marginTop: '0.3rem' };
const btnStyle = { padding: '0.6rem 1.2rem', backgroundColor: '#f59e0b', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 };

export default Barberos;