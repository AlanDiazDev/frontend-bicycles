// import axios from 'axios';

// const API_URL = "http://localhost:5000/api/bikes"; // Ajustá según tu backend

// export const getBikes = async () => {
//   const { data } = await axios.get(API_URL);
//   return data;
// };

// export const editBike = async (id, payload) => {
//   const { data } = await axios.put(`${API_URL}/${id}`, payload);
//   return data;
// };

// export const deleteBike = async (id) => {
//   await axios.delete(`${API_URL}/${id}`);
//   return id;
// };

// export const disableBike = async (id) => {
//   const { data } = await axios.patch(`${API_URL}/${id}/disable`);
//   return data;
// };


// bikesService.js

// Datos locales simulados
let bikes = [
  // Disponibles y Deshabilitadas en estaciones
  { id: 1, name: "Bike #1", status: "Available", lat: -35.6593, lng: -63.7579, stationId: 1 },
  { id: 2, name: "Bike #2", status: "Disabled", lat: -35.6594, lng: -63.7578, stationId: 1 },
  { id: 3, name: "Bike #3", status: "Available", lat: -35.6540, lng: -63.7570, stationId: 2 },
  { id: 4, name: "Bike #4", status: "Disabled", lat: -35.6541, lng: -63.7571, stationId: 2 },
  { id: 5, name: "Bike #5", status: "Available", lat: -35.6645, lng: -63.7600, stationId: 3 },
  { id: 6, name: "Bike #6", status: "Available", lat: -35.6646, lng: -63.7601, stationId: 3 },
  { id: 7, name: "Bike #7", status: "Disabled", lat: -35.6647, lng: -63.7602, stationId: 3 },
  { id: 8, name: "Bike #8", status: "Available", lat: -35.6590, lng: -63.7500, stationId: 4 },
  { id: 9, name: "Bike #9", status: "Disabled", lat: -35.6591, lng: -63.7501, stationId: 4 },
  { id: 10, name: "Bike #10", status: "Available", lat: -35.6605, lng: -63.7650, stationId: 5 },
  { id: 11, name: "Bike #11", status: "Available", lat: -35.6606, lng: -63.7651, stationId: 5 },
  { id: 12, name: "Bike #12", status: "Disabled", lat: -35.6607, lng: -63.7652, stationId: 5 },
  { id: 13, name: "Bike #13", status: "Available", lat: -35.6555, lng: -63.7525, stationId: 6 },
  { id: 14, name: "Bike #14", status: "Disabled", lat: -35.6556, lng: -63.7526, stationId: 6 },
  { id: 15, name: "Bike #15", status: "Available", lat: -35.6670, lng: -63.7550, stationId: 7 },
  { id: 16, name: "Bike #16", status: "Available", lat: -35.6671, lng: -63.7551, stationId: 7 },
  { id: 17, name: "Bike #17", status: "Disabled", lat: -35.6672, lng: -63.7552, stationId: 7 },
  { id: 18, name: "Bike #18", status: "Available", lat: -35.6685, lng: -63.7605, stationId: 8 },
  { id: 19, name: "Bike #19", status: "Disabled", lat: -35.6686, lng: -63.7606, stationId: 8 },
  { id: 20, name: "Bike #20", status: "Available", lat: -35.6565, lng: -63.7545, stationId: 9 },
  { id: 21, name: "Bike #21", status: "Available", lat: -35.6566, lng: -63.7546, stationId: 9 },
  { id: 22, name: "Bike #22", status: "Disabled", lat: -35.6567, lng: -63.7547, stationId: 9 },
  { id: 23, name: "Bike #23", status: "Available", lat: -35.6620, lng: -63.7620, stationId: 10 },
  { id: 24, name: "Bike #24", status: "Disabled", lat: -35.6621, lng: -63.7621, stationId: 10 },

  // Bicis rentadas distribuidas por General Pico
{ id: 25, name: "Bike #25", status: "Rented", lat: -35.6600, lng: -63.7580, stationId: 1 }, 
{ id: 26, name: "Bike #26", status: "Rented", lat: -35.6610, lng: -63.7590, stationId: 2 }, 
{ id: 27, name: "Bike #27", status: "Rented", lat: -35.6620, lng: -63.7575, stationId: 3 }, 
{ id: 28, name: "Bike #28", status: "Rented", lat: -35.6630, lng: -63.7585, stationId: 4 }, 
{ id: 29, name: "Bike #29", status: "Rented", lat: -35.6640, lng: -63.7595, stationId: 5 }, 
{ id: 30, name: "Bike #30", status: "Rented", lat: -35.6650, lng: -63.7600, stationId: 6 }, 

];

// Simulamos funciones asincrónicas como si fueran llamadas a la API
export const getBikes = async () => {
  return bikes;
};

export const editBike = async (id, payload) => {
  bikes = bikes.map(b => b.id === id ? { ...b, ...payload } : b);
  return bikes.find(b => b.id === id);
};

export const deleteBike = async (id) => {
  bikes = bikes.filter(b => b.id !== id);
  return id;
};

export const disableBike = async (id) => {
  bikes = bikes.map(b => b.id === id ? { ...b, status: "Disabled" } : b);
  return bikes.find(b => b.id === id);
};
