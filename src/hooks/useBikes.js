import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBikes, editBike, deleteBike, disableBike, addBike } from '../api/bikesService';

export function useBikes() {
  const queryClient = useQueryClient();

  // Obtener lista de bicicletas
  const bikesQuery = useQuery({
    queryKey: ['bikes'],
    queryFn: getBikes,
  });

  // Mutaciones
  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editBike(id, payload),
    onSuccess: () => queryClient.invalidateQueries(['bikes']),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBike(id),
    onSuccess: () => queryClient.invalidateQueries(['bikes']),
  });

  const disableMutation = useMutation({
    mutationFn: (id) => disableBike(id),
    onSuccess: () => queryClient.invalidateQueries(['bikes']),
  });

  const addMutation = useMutation({
    mutationFn: (payload) => addBike(payload),
    onSuccess: () => queryClient.invalidateQueries(['bikes']),
  });

  return {
    ...bikesQuery,
    editBike: editMutation.mutate,
    deleteBike: deleteMutation.mutate,
    disableBike: disableMutation.mutate,
    addBike: addMutation.mutate,
  };
}
