import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/nueva-venta', label: 'Nueva Venta' },
  { to: '/ventas', label: 'Historial' },
  { to: '/reportes', label: 'Reportes' },
  { to: '/comisiones', label: 'Comisiones' },
  { to: '/productos', label: 'Inventario' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/barberos', label: 'Barberos' },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      width: '220px',
      backgroundColor: '#0f0f0f',
      position: 'fixed',
      top: 0, left: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #1a1a1a',
      zIndex: 100
    }}>
      {/* Logo */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src="/logo.jpg"
          alt="M&A Barber Shop"
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            filter: 'brightness(1.1)'
          }}
        />
      </div>

      {/* Links */}
      <div style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
        {links.map(link => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: 'block',
                padding: '0.7rem 1.5rem',
                color: active ? '#c9a84c' : '#666',
                textDecoration: 'none',
                backgroundColor: active ? '#161616' : 'transparent',
                borderLeft: active ? '2px solid #c9a84c' : '2px solid transparent',
                fontSize: '0.875rem',
                fontWeight: active ? '600' : '400',
                letterSpacing: '0.01em',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.color = '#c9a84c';
                  e.currentTarget.style.backgroundColor = '#111';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.color = '#666';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid #1a1a1a',
        color: '#333',
        fontSize: '0.75rem',
        textAlign: 'center'
      }}>
        M&A Barber Shop © 2026
      </div>
    </nav>
  );
}

export default Navbar;