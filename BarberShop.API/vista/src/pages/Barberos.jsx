import { useState, useEffect } from 'react';
import { getBarberos, createBarbero, updateBarbero, deleteBarbero } from '../services/api';

function Barberos() {
  const [barberos, setBarberos] = useState([]);
  const [form, setForm] = useState({ nombre: '', telefono: '', porcentajeComision: 50 });
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

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
    setMostrarForm(false);
    cargar();
  };

  const editar = (b) => {
    setEditando(b);
    setForm({ nombre: b.nombre, telefono: b.telefono, porcentajeComision: b.porcentajeComision });
    setMostrarForm(true);
  };

  const eliminar = async (id) => {
    if (confirm('¿Eliminar este barbero?')) { await deleteBarbero(id); cargar(); }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Barberos</h1>
        <button className="btn-primary" onClick={() => { setMostrarForm(!mostrarForm); setEditando(null); setForm({ nombre: '', telefono: '', porcentajeComision: 50 }); }}>
          {mostrarForm ? 'Cancelar' : '+ Agregar Barbero'}
        </button>
      </div>

      {mostrarForm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {editando ? 'Editar Barbero' : 'Nuevo Barbero'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Nombre</label>
              <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre completo" />
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Teléfono</label>
              <input value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} placeholder="6621234567" />
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Comisión %</label>
              <input type="number" value={form.porcentajeComision} onChange={e => setForm({ ...form, porcentajeComision: parseFloat(e.target.value) })} />
            </div>
            <button className="btn-primary" onClick={guardar} style={{ marginTop: '0.3rem', whiteSpace: 'nowrap' }}>
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
              <th>Teléfono</th>
              <th>Comisión</th>
              <th>Ingreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {barberos.map(b => (
              <tr key={b.id}>
                <td style={{ fontWeight: 500 }}>{b.nombre}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{b.telefono}</td>
                <td><span className="badge-blue">{b.porcentajeComision}%</span></td>
                <td style={{ color: 'var(--text-secondary)' }}>{new Date(b.fechaIngreso).toLocaleDateString('es-MX')}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" onClick={() => editar(b)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                    <button className="btn-danger" onClick={() => eliminar(b.id)}>Eliminar</button>
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

export default Barberos;