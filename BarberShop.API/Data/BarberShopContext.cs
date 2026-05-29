using BarberShop.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BarberShop.API.Data
{
    public class BarberShopContext : DbContext
    {
        public BarberShopContext(DbContextOptions<BarberShopContext> options) : base(options) { }

        public DbSet<Barbero> Barberos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Servicio> Servicios { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<DetalleVenta> DetallesVenta { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Barbero>()
                .Property(b => b.PorcentajeComision)
                .HasPrecision(5, 2);

            modelBuilder.Entity<Servicio>()
                .Property(s => s.Precio)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Producto>()
                .Property(p => p.Precio)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Venta>()
                .Property(v => v.Total)
                .HasPrecision(10, 2);

            modelBuilder.Entity<DetalleVenta>()
                .Property(d => d.PrecioUnitario)
                .HasPrecision(10, 2);

            modelBuilder.Entity<DetalleVenta>()
                .Property(d => d.Subtotal)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Categoria>().HasData(
                new Categoria { Id = 1, Nombre = "Cortes", Color = "#3B82F6", Activo = true },
                new Categoria { Id = 2, Nombre = "Barba", Color = "#10B981", Activo = true },
                new Categoria { Id = 3, Nombre = "Combos", Color = "#8B5CF6", Activo = true },
                new Categoria { Id = 4, Nombre = "Extras", Color = "#F59E0B", Activo = true }
            );

            modelBuilder.Entity<Barbero>().HasData(
                new Barbero { Id = 1, Nombre = "Carlos Mendoza", Telefono = "6621234567", PorcentajeComision = 50, Activo = true, FechaIngreso = new DateTime(2024, 1, 15) },
                new Barbero { Id = 2, Nombre = "Luis Ramírez", Telefono = "6629876543", PorcentajeComision = 50, Activo = true, FechaIngreso = new DateTime(2024, 3, 10) },
                new Barbero { Id = 3, Nombre = "Miguel Torres", Telefono = "6625551234", PorcentajeComision = 45, Activo = true, FechaIngreso = new DateTime(2024, 6, 1) }
            );

            modelBuilder.Entity<Servicio>().HasData(
                new Servicio { Id = 1, Nombre = "Corte Clásico", Precio = 80, DuracionMinutos = 30, CategoriaId = 1, Activo = true },
                new Servicio { Id = 2, Nombre = "Corte Moderno", Precio = 100, DuracionMinutos = 45, CategoriaId = 1, Activo = true },
                new Servicio { Id = 3, Nombre = "Corte Infantil", Precio = 60, DuracionMinutos = 20, CategoriaId = 1, Activo = true },
                new Servicio { Id = 4, Nombre = "Arreglo de Barba", Precio = 60, DuracionMinutos = 20, CategoriaId = 2, Activo = true },
                new Servicio { Id = 5, Nombre = "Rasurado Clásico", Precio = 80, DuracionMinutos = 30, CategoriaId = 2, Activo = true },
                new Servicio { Id = 6, Nombre = "Combo Corte + Barba", Precio = 130, DuracionMinutos = 60, CategoriaId = 3, Activo = true },
                new Servicio { Id = 7, Nombre = "Tinte", Precio = 150, DuracionMinutos = 60, CategoriaId = 4, Activo = true },
                new Servicio { Id = 8, Nombre = "Cejas", Precio = 40, DuracionMinutos = 15, CategoriaId = 4, Activo = true }
            );

            modelBuilder.Entity<Producto>().HasData(
                new Producto { Id = 1, Nombre = "Pomada Calavera", Precio = 120, Stock = 20, StockMinimo = 5, Activo = true },
                new Producto { Id = 2, Nombre = "Cera Mate", Precio = 100, Stock = 15, StockMinimo = 5, Activo = true },
                new Producto { Id = 3, Nombre = "Shampoo Barba", Precio = 150, Stock = 10, StockMinimo = 3, Activo = true },
                new Producto { Id = 4, Nombre = "Aceite para Barba", Precio = 180, Stock = 8, StockMinimo = 3, Activo = true },
                new Producto { Id = 5, Nombre = "Gorra M&A", Precio = 250, Stock = 12, StockMinimo = 5, Activo = true }
            );
        }
    }
}
