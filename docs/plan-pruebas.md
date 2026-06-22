# Plan de Pruebas — TaskFlow

## Alcance

Validar el correcto funcionamiento de la aplicación TaskFlow en sus operaciones CRUD, cambios de estado, filtros, búsqueda y manejo de errores.

## Tipos de Pruebas

| Tipo | Descripción |
|------|-------------|
| Funcionales | Verificar que cada operación del sistema funciona según lo esperado |
| Negativas | Verificar que el sistema rechaza entradas inválidas |
| Borde | Verificar comportamiento en límites del sistema |

## Criterios de Aceptación

- El sistema permite crear tareas con título y descripción válidos
- El sistema permite editar tareas existentes
- El sistema permite eliminar tareas con confirmación
- El sistema permite cambiar el estado de las tareas
- El sistema filtra correctamente por estado
- El sistema busca correctamente por texto
- El sistema rechaza tareas sin título
- El sistema muestra mensajes de error cuando corresponde

## Herramientas Utilizadas

- **Vitest:** Framework de pruebas
- **React Testing Library:** Pruebas de componentes
- **@testing-library/user-event:** Simulación de interacciones de usuario
- **jsdom:** Entorno DOM para pruebas
