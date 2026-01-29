import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getActiveServices,
  addActiveService,
  editActiveService,
  deleteActiveService,
} from '../api/activeServicesService';

export function useActiveServices() {
  const queryClient = useQueryClient();

  // Obtener lista de servicios activos
  const servicesQuery = useQuery({
    queryKey: ['activeServices'],
    queryFn: getActiveServices,
  });

  // Mutaciones
  const addMutation = useMutation({
    mutationFn: (payload) => addActiveService(payload),
    onSuccess: () => queryClient.invalidateQueries(['activeServices']),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editActiveService(id, payload),
    onSuccess: () => queryClient.invalidateQueries(['activeServices']),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteActiveService(id),
    onSuccess: () => queryClient.invalidateQueries(['activeServices']),
  });

  return {
    ...servicesQuery,
    addService: addMutation.mutate,
    editService: editMutation.mutate,
    deleteService: deleteMutation.mutate,
  };
}
