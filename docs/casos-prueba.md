# Casos de Prueba — TaskFlow

| ID | Tipo | Descripción | Entrada | Resultado Esperado | Estado |
|----|------|-------------|---------|--------------------|--------|
| CP-01 | Funcional | Crear tarea válida | Título: "Tarea de prueba", Descripción: "Descripción" | Tarea creada y visible en la lista | ✅ |
| CP-02 | Funcional | Editar tarea | Título original → "Tarea editada" | Tarea actualizada con nuevo título | ✅ |
| CP-03 | Funcional | Eliminar tarea | Click en Eliminar + Confirmar | Tarea eliminada de la lista | ✅ |
| CP-04 | Funcional | Cambiar estado Pendiente → En progreso | Click en "Iniciar" | Badge cambia a "En progreso" | ✅ |
| CP-05 | Funcional | Cambiar estado En progreso → Completada | Click en "Completar" | Badge cambia a "Completada" | ✅ |
| CP-06 | Funcional | Filtrar por estado | Seleccionar filtro "Completada" | Solo tareas completadas visibles | ✅ |
| CP-07 | Funcional | Buscar por nombre | Escribir "Comprar" en búsqueda | Solo tareas con "Comprar" visibles | ✅ |
| CP-08 | Negativa | Título vacío | Título: vacío, click Guardar | Mensaje "El título es obligatorio" | ✅ |
| CP-09 | Negativa | Título con solo espacios | Título: "   ", click Guardar | Mensaje "El título es obligatorio" | ✅ |
| CP-10 | Borde | Título largo | Título: 200 caracteres | Tarea creada correctamente | ✅ |
| CP-11 | Borde | Múltiples tareas | Crear 5 tareas | Conteo total muestra 5 | ✅ |
| CP-12 | Borde | Eliminar última tarea | Crear y eliminar única tarea | Mensaje "No hay tareas que mostrar" | ✅ |
| CP-13 | Borde | Ciclo de estados completo | Pendiente → Iniciar → Completar → Reabrir → Iniciar | Estados cambian correctamente en cada paso | ✅ |
