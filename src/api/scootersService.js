// scootersService.js

// Datos locales simulados
let scooters = [
  { id: 1, name: "Scooter #1", status: "Available", lat: -35.6593, lng: -63.7579, stationId: 1 },
  { id: 2, name: "Scooter #2", status: "Disabled", lat: -35.6594, lng: -63.7578, stationId: 1 },
  { id: 3, name: "Scooter #3", status: "Available", lat: -35.6540, lng: -63.7570, stationId: 2 },
  { id: 4, name: "Scooter #4", status: "Rented", lat: -35.6541, lng: -63.7571, stationId: 2 },
];

// Obtener lista
export const getScooters = async () => {
  return scooters;
};

// Editar
export const editScooter = async (id, payload) => {
  scooters = scooters.map(s => s.id === id ? { ...s, ...payload } : s);
  return scooters.find(s => s.id === id);
};

// Eliminar
export const deleteScooter = async (id) => {
  scooters = scooters.filter(s => s.id !== id);
  return id;
};

// Deshabilitar
export const disableScooter = async (id) => {
  scooters = scooters.map(s => s.id === id ? { ...s, status: "Disabled" } : s);
  return scooters.find(s => s.id === id);
};

// Agregar nuevo (ID = maxId + 1)
export const addScooter = async (payload) => {
  const nextId = scooters.length > 0 ? Math.max(...scooters.map(s => s.id)) + 1 : 1;
  const newScooter = { id: nextId, ...payload };
  scooters.push(newScooter);
  return newScooter;
};
