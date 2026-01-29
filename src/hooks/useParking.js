// useParking.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getParking, addParking, editParking, deleteParking } from "../api/parkingService";

export function useParking() {
  const queryClient = useQueryClient();

  // Query principal
  const parkingQuery = useQuery({
    queryKey: ["parking"],
    queryFn: () => getParking(),
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: (payload) => addParking(payload),
    onSuccess: () => queryClient.invalidateQueries(["parking"]),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => editParking(id, payload),
    onSuccess: () => queryClient.invalidateQueries(["parking"]),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteParking(id),
    onSuccess: () => queryClient.invalidateQueries(["parking"]),
  });

  return {
    ...parkingQuery,
    addParking: addMutation.mutate,
    editParking: editMutation.mutate,
    deleteParking: deleteMutation.mutate,
  };
}
