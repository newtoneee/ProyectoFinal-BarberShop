namespace BarberShop.API.Models
{
    public class Servicio
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public int DuracionMinutos { get; set; }
        public bool Activo { get; set; } = true;

        // Relación
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; } = null!;

        // Navegación
        public ICollection<DetalleVenta> DetallesVenta { get; set; } = new List<DetalleVenta>();
    }
}
