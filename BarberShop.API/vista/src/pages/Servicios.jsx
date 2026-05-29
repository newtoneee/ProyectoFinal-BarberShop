import { useState, useEffect } from 'react';
import { getServicios, getCategorias, createServicio, updateServicio, deleteServicio } from '../services/api';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', duracionMinutos: 30, categoriaId: '' });
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

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
    setMostrarForm(false);
    cargar();
  };

  const editar = (s) => {
    setEditando(s);
    setForm({ nombre: s.nombre, precio: s.precio, duracionMinutos: s.duracionMinutos, categoriaId: s.categoriaId });
    setMostrarForm(true);
  };

  const eliminar = async (id) => {
    if (confirm('¿Eliminar este servicio?')) { await deleteServicio(id); cargar(); }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Servicios</h1>
        <button className="btn-primary" onClick={() => { setMostrarForm(!mostrarForm); setEditando(null); }}>
          {mostrarForm ? 'Cancelar' : '+ Agregar Servicio'}
        </button>
      </div>

      {mostrarForm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {editando ? 'Editar Servicio' : 'Nuevo Servicio'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Nombre</label>
              <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre del servicio" />
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Precio $</label>
              <input type="number" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} />
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Duración (min)</label>
              <input type="number" value={form.duracionMinutos} onChange={e => setForm({ ...form, duracionMinutos: e.target.value })} />
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Categoría</label>
              <select value={form.categoriaId} onChange={e => setForm({ ...form, categoriaId: e.target.value })}>
                {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
            <button className="btn-primary" onClick={guardar} style={{ marginTop: '0.3rem' }}>
              {editando ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Duración</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 500 }}>{s.nombre}</td>
                <td style={{ color: 'var(--gold)' }}>${s.precio}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{s.duracionMinutos} min</td>
                <td>
                  <span className="badge-blue">{s.categoria?.nombre}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" onClick={() => editar(s)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                    <button className="btn-danger" onClick={() => eliminar(s.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Servicios;