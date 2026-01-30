// motorcyclesService.js

let motorcycles = [
  { id: 1, name: "Moto #1", status: "Available", lat: -35.6605, lng: -63.7582, stationId: 1 },
  { id: 2, name: "Moto #2", status: "Disabled", lat: -35.6621, lng: -63.7610, stationId: 2 },
  { id: 3, name: "Moto #3", status: "Available", lat: -35.6643, lng: -63.7568, stationId: 3 },
  { id: 4, name: "Moto #4", status: "Rented", lat: -35.6670, lng: -63.7595, stationId: 4 },
  { id: 5, name: "Moto #5", status: "Available", lat: -35.6692, lng: -63.7623, stationId: 5 },
  { id: 6, name: "Moto #6", status: "Available", lat: -35.6618, lng: -63.7640, stationId: 6 },
  { id: 7, name: "Moto #7", status: "Disabled", lat: -35.6635, lng: -63.7662, stationId: 7 },
  { id: 8, name: "Moto #8", status: "Rented", lat: -35.6657, lng: -63.7607, stationId: 8 },
  { id: 9, name: "Moto #9", status: "Available", lat: -35.6681, lng: -63.7579, stationId: 9 },
  { id: 10, name: "Moto #10", status: "Available", lat: -35.6704, lng: -63.7615, stationId: 10 },
  { id: 11, name: "Moto #11", status: "Disabled", lat: -35.6627, lng: -63.7555, stationId: 11 },
  { id: 12, name: "Moto #12", status: "Rented", lat: -35.6649, lng: -63.7638, stationId: 12 },
  { id: 13, name: "Moto #13", status: "Available", lat: -35.6673, lng: -63.7651, stationId: 13 },
  { id: 14, name: "Moto #14", status: "Available", lat: -35.6697, lng: -63.7586, stationId: 14 },
  { id: 15, name: "Moto #15", status: "Disabled", lat: -35.6715, lng: -63.7644, stationId: 15 },
];



// Obtener lista
export const getMotorcycles = async () => {
  return motorcycles;
};

// Editar
export const editMotorcycle = async (id, payload) => {
  motorcycles = motorcycles.map(m => m.id === id ? { ...m, ...payload } : m);
  return motorcycles.find(m => m.id === id);
};

// Eliminar
export const deleteMotorcycle = async (id) => {
  motorcycles = motorcycles.filter(m => m.id !== id);
  return id;
};

// Deshabilitar
export const disableMotorcycle = async (id) => {
  motorcycles = motorcycles.map(m => m.id === id ? { ...m, status: "Disabled" } : m);
  return motorcycles.find(m => m.id === id);
};

// Agregar nuevo (ID = maxId + 1)
export const addMotorcycle = async (payload) => {
  const nextId = motorcycles.length > 0 ? Math.max(...motorcycles.map(m => m.id)) + 1 : 1;
  const newMotorcycle = { id: nextId, ...payload };
  motorcycles.push(newMotorcycle);
  return newMotorcycle;
};
