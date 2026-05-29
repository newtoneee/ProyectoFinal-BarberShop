import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Ventas from './pages/Ventas';
import NuevaVenta from './pages/NuevaVenta';
import Servicios from './pages/Servicios';
import Productos from './pages/Productos';
import Barberos from './pages/Barberos';
import Reportes from './pages/Reportes';
import Comisiones from './pages/Comisiones';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f0f0f' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '2rem', marginLeft: '240px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/nueva-venta" element={<NuevaVenta />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/barberos" element={<Barberos />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/comisiones" element={<Comisiones />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;