// // src/hooks/usePayments.js
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// // Mock inicial de pagos
// let payments = [
//   { id: 1, date: "2026-01-25", time: "18:30", amount: 1500, userId: 3 },
//   { id: 2, date: "2026-01-25", time: "19:00", amount: 2000, userId: 1 },
//   { id: 3, date: "2026-01-24", time: "17:15", amount: 1000, userId: 2 },
//   { id: 4, date: "2026-01-24", time: "20:45", amount: 2500, userId: 4 },
//   { id: 5, date: "2026-01-23", time: "09:10", amount: 1800, userId: 5 },
//   { id: 6, date: "2026-01-23", time: "11:25", amount: 2200, userId: 2 },
//   { id: 7, date: "2026-01-22", time: "14:00", amount: 1300, userId: 1 },
//   { id: 8, date: "2026-01-22", time: "16:30", amount: 1700, userId: 3 },
//   { id: 9, date: "2026-01-21", time: "10:15", amount: 900, userId: 4 },
//   { id: 10, date: "2026-01-21", time: "12:45", amount: 2100, userId: 5 },
//   { id: 11, date: "2026-01-20", time: "15:20", amount: 1600, userId: 2 },
//   { id: 12, date: "2026-01-20", time: "18:05", amount: 2400, userId: 1 },
//   { id: 13, date: "2026-01-19", time: "09:50", amount: 1200, userId: 3 },
//   { id: 14, date: "2026-01-19", time: "11:40", amount: 2000, userId: 4 },
//   { id: 15, date: "2026-01-18", time: "13:15", amount: 1500, userId: 5 },
//   { id: 16, date: "2026-01-18", time: "17:25", amount: 2300, userId: 2 },
//   { id: 17, date: "2026-01-17", time: "19:45", amount: 1400, userId: 1 },
//   { id: 18, date: "2026-01-17", time: "21:10", amount: 2600, userId: 3 },
// ];


// export const getPayments = async () => payments;

// export const addPayment = async (payment) => {
//   payments = [...payments, { id: payments.length + 1, ...payment }];
//   return payment;
// };

// export const deletePayment = async (id) => {
//   payments = payments.filter(p => p.id !== id);
//   return id;
// };

// export function usePayments() {
//   const queryClient = useQueryClient();

//   const paymentsQuery = useQuery({
//     queryKey: ['payments'],
//     queryFn: getPayments,
//   });

//   const addMutation = useMutation({
//     mutationFn: addPayment,
//     onSuccess: () => queryClient.invalidateQueries(['payments']),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deletePayment,
//     onSuccess: () => queryClient.invalidateQueries(['payments']),
//   });

//   return {
//     ...paymentsQuery,
//     addPayment: addMutation.mutate,
//     deletePayment: deleteMutation.mutate,
//   };
// }

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPayments, addPayment, editPayment, deletePayment, disablePayment } from '../api/paymentsService';

export function usePayments() {
  const queryClient = useQueryClient();

  // Query principal para obtener pagos
  const paymentsQuery = useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,
  });

  // Mutación para agregar pago
  const addMutation = useMutation({
    mutationFn: (payload) => addPayment(payload),
    onSuccess: () => queryClient.invalidateQueries(['payments']),
  });

  // Mutación para editar pago
  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editPayment(id, payload),
    onSuccess: () => queryClient.invalidateQueries(['payments']),
  });

  // Mutación para eliminar pago
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePayment(id),
    onSuccess: () => queryClient.invalidateQueries(['payments']),
  });

  // Mutación para deshabilitar pago
  const disableMutation = useMutation({
    mutationFn: (id) => disablePayment(id),
    onSuccess: () => queryClient.invalidateQueries(['payments']),
  });

  return {
    ...paymentsQuery,
    addPayment: addMutation.mutate,
    editPayment: editMutation.mutate,
    deletePayment: deleteMutation.mutate,
    disablePayment: disableMutation.mutate,
  };
}

