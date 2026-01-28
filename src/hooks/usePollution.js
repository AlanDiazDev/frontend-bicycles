import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPollution, editPollution, deletePollution, addPollution } from '../api/pollutionService';

export function usePollution() {
  const queryClient = useQueryClient();

  const pollutionQuery = useQuery({
    queryKey: ['pollution'],
    queryFn: () => getPollution(),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editPollution(id, payload),
    onSuccess: () => queryClient.invalidateQueries(['pollution']),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePollution(id),
    onSuccess: () => queryClient.invalidateQueries(['pollution']),
  });

  const addMutation = useMutation({
    mutationFn: (payload) => addPollution(payload),
    onSuccess: () => queryClient.invalidateQueries(['pollution']),
  });

  return {
    ...pollutionQuery,
    editPollution: editMutation.mutate,
    deletePollution: deleteMutation.mutate,
    addPollution: addMutation.mutate,
  };
}
