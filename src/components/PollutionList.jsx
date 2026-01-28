import { usePollution } from '../hooks/usePollution';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import EditPollutionModal from './EditPollutionModal';
import AddPollutionModal from './AddPollutionModal';
import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

export default function PollutionList() {
  const { data: pollution = [], isLoading, editPollution, deletePollution, addPollution } = usePollution();
  const [selectedPollution, setSelectedPollution] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Estado para paginado
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Estado para orden dinámico
  const [sortBy, setSortBy] = useState("level");
  const [sortOrder, setSortOrder] = useState("desc");

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

  const sortedPollution = sortRecords(pollution);
  const totalPages = Math.ceil(sortedPollution.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentPollution = sortedPollution.slice(indexOfFirst, indexOfLast);

  // Configuración del mapa
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const center = { lat: -35.6593, lng: -63.7579 };

  if (isLoading) return <p>Loading pollution data...</p>;

  const handleEditClick = (record) => {
    setSelectedPollution(record);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedRecord) => {
    editPollution({ id: updatedRecord.id, payload: updatedRecord });
  };

  const handleSaveNew = (newRecord) => {
    addPollution(newRecord);
  };

  // Ícono según nivel
  const getPollutionIcon = (level, category) => {
    let url;

    switch (category) {
      case "Aire":
        if (level < 30) url = "/air-green.svg";
        else if (level < 70) url = "/air-yellow.svg";
        else url = "/air-red.svg";
        break;

      case "Acústica":
        if (level < 30) url = "/sound-green.svg";
        else if (level < 70) url = "/sound-yellow.svg";
        else url = "/sound-red.svg";
        break;

      case "Lumínica":
        if (level < 30) url = "/light-green.svg";
        else if (level < 70) url = "/light-yellow.svg";
        else url = "/light-red.svg";
        break;

      default: // Otro
        if (level < 30) url = "/other-green.svg";
        else if (level < 70) url = "/other-yellow.svg";
        else url = "/other-red.svg";
        break;
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
          <h3 className="text-xl font-semibold">Sensores de Contaminación</h3>
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="level">Nivel</option>
              <option value="name">Nombre</option>
              <option value="type">Tipo</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="desc">Descendente</option>
              <option value="asc">Ascendente</option>
            </select>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Agregar Registro
            </button>
          </div>
        </div>

        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nombre</th>
              <th className="p-3 border">Categoría</th>
              <th className="p-3 border">Tipo</th>
              <th className="p-3 border">Nivel (%)</th>
              <th className="p-3 border">Coordenadas</th>
              <th className="p-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentPollution.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 border">{p.id}</td>
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.category}</td>
                <td className="p-3 border">{p.type}</td>
                <td
                  className={`p-3 border text-center font-semibold ${p.level > 70
                    ? "bg-red-100 text-red-700"
                    : p.level > 30
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                    }`}
                >
                  {p.level}%
                </td>
                <td className="p-3 border">Lat: {p.lat}, Lng: {p.lng}</td>
                <td className="p-3 border flex space-x-3">
                  <button onClick={() => handleEditClick(p)} className="text-blue-500 hover:text-blue-700" title="Editar">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("¿Seguro que quieres eliminar este registro?")) {
                        deletePollution(p.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar"
                  >
                    <TrashIcon className="h-5 w-5" />
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

      {/* Mapa */}
      {isLoaded && (
        <div className="bg-white border rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Mapa de Sensores</h3>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={14}
          >
            {/* {pollution.map((p) => ( */}
            {currentPollution.map((p) => (
              <Marker
                key={p.id}
                position={{ lat: parseFloat(p.lat), lng: parseFloat(p.lng) }}
                icon={getPollutionIcon(p.level, p.category)}
                onClick={() => setSelectedPollution(p)}
              />
            ))}

            {selectedPollution && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedPollution.lat),
                  lng: parseFloat(selectedPollution.lng),
                }}
                onCloseClick={() => setSelectedPollution(null)}
              >
                <div className="text-sm">
                  <h4 className="font-semibold">{selectedPollution.name}</h4>
                  <p>Categoría: {selectedPollution.category}</p>   {/* 👈 nueva línea */}
                  <p>Tipo: {selectedPollution.type}</p>
                  <p>Nivel: {selectedPollution.level}%</p>

                  {/* Barra de progreso visual */}
                  <div className="w-full bg-gray-200 rounded h-2 mt-1">
                    <div
                      className={`h-2 rounded ${selectedPollution.level > 70
                          ? 'bg-red-500'
                          : selectedPollution.level > 30
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                      style={{ width: `${selectedPollution.level}%` }}
                    />
                  </div>

                  <p className="mt-1">
                    Lat: {selectedPollution.lat}, Lng: {selectedPollution.lng}
                  </p>

                  <div className="flex space-x-2 mt-2">
                    {/* Abrir modal de edición */}
                    <button
                      onClick={() => {
                        setSelectedPollution(selectedPollution);
                        setIsEditModalOpen(true);
                      }}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>

                    {/* Confirmación antes de eliminar */}
                    <button
                      onClick={() => {
                        if (window.confirm("¿Seguro que quieres eliminar este registro?")) {
                          deletePollution(selectedPollution.id);
                          setSelectedPollution(null);
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

      {/* Modals */}
      <EditPollutionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        pollution={selectedPollution}
        onSave={handleSaveEdit}
      />
      <AddPollutionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNew}
      />
    </div>
  );
}
