import { useQuery } from '@tanstack/react-query';

const fetchStations = async () => {
  return [
    { id: 1, name: "Central Station", lat: -34.53, lng: -58.8 },
    { id: 2, name: "North Plaza", lat: -34.54, lng: -58.79 },
  ];
};

export function useStations() {
  return useQuery({
    queryKey: ['stations'],
    queryFn: fetchStations,
  });
}
