namespace BarberShop.API.Models
{
    public class Barbero
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public decimal PorcentajeComision { get; set; }
        public bool Activo { get; set; } = true;
        public DateTime FechaIngreso { get; set; } = DateTime.Now;

        // Navegación
        public ICollection<Venta> Ventas { get; set; } = new List<Venta>();
    }
}