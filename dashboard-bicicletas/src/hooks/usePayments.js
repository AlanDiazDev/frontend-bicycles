// src/hooks/usePayments.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock inicial de pagos
let payments = [
  { id: 1, date: "2026-01-25", time: "18:30", amount: 1500, userId: 3 },
  { id: 2, date: "2026-01-25", time: "19:00", amount: 2000, userId: 1 },
  { id: 3, date: "2026-01-24", time: "17:15", amount: 1000, userId: 2 },
];

export const getPayments = async () => payments;

export const addPayment = async (payment) => {
  payments = [...payments, { id: payments.length + 1, ...payment }];
  return payment;
};

export const deletePayment = async (id) => {
  payments = payments.filter(p => p.id !== id);
  return id;
};

export function usePayments() {
  const queryClient = useQueryClient();

  const paymentsQuery = useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,
  });

  const addMutation = useMutation({
    mutationFn: addPayment,
    onSuccess: () => queryClient.invalidateQueries(['payments']),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePayment,
    onSuccess: () => queryClient.invalidateQueries(['payments']),
  });

  return {
    ...paymentsQuery,
    addPayment: addMutation.mutate,
    deletePayment: deleteMutation.mutate,
  };
}
