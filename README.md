# **M\&A Barber Shop — Sistema de Gestión Interna y POS**

Este es un sistema de punto de venta (POS) y administración interna diseñado para digitalizar las operaciones diarias de una barbería. La aplicación está construida sobre una arquitectura desacoplada moderna: una API REST robusta en **ASP.NET Core Web API** y una SPA interactiva en **React con Vite**.

##  **Requisitos Previos**

* **SDK de .NET 8.0** o superior.  
* **Node.js** (versión LTS).  
* **Microsoft SQL Server** (LocalDB o Express).

## **Instrucciones de Despliegue Local**

### **1\. Preparación de la Base de Datos (Back-End)**

El sistema utiliza **Entity Framework Core Code-First**. Para aplicar las migraciones y generar la base de datos local de manera automatizada, ejecute los siguientes comandos en la terminal desde el directorio del proyecto del Back-End:

cd BarberShop.API  
dotnet ef database update  
dotnet run

*Nota: La cadena de conexión predeterminada se encuentra configurada en el archivo appsettings.Development.json apuntando a localhost con seguridad integrada.*

### **2\. Ejecución del Front-End (SPA React)**

En una segunda terminal, navegue a la carpeta del Front-End, instale las dependencias de Node e inicialice el servidor de desarrollo de Vite:

cd BarberShop.API/vista  
npm install  
npm run dev

La aplicación se compilará instantáneamente y estará disponible en el puerto local predeterminado de Vite: http://localhost:5173.