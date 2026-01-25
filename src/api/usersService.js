// usersService.js

let users = [
  { id: 1, name: "User #1", email: "user1@example.com", status: "Inactive" },
  { id: 2, name: "User #2", email: "user2@example.com", status: "Inactive" },
  { id: 3, name: "User #3", email: "user3@example.com", status: "Inactive" },
  { id: 4, name: "User #4", email: "user4@example.com", status: "Inactive" },
  { id: 5, name: "User #5", email: "user5@example.com", status: "Inactive" },
  { id: 6, name: "User #6", email: "user6@example.com", status: "Active" },
  { id: 7, name: "User #7", email: "user7@example.com", status: "Active" },
  { id: 8, name: "User #8", email: "user8@example.com", status: "Active" },
  { id: 9, name: "User #9", email: "user9@example.com", status: "Active" },
  { id: 10, name: "User #10", email: "user10@example.com", status: "Inactive" },
  { id: 11, name: "User #11", email: "user11@example.com", status: "Active" },
  { id: 12, name: "User #12", email: "user12@example.com", status: "Active" },
  { id: 13, name: "User #13", email: "user13@example.com", status: "Inactive" },
  { id: 14, name: "User #14", email: "user14@example.com", status: "Active" },
  { id: 15, name: "User #15", email: "user15@example.com", status: "Active" },
  { id: 16, name: "User #16", email: "user16@example.com", status: "Inactive" },
  { id: 17, name: "User #17", email: "user17@example.com", status: "Active" },
  { id: 18, name: "User #18", email: "user18@example.com", status: "Active" },
  { id: 19, name: "User #19", email: "user19@example.com", status: "Inactive" },
  { id: 20, name: "User #20", email: "user20@example.com", status: "Active" },
  { id: 21, name: "User #21", email: "user21@example.com", status: "Active" },
  { id: 22, name: "User #22", email: "user22@example.com", status: "Inactive" },
  { id: 23, name: "User #23", email: "user23@example.com", status: "Active" },
  { id: 24, name: "User #24", email: "user24@example.com", status: "Active" },
  { id: 25, name: "User #25", email: "user25@example.com", status: "Inactive" },
  { id: 26, name: "User #26", email: "user26@example.com", status: "Active" },
  { id: 27, name: "User #27", email: "user27@example.com", status: "Inactive" },
  { id: 28, name: "User #28", email: "user28@example.com", status: "Active" },
  { id: 29, name: "User #29", email: "user29@example.com", status: "Active" },
  { id: 30, name: "User #30", email: "user30@example.com", status: "Inactive" },
  { id: 31, name: "User #31", email: "user31@example.com", status: "Active" },
  { id: 32, name: "User #32", email: "user32@example.com", status: "Active" },
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
