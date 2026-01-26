// stationsService.js

// Datos locales simulados
let stations = [
  { id: 1, name: "Central Station", lat: -35.6593, lng: -63.7579 },
  { id: 2, name: "North Plaza", lat: -35.6540, lng: -63.7570 },
  { id: 3, name: "South Park", lat: -35.6645, lng: -63.7600 },
  { id: 4, name: "East Terminal", lat: -35.6590, lng: -63.7500 },
  { id: 5, name: "West Avenue", lat: -35.6605, lng: -63.7650 },
  { id: 6, name: "University Station", lat: -35.6555, lng: -63.7525 },
  { id: 7, name: "Airport Link", lat: -35.6670, lng: -63.7550 },
];

// Simulamos funciones asincrónicas como si fueran llamadas a la API
export const getStations = async () => {
  return stations;
};

export const editStation = async (id, payload) => {
  stations = stations.map(s => s.id === id ? { ...s, ...payload } : s);
  return stations.find(s => s.id === id);
};

export const deleteStation = async (id) => {
  stations = stations.filter(s => s.id !== id);
  return id;
};

export const disableStation = async (id) => {
  stations = stations.map(s => s.id === id ? { ...s, status: "Disabled" } : s);
  return stations.find(s => s.id === id);
};

