import { useBikes } from '../hooks/useBikes';

export default function BikesList() {
  const { data: bikes = [], isLoading } = useBikes();

  if (isLoading) return <p>Loading bikes...</p>;

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Bicycles</h3>
      <ul className="space-y-2">
        {bikes.map(b => (
          <li key={b.id} className="p-2 bg-gray-100 rounded">
            {b.name} - {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
