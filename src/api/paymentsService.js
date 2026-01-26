// paymentsService.js

// Datos locales simulados
let payments = [
  { id: 1, date: "2026-01-25", time: "18:30", amount: 1500, userId: 3 },
  { id: 2, date: "2026-01-25", time: "19:00", amount: 2000, userId: 1 },
  { id: 3, date: "2026-01-24", time: "17:15", amount: 1000, userId: 2 },
  { id: 4, date: "2026-01-24", time: "20:45", amount: 2500, userId: 4 },
  { id: 5, date: "2026-01-23", time: "09:10", amount: 1800, userId: 5 },
  { id: 6, date: "2026-01-23", time: "11:25", amount: 2200, userId: 2 },
  { id: 7, date: "2026-01-22", time: "14:00", amount: 1300, userId: 1 },
  { id: 8, date: "2026-01-22", time: "16:30", amount: 1700, userId: 3 },
  { id: 9, date: "2026-01-21", time: "10:15", amount: 900, userId: 4 },
  { id: 10, date: "2026-01-21", time: "12:45", amount: 2100, userId: 5 },
  { id: 11, date: "2026-01-20", time: "15:20", amount: 1600, userId: 2 },
  { id: 12, date: "2026-01-20", time: "18:05", amount: 2400, userId: 1 },
  { id: 13, date: "2026-01-19", time: "09:50", amount: 1200, userId: 3 },
  { id: 14, date: "2026-01-19", time: "11:40", amount: 2000, userId: 4 },
  { id: 15, date: "2026-01-18", time: "13:15", amount: 1500, userId: 5 },
  { id: 16, date: "2026-01-18", time: "17:25", amount: 2300, userId: 2 },
  { id: 17, date: "2026-01-17", time: "19:45", amount: 1400, userId: 1 },
  { id: 18, date: "2026-01-17", time: "21:10", amount: 2600, userId: 3 },
];

// Simulamos funciones asincrónicas como si fueran llamadas a la API
export const getPayments = async () => {
  return payments;
};

export const addPayment = async (payload) => {
  const newPayment = { id: payments.length + 1, ...payload };
  payments = [...payments, newPayment];
  return newPayment;
};

export const editPayment = async (id, payload) => {
  payments = payments.map(p => p.id === id ? { ...p, ...payload } : p);
  return payments.find(p => p.id === id);
};

export const deletePayment = async (id) => {
  payments = payments.filter(p => p.id !== id);
  return id;
};

export const disablePayment = async (id) => {
  payments = payments.map(p => p.id === id ? { ...p, status: "Disabled" } : p);
  return payments.find(p => p.id === id);
};
