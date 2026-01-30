import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getMotorcycles, 
  editMotorcycle, 
  deleteMotorcycle, 
  disableMotorcycle, 
  addMotorcycle 
} from '../api/motorcyclesService';

export function useMotorcycles() {
  const queryClient = useQueryClient();

  // Obtener lista de motos
  const motorcyclesQuery = useQuery({
    queryKey: ['motorcycles'],
    queryFn: getMotorcycles,
  });

  // Mutaciones
  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editMotorcycle(id, payload),
    onSuccess: () => queryClient.invalidateQueries(['motorcycles']),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteMotorcycle(id),
    onSuccess: () => queryClient.invalidateQueries(['motorcycles']),
  });

  const disableMutation = useMutation({
    mutationFn: (id) => disableMotorcycle(id),
    onSuccess: () => queryClient.invalidateQueries(['motorcycles']),
  });

  const addMutation = useMutation({
    mutationFn: (payload) => addMotorcycle(payload),
    onSuccess: () => queryClient.invalidateQueries(['motorcycles']),
  });

  return {
    ...motorcyclesQuery,
    editMotorcycle: editMutation.mutate,
    deleteMotorcycle: deleteMutation.mutate,
    disableMotorcycle: disableMutation.mutate,
    addMotorcycle: addMutation.mutate,
  };
}
