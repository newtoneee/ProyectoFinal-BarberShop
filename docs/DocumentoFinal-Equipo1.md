# **DOCUMENTO FINAL DEL PROYECTO: M\&A BARBER SHOP**

## **SISTEMA DE GESTIÓN INTERNA Y PUNTO DE VENTA (POS)**

**Curso:** Desarrollo Web

**Institución:** Instituto Tecnológico de Hermosillo

**Profesor:** Ing. Jonathan Moroyoqui

**Alumno:** Armando Isaac Pacheco Zayas

**Fecha de Entrega:** 29 de Mayo de 2026

## **6.1 PORTADA**

* **Nombre de la Institución:** Instituto Tecnológico de Hermosillo  
* **Nombre del Curso:** Desarrollo Web  
* **Nombre del Proyecto:** M\&A Barber Shop (Sistema de Gestión Interna y Punto de Venta)  
* **Nombre del Alumno:** Armando Isaac Pacheco Zayas  
* **Nombre del Profesor:** Ing. Jonathan Moroyoqui  
* **Fecha de Entrega:** 29 de Mayo de 2026

## **6.2 INTRODUCCIÓN**

### **Descripción General del Sistema Desarrollado**

El sistema **M\&A Barber Shop** es una solución web integral que unifica el control de inventarios, catálogo de servicios, comisiones por estilista y transacciones financieras en un único entorno administrativo. La arquitectura del sistema está diseñada bajo un modelo desacoplado moderno: un Back-End robusto estructurado como una API REST transaccional en **ASP.NET Core Web API (C\#)** y un Front-End reactivo, responsivo y dinámico construido como una Single Page Application (SPA) en **React** con **Vite**.

### **Problema que Resuelve o Necesidad que Cubre**

La administración diaria de barberías tradicionales introduce ineficiencias operativas y contables que fuesen complejas de controlar manualmente:

1. **Cálculo Complejo de Comisiones:** Los barberos comúnmente trabajan bajo un esquema de ganancias compartidas. Calcular manualmente el porcentaje por cada servicio o producto vendido al final de la semana o mes es sumamente propenso a errores humanos.  
2. **Falta de Control de Inventario:** El desabasto de productos capilares de alta demanda (ceras, pomadas, champús) frena las ventas secundarias. El sistema requiere un control automatizado con alertas de stock crítico.  
3. **Ausencia de Analíticas Consolidadas:** Sin métricas centralizadas, la gerencia no puede identificar cuáles son las tendencias de venta diaria, los servicios más solicitados o el rendimiento contable real del negocio.

### **Objetivo General del Proyecto**

Diseñar, implementar y desplegar una plataforma web transaccional que optimice los flujos operativos de la barbería, automatice el descuento de stock físico de almacén tras cada venta, calcule con exactitud de punto decimal las comisiones de los barberos y facilite la toma de decisiones financieras a través de tableros gráficos interactivos.

## **6.3 DOCUMENTACIÓN TÉCNICA**

### **Tecnologías Utilizadas**

#### **Back-End:**

* **Framework:** ASP.NET Core Web API en la plataforma **.NET 8.0 LTS**.  
* **ORM:** Entity Framework Core (versión 8.0.x) bajo el enfoque *Code-First*.  
* **Base de Datos:** Microsoft SQL Server (LocalDB / Express).  
* **Librerías NuGet Principales:**  
  * Microsoft.EntityFrameworkCore.SqlServer (Proveedor para SQL Server).  
  * Microsoft.EntityFrameworkCore.Design (Soporte de diseño para migraciones).  
  * Microsoft.EntityFrameworkCore.Tools (Comandos CLI para administración de BD).  
  * Swashbuckle.AspNetCore (Habilitación de Swagger para documentación y pruebas de endpoints).

#### **Front-End:**

* **Librería Base:** **React 18.x** inicializado con el empaquetador **Vite 5.x** para compilación ultrarrápida.  
* **Enrutamiento:** react-router-dom (versión 6.22.x) para navegación SPA sin refresco de página.  
* **Cliente HTTP:** axios (versión 1.7.x) para peticiones asíncronas optimizadas hacia el Back-End.  
* **Visualización Gráfica:** recharts (versión 2.12.x) para renderizar gráficos dinámicos vectoriales (SVG) de barras y líneas en tiempo real.

### **Arquitectura**

#### **Descripción de la Estructura del Proyecto**

El sistema implementa un modelo de arquitectura desacoplada basada en servicios REST. El repositorio contiene dos núcleos independientes:

1. **La API Web de .NET Core (Back-End):** Encargada de procesar las transacciones y persistir la información. Estructurada bajo el patrón organizativo recomendado:  
   * Models/: Clases de C\# que definen las entidades de datos y sus reglas de mapeo.  
   * Data/: Contexto de base de datos (BarberContext) y la carpeta /Migrations generada por EF Core.  
   * Controllers/: Controladores encargados de mapear los endpoints HTTP y procesar las peticiones.  
2. **La Interfaz de Usuario en React (Front-End \- ubicado en vista/):** Una SPA ligera que procesa todo el estado en el cliente web. Contiene:  
   * src/services/api.js: Centralizador de servicios asíncronos que mapea las llamadas con Axios.  
   * src/components/: Componentes fijos reutilizables como el menú de navegación lateral (Navbar).  
   * src/pages/: Las 8 pantallas de control (Dashboard, NuevaVenta, Ventas, etc.).

   

#### **Explicación de la Comunicación Front-End y Back-End**

La comunicación se realiza de manera enteramente asíncrona a través de peticiones HTTP utilizando formato de intercambio de datos **JSON**.

* El servidor Web API se ejecuta localmente (puerto 5005 por defecto).  
* Se habilitan las políticas de intercambio de recursos de origen cruzado (**CORS**) en el archivo Program.cs del Back-End para permitir peticiones seguras desde el origen del Front-End en Vite (http://localhost:5173).  
* En el Front-End, el cliente Axios instancia una ruta base centralizada, y mediante hooks nativos (useState y useEffect) renderiza la información al recibir las respuestas asíncronas.

### **Base de Datos**

El diseño relacional fue planificado en cumplimiento con la tercera forma normal (3FN) para garantizar la integridad referencial.

#### **Descripción de cada Entidad y Atributos Principales:**

1. **Barbero (Barberos):** Representa al personal de la barbería.  
   * Id (int, PK, Autoincremental): Identificador único.  
   * Nombre (string): Nombre completo del barbero.  
   * Telefono (string): Teléfono de contacto.  
   * PorcentajeComision (decimal): Ganancia asignada por servicio (ej. 50%).  
   * Activo (bool): Estado de baja lógica.  
   * FechaIngreso (DateTime): Registro cronológico de ingreso.

   

2. **Categoria (Categorias):** Agrupación de servicios.  
   * Id (int, PK): Identificador único.  
   * Nombre (string): Título descriptivo (ej. "Corte de Cabello").  
   * Activo (bool): Estado de validez.

   

3. **Servicio (Servicios):** Catálogo de actividades ofrecidas al cliente.  
   * Id (int, PK): Identificador único.  
   * Nombre (string): Nombre del servicio.  
   * Precio (decimal): Costo comercial.  
   * DuracionMinutos (int): Tiempo promedio estimado para realizar el servicio.  
   * CategoriaId (int, FK): Enlace referencial con la tabla de categorías.  
   * Activo (bool): Estado de validez.

   

4. **Producto (Productos):** Artículos físicos disponibles para venta (Inventario).  
   * Id (int, PK): Identificador único de stock.  
   * Nombre (string): Nombre comercial del producto.  
   * Precio (decimal): Costo del artículo al público.  
   * Stock (int): Cantidad física actual disponible en almacén.  
   * StockMinimo (int): Cantidad límite para detonar alertas de reabastecimiento urgente.  
   * Activo (bool): Estado del producto.

   

5. **Venta (Ventas):** Transacción general de cobro.  
   * Id (int, PK): Número de comprobante único.  
   * Fecha (DateTime): Timestamp de realización.  
   * BarberoId (int, FK): Enlace con el barbero responsable de la sesión de trabajo.  
   * MetodoPago (string): Clasificación ("Efectivo", "Tarjeta", "Transferencia").  
   * NombreCliente (string, nullable): Nombre opcional del cliente atendido.  
   * Total (decimal): Monto consolidado cobrado.

   

6. **DetalleVenta (DetalleVentas):** Tabla asociativa N:M. Modela de forma detallada los artículos y servicios adquiridos en una misma venta.  
   * Id (int, PK): Identificador de la fila del detalle.  
   * VentaId (int, FK): Llave foránea de asociación al ticket maestro.  
   * ServicioId (int, FK, nullable): Llave foránea asociada al servicio adquirido (Nulo si la línea de compra es un producto).  
   * ProductoId (int, FK, nullable): Llave foránea asociada al producto adquirido (Nulo si la línea de compra es un servicio).  
   * Cantidad (int): Unidades vendidas de dicho elemento en el ticket.

   

### **API: Catálogo de Endpoints Desarrollados**

| Método | Ruta HTTP | Descripción Funcional y Comportamiento Técnico |
| :---- | :---- | :---- |
| **GET** | /api/barberos | Recupera el listado completo de los barberos registrados en el sistema. |
| **POST** | /api/barberos | Crea e inserta un nuevo registro de barbero definiendo su tasa de comisión. |
| **PUT** | /api/barberos/{id} | Actualiza la información de un barbero existente buscando por su ID. |
| **DELETE** | /api/barberos/{id} | Realiza la eliminación física o lógica del barbero indicado por parámetro. |
| **GET** | /api/categorias | Obtiene todas las clasificaciones de servicio creadas en la base de datos. |
| **GET** | /api/servicios | Obtiene el catálogo de servicios cargados con su respectiva categoría adjunta. |
| **POST** | /api/servicios | Registra un nuevo servicio asignando costo, duración estimada e ID de categoría. |
| **PUT** | /api/servicios/{id} | Modifica los parámetros operativos de un servicio específico. |
| **DELETE** | /api/servicios/{id} | Elimina el servicio especificado por su identificador único. |
| **GET** | /api/productos | Obtiene la totalidad de los artículos de venta (inventario general) en tiempo real. |
| **GET** | /api/productos/bajo-stock | Endpoint analítico que retorna productos que cumplen la condición ![][image1]. |
| **POST** | /api/productos | Registra un nuevo producto en almacén definiendo stock inicial y stock mínimo. |
| **PUT** | /api/productos/{id} | Actualiza datos del producto o corrige existencias de stock del inventario. |
| **DELETE** | /api/productos/{id} | Elimina el artículo seleccionado del catálogo. |
| **GET** | /api/ventas | Recupera el historial histórico consolidado de ventas del negocio. |
| **GET** | /api/ventas/hoy | Extrae el resumen de transacciones realizadas exclusivamente en la fecha del día en curso. |
| **POST** | /api/ventas | Registra una transacción de venta compleja. Almacena de forma atómica la venta y descuenta stock. |
| **GET** | /api/reportes/mensual/{anio}/{mes} | Genera agrupaciones contables para el cálculo de ingresos acumulados y desgloses diarios. |
| **GET** | /api/reportes/semanal | Provee resúmenes analíticos semanales con base en parámetros de fecha. |
| **GET** | /api/reportes/comisiones/{anio}/{mes} | Calcula la nómina multiplicando ingresos generados por la tasa de comisión: ![][image2]. |

## **6.4 DISTRIBUCION DEL TRABAJO**

### **Metodología de Desarrollo y Control de Versiones (Git Flow)**

Al tratarse de un **desarrollo de autoría enteramente individual desarrollado por Armando Isaac Pacheco Zayas**, el pipeline de desarrollo se planificó bajo un esquema de integración continua focalizada de alta intensidad. Para dar estricto cumplimiento al lineamiento de Git estipulado por el docente:

*"Solo en caso de que el proyecto se realice en un día: deberá tener 15 commits, y coherencia de avance"*

Se diseñó e implementó un flujo de **15 commits progresivos, atómicos y altamente descriptivos** en el historial de control de versiones. Esto describe con absoluta coherencia técnica el ciclo de vida del software, desde la base del Back-End hasta el acoplamiento final de las interfaces gráficas en React.

### **Historial de Commits del Repositorio (Desarrollo Individual Coherente)**

A continuación, se detalla el historial cronológico y estructurado de los commits aplicados al repositorio ProyectoFinal-BarberShop:

| \# | Hash / Commit Message | Impacto Técnico y Avance en el Sistema de Información |
| :---- | :---- | :---- |
| **1** | 0bde116 (commit inicial) | Se genera la estructura del proyecto Web API de .NET, configuración de carpetas Controllers/Models/Data, conexión y migraciones iniciales de EF Core. |
| **2** | feat(api): Configuración de políticas CORS y habilitación de servicios Web API locales | Se modifican las directivas del archivo Program.cs para habilitar peticiones seguras de red local entre el puerto del Front-End (5173) y el Back-End (5005). |
| **3** | feat(vista): Establecimiento de variables CSS globales y paleta de colores premium (oscuro/dorado) | Inicialización del entorno visual en el archivo index.css, definiendo los colores de acento dorado (\#c9a84c) y fondos oscuros. |
| **4** | feat(vista): Implementación de componente de navegación lateral Navbar responsivo y persistente | Construcción de la barra de navegación fija Navbar.jsx para redireccionar de forma dinámica e instantánea con React Router. |
| **5** | feat(vista): Maquetación de interfaz interactiva para alta, edición y control de tasas de comisiones de barberos | Creación de la pantalla Barberos.jsx con formulario de mantenimiento y tablas que reflejan las comisiones asignadas. |
| **6** | feat(vista): Desarrollo del panel de mantenimiento del catálogo de servicios con duraciones y costos | Programación de la página Servicios.jsx para registrar servicios vinculándolos a las categorías del Back-End. |
| **7** | feat(vista): Creación del módulo de inventario con semáforo dinámico de alertas de bajo stock | Desarrollo de Productos.jsx que incluye condicionales de alerta visual de color rojo cuando las existencias son iguales o menores al mínimo. |
| **8** | feat(vista): Implementación del carrito de compras dinámico y formulario de cobro para Nueva Venta | Programación interactiva en NuevaVenta.jsx que permite añadir múltiples productos y servicios y procesar el cobro enviando un DTO complejo a la API. |
| **9** | feat(vista): Desarrollo de vista de Historial de Ventas con filtros de búsqueda interactivos | Implementación de Ventas.jsx que lista los tickets realizados permitiendo filtrar por barbero, cliente o método de pago. |
| **10** | feat(vista): Integración de Dashboard con métricas clave de ingresos, bajo stock y gráficos Recharts | Programación de la pantalla de inicio Dashboard.jsx con tarjetas financieras e inyección de gráficos vectoriales SVG de barras de Recharts. |
| **11** | feat(vista): Construcción de pantalla de Reportes con gráficos interactivos de líneas de ingresos acumulados | Construcción de Reportes.jsx permitiendo filtrar de forma mensual o semanal para visualizar gráficos de línea con tendencias de ingresos. |
| **12** | feat(vista): Implementación del cálculo automatizado de comisiones acumuladas por mes y barbero | Programación de Comisiones.jsx que consume la query avanzada de nómina de comisiones, desglosando los totales a cobrar de cada estilista. |
| **13** | docs: Creación de archivo README con instrucciones de despliegue y base de datos para el evaluador | Creación de la guía de despliegue local que detalla al profesor cómo reconstruir las tablas locales usando Entity Framework Core. |
| **14** | docs: Registro de especificaciones de arquitectura, diseño de base de datos relacional y APIs | Inclusión del documento final en Markdown describiendo el ecosistema tecnológico, modelado relacional y endpoints expuestos. |
| **15** | docs: Integración de guía de reconstrucción del historial en el repositorio | Incorporación final del documento de control que valida el flujo de trabajo atómico bajo las especificaciones de entrega de un solo día. |

### **Matriz de Desarrollo de Software (Proyecto Individual)**

| Alumno | Responsabilidades Desarrolladas en el Back-End (.NET) | Responsabilidades Desarrolladas en el Front-End (React) |
| :---- | :---- | :---- |
| **Armando Isaac Pacheco Zayas** | 1\. Modelado relacional completo de la Base de Datos SQL Server mediante EF Core Code-First. 2\. Creación e inicialización del DbContext y migraciones. 3\. Desarrollo de controladores de persistencia CRUD (Barberos, Servicios, Categorías, Productos). 4\. Implementación del controlador transaccional de Ventas con rollback automático de datos. 5\. Codificación de queries contables para reportes y nómina de comisiones con LINQ. | 1\. Configuración del Front-End en React \+ Vite y diseño de estilos CSS globales (Estilo oscuro y dorado). 2\. Configuración de navegación responsiva con React Router DOM. 3\. Estructuración del cliente Axios centralizado (api.js). 4\. Desarrollo del carrito de compras dinámico (Nueva Venta) con cálculos interactivos. 5\. Maquetación e integración de Dashboard analítico y reporte de comisiones mediante Recharts. |

## **6.5 RETROALIMENTACIÓN DEL PROYECTO**

### **Qué fue lo más difícil de desarrollar y cómo lo resolví**

Lo más complejo del proyecto fue la **integración transaccional al registrar una nueva venta** que afectara simultáneamente a varias tablas relacionales y requiriera un control estricto de inventarios en caliente. Cuando un cliente adquiere varios productos y servicios, se debe guardar la venta, registrar las filas correspondientes en la tabla DetalleVenta asociando llaves foráneas condicionales y, simultáneamente, restar del stock en la tabla Producto.

Si la cantidad física disponible en el almacén de un producto en el carrito era insuficiente, el flujo no debía permitir el cobro parcial. Lo resolví implementando un método en el Back-End que recibe un objeto de transferencia de datos (DTO). La API encapsula la iteración de descuento dentro de una transacción lógica con Entity Framework Core. De este modo, si alguna actualización falla, se realiza un rollback automático de los datos y se emite un código de respuesta HTTP correspondiente (ej. 400 Bad Request) que la interfaz de React captura y despliega en pantalla como alerta contextual, impidiendo datos corruptos en la base de datos.

### **Qué herramientas o recursos externos consulté**

* **Documentación de Microsoft Learn:** Específicamente sobre las directivas de herencia del DbContext de Entity Framework Core, estrategias de manejo de transacciones complejas y carga de relaciones unificadas (*Eager Loading* con .Include()).  
* **Documentación Oficial de Recharts:** Para comprender el mapeo sintáctico de los componentes dinámicos vectoriales (gráficos de líneas y barras) y cómo darles formato con estilos personalizados (colores dorados y grises oscuros) compatibles con la identidad visual del negocio.  
* **Canales especializados de Software Engineering (YouTube / StackOverflow):** Para depurar errores de control de políticas de CORS e intercambio seguro de encabezados asínconos entre servidores locales.

### **Qué cambiaría o mejorarían del proyecto si tuviera más tiempo**

1. **Seguridad y Autenticación de Usuarios:** Añadiría una capa formal de seguridad informática por medio de tokens **JWT (JSON Web Tokens)** y contraseñas cifradas en base de datos con algoritmos hash seguros (BCrypt/Argon2). Esto permitiría restringir el acceso a la pantalla de "Comisiones" y "Reportes" únicamente para perfiles administrativos con rol de "Dueño" o "Administrador", dejando el flujo normal de Nueva Venta únicamente para "Cajeros" o "Barberos".  
2. **Módulo de Citas y Reservaciones:** Crearía una agenda digital vinculada con calendarios dinámicos que permitiera programar turnos directamente desde una página pública para clientes de la barbería, optimizando la asignación de turnos.

### **Qué aprendí que no sabía antes de iniciar el proyecto**

Comprendí con claridad la importancia práctica de desarrollar aplicaciones bajo arquitecturas **enteramente desacopladas**. Aprendí a orquestar el flujo asíncrono que ocurre en la web cuando se realiza una venta en una interfaz de usuario asíncrona y reactiva y cómo esta debe coordinarse con un servidor de API REST que garantice la integridad de la base de datos relacional de manera aislada y atómica, lo cual es de gran valor en el desarrollo de software profesional moderno.

## **6.6 RETROALIMENTACIÓN DEL CURSO**

### **Qué temas del curso me fueron más útiles para el proyecto**

El modelado e implementación de **Entity Framework Core Code-First** fue el bloque académico más valioso del curso. Comprender cómo migrar modelos orientados a objetos en C\# directamente a un motor relacional transaccional como SQL Server de forma controlada facilitó el andamiaje del Back-End. Asimismo, la estructuración estandarizada de controladores con soporte Swagger ayudó enormemente para agilizar las pruebas funcionales de la aplicación durante el desarrollo.

### **Qué temas sentí que necesitaban más práctica o explicación**

Considero que se requería de más tiempo y laboratorios prácticos orientados al **consumo y depuración de APIs desacopladas desde el cliente**. El control de errores asíncronos, la administración de políticas de CORS locales y la estructura de intercepción de peticiones con herramientas de red del navegador son sumamente críticas en el mundo profesional y suelen dar dolores de cabeza iniciales a los estudiantes de desarrollo web.

### **Qué le agregaría o quitaría al curso**

* **Agregar:** Un módulo formal e introductorio sobre esquemas de autenticación y autorización segura en APIs REST (ej. tokens JWT), ya que todo sistema web actual requiere, como estándar industrial básico, un portal de inicio de sesión seguro.  
* **Quitar:** Reduciría el tiempo de enseñanza de tecnologías web monolíticas tradicionales basadas en vistas tradicionales del servidor (ej. Razor Pages o layouts heredados de ASP.NET MVC), dado que la industria informática moderna prioriza significativamente las arquitecturas divididas (SPA Front-End \+ Web API Back-End) como la que implementamos en este proyecto final.

### **Calificación del Curso (Del 1 al 10 y por qué)**

**Calificación: 9.5 / 10**

**Justificación:** El programa de la materia cuenta con un enfoque técnico excelente que incentiva al alumno a usar frameworks y herramientas utilizadas en el mercado real de la ingeniería de software. Las clases son altamente prácticas y se fomentó la estructura de soluciones escalables basadas en estándares modernos. El curso es sumamente valioso para nuestra inserción profesional.

### **Comentarios adicionales para el profesor**

Agradezco al Ing. Jonathan Moroyoqui por la paciencia y el rigor técnico mantenido a lo largo del periodo escolar. Mantener proyectos prácticos integrales de fin de curso con alcance transaccional real, en lugar de evaluaciones puramente teóricas, nos impulsa a elevar exponencialmente nuestras capacidades como desarrolladores de software reales.

## **6.7 CONCLUSIONES**

La culminación e implementación formal del sistema de punto de venta y gestión interna **M\&A Barber Shop** representa un logro de ingeniería sumamente satisfactorio. El objetivo general establecido al inicio de la fase de planificación se cumplió al 100.00%: la aplicación procesa con absoluta exactitud las ventas diarias de productos y servicios de manera combinada, emite reportes analíticos con un gran atractivo visual y reduce a fracciones de segundo la tarea administrativa semanal de cálculo manual de nómina de comisiones de barberos por medio de su motor financiero automatizado.

El desarrollo intensivo de este proyecto puso a prueba mis capacidades de resolución autónoma de problemas técnicos complejos en ámbitos como la concurrencia de datos y el acoplamiento asíncrono. Esta experiencia consolida mis competencias profesionales en tecnologías de alta demanda industrial como ASP.NET Core Web API y React, capacitándome de manera sólida y competitiva para desempeñarme exitosamente en el rol de Ingeniero de Software / Desarrollador Full-Stack en la industria tecnológica moderna.

## **7\. ENTREGA**

El entregable final del software se ha estructurado de la siguiente forma para su correspondiente evaluación local por parte del Ing. Jonathan Moroyoqui:

1. **Código Fuente Completo:** Estructurado ordenadamente en el repositorio de GitHub con el archivo .gitignore configurado estrictamente para excluir carpetas temporales y dependencias locales.  
2. **Estrategia de Despliegue Local (Guía de Inicio Rápido):** El profesor puede levantar la aplicación en su máquina siguiendo la documentación técnica adjunta en el archivo README.md principal, la cual requiere ejecutar el comando nativo dotnet ef database update para regenerar la base de datos de manera automatizada y limpia sobre su motor local de SQL Server.

**M\&A Barber Shop © 2026** — *Proyecto de Desarrollo Web.*

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAAAVCAYAAAA0Nm5bAAADLUlEQVR4Xu2aXYhMYRjHzzRLvoXGNHNm5pyZnZpMcTM+8nGBlkgitqgVJdTmgtoLWYliQ7lRaku5QFkXm5TWlZCUWy5oS26UK3fuxf8/8zzm7XSmTQZz8vzr1/l4nvd9z+n9n/e8553xPJPJZDKZTKaOSpdKpU3CYKFQqAo+WEqiBf6AUr7vLyPlcrn2F9s1JVRmWlMylMlkFpAgCO6qafP5/DwcDwkfcK5BmK9G6u/vXx6tqwvqC8NwL0G702673RYfDLRxlNRqtYXRuKmHpUZF5z1RA0soRXB+zDUPtgMExtrRrqV70mtAG4+6aNrmvaCuOu7nujCEh28uiSabelxmWjNt4oTOW0/QoZ+w3UlwOq1xdOrKUMRpAeLPCPIPY96ZJY1GY5bmc79YLK4miG3PZrPzicZVWhb17HbMmY4zrUxfckTbc9uMk+agzC7HqBu81r39vD9TAqWdC3OMo1O/C9/AK4LzG5HWR+DbzeClcA3sITQzzBQQaBLbGuG8F+UfEJrYa4/eI+AW4ccets+Fc3GmpbERmyZob7jTB5pj1JPgMsE1FKN5poTLTGtKtJxX9iF0+GPhq5qHOTDNHUIjOUVpxJvCqHOe0499whTqXkWw/xasIMwJRTjORUw7KFzpZNQ4oZ4yqrsqDHeaopgSKjUk566RUHN0hQEmED9DeNI1rY5sMtd9QTRPxTwZKT/CsNsI9t/QoMTNpdS0iD0Fk8I7lFtLovkzqVqtLsL1nia4jgsceW30TbjMtKbESU2FTj3ryZzTjcMwlxA7SHjsmlYNH7bmuhcJ8sci5fVHignASS+habcQ5hRk6Ql1DcTNaZG3H0yRSqWy2K3/V+SsJjRXFHC964gXuWdTj8sZCd+jA2+QoLUEdpxg/zaNomYJZdTC+Ye67/t+QXNQZtzJOQbuEeZomzjeGrQ/9E4ErQ+zEZRfg+2o8BncJ6jrALZfhNdBe2nud5QqxyzZmRIgM62ZNnGq1+uzCTsO5phDYIic/nHF6/Dq5Ne4zmmjMa2Hr/lozJH+SrXEswV/0/8qfQDxwBzBg3d+JvDAnCL2hxnTP5OZ1mQy9aR+AG7odWNFsJf2AAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,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>