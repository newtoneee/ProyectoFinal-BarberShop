namespace BarberShop.API.Models
{
    public class Venta
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; } = DateTime.Now;
        public string MetodoPago { get; set; } = string.Empty; // Efectivo, Tarjeta, Transferencia
        public string? NombreCliente { get; set; }
        public decimal Total { get; set; }
        public string? Notas { get; set; }

        // Relación
        public int BarberoId { get; set; }
        public Barbero Barbero { get; set; } = null!;

        // Navegación
        public ICollection<DetalleVenta> Detalles { get; set; } = new List<DetalleVenta>();
    }
}
