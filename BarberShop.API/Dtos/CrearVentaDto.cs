namespace BarberShop.API.Dtos
{
    public class CrearVentaDto
    {
        public int BarberoId { get; set; }
        public string MetodoPago { get; set; } = string.Empty;
        public string? NombreCliente { get; set; }
        public string? Notas { get; set; }
        public List<DetalleVentaDto> Detalles { get; set; } = new();
    }

    public class DetalleVentaDto
    {
        public int? ServicioId { get; set; }
        public int? ProductoId { get; set; }
        public int Cantidad { get; set; }
    }
}
