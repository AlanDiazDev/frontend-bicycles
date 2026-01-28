// containersService.js

// Datos locales simulados
let containers = [
  { id: 1, name: "Contenedor #1", type: "Fijo", fillLevel: 20, lat: -35.6420, lng: -63.7250 },
  { id: 2, name: "Contenedor #2", type: "Movil", fillLevel: 55, lat: -35.6450, lng: -63.7300 },
  { id: 3, name: "Contenedor #3", type: "Movil", fillLevel: 80, lat: -35.6480, lng: -63.7350 },
  { id: 4, name: "Contenedor #4", type: "Fijo", fillLevel: 35, lat: -35.6510, lng: -63.7400 },
  { id: 5, name: "Contenedor #5", type: "Fijo", fillLevel: 60, lat: -35.6540, lng: -63.7450 },
  { id: 6, name: "Contenedor #6", type: "Movil", fillLevel: 75, lat: -35.6570, lng: -63.7500 },
  { id: 7, name: "Contenedor #7", type: "Fijo", fillLevel: 45, lat: -35.6600, lng: -63.7550 },
  { id: 8, name: "Contenedor #8", type: "Movil", fillLevel: 90, lat: -35.6630, lng: -63.7600 },
  { id: 9, name: "Contenedor #9", type: "Fijo", fillLevel: 25, lat: -35.6660, lng: -63.7650 },
  { id: 10, name: "Contenedor #10", type: "Movil", fillLevel: 65, lat: -35.6690, lng: -63.7700 },
  { id: 11, name: "Contenedor #11", type: "Fijo", fillLevel: 50, lat: -35.6720, lng: -63.7750 },
  { id: 12, name: "Contenedor #12", type: "Movil", fillLevel: 85, lat: -35.6750, lng: -63.7800 },
  { id: 13, name: "Contenedor #13", type: "Fijo", fillLevel: 40, lat: -35.6780, lng: -63.7850 },
  { id: 14, name: "Contenedor #14", type: "Movil", fillLevel: 10, lat: -35.6570, lng: -63.7826 },
  { id: 15, name: "Contenedor #15", type: "Fijo", fillLevel: 95, lat: -35.6810, lng: -63.7800 },
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
