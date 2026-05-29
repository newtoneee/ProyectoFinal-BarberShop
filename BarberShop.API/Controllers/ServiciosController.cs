using BarberShop.API.Data;
using BarberShop.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BarberShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiciosController : ControllerBase
    {
        private readonly BarberShopContext _context;

        public ServiciosController(BarberShopContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Servicio>>> GetServicios()
        {
            return await _context.Servicios
                .Include(s => s.Categoria)
                .Where(s => s.Activo)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Servicio>> GetServicio(int id)
        {
            var servicio = await _context.Servicios
                .Include(s => s.Categoria)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (servicio == null) return NotFound();
            return servicio;
        }

        [HttpGet("por-categoria/{categoriaId}")]
        public async Task<ActionResult<IEnumerable<Servicio>>> GetPorCategoria(int categoriaId)
        {
            return await _context.Servicios
                .Include(s => s.Categoria)
                .Where(s => s.CategoriaId == categoriaId && s.Activo)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Servicio>> PostServicio(Servicio servicio)
        {
            _context.Servicios.Add(servicio);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetServicio), new { id = servicio.Id }, servicio);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutServicio(int id, Servicio servicio)
        {
            if (id != servicio.Id) return BadRequest();
            _context.Entry(servicio).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServicio(int id)
        {
            var servicio = await _context.Servicios.FindAsync(id);
            if (servicio == null) return NotFound();
            servicio.Activo = false;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
