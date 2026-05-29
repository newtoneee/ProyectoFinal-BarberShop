import { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/api';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '', stockMinimo: 5 });
  const [editando, setEditando] = useState(null);

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
    cargar();
  };

  const editar = (p) => {
    setEditando(p);
    setForm({ nombre: p.nombre, precio: p.precio, stock: p.stock, stockMinimo: p.stockMinimo });
  };

  const eliminar = async (id) => {
    if (confirm('¿Eliminar producto?')) { await deleteProducto(id); cargar(); }
  };

  return (
    <div>
      <h1 style={{ color: '#f59e0b', marginBottom: '2rem' }}>📦 Inventario</h1>

      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>{editando ? 'Editar Producto' : 'Nuevo Producto'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Nombre</label>
            <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} style={inputStyle} placeholder="Nombre del producto" />
          </div>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Precio $</label>
            <input type="number" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Stock</label>
            <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Stock Mínimo</label>
            <input type="number" value={form.stockMinimo} onChange={e => setForm({ ...form, stockMinimo: e.target.value })} style={inputStyle} />
          </div>
          <button onClick={guardar} style={btnStyle}>{editando ? 'Actualizar' : 'Agregar'}</button>
        </div>
      </div>

      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#2a2a2a' }}>
              {['Nombre', 'Precio', 'Stock', 'Stock Mínimo', 'Estado', 'Acciones'].map(h => (
                <th key={h} style={{ padding: '1rem', color: '#aaa', textAlign: 'left', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #2a2a2a' }}>
                <td style={{ padding: '1rem', color: '#fff' }}>{p.nombre}</td>
                <td style={{ padding: '1rem', color: '#10b981' }}>${p.precio}</td>
                <td style={{ padding: '1rem', color: '#fff' }}>{p.stock}</td>
                <td style={{ padding: '1rem', color: '#aaa' }}>{p.stockMinimo}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ backgroundColor: p.stock <= p.stockMinimo ? '#ef444433' : '#10b98133', color: p.stock <= p.stockMinimo ? '#ef4444' : '#10b981', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.8rem' }}>
                    {p.stock <= p.stockMinimo ? '⚠️ Bajo Stock' : '✅ OK'}
                  </span>
                </td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => editar(p)} style={{ ...btnStyle, backgroundColor: '#3b82f6', padding: '0.4rem 0.8rem' }}>Editar</button>
                  <button onClick={() => eliminar(p.id)} style={{ ...btnStyle, backgroundColor: '#ef4444', padding: '0.4rem 0.8rem' }}>Eliminar</button>
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

export default Productos;