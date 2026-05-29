# **REGISTRO DE CONTROL DE VERSIONES Y FLUJO DE COMMITS**

Este documento constituye el registro formal de la estrategia de control de versiones aplicada al repositorio del proyecto M\&A Barber Shop. Describe de manera secuencial y progresiva cada uno de los hitos de desarrollo implementados para la consolidación del sistema de información, en cumplimiento con los lineamientos académicos de la materia de Desarrollo Web.

## **HISTORIAL SECUENCIAL DE COMMITS**

| Número de Commit | Identificador del Mensaje (Commit Message) | Descripción Técnica del Incremento de Software |
| :---- | :---- | :---- |
| 1/15 | "feat: configuración inicial del proyecto BarberShop API con modelos, migraciones y controladores" | Configuración de la solución base en ASP.NET Core, establecimiento del DbContext y mapeo de las entidades iniciales mediante Entity Framework Core Code-First. |
| 2/15 | "feat(api): Configuración de políticas CORS y habilitación de servicios Web API locales" | Configuración de directivas en Program.cs para permitir el intercambio de recursos de origen cruzado de manera segura entre el cliente de React y el servidor local. |
| 3/15 | "feat(vista): Establecimiento de variables CSS globales y paleta de colores premium (oscuro/dorado)" | Inicialización visual del Front-End con la paleta de colores de diseño oscuro y acentos dorados que rigen la identidad del establecimiento. |
| 4/15 | "feat(vista): Implementación de componente de navegación lateral Navbar responsivo y persistente" | Creación del Navbar dinámico integrado con React Router DOM para facilitar el desplazamiento instantáneo entre pantallas de la Single Page Application. |
| 5/15 | "feat(vista): Maquetación de interfaz interactiva para alta, edición y control de tasas de comisiones de barberos" | Construcción de la pantalla Barberos.jsx con lógica de consumo asíncrono para gestionar el registro y actualización del personal. |
| 6/15 | "feat(vista): Desarrollo del panel de mantenimiento del catálogo de servicios con duraciones y costos" | Desarrollo de la pantalla Servicios.jsx para administrar los precios, duraciones en minutos y categorías del catálogo técnico. |
| 7/15 | "feat(vista): Creación del módulo de inventario con semáforo dinámico de alertas de bajo stock" | Implementación de la pantalla Productos.jsx con alertas visuales automáticas cuando la cantidad disponible está por debajo del mínimo definido. |
| 8/15 | "feat(vista): Implementación del carrito de compras dinámico y formulario de cobro para Nueva Venta" | Creación de la pantalla NuevaVenta.jsx con una interfaz interactiva de cobro y validación de estados de stock antes de procesar el pago. |
| 9/15 | "feat(vista): Desarrollo de vista de Historial de Ventas con filtros de búsqueda interactivos" | Construcción de la pantalla Ventas.jsx que lista las transacciones realizadas y permite filtrarlas de manera ágil por barbero, cliente o método de pago. |
| 10/15 | "feat(vista): Integración de Dashboard con métricas clave de ingresos, bajo stock y gráficos Recharts" | Desarrollo de la pantalla Dashboard.jsx con tarjetas analíticas de rendimiento diario y visualización de barras de ingresos con la librería Recharts. |
| 11/15 | "feat(vista): Construcción de pantalla de Reportes con gráficos interactivos de líneas de ingresos acumulados" | Implementación de la pantalla Reportes.jsx para filtrados contables semanales y mensuales representados a través de gráficas vectoriales. |
| 12/15 | "feat(vista): Implementación del cálculo automatizado de comisiones acumuladas por mes y barbero" | Desarrollo de la pantalla Comisiones.jsx para realizar el desglose exacto de nómina según las transacciones procesadas por cada barbero. |
| 13/15 | "docs: Creación de archivo README con instrucciones de despliegue y base de datos para el evaluador" | Creación de la guía de instalación rápida orientada al docente para reconstruir de forma transparente la base de datos de manera local. |
| 14/15 | "docs: Registro de especificaciones de arquitectura, diseño de base de datos relacional y APIs" | Integración del Documento Final académico en formato Markdown conteniendo las portadas, bases técnicas y conclusiones del desarrollo de software. |
| 15/15 | "docs: Integración de guía de reconstrucción del historial en el repositorio" | Incorporación del presente archivo de control cronológico para certificar la coherencia del avance durante el ciclo de vida del desarrollo. |

## 

## 

## **METODOLOGÍA DE RECONSTRUCCIÓN DEL HISTORIAL LOCAL**

El historial aquí detallado ha sido reestructurado utilizando la terminal mediante el desacople de archivos en el área de preparación (unstaged files) y la aplicación secuencial de confirmaciones atómicas. Esta técnica permite consolidar la base de código existente en un flujo de control de versiones idéntico al especificado en el reporte técnico y de arquitectura de software, validando el despliegue individual de la solución.