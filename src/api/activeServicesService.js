// Datos locales simulados con ubicación
let activeServices = [
  {
    id: 1,
    bikeId: 25,
    userId: 101,
    // hace 1 hora
    startTime: new Date("2026-01-29T05:39:00"),
    distance: 3.2,
    lat: -35.6600,
    lng: -63.7580,
  },
  {
    id: 2,
    bikeId: 26,
    userId: 102,
    // hace 1h30
    startTime: new Date("2026-01-29T05:09:00"),
    distance: 5.5,
    lat: -35.6612,
    lng: -63.7595,
  },
  {
    id: 3,
    bikeId: 27,
    userId: 103,
    // hace 3h30
    startTime: new Date("2026-01-29T03:09:00"),
    distance: 2.1,
    lat: -35.6628,
    lng: -63.7565,
  },
  {
    id: 4,
    bikeId: 28,
    userId: 104,
    // hace 4h
    startTime: new Date("2026-01-29T02:39:00"),
    distance: 7.8,
    lat: -35.6645,
    lng: -63.7610,
  },
  {
    id: 5,
    bikeId: 29,
    userId: 105,
    // hace 2h
    startTime: new Date("2026-01-29T04:39:00"),
    distance: 4.0,
    lat: -35.6680,
    lng: -63.7635,
  },
  {
    id: 6,
    bikeId: 30,
    userId: 106,
    // hace 1h15
    startTime: new Date("2026-01-29T05:24:00"),
    distance: 6.3,
    lat: -35.6715,
    lng: -63.7505,
  },
  {
    id: 7,
    bikeId: 25,
    userId: 107,
    // hace 3h
    startTime: new Date("2026-01-29T03:39:00"),
    distance: 1.9,
    lat: -35.6590,
    lng: -63.7500,
  },
  {
    id: 8,
    bikeId: 26,
    userId: 108,
    // hace 2h30
    startTime: new Date("2026-01-29T04:09:00"),
    distance: 8.4,
    lat: -35.6593,
    lng: -63.7579,
  },
  {
    id: 9,
    bikeId: 27,
    userId: 109,
    // hace 1h45
    startTime: new Date("2026-01-29T04:54:00"),
    distance: 2.7,
    lat: -35.6565,
    lng: -63.7545,
  },
];


// Obtener lista
export const getActiveServices = async () => {
  return activeServices;
};

// Agregar nuevo
export const addActiveService = async (payload) => {
  const nextId =
    activeServices.length > 0
      ? Math.max(...activeServices.map((s) => s.id)) + 1
      : 1;
  const newService = { id: nextId, ...payload };
  activeServices.push(newService);
  return newService;
};

// Editar
export const editActiveService = async (id, payload) => {
  activeServices = activeServices.map((s) =>
    s.id === id ? { ...s, ...payload } : s
  );
  return activeServices.find((s) => s.id === id);
};

// Eliminar
export const deleteActiveService = async (id) => {
  activeServices = activeServices.filter((s) => s.id !== id);
  return id;
};
