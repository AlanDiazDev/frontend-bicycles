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
  { id: 1, name: "Bike #1", status: "Available", lat: -35.6593, lng: -63.7579 },
  { id: 2, name: "Bike #2", status: "Rented", lat: -35.6598, lng: -63.7582 },
  { id: 3, name: "Bike #3", status: "Disabled", lat: -35.6601, lng: -63.7575 },
  { id: 4, name: "Bike #4", status: "Available", lat: -35.6605, lng: -63.7587 },
  { id: 5, name: "Bike #5", status: "Rented", lat: -35.6590, lng: -63.7589 },
  { id: 6, name: "Bike #6", status: "Available", lat: -35.6597, lng: -63.7593 },
  { id: 7, name: "Bike #7", status: "Available", lat: -35.6602, lng: -63.7598 },
  { id: 8, name: "Bike #8", status: "Available", lat: -35.6608, lng: -63.7572 },
  { id: 9, name: "Bike #9", status: "Rented", lat: -35.6610, lng: -63.7581 },
  { id: 10, name: "Bike #10", status: "Available", lat: -35.6613, lng: -63.7590 },
  { id: 11, name: "Bike #11", status: "Available", lat: -35.6616, lng: -63.7577 },
  { id: 12, name: "Bike #12", status: "Disabled", lat: -35.6619, lng: -63.7585 },
  { id: 13, name: "Bike #13", status: "Rented", lat: -35.6622, lng: -63.7592 },
  { id: 14, name: "Bike #14", status: "Available", lat: -35.6625, lng: -63.7574 },
  { id: 15, name: "Bike #15", status: "Available", lat: -35.6628, lng: -63.7583 },
  { id: 16, name: "Bike #16", status: "Available", lat: -35.6631, lng: -63.7591 },
  { id: 17, name: "Bike #17", status: "Disabled", lat: -35.6634, lng: -63.7576 },
  { id: 18, name: "Bike #18", status: "Available", lat: -35.6637, lng: -63.7584 },
  { id: 19, name: "Bike #19", status: "Available", lat: -35.6640, lng: -63.7593 },
  { id: 20, name: "Bike #20", status: "Available", lat: -35.6643, lng: -63.7578 },
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
