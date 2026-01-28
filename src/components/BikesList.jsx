import { useBikes } from '../hooks/useBikes';
import { PencilIcon, TrashIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import EditModal from './EditModal';
import AddBikeModal from './AddBikeModal';
import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

export default function BikesList() {
  const { data: bikes = [], isLoading, editBike, deleteBike, disableBike, addBike } = useBikes();
  const [selectedBike, setSelectedBike] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Estado para paginado
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(bikes.length / recordsPerPage);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentBikes = bikes.slice(indexOfFirst, indexOfLast);

  // Google Maps
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  const center = { lat: -35.6593, lng: -63.7579 };

  if (isLoading) return <p>Loading bikes...</p>;

  const handleEditClick = (bike) => {
    setSelectedBike(bike);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedBike) => {
    editBike({ id: updatedBike.id, payload: updatedBike });
  };

  const handleSaveNew = (newBike) => {
    addBike(newBike);
  };

  // Íconos según estado
  const getBikeIconByStatus = (status) => {
    let url;
    switch (status) {
      case "Available": url = "/bike-green.png"; break;
      case "Rented": url = "/bike-red.png"; break;
      case "Disabled": url = "/bike-gray.png"; break;
      default: url = "/bike-blue.png";
    }
    return {
      url,
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 16),
    };
  };

  return (
    <div className="space-y-6">
      {/* Tabla */}
      <div className="bg-white border rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Bikes</h3>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <PlusIcon className="h-5 w-5 mr-1" /> Add Bike
          </button>
        </div>

        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Coordinates</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBikes.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-3 border">{b.id}</td>
                <td className="p-3 border">{b.name}</td>
                <td className="p-3 border">{b.status}</td>
                <td className="p-3 border">Lat: {b.lat}, Lng: {b.lng}</td>
                <td className="p-3 border flex space-x-3">
                  <button onClick={() => handleEditClick(b)} className="text-blue-500 hover:text-blue-700" title="Edit">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => deleteBike(b.id)} className="text-red-500 hover:text-red-700" title="Delete">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => disableBike(b.id)} className="text-yellow-500 hover:text-yellow-700" title="Disable">
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginado */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Mapa con InfoWindow */}
      {isLoaded && (
        <div className="bg-white border rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Mapa de Bicicletas</h3>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={14}
          >
            {currentBikes.map((b) => (
              <Marker
                key={b.id}
                position={{ lat: parseFloat(b.lat), lng: parseFloat(b.lng) }}
                icon={getBikeIconByStatus(b.status)}
                onClick={() => setSelectedBike(b)}
              />
            ))}

            {selectedBike && (
              <InfoWindow
                position={{ lat: parseFloat(selectedBike.lat), lng: parseFloat(selectedBike.lng) }}
                onCloseClick={() => setSelectedBike(null)}
              >
                <div className="text-sm">
                  <h4 className="font-semibold">{selectedBike.name}</h4>
                  <p>Estado: {selectedBike.status}</p>
                  <p>Lat: {selectedBike.lat}, Lng: {selectedBike.lng}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleEditClick(selectedBike)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => disableBike(selectedBike.id)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Deshabilitar
                    </button>
                    <button
                      onClick={() => deleteBike(selectedBike.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      )}

      {/* Modals */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        bike={selectedBike}
        onSave={handleSaveEdit}
      />
      <AddBikeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNew}
      />
    </div>
  );
}
