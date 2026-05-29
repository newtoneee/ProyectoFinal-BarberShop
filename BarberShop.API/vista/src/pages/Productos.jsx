import { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/api';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '', stockMinimo: 5 });
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };

  const guardar = async () => {
    const datos = { ...form, precio: parseFloat(form.precio), stock: parseInt(form.stock), stockMinimo: parseInt(form.stockMinimo), activo: true };
    if (editando) await updateProducto(editando.id, { ...datos, id: editando.id });
    else await createProducto(datos);
    setForm({ nombre: '', precio: '', stock: '', stockMinimo: 5 });
    setEditando(null);
    setMostrarForm(false);
    cargar();
  };

  const editar = (p) => {
    setEditando(p);
    setForm({ nombre: p.nombre, precio: p.precio, stock: p.stock, stockMinimo: p.stockMinimo });
    setMostrarForm(true);
  };

  const eliminar = async (id) => {
    if (confirm('¿Eliminar este producto?')) { await deleteProducto(id); cargar(); }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Inventario</h1>
        <button className="btn-primary" onClick={() => { setMostrarForm(!mostrarForm); setEditando(null); }}>
          {mostrarForm ? 'Cancelar' : '+ Agregar Producto'}
        </button>
      </div>

      {mostrarForm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {editando ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Nombre</label>
              <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre del producto" />
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Precio $</label>
              <input type="number" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} />
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stock</label>
              <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stock Mínimo</label>
              <input type="number" value={form.stockMinimo} onChange={e => setForm({ ...form, stockMinimo: e.target.value })} />
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
              <th>Stock</th>
              <th>Mínimo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 500 }}>{p.nombre}</td>
                <td style={{ color: 'var(--gold)' }}>${p.precio}</td>
                <td>{p.stock}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{p.stockMinimo}</td>
                <td>
                  {p.stock <= p.stockMinimo
                    ? <span className="badge-danger">Stock Bajo</span>
                    : <span className="badge-success">OK</span>
                  }
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" onClick={() => editar(p)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Editar</button>
                    <button className="btn-danger" onClick={() => eliminar(p.id)}>Eliminar</button>
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

export default Productos;