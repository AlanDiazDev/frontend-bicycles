// scootersService.js

// Datos locales simulados
let scooters = [
  // Scooters cerca del centro
  { id: 1, name: "Scooter #1", status: "Available", lat: -35.6601, lng: -63.7568, blocked: true },
  { id: 2, name: "Scooter #2", status: "Rented", lat: -35.6587, lng: -63.7592, blocked: false },
  { id: 3, name: "Scooter #3", status: "Disabled", lat: -35.6615, lng: -63.7584, blocked: true },
  { id: 4, name: "Scooter #4", status: "Available", lat: -35.6579, lng: -63.7565, blocked: true },

  // Scooters intermedios
  { id: 5, name: "Scooter #5", status: "Rented", lat: -35.6623, lng: -63.7601, blocked: false },
  { id: 6, name: "Scooter #6", status: "Available", lat: -35.6598, lng: -63.7549, blocked: true },
  { id: 7, name: "Scooter #7", status: "Disabled", lat: -35.6607, lng: -63.7615, blocked: true },
  { id: 8, name: "Scooter #8", status: "Available", lat: -35.6581, lng: -63.7587, blocked: true },
  { id: 9, name: "Scooter #9", status: "Rented", lat: -35.6619, lng: -63.7562, blocked: false },
  { id: 10, name: "Scooter #10", status: "Available", lat: -35.6575, lng: -63.7599, blocked: true },

  // Scooters más lejos (~10-15 cuadras)
  { id: 11, name: "Scooter #11", status: "Disabled", lat: -35.6705, lng: -63.7605, blocked: true },
  { id: 12, name: "Scooter #12", status: "Available", lat: -35.6712, lng: -63.7520, blocked: true },
  { id: 13, name: "Scooter #13", status: "Rented", lat: -35.6545, lng: -63.7620, blocked: false },
  { id: 14, name: "Scooter #14", status: "Available", lat: -35.6538, lng: -63.7505, blocked: true },
  { id: 15, name: "Scooter #15", status: "Disabled", lat: -35.6720, lng: -63.7650, blocked: true },
  { id: 16, name: "Scooter #16", status: "Available", lat: -35.6550, lng: -63.7450, blocked: true },

  // Mezcla intermedia
  { id: 17, name: "Scooter #17", status: "Rented", lat: -35.6640, lng: -63.7610, blocked: false },
  { id: 18, name: "Scooter #18", status: "Available", lat: -35.6608, lng: -63.7635, blocked: true },
  { id: 19, name: "Scooter #19", status: "Disabled", lat: -35.6570, lng: -63.7535, blocked: true },
  { id: 20, name: "Scooter #20", status: "Available", lat: -35.6625, lng: -63.7545, blocked: true },
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
