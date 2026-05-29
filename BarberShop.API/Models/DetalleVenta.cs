namespace BarberShop.API.Models
{
    public class DetalleVenta
    {
        public int Id { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal { get; set; }

        // Relación con Venta
        public int VentaId { get; set; }
        public Venta Venta { get; set; } = null!;

        // Puede ser servicio O producto (uno de los dos)
        public int? ServicioId { get; set; }
        public Servicio? Servicio { get; set; }

        public int? ProductoId { get; set; }
        public Producto? Producto { get; set; }
    }
}