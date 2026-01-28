// containersService.js

// Datos locales simulados
let containers = [
  { id: 1, name: "Contenedor #1", type: "Fijo", fillLevel: 20, lat: -35.6605, lng: -63.7582 },
  { id: 2, name: "Contenedor #2", type: "Movil", fillLevel: 55, lat: -35.6615, lng: -63.7592 },
  { id: 3, name: "Contenedor #3", type: "Movil", fillLevel: 80, lat: -35.6625, lng: -63.7577 },
  { id: 4, name: "Contenedor #4", type: "Fijo", fillLevel: 35, lat: -35.6635, lng: -63.7587 },
];

// Obtener lista
export const getContainers = async () => {
  return containers;
};

// Editar
export const editContainer = async (id, payload) => {
  containers = containers.map(c => c.id === id ? { ...c, ...payload } : c);
  return containers.find(c => c.id === id);
};

// Eliminar
export const deleteContainer = async (id) => {
  containers = containers.filter(c => c.id !== id);
  return id;
};

// Agregar nuevo (ID = maxId + 1)
export const addContainer = async (payload) => {
  const nextId = containers.length > 0 ? Math.max(...containers.map(c => c.id)) + 1 : 1;
  const newContainer = { id: nextId, ...payload };
  containers.push(newContainer);
  return newContainer;
};
