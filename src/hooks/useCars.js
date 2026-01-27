import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCars, editCar, deleteCar, disableCar, addCar } from '../api/carsService';

export function useCars() {
  const queryClient = useQueryClient();

  // Obtener lista de autos
  const carsQuery = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  // Mutaciones
  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editCar(id, payload),
    onSuccess: () => queryClient.invalidateQueries(['cars']),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCar(id),
    onSuccess: () => queryClient.invalidateQueries(['cars']),
  });

  const disableMutation = useMutation({
    mutationFn: (id) => disableCar(id),
    onSuccess: () => queryClient.invalidateQueries(['cars']),
  });

  const addMutation = useMutation({
    mutationFn: (payload) => addCar(payload),
    onSuccess: () => queryClient.invalidateQueries(['cars']),
  });

  return {
    ...carsQuery,
    editCar: editMutation.mutate,
    deleteCar: deleteMutation.mutate,
    disableCar: disableMutation.mutate,
    addCar: addMutation.mutate,
  };
}
