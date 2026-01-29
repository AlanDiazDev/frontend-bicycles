import React, { useState } from 'react';
import { useScooters } from '../hooks/useScooters';
import { PencilIcon, TrashIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import EditScooterModal from './EditScooterModal';
import AddScooterModal from './AddScooterModal';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

export default function ScootersList() {
  const { data: scooters = [], isLoading, editScooter, deleteScooter, disableScooter, addScooter } = useScooters();
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // paginado
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // orden dinámico
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // toggle mapa
  const [showAllMarkers, setShowAllMarkers] = useState(true);

  const sortRecords = (list) => {
    return [...list].sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedScooters = sortRecords(scooters);
  const totalPages = Math.ceil(sortedScooters.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentScooters = sortedScooters.slice(indexOfFirst, indexOfLast);

  // mapa
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  const center = { lat: -35.6593, lng: -63.7579 };

  if (isLoading) return <p>Loading scooters...</p>;

  const handleEditClick = (scooter) => {
    setSelectedScooter(scooter);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedScooter) => {
    editScooter({ id: updatedScooter.id, payload: updatedScooter });
  };

  const handleSaveNew = (newScooter) => {
    addScooter(newScooter);
  };

  // íconos según estado
  const getScooterIconByStatus = (status) => {
    let url;
    switch (status) {
      case "Available": url = "/scooter-green.svg"; break;
      case "Rented": url = "/scooter-red.svg"; break;
      case "Disabled": url = "/scooter-gray.svg"; break;
      default: url = "/scooter-blue.svg";
    }
    return {
      url,
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 16),
    };
  };

  const markersToShow = showAllMarkers ? sortedScooters : currentScooters;

  return (
    <div className="space-y-6">
      {/* tabla */}
      <div className="bg-white border rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Scooters</h3>
          <div className="flex space-x-2">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-2 py-1">
              <option value="name">Name</option>
              <option value="status">Status</option>
              <option value="id">ID</option>
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border rounded px-2 py-1">
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Scooter
            </button>
          </div>
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
            {currentScooters.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-3 border">{s.id}</td>
                <td className="p-3 border">{s.name}</td>
                <td
                  className={`p-3 border text-center font-semibold ${
                    s.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : s.status === "Rented"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {s.status}
                </td>
                <td className="p-3 border">Lat: {s.lat}, Lng: {s.lng}</td>
                <td className="p-3 border flex space-x-3">
                  <button onClick={() => handleEditClick(s)} className="text-blue-500 hover:text-blue-700" title="Edit">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => deleteScooter(s.id)} className="text-red-500 hover:text-red-700" title="Delete">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => disableScooter(s.id)} className="text-yellow-500 hover:text-yellow-700" title="Disable">
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* paginado */}
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

      {/* mapa con toggle */}
      {isLoaded && (
        <div className="bg-white border rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Mapa de Scooters</h3>
            <button
              onClick={() => setShowAllMarkers(!showAllMarkers)}
              className={`px-3 py-1 rounded ${
                showAllMarkers ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {showAllMarkers ? "Todos los registros" : "Solo página actual"}
            </button>
          </div>

          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={14}
                    >
            {markersToShow.map((s) => (
              <Marker
                key={s.id}
                position={{ lat: parseFloat(s.lat), lng: parseFloat(s.lng) }}
                icon={getScooterIconByStatus(s.status)}
                onClick={() => setSelectedScooter(s)}
              />
            ))}

            {selectedScooter && (
              <InfoWindow
                position={{ lat: parseFloat(selectedScooter.lat), lng: parseFloat(selectedScooter.lng) }}
                onCloseClick={() => setSelectedScooter(null)}
              >
                <div className="text-sm">
                  <h4 className="font-semibold">{selectedScooter.name}</h4>
                  <p>Estado: {selectedScooter.status}</p>
                  <p>Lat: {selectedScooter.lat}, Lng: {selectedScooter.lng}</p>

                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleEditClick(selectedScooter)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => disableScooter(selectedScooter.id)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Deshabilitar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("¿Seguro que quieres eliminar este scooter?")) {
                          deleteScooter(selectedScooter.id);
                          setSelectedScooter(null);
                        }
                      }}
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

      {/* modals */}
      <EditScooterModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        scooter={selectedScooter}
        onSave={handleSaveEdit}
      />
      <AddScooterModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNew}
      />
    </div>
  );
}
