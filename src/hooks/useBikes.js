import { useQuery } from '@tanstack/react-query';

// Simulated fetch with mock data
const fetchBikes = async () => {
  return [
    { id: 1, name: "Bike #1", status: "Available", lat: -34.52, lng: -58.81 },
    { id: 2, name: "Bike #2", status: "Rented", lat: -34.51, lng: -58.82 },
  ];
};

export function useBikes() {
  return useQuery({
    queryKey: ['bikes'],
    queryFn: fetchBikes,
  });
}
