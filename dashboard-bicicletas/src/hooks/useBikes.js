// import { useQuery } from '@tanstack/react-query';

// // Simulated fetch with mock data
// const fetchBikes = async () => {
//   return [
//     { id: 1, name: "Bike #1", status: "Available", lat: -34.52, lng: -58.81 },
//     { id: 2, name: "Bike #2", status: "Rented", lat: -34.51, lng: -58.82 },
//   ];
// };

// export function useBikes() {
//   return useQuery({
//     queryKey: ['bikes'],
//     queryFn: fetchBikes,
//   });
// }

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBikes, editBike, deleteBike, disableBike } from '../api/bikesService';

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

  return {
    ...bikesQuery,
    editBike: editMutation.mutate,
    deleteBike: deleteMutation.mutate,
    disableBike: disableMutation.mutate,
  };
}

