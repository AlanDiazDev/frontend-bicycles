import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, editUser, deleteUser, disableUser } from '../api/usersService';

export function useUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editUser(id, payload),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });

  const disableMutation = useMutation({
    mutationFn: (id) => disableUser(id),
    onSuccess: () => queryClient.invalidateQueries(['users']),
  });

  return {
    ...usersQuery,
    editUser: editMutation.mutate,
    deleteUser: deleteMutation.mutate,
    disableUser: disableMutation.mutate,
  };
}
