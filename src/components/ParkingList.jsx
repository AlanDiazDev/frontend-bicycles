import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { useParking } from "../hooks/useParking";
import EditParkingModal from "./EditParkingModal";
import AddParkingModal from "./AddParkingModal";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// Función para elegir ícono según estado
const getParkingIcon = (status) => {
  let url;
  switch (status) {
    case "Disponible":
      url = "/parking-green.svg";
      break;
    case "Ocupado":
      url = "/parking-red.svg";
      break;
    case "Deshabilitado":
      url = "/parking-gray.svg";
      break;
    default:
      url = "/parking-gray.svg";
  }

  return {
    url,
    scaledSize: new window.google.maps.Size(32, 32),
    anchor: new window.google.maps.Point(16, 16),
  };
};

export default function ParkingList() {
  const { data: parking = [], isLoading, editParking, deleteParking, addParking } = useParking();
  const [selectedParking, setSelectedParking] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const sortedParking = sortRecords(parking);
  const totalPages = Math.ceil(sortedParking.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentParking = sortedParking.slice(indexOfFirst, indexOfLast);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const center = { lat: -35.6593, lng: -63.7579 };

  if (isLoading) return <p>Cargando datos de estacionamientos...</p>;

  const markersToShow = showAllMarkers ? sortedParking : currentParking;

  const handleEditClick = (parking) => {
    setSelectedParking(parking);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedParking) => {
    editParking({ id: updatedParking.id, payload: updatedParking });
  };

  const handleSaveNew = (newParking) => {
    addParking(newParking);
  };

  return (
    <div className="space-y-6">
      {/* Tabla */}
      <div className="bg-white border rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Estacionamientos</h3>
          <div className="flex space-x-2">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-2 py-1">
              <option value="name">Nombre</option>
              <option value="type">Tipo</option>
              <option value="status">Estado</option>
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border rounded px-2 py-1">
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Agregar Estacionamiento
            </button>
          </div>
        </div>

        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nombre</th>
              <th className="p-3 border">Tipo</th>
              <th className="p-3 border">Estado</th>
              <th className="p-3 border">Calle</th>
              <th className="p-3 border">Sector</th>
              <th className="p-3 border">Coordenadas</th>
              <th className="p-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentParking.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 border">{p.id}</td>
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.type}</td>
                <td
                  className={`p-3 border text-center font-semibold ${p.status === "Disponible"
                    ? "bg-green-100 text-green-700"
                    : p.status === "Ocupado"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {p.status}
                </td>
                <td className="p-3 border">{p.street}</td>
                <td className="p-3 border">{p.sector}</td>
                <td className="p-3 border">Lat: {p.lat}, Lng: {p.lng}</td>
                <td className="p-3 border flex space-x-3">
                  <button onClick={() => handleEditClick(p)} className="text-blue-500 hover:text-blue-700" title="Editar">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("¿Seguro que quieres eliminar este registro?")) {
                        deleteParking(p.id);
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Mapa de Estacionamientos</h3>
            <button
              onClick={() => setShowAllMarkers(!showAllMarkers)}
              className={`px-3 py-1 rounded ${showAllMarkers ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
            >
              {showAllMarkers ? "Todos los registros" : "Solo página actual"}
            </button>
          </div>

          <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={center} zoom={14}>
            {markersToShow.map((p) => (
              <Marker
                key={p.id}
                position={{ lat: parseFloat(p.lat), lng: parseFloat(p.lng) }}
                icon={getParkingIcon(p.status)}
                onClick={() => setSelectedParking(p)}
              />
            ))}

            {selectedParking && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedParking.lat),
                  lng: parseFloat(selectedParking.lng),
                }}
                onCloseClick={() => setSelectedParking(null)}
              >
                <div className="text-sm">
                  <h4 className="font-semibold">{selectedParking.name}</h4>
                  <p>Tipo: {selectedParking.type}</p>
                  <p>Estado: {selectedParking.status}</p>
                  <p>Calle: {selectedParking.calle}</p> 
                  <p>Sector: {selectedParking.sector}</p>
                  <p className="mt-1">
                    Lat: {selectedParking.lat}, Lng: {selectedParking.lng}
                  </p>

                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => {
                        setSelectedParking(selectedParking);
                        setIsEditModalOpen(true);
                      }}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("¿Seguro que quieres eliminar este registro?")) {
                          deleteParking(selectedParking.id);
                          setSelectedParking(null);
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
      <EditParkingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        parking={selectedParking}
        onSave={handleSaveEdit}
      />
      <AddParkingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNew}
      />
    </div>
  );
}
