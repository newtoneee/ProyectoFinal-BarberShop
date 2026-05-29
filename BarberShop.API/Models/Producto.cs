namespace BarberShop.API.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public int StockMinimo { get; set; } = 5;
        public bool Activo { get; set; } = true;

        // Navegación
        public ICollection<DetalleVenta> DetallesVenta { get; set; } = new List<DetalleVenta>();
    }
}
