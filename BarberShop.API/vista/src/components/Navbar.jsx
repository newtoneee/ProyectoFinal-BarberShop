import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: '📊 Dashboard' },
  { to: '/nueva-venta', label: '✂️ Nueva Venta' },
  { to: '/ventas', label: '🧾 Historial Ventas' },
  { to: '/reportes', label: '📈 Reportes' },
  { to: '/comisiones', label: '💰 Comisiones' },
  { to: '/productos', label: '📦 Inventario' },
  { to: '/servicios', label: '💈 Servicios' },
  { to: '/barberos', label: '👤 Barberos' },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      width: '240px',
      backgroundColor: '#1a1a1a',
      position: 'fixed',
      top: 0, left: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 0',
      borderRight: '1px solid #2a2a2a'
    }}>
      <div style={{ padding: '0 1.5rem 2rem' }}>
        <h2 style={{ color: '#f59e0b', margin: 0, fontSize: '1.3rem' }}>✂️ M&A</h2>
        <p style={{ color: '#666', margin: 0, fontSize: '0.8rem' }}>Barber Shop</p>
      </div>

      {links.map(link => (
        <Link
          key={link.to}
          to={link.to}
          style={{
            padding: '0.75rem 1.5rem',
            color: location.pathname === link.to ? '#f59e0b' : '#aaa',
            textDecoration: 'none',
            backgroundColor: location.pathname === link.to ? '#2a2a2a' : 'transparent',
            borderLeft: location.pathname === link.to ? '3px solid #f59e0b' : '3px solid transparent',
            fontSize: '0.9rem',
            transition: 'all 0.2s'
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
