import React, { useState } from 'react';
import { useMotorcycles } from '../hooks/useMotorcycles';
import { PencilIcon, TrashIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import EditMotorcycleModal from './EditMotorcycleModal';
import AddMotorcycleModal from './AddMotorcycleModal';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

export default function MotorcyclesList() {
  const { data: motorcycles = [], isLoading, editMotorcycle, deleteMotorcycle, disableMotorcycle, addMotorcycle } = useMotorcycles();
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

  const sortedMotorcycles = sortRecords(motorcycles);
  const totalPages = Math.ceil(sortedMotorcycles.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentMotorcycles = sortedMotorcycles.slice(indexOfFirst, indexOfLast);

  const [selectedMotorcycleId, setSelectedMotorcycleId] = useState(null);
  const selectedMotorcycle = motorcycles.find((m) => m.id === selectedMotorcycleId);

  // mapa
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  const center = { lat: -35.6593, lng: -63.7579 };

  if (isLoading) return <p>Loading motorcycles...</p>;

  const handleEditClick = (motorcycle) => {
    setSelectedMotorcycleId(motorcycle.id);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedMotorcycle) => {
    editMotorcycle({ id: updatedMotorcycle.id, payload: updatedMotorcycle });
  };

  const handleSaveNew = (newMotorcycle) => {
    addMotorcycle(newMotorcycle);
  };

  // íconos según estado
  const getMotorcycleIconByStatus = (status) => {
    let url;
    switch (status) {
      case "Available": url = "/motorcycle-green.svg"; break;
      case "Rented": url = "/motorcycle-red.svg"; break;
      case "Disabled": url = "/motorcycle-gray.svg"; break;
      default: url = "/motorcycle-blue.svg";
    }
    return {
      url,
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 16),
    };
  };

  const markersToShow = showAllMarkers ? sortedMotorcycles : currentMotorcycles;

  return (
    <div className="space-y-6">
      {/* tabla */}
      <div className="bg-white border rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Motos</h3>
          <div className="flex space-x-2">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-2 py-1">
              <option value="name">Nombre</option>
              <option value="status">Estado</option>
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
              <PlusIcon className="h-5 w-5 mr-1" /> Agregar Moto
            </button>
          </div>
        </div>

        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Id</th>
              <th className="p-3 border">Nombre</th>
              <th className="p-3 border">Estado</th>
              <th className="p-3 border">Ubicación</th>
              <th className="p-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentMotorcycles.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="p-3 border">{m.id}</td>
                <td className="p-3 border">{m.name}</td>
                <td
                  className={`p-3 border text-center font-semibold ${m.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : m.status === "Rented"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {m.status}
                </td>
                <td className="p-3 border">Lat: {m.lat}, Lng: {m.lng}</td>
                <td className="p-3 border flex space-x-3">
                  <button onClick={() => handleEditClick(m)} className="text-blue-500 hover:text-blue-700" title="Editar">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("¿Seguro que quieres eliminar esta moto?")) {
                        deleteMotorcycle(m.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => disableMotorcycle(m.id)} className="text-yellow-500 hover:text-yellow-700" title="Deshabilitar">
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

            {/* mapa */}
      {isLoaded && (
        <div className="bg-white border rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Mapa de Motos</h3>
            <button
              onClick={() => setShowAllMarkers(!showAllMarkers)}
              className={`px-3 py-1 rounded ${showAllMarkers ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              {showAllMarkers ? "Todos los registros" : "Solo página actual"}
            </button>
          </div>

          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={14}
          >
            {markersToShow.map((m) => (
              <Marker
                key={m.id}
                position={{ lat: parseFloat(m.lat), lng: parseFloat(m.lng) }}
                icon={getMotorcycleIconByStatus(m.status)}
                onClick={() => setSelectedMotorcycleId(m.id)}
              />
            ))}

            {selectedMotorcycle && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedMotorcycle.lat),
                  lng: parseFloat(selectedMotorcycle.lng),
                }}
                onCloseClick={() => setSelectedMotorcycleId(null)}
              >
                <div className="text-sm">
                  <h4 className="font-semibold">{selectedMotorcycle.name}</h4>
                  <p>Estado: {selectedMotorcycle.status}</p>
                  <p>Lat: {selectedMotorcycle.lat}, Lng: {selectedMotorcycle.lng}</p>

                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleEditClick(selectedMotorcycle)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => disableMotorcycle(selectedMotorcycle.id)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Deshabilitar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("¿Seguro que quieres eliminar esta moto?")) {
                          deleteMotorcycle(selectedMotorcycle.id);
                          setSelectedMotorcycleId(null);
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
      {isEditModalOpen && selectedMotorcycle && (
        <EditMotorcycleModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          motorcycle={selectedMotorcycle}
          onSave={handleSaveEdit}
        />
      )}

      {isAddModalOpen && (
        <AddMotorcycleModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveNew}
        />
      )}
    </div>
  );
}
