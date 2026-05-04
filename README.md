# InkFlow

InkFlow es una plataforma Full Stack de publicación de contenido inspirada en Medium, donde los usuarios pueden crear, publicar y gestionar artículos dentro de una experiencia limpia, moderna y profesional.

Demo en vivo: https://inkflow-kc.vercel.app/
Health Check del backend: https://inkflow-kc.duckdns.org/health

---

## Descripción general

InkFlow es una aplicación web Full Stack construida para simular un producto real de publicación de contenido.

Los usuarios pueden:

* registrarse
* iniciar sesión de forma segura mediante JWT
* escribir artículos
* guardar borradores
* publicar contenido
* editar sus artículos
* eliminar sus propios artículos
* explorar artículos por categorías
* visitar perfiles públicos de autores
* comentar artículos

El objetivo del proyecto fue desarrollar una aplicación completa de principio a fin, trabajando frontend, backend, modelado de base de datos y despliegue en la nube.

---

## Funcionalidades

### Autenticación

* Registro de usuarios
* Inicio de sesión
* Autenticación mediante JWT
* Rutas protegidas
* Persistencia de sesión con localStorage

### Artículos

* Crear artículo
* Editar artículo
* Eliminar artículo
* Guardar como borrador
* Publicar artículo
* Generación automática de slug
* Validación de propiedad del autor

### Categorías

* Categorización de artículos
* Filtro por categoría
* Navegación dinámica entre categorías

### Perfil de usuario

* Perfil público del autor
* Biografía
* Avatar
* Lista paginada de artículos publicados

### Comentarios

* Añadir comentarios en artículos
* Eliminar comentarios propios
* Ordenación por fecha de publicación

### UX / UI

* Diseño responsive
* Notificaciones emergentes
* Paginación
* Navbar profesional
* Estados vacíos
* Estados de carga
* Formularios mejorados

---

## Stack tecnológico

### Frontend

* React
* TypeScript
* React Router
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* JWT
* Bcrypt

### Base de datos

* PostgreSQL
* Prisma ORM

### Despliegue

* Frontend → Vercel
* Backend → AWS EC2
* Base de datos → AWS RDS PostgreSQL
* Dominio / reverse proxy → DuckDNS + Nginx

---

## Arquitectura

Cliente (React + TypeScript)

↓

API REST (Node.js + Express)

↓

Prisma ORM

↓

PostgreSQL (AWS RDS)

↓

Despliegue en AWS EC2 + Vercel

---

## Endpoints API

### Autenticación

POST /api/auth/register
POST /api/auth/login

### Artículos

GET /api/articles
GET /api/articles/:username/:slug
POST /api/articles
PUT /api/articles/:id
DELETE /api/articles/:id

### Categorías

GET /api/categories
GET /api/categories/:slug/articles

### Usuarios

GET /api/users/:username

### Comentarios

GET /api/comments/:articleId
POST /api/comments
DELETE /api/comments/:id

---

## Instalación local

### Clonar repositorio

git clone https://github.com/LucasPrietoAlmeida/InkFlow.git

### Instalar dependencias backend

cd backend
npm install

### Instalar dependencias frontend

cd ../frontend
npm install

### Ejecutar backend

npm run dev

### Ejecutar frontend

npm run dev

---

## Variables de entorno

### Backend (.env)

DATABASE_URL=tu_database_url
JWT_SECRET=tu_clave_secreta

### Frontend

Configurar la baseURL de la API en services/api.ts

---

## Mejoras futuras

* Editor de texto enriquecido
* Sistema de likes
* Guardado de favoritos
* Comentarios anidados
* Buscador de artículos
* Panel de usuario
* Subida de avatar
* Soporte Markdown
* Panel de administración

---

## Qué he trabajado en este proyecto

Con InkFlow he puesto en práctica:

* Arquitectura Full Stack
* Diseño de bases de datos relacionales
* Desarrollo de APIs REST
* Autenticación y autorización
* Migraciones con Prisma
* Despliegue cloud en AWS
* Gestión de estado en frontend
* Componentes reutilizables
* Debugging en producción
* Integración frontend + backend + base de datos

---

## Autor

Lucas Prieto Almeida
Desarrollador Full Stack

LinkedIn: https://www.linkedin.com/in/lucas-prieto-almeida/
GitHub: https://github.com/LucasPrietoAlmeida
