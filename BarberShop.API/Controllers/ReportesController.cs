using BarberShop.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BarberShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportesController : ControllerBase
    {
        private readonly BarberShopContext _context;

        public ReportesController(BarberShopContext context)
        {
            _context = context;
        }

        [HttpGet("diario/{fecha}")]
        public async Task<IActionResult> GetReporteDiario(DateTime fecha)
        {
            var ventas = await _context.Ventas
                .Include(v => v.Barbero)
                .Include(v => v.Detalles).ThenInclude(d => d.Servicio)
                .Include(v => v.Detalles).ThenInclude(d => d.Producto)
                .Where(v => v.Fecha.Date == fecha.Date)
                .ToListAsync();

            var reporte = new
            {
                Fecha = fecha.Date,
                TotalVentas = ventas.Count,
                TotalIngresos = ventas.Sum(v => v.Total),
                PorMetodoPago = ventas.GroupBy(v => v.MetodoPago).Select(g => new
                {
                    Metodo = g.Key,
                    Total = g.Sum(v => v.Total),
                    Cantidad = g.Count()
                }),
                PorBarbero = ventas.GroupBy(v => v.Barbero.Nombre).Select(g => new
                {
                    Barbero = g.Key,
                    TotalVentas = g.Count(),
                    TotalIngresos = g.Sum(v => v.Total)
                }),
                Ventas = ventas.Select(v => new
                {
                    v.Id,
                    v.Fecha,
                    v.NombreCliente,
                    v.MetodoPago,
                    v.Total,
                    Barbero = v.Barbero.Nombre
                })
            };

            return Ok(reporte);
        }

        [HttpGet("mensual/{anio}/{mes}")]
        public async Task<IActionResult> GetReporteMensual(int anio, int mes)
        {
            var ventas = await _context.Ventas
                .Include(v => v.Barbero)
                .Include(v => v.Detalles).ThenInclude(d => d.Servicio)
                .Include(v => v.Detalles).ThenInclude(d => d.Producto)
                .Where(v => v.Fecha.Year == anio && v.Fecha.Month == mes)
                .ToListAsync();

            var reporte = new
            {
                Anio = anio,
                Mes = mes,
                TotalVentas = ventas.Count,
                TotalIngresos = ventas.Sum(v => v.Total),
                PorDia = ventas.GroupBy(v => v.Fecha.Day).Select(g => new
                {
                    Dia = g.Key,
                    TotalIngresos = g.Sum(v => v.Total),
                    TotalVentas = g.Count()
                }).OrderBy(x => x.Dia),
                PorBarbero = ventas.GroupBy(v => v.Barbero.Nombre).Select(g => new
                {
                    Barbero = g.Key,
                    TotalVentas = g.Count(),
                    TotalIngresos = g.Sum(v => v.Total)
                })
            };

            return Ok(reporte);
        }

        [HttpGet("comisiones/{anio}/{mes}")]
        public async Task<IActionResult> GetComisiones(int anio, int mes)
        {
            var ventas = await _context.Ventas
                .Include(v => v.Barbero)
                .Where(v => v.Fecha.Year == anio && v.Fecha.Month == mes)
                .ToListAsync();

            var comisiones = ventas
                .GroupBy(v => v.Barbero)
                .Select(g => new
                {
                    BarberoId = g.Key.Id,
                    Barbero = g.Key.Nombre,
                    TotalVentas = g.Count(),
                    TotalIngresos = g.Sum(v => v.Total),
                    PorcentajeComision = g.Key.PorcentajeComision,
                    Comision = g.Sum(v => v.Total) * g.Key.PorcentajeComision / 100
                });

            return Ok(comisiones);
        }

        [HttpGet("semanal")]
        public async Task<IActionResult> GetReporteSemanal(
            [FromQuery] DateTime inicio, [FromQuery] DateTime fin)
        {
            var ventas = await _context.Ventas
                .Include(v => v.Barbero)
                .Include(v => v.Detalles).ThenInclude(d => d.Servicio)
                .Include(v => v.Detalles).ThenInclude(d => d.Producto)
                .Where(v => v.Fecha.Date >= inicio.Date && v.Fecha.Date <= fin.Date)
                .ToListAsync();

            var reporte = new
            {
                Inicio = inicio.Date,
                Fin = fin.Date,
                TotalVentas = ventas.Count,
                TotalIngresos = ventas.Sum(v => v.Total),
                PorDia = ventas.GroupBy(v => v.Fecha.Date).Select(g => new
                {
                    Fecha = g.Key,
                    TotalIngresos = g.Sum(v => v.Total),
                    TotalVentas = g.Count()
                }).OrderBy(x => x.Fecha),
                PorBarbero = ventas.GroupBy(v => v.Barbero.Nombre).Select(g => new
                {
                    Barbero = g.Key,
                    TotalVentas = g.Count(),
                    TotalIngresos = g.Sum(v => v.Total)
                })
            };

            return Ok(reporte);
        }
    }
}