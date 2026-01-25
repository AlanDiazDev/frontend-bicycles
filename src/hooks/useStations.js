// import { useQuery } from '@tanstack/react-query';

// const fetchStations = async () => {
//   return [
//     { id: 1, name: "Central Station", lat: -34.53, lng: -58.8 },
//     { id: 2, name: "North Plaza", lat: -34.54, lng: -58.79 },
//   ];
// };

// export function useStations() {
//   return useQuery({
//     queryKey: ['stations'],
//     queryFn: fetchStations,
//   });
// }


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStations, editStation, deleteStation, disableStation } from '../api/stationsService';

export function useStations() {
  const queryClient = useQueryClient();

  const stationsQuery = useQuery({
    queryKey: ['stations'],
    queryFn: getStations,
  });

  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editStation(id, payload),
    onSuccess: () => queryClient.invalidateQueries(['stations']),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteStation(id),
    onSuccess: () => queryClient.invalidateQueries(['stations']),
  });

  const disableMutation = useMutation({
    mutationFn: (id) => disableStation(id),
    onSuccess: () => queryClient.invalidateQueries(['stations']),
  });

  return {
    ...stationsQuery,
    editStation: editMutation.mutate,
    deleteStation: deleteMutation.mutate,
    disableStation: disableMutation.mutate,
  };
}
