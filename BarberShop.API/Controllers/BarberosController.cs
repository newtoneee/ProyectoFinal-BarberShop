using BarberShop.API.Data;
using BarberShop.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BarberShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BarberosController : ControllerBase
    {
        private readonly BarberShopContext _context;

        public BarberosController(BarberShopContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Barbero>>> GetBarberos()
        {
            return await _context.Barberos.Where(b => b.Activo).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Barbero>> GetBarbero(int id)
        {
            var barbero = await _context.Barberos.FindAsync(id);
            if (barbero == null) return NotFound();
            return barbero;
        }

        [HttpPost]
        public async Task<ActionResult<Barbero>> PostBarbero(Barbero barbero)
        {
            _context.Barberos.Add(barbero);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBarbero), new { id = barbero.Id }, barbero);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBarbero(int id, Barbero barbero)
        {
            if (id != barbero.Id) return BadRequest();
            _context.Entry(barbero).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBarbero(int id)
        {
            var barbero = await _context.Barberos.FindAsync(id);
            if (barbero == null) return NotFound();
            barbero.Activo = false;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
