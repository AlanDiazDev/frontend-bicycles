import { useStations } from '../hooks/useStations';

export default function StationsList() {
  const { data: stations = [], isLoading } = useStations();

  if (isLoading) return <p>Loading stations...</p>;

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Stations</h3>
      <ul className="space-y-2">
        {stations.map(s => (
          <li key={s.id} className="p-2 bg-gray-100 rounded">
            {s.name} — Lat: {s.lat}, Lng: {s.lng}
          </li>
        ))}
      </ul>
    </div>
  );
}
