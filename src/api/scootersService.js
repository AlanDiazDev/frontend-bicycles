// scootersService.js

// Datos locales simulados
let scooters = [
  // Cerca del centro (~2-3 cuadras)
  { id: 1, name: "Scooter #1", status: "Available", lat: -35.6591, lng: -63.7575 },
  { id: 2, name: "Scooter #2", status: "Rented", lat: -35.6596, lng: -63.7582 },
  { id: 3, name: "Scooter #3", status: "Disabled", lat: -35.6589, lng: -63.7568 },
  { id: 4, name: "Scooter #4", status: "Available", lat: -35.6602, lng: -63.7571 },

  // Un poco más lejos (~5-8 cuadras)
  { id: 5, name: "Scooter #5", status: "Rented", lat: -35.6620, lng: -63.7590 },
  { id: 6, name: "Scooter #6", status: "Available", lat: -35.6615, lng: -63.7555 },
  { id: 7, name: "Scooter #7", status: "Disabled", lat: -35.6578, lng: -63.7598 },
  { id: 8, name: "Scooter #8", status: "Available", lat: -35.6630, lng: -63.7572 },

  // Más lejos (~10-15 cuadras, 1.5–2 km)
  { id: 9, name: "Scooter #9", status: "Rented", lat: -35.6705, lng: -63.7605 },
  { id: 10, name: "Scooter #10", status: "Available", lat: -35.6712, lng: -63.7520 },
  { id: 11, name: "Scooter #11", status: "Disabled", lat: -35.6545, lng: -63.7620 },
  { id: 12, name: "Scooter #12", status: "Available", lat: -35.6538, lng: -63.7505 },
  { id: 13, name: "Scooter #13", status: "Rented", lat: -35.6720, lng: -63.7650 },
  { id: 14, name: "Scooter #14", status: "Available", lat: -35.6550, lng: -63.7450 },
  { id: 15, name: "Scooter #15", status: "Disabled", lat: -35.6685, lng: -63.7700 },
  { id: 16, name: "Scooter #16", status: "Available", lat: -35.6525, lng: -63.7550 },

  // Mezcla intermedia
  { id: 17, name: "Scooter #17", status: "Rented", lat: -35.6640, lng: -63.7610 },
  { id: 18, name: "Scooter #18", status: "Available", lat: -35.6608, lng: -63.7635 },
  { id: 19, name: "Scooter #19", status: "Disabled", lat: -35.6570, lng: -63.7535 },
  { id: 20, name: "Scooter #20", status: "Available", lat: -35.6625, lng: -63.7545 },
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
