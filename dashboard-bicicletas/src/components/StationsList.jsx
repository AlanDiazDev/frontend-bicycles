import { useStations } from '../hooks/useStations';
import { PencilIcon, TrashIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import EditStationModal from './EditStationModal';
import AddStationModal from './AddStationModal';
import React from 'react';

export default function StationsList() {
  const { data: stations = [], isLoading, editStation, deleteStation, disableStation } = useStations();
  const [selectedStation, setSelectedStation] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  if (isLoading) return <p>Loading stations...</p>;

  const handleEditClick = (station) => {
    setSelectedStation(station);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedStation) => {
    editStation({ id: updatedStation.id, payload: updatedStation });
  };

  const handleSaveNew = (newStation) => {
    editStation({ id: newStation.id, payload: newStation });
  };

  return (
    <div className="bg-white border rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Stations</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Agregar Estacion
        </button>
      </div>

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Nombre</th>
            <th className="p-3 border">Coordenadas</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="p-3 border">{s.id}</td>
              <td className="p-3 border">{s.name}</td>
              <td className="p-3 border">Lat: {s.lat}, Lng: {s.lng}</td>
              <td className="p-3 border flex space-x-3">
                <button onClick={() => handleEditClick(s)} className="text-blue-500 hover:text-blue-700" title="Edit">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button onClick={() => deleteStation(s.id)} className="text-red-500 hover:text-red-700" title="Delete">
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button onClick={() => disableStation(s.id)} className="text-yellow-500 hover:text-yellow-700" title="Disable">
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      <EditStationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        station={selectedStation}
        onSave={handleSaveEdit}
      />
      <AddStationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNew}
      />
    </div>
  );
}
