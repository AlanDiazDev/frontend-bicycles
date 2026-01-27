import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getScooters, editScooter, deleteScooter, disableScooter, addScooter } from '../api/scootersService';

export function useScooters() {
  const queryClient = useQueryClient();

  // Obtener lista de scooters
  const scootersQuery = useQuery({
    queryKey: ['scooters'],
    queryFn: getScooters,
  });

  // Mutaciones
  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editScooter(id, payload),
    onSuccess: () => queryClient.invalidateQueries(['scooters']),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteScooter(id),
    onSuccess: () => queryClient.invalidateQueries(['scooters']),
  });

  const disableMutation = useMutation({
    mutationFn: (id) => disableScooter(id),
    onSuccess: () => queryClient.invalidateQueries(['scooters']),
  });

  const addMutation = useMutation({
    mutationFn: (payload) => addScooter(payload),
    onSuccess: () => queryClient.invalidateQueries(['scooters']),
  });

  return {
    ...scootersQuery,
    editScooter: editMutation.mutate,
    deleteScooter: deleteMutation.mutate,
    disableScooter: disableMutation.mutate,
    addScooter: addMutation.mutate,
  };
}
