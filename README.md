# Repetición Máxima - Backend

API para el registro de entrenamientos y estimación de 1RM.

## Requisitos
- Node.js
- MongoDB

## Instalación
1. `npm install`
2. Crear archivo `.env` basado en `.env.example` y configurar la URI de MongoDB y el JWT Secret.

## Comandos
- `npm start`: Inicia el servidor.
- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon.

## Endpoints
- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Ejercicios**: `/api/ejercicios` (GET, POST)
- **Registros**: `/api/registros` (GET, POST), `/api/registros/actual/:ejercicioId` (GET)
