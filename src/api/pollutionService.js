// Datos locales simulados
let pollutionRecords = [
  { id: 1, name: "Sensor #1", category: "Aire", type: "CO2", level: 85, lat: -35.6600, lng: -63.7600 },
  { id: 2, name: "Sensor #2", category: "Aire", type: "PM2.5", level: 40, lat: -35.6550, lng: -63.7600 },
  { id: 3, name: "Sensor #3", category: "Acústica", type: "Ruido", level: 65, lat: -35.6500, lng: -63.7620 },
  { id: 4, name: "Sensor #4", category: "Lumínica", type: "Lux", level: 20, lat: -35.6650, lng: -63.7600 },
  { id: 5, name: "Sensor #5", category: "Aire", type: "NO2", level: 55, lat: -35.6700, lng: -63.7620 },
  { id: 6, name: "Sensor #6", category: "Acústica", type: "Ruido", level: 72, lat: -35.6600, lng: -63.7550 },
  { id: 7, name: "Sensor #7", category: "Lumínica", type: "Lux", level: 33, lat: -35.6620, lng: -63.7500 },
  { id: 8, name: "Sensor #8", category: "Aire", type: "CO2", level: 90, lat: -35.6600, lng: -63.7650 },
  { id: 9, name: "Sensor #9", category: "Aire", type: "PM10", level: 25, lat: -35.6620, lng: -63.7700 },
  { id: 10, name: "Sensor #10", category: "Acústica", type: "Ruido", level: 60, lat: -35.6450, lng: -63.7580 },
  { id: 11, name: "Sensor #11", category: "Lumínica", type: "Lux", level: 45, lat: -35.6480, lng: -63.7520 },
  { id: 12, name: "Sensor #12", category: "Aire", type: "SO2", level: 70, lat: -35.6750, lng: -63.7580 },
  { id: 13, name: "Sensor #13", category: "Acústica", type: "Ruido", level: 50, lat: -35.6780, lng: -63.7520 },
  { id: 14, name: "Sensor #14", category: "Lumínica", type: "Lux", level: 15, lat: -35.6620, lng: -63.7800 },
  { id: 15, name: "Sensor #15", category: "Aire", type: "CO2", level: 95, lat: -35.6580, lng: -63.7850 },
];



// Obtener lista
// export const getPollution = async () => pollutionRecords;
export const getPollution = async () => {
  return pollutionRecords;
};


// Editar
export const editPollution = async (id, payload) => {
  pollutionRecords = pollutionRecords.map(p => p.id === id ? { ...p, ...payload } : p);
  return pollutionRecords.find(p => p.id === id);
};

// Eliminar
export const deletePollution = async (id) => {
  pollutionRecords = pollutionRecords.filter(p => p.id !== id);
  return id;
};

// Agregar nuevo
export const addPollution = async (payload) => {
  const nextId = pollutionRecords.length > 0 ? Math.max(...pollutionRecords.map(p => p.id)) + 1 : 1;
  const newRecord = { id: nextId, ...payload };
  pollutionRecords.push(newRecord);
  return newRecord;
};
