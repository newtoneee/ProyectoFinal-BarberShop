namespace BarberShop.API.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Color { get; set; } = "#000000";
        public bool Activo { get; set; } = true;

        // Navegación
        public ICollection<Servicio> Servicios { get; set; } = new List<Servicio>();
    }
}