// usersService.js

let users = [
  { id: 1, name: "Carlos Gómez", email: "carlos.gomez@gmail.com", status: "Inactive", dni: "30123456", lastActivity: "2025-12-01" },
  { id: 2, name: "María López", email: "maria.lopez@yahoo.com", status: "Active", dni: "31123457", lastActivity: "2026-01-15" },
  { id: 3, name: "Juan Pérez", email: "juanperez@hotmail.com", status: "Inactive", dni: "32123458", lastActivity: "2025-11-20" },
  { id: 4, name: "Lucía Fernández", email: "lucia.fernandez@gmail.com", status: "Active", dni: "33123459", lastActivity: "2026-01-10" },
  { id: 5, name: "Martín Rodríguez", email: "martin.rod@gmail.com", status: "Inactive", dni: "34123460", lastActivity: "2025-12-18" },
  { id: 6, name: "Sofía Martínez", email: "sofia.mtz@outlook.com", status: "Active", dni: "35123461", lastActivity: "2026-01-22" },
  { id: 7, name: "Diego Torres", email: "d.torres@gmail.com", status: "Active", dni: "36123462", lastActivity: "2026-01-19" },
  { id: 8, name: "Valentina Castro", email: "valen.castro@yahoo.com", status: "Inactive", dni: "37123463", lastActivity: "2025-10-05" },
  { id: 9, name: "Agustín Romero", email: "agustin.romero@gmail.com", status: "Active", dni: "38123464", lastActivity: "2026-01-08" },
  { id: 10, name: "Camila Herrera", email: "camila.herrera@hotmail.com", status: "Inactive", dni: "39123465", lastActivity: "2025-09-30" },
  { id: 11, name: "Federico Díaz", email: "fede.diaz@gmail.com", status: "Active", dni: "40123466", lastActivity: "2026-01-20" },
  { id: 12, name: "Julieta Morales", email: "julieta.morales@outlook.com", status: "Active", dni: "41123467", lastActivity: "2026-01-17" },
  { id: 13, name: "Nicolás Vega", email: "nico.vega@gmail.com", status: "Inactive", dni: "42123468", lastActivity: "2025-11-02" },
  { id: 14, name: "Florencia Rivas", email: "flor.rivas@yahoo.com", status: "Active", dni: "43123469", lastActivity: "2026-01-12" },
  { id: 15, name: "Leandro Suárez", email: "leandro.suarez@gmail.com", status: "Active", dni: "44123470", lastActivity: "2026-01-05" },
  { id: 16, name: "Carolina Méndez", email: "caro.mendez@hotmail.com", status: "Inactive", dni: "45123471", lastActivity: "2025-12-28" },
  { id: 17, name: "Gabriel Navarro", email: "gabriel.nav@gmail.com", status: "Active", dni: "46123472", lastActivity: "2026-01-21" },
  { id: 18, name: "Antonella Ruiz", email: "antonella.ruiz@gmail.com", status: "Active", dni: "47123473", lastActivity: "2026-01-14" },
  { id: 19, name: "Sebastián Ortega", email: "seb.ortega@yahoo.com", status: "Inactive", dni: "48123474", lastActivity: "2025-11-25" },
  { id: 20, name: "Paula Giménez", email: "paula.gimenez@gmail.com", status: "Active", dni: "49123475", lastActivity: "2026-01-09" },
  { id: 21, name: "Matías Cabrera", email: "matias.cabrera@gmail.com", status: "Active", dni: "50123476", lastActivity: "2026-01-07" },
  { id: 22, name: "Carla Domínguez", email: "carla.dominguez@outlook.com", status: "Inactive", dni: "51123477", lastActivity: "2025-11-12" },
  { id: 23, name: "Franco Medina", email: "franco.medina@gmail.com", status: "Active", dni: "52123478", lastActivity: "2026-01-08" },
  { id: 24, name: "Rocío Álvarez", email: "rocio.alvarez@yahoo.com", status: "Active", dni: "53123479", lastActivity: "2026-01-06" },
  { id: 25, name: "Tomás Silva", email: "tomas.silva@gmail.com", status: "Inactive", dni: "54123480", lastActivity: "2025-12-05" },
  { id: 26, name: "Natalia Paredes", email: "natalia.paredes@hotmail.com", status: "Active", dni: "55123481", lastActivity: "2026-01-11" },
  { id: 27, name: "Julián Bustos", email: "julian.bustos@gmail.com", status: "Inactive", dni: "56123482", lastActivity: "2025-09-18" },
  { id: 28, name: "Micaela Soto", email: "mica.soto@outlook.com", status: "Active", dni: "57123483", lastActivity: "2026-01-13" },
  { id: 29, name: "Esteban Lara", email: "esteban.lara@gmail.com", status: "Active", dni: "58123484", lastActivity: "2026-01-07" },
  { id: 30, name: "Verónica Núñez", email: "vero.nunez@yahoo.com", status: "Inactive", dni: "59123485", lastActivity: "2025-10-28" },
  { id: 31, name: "Gonzalo Figueroa", email: "gonza.figueroa@gmail.com", status: "Active", dni: "60123486", lastActivity: "2026-01-16" },
  { id: 32, name: "Andrea Salazar", email: "andrea.salazar@gmail.com", status: "Active", dni: "61123487", lastActivity: "2026-01-23" },
];


// Simulamos funciones asincrónicas como si fueran llamadas a la API
export const getUsers = async () => {
  return users;
};

export const editUser = async (id, payload) => {
  users = users.map(u => u.id === id ? { ...u, ...payload } : u);
  return users.find(u => u.id === id);
};

export const deleteUser = async (id) => {
  users = users.filter(u => u.id !== id);
  return id;
};

export const disableUser = async (id) => {
  users = users.map(u => u.id === id ? { ...u, status: "Inactive" } : u);
  return users.find(u => u.id === id);
};
