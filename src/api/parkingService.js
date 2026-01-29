// parkingService.js

let parkingRecords = [
  { id: 1, name: "Parking #1", type: "Calle", status: "Disponible", street: "Av. San Martín 1200", sector: "P1200", lat: -35.6605, lng: -63.7582 },
  { id: 2, name: "Parking #2", type: "Calle", status: "Ocupado", street: "Calle 10 850", sector: "I850", lat: -35.6620, lng: -63.7600 },
  { id: 3, name: "Parking #3", type: "Calle", status: "Deshabilitado", street: "Calle 20 450", sector: "I450", lat: -35.6640, lng: -63.7620 },
  { id: 4, name: "Parking #4", type: "Playon", status: "Disponible", street: "Av. Circunvalación 1500", sector: "G14", lat: -35.6660, lng: -63.7640 },
  { id: 5, name: "Parking #5", type: "Calle", status: "Ocupado", street: "Calle 25 600", sector: "P600", lat: -35.6680, lng: -63.7660 },
  { id: 6, name: "Parking #6", type: "Calle", status: "Disponible", street: "Calle 2 300", sector: "I300", lat: -35.6700, lng: -63.7680 },
  { id: 7, name: "Parking #7", type: "Calle", status: "Ocupado", street: "Av. San Martín 1350", sector: "I1350", lat: -35.6720, lng: -63.7700 },
  { id: 8, name: "Parking #8", type: "Playon", status: "Deshabilitado", street: "Calle 15 700", sector: "G15", lat: -35.6740, lng: -63.7720 },
  { id: 9, name: "Parking #9", type: "Calle", status: "Disponible", street: "Calle 5 250", sector: "I250", lat: -35.6760, lng: -63.7740 },
  { id: 10, name: "Parking #10", type: "Calle", status: "Ocupado", street: "Calle 8 900", sector: "P900", lat: -35.6780, lng: -63.7760 },
  { id: 11, name: "Parking #11", type: "Playon", status: "Disponible", street: "Av. Circunvalación 1800", sector: "G18", lat: -35.6800, lng: -63.7780 },
  { id: 12, name: "Parking #12", type: "Calle", status: "Ocupado", street: "Calle 12 1100", sector: "P1100", lat: -35.6820, lng: -63.7800 },
  { id: 13, name: "Parking #13", type: "Calle", status: "Deshabilitado", street: "Calle 18 500", sector: "I500", lat: -35.6840, lng: -63.7820 },
  { id: 14, name: "Parking #14", type: "Calle", status: "Disponible", street: "Calle 22 950", sector: "I950", lat: -35.6599, lng: -63.7718 },
  { id: 15, name: "Parking #15", type: "Playon", status: "Ocupado", street: "Av. San Martín 1450", sector: "G14", lat: -35.6587, lng: -63.7713 },
];


export default parkingRecords;


// Obtener todos
export const getParking = async () => {
  return parkingRecords;
};

// Agregar nuevo
export const addParking = async (parking) => {
  const newParking = { id: Date.now(), ...parking };
  parkingRecords.push(newParking);
  return newParking;
};

// Editar existente
export const editParking = async (id, payload) => {
  parkingRecords = parkingRecords.map((p) => (p.id === id ? { ...p, ...payload } : p));
  return parkingRecords.find((p) => p.id === id);
};

// Eliminar
export const deleteParking = async (id) => {
  parkingRecords = parkingRecords.filter((p) => p.id !== id);
  return true;
};
