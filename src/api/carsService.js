// carsService.js

// Datos locales simulados
let cars = [
  { id: 1, name: "Car #1", status: "Available", lat: -35.6605, lng: -63.7582, stationId: 1 },
  { id: 2, name: "Car #2", status: "Disabled", lat: -35.6621, lng: -63.7610, stationId: 2 },
  { id: 3, name: "Car #3", status: "Available", lat: -35.6643, lng: -63.7568, stationId: 3 },
  { id: 4, name: "Car #4", status: "Rented", lat: -35.6670, lng: -63.7595, stationId: 4 },
  { id: 5, name: "Car #5", status: "Available", lat: -35.6692, lng: -63.7623, stationId: 5 },
  { id: 6, name: "Car #6", status: "Available", lat: -35.6618, lng: -63.7640, stationId: 6 },
  { id: 7, name: "Car #7", status: "Disabled", lat: -35.6635, lng: -63.7662, stationId: 7 },
  { id: 8, name: "Car #8", status: "Rented", lat: -35.6657, lng: -63.7607, stationId: 8 },
  { id: 9, name: "Car #9", status: "Available", lat: -35.6681, lng: -63.7579, stationId: 9 },
  { id: 10, name: "Car #10", status: "Available", lat: -35.6704, lng: -63.7615, stationId: 10 },
  { id: 11, name: "Car #11", status: "Disabled", lat: -35.6627, lng: -63.7555, stationId: 11 },
  { id: 12, name: "Car #12", status: "Rented", lat: -35.6649, lng: -63.7638, stationId: 12 },
  { id: 13, name: "Car #13", status: "Available", lat: -35.6673, lng: -63.7651, stationId: 13 },
  { id: 14, name: "Car #14", status: "Available", lat: -35.6697, lng: -63.7586, stationId: 14 },
  { id: 15, name: "Car #15", status: "Disabled", lat: -35.6715, lng: -63.7644, stationId: 15 },
];


// Obtener lista
export const getCars = async () => {
  return cars;
};

// Editar
export const editCar = async (id, payload) => {
  cars = cars.map(c => c.id === id ? { ...c, ...payload } : c);
  return cars.find(c => c.id === id);
};

// Eliminar
export const deleteCar = async (id) => {
  cars = cars.filter(c => c.id !== id);
  return id;
};

// Deshabilitar
export const disableCar = async (id) => {
  cars = cars.map(c => c.id === id ? { ...c, status: "Disabled" } : c);
  return cars.find(c => c.id === id);
};

// Agregar nuevo (ID = maxId + 1)
export const addCar = async (payload) => {
  const nextId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;
  const newCar = { id: nextId, ...payload };
  cars.push(newCar);
  return newCar;
};
