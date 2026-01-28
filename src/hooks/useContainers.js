import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContainers, editContainer, deleteContainer, addContainer } from '../api/containersService';

export function useContainers() {
  const queryClient = useQueryClient();

  // Obtener lista de contenedores
  const containersQuery = useQuery({
    queryKey: ['containers'],
    queryFn: getContainers,
  });

  // Mutaciones
  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editContainer(id, payload),
    onSuccess: () => queryClient.invalidateQueries(['containers']),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteContainer(id),
    onSuccess: () => queryClient.invalidateQueries(['containers']),
  });

  const addMutation = useMutation({
    mutationFn: (payload) => addContainer(payload),
    onSuccess: () => queryClient.invalidateQueries(['containers']),
  });

  return {
    ...containersQuery,
    editContainer: editMutation.mutate,
    deleteContainer: deleteMutation.mutate,
    addContainer: addMutation.mutate,
  };
}
