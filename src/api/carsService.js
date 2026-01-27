// carsService.js

// Datos locales simulados
let cars = [
  { id: 1, name: "Car #1", status: "Available", lat: -35.6600, lng: -63.7580, stationId: 1 },
  { id: 2, name: "Car #2", status: "Disabled", lat: -35.6610, lng: -63.7590, stationId: 2 },
  { id: 3, name: "Car #3", status: "Available", lat: -35.6620, lng: -63.7575, stationId: 3 },
  { id: 4, name: "Car #4", status: "Rented", lat: -35.6630, lng: -63.7585, stationId: 4 },
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
