using BarberShop.API.Data;
using BarberShop.API.Dtos;
using BarberShop.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BarberShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentasController : ControllerBase
    {
        private readonly BarberShopContext _context;

        public VentasController(BarberShopContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venta>>> GetVentas()
        {
            return await _context.Ventas
                .Include(v => v.Barbero)
                .Include(v => v.Detalles)
                    .ThenInclude(d => d.Servicio)
                .Include(v => v.Detalles)
                    .ThenInclude(d => d.Producto)
                .OrderByDescending(v => v.Fecha)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Venta>> GetVenta(int id)
        {
            var venta = await _context.Ventas
                .Include(v => v.Barbero)
                .Include(v => v.Detalles)
                    .ThenInclude(d => d.Servicio)
                .Include(v => v.Detalles)
                    .ThenInclude(d => d.Producto)
                .FirstOrDefaultAsync(v => v.Id == id);
            if (venta == null) return NotFound();
            return venta;
        }

        [HttpGet("hoy")]
        public async Task<ActionResult<IEnumerable<Venta>>> GetVentasHoy()
        {
            var hoy = DateTime.Today;
            return await _context.Ventas
                .Include(v => v.Barbero)
                .Include(v => v.Detalles)
                    .ThenInclude(d => d.Servicio)
                .Include(v => v.Detalles)
                    .ThenInclude(d => d.Producto)
                .Where(v => v.Fecha.Date == hoy)
                .OrderByDescending(v => v.Fecha)
                .ToListAsync();
        }

        [HttpGet("rango")]
        public async Task<ActionResult<IEnumerable<Venta>>> GetVentasPorRango(
            [FromQuery] DateTime inicio, [FromQuery] DateTime fin)
        {
            return await _context.Ventas
                .Include(v => v.Barbero)
                .Include(v => v.Detalles)
                    .ThenInclude(d => d.Servicio)
                .Include(v => v.Detalles)
                    .ThenInclude(d => d.Producto)
                .Where(v => v.Fecha.Date >= inicio.Date && v.Fecha.Date <= fin.Date)
                .OrderByDescending(v => v.Fecha)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Venta>> PostVenta(CrearVentaDto dto)
        {
            var venta = new Venta
            {
                BarberoId = dto.BarberoId,
                MetodoPago = dto.MetodoPago,
                NombreCliente = dto.NombreCliente,
                Notas = dto.Notas,
                Fecha = DateTime.Now,
                Detalles = new List<DetalleVenta>()
            };

            decimal total = 0;

            foreach (var detalleDto in dto.Detalles)
            {
                decimal precioUnitario = 0;

                if (detalleDto.ServicioId.HasValue)
                {
                    var servicio = await _context.Servicios.FindAsync(detalleDto.ServicioId.Value);
                    if (servicio == null) return BadRequest($"Servicio {detalleDto.ServicioId} no encontrado");
                    precioUnitario = servicio.Precio;

                    venta.Detalles.Add(new DetalleVenta
                    {
                        ServicioId = servicio.Id,
                        Cantidad = detalleDto.Cantidad,
                        PrecioUnitario = precioUnitario,
                        Subtotal = precioUnitario * detalleDto.Cantidad
                    });
                }
                else if (detalleDto.ProductoId.HasValue)
                {
                    var producto = await _context.Productos.FindAsync(detalleDto.ProductoId.Value);
                    if (producto == null) return BadRequest($"Producto {detalleDto.ProductoId} no encontrado");
                    if (producto.Stock < detalleDto.Cantidad)
                        return BadRequest($"Stock insuficiente para {producto.Nombre}");

                    precioUnitario = producto.Precio;
                    producto.Stock -= detalleDto.Cantidad;

                    venta.Detalles.Add(new DetalleVenta
                    {
                        ProductoId = producto.Id,
                        Cantidad = detalleDto.Cantidad,
                        PrecioUnitario = precioUnitario,
                        Subtotal = precioUnitario * detalleDto.Cantidad
                    });
                }

                total += precioUnitario * detalleDto.Cantidad;
            }

            venta.Total = total;
            _context.Ventas.Add(venta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVenta), new { id = venta.Id }, venta);
        }
    }
}
