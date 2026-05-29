import { useState, useEffect } from 'react';
import { getServicios, getCategorias, createServicio, updateServicio, deleteServicio } from '../services/api';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', duracionMinutos: 30, categoriaId: '' });
  const [editando, setEditando] = useState(null);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const [s, c] = await Promise.all([getServicios(), getCategorias()]);
    setServicios(s.data);
    setCategorias(c.data);
    if (c.data.length > 0) setForm(f => ({ ...f, categoriaId: c.data[0].id }));
  };

  const guardar = async () => {
    const datos = { ...form, precio: parseFloat(form.precio), duracionMinutos: parseInt(form.duracionMinutos), categoriaId: parseInt(form.categoriaId), activo: true };
    if (editando) await updateServicio(editando.id, { ...datos, id: editando.id });
    else await createServicio(datos);
    setForm({ nombre: '', precio: '', duracionMinutos: 30, categoriaId: categorias[0]?.id || '' });
    setEditando(null);
    cargar();
  };

  const editar = (s) => {
    setEditando(s);
    setForm({ nombre: s.nombre, precio: s.precio, duracionMinutos: s.duracionMinutos, categoriaId: s.categoriaId });
  };

  const eliminar = async (id) => {
    if (confirm('¿Eliminar servicio?')) { await deleteServicio(id); cargar(); }
  };

  return (
    <div>
      <h1 style={{ color: '#f59e0b', marginBottom: '2rem' }}>💈 Servicios</h1>

      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>{editando ? 'Editar Servicio' : 'Nuevo Servicio'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Nombre</label>
            <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} style={inputStyle} placeholder="Nombre del servicio" />
          </div>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Precio $</label>
            <input type="number" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Duración (min)</label>
            <input type="number" value={form.duracionMinutos} onChange={e => setForm({ ...form, duracionMinutos: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Categoría</label>
            <select value={form.categoriaId} onChange={e => setForm({ ...form, categoriaId: e.target.value })} style={inputStyle}>
              {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <button onClick={guardar} style={btnStyle}>{editando ? 'Actualizar' : 'Agregar'}</button>
        </div>
      </div>

      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#2a2a2a' }}>
              {['Nombre', 'Precio', 'Duración', 'Categoría', 'Acciones'].map(h => (
                <th key={h} style={{ padding: '1rem', color: '#aaa', textAlign: 'left', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {servicios.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #2a2a2a' }}>
                <td style={{ padding: '1rem', color: '#fff' }}>{s.nombre}</td>
                <td style={{ padding: '1rem', color: '#10b981' }}>${s.precio}</td>
                <td style={{ padding: '1rem', color: '#aaa' }}>{s.duracionMinutos} min</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ backgroundColor: s.categoria?.color || '#333', padding: '0.2rem 0.6rem', borderRadius: '999px', color: '#fff', fontSize: '0.8rem' }}>
                    {s.categoria?.nombre}
                  </span>
                </td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => editar(s)} style={{ ...btnStyle, backgroundColor: '#3b82f6', padding: '0.4rem 0.8rem' }}>Editar</button>
                  <button onClick={() => eliminar(s.id)} style={{ ...btnStyle, backgroundColor: '#ef4444', padding: '0.4rem 0.8rem' }}>Eliminar</button>
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

export default Servicios;