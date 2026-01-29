import React, { useState } from "react";
import { useBikes } from "../hooks/useBikes";
import {
  PencilIcon,
  TrashIcon,
  XCircleIcon,
  PlusIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/solid";
import EditModal from "./EditModal";
import AddBikeModal from "./AddBikeModal";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

export default function BikesList() {
  const {
    data: bikes = [],
    isLoading,
    editBike,
    deleteBike,
    disableBike,
    addBike,
  } = useBikes();

  const [selectedBikeId, setSelectedBikeId] = useState(null);
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

  const sortedBikes = sortRecords(bikes);
  const totalPages = Math.ceil(sortedBikes.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentBikes = sortedBikes.slice(indexOfFirst, indexOfLast);

  // mapa
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const center = { lat: -35.6593, lng: -63.7579 };

  if (isLoading) return <p>Loading bikes...</p>;

  const handleEditClick = (bike) => {
    setSelectedBikeId(bike.id);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedBike) => {
    editBike({ id: updatedBike.id, payload: updatedBike });
  };

  const handleSaveNew = (newBike) => {
    addBike(newBike);
  };

  // toggle candado
  const toggleLock = (bike) => {
    if (bike.status === "Disabled") return;

    let updatedBike;
    if (bike.blocked) {
      updatedBike = { ...bike, status: "Rented", blocked: false };
    } else {
      updatedBike = { ...bike, status: "Available", blocked: true };
    }

    editBike({ id: updatedBike.id, payload: updatedBike });
  };

  // íconos según estado
  const getBikeIconByStatus = (status) => {
    let url;
    switch (status) {
      case "Available":
        url = "/bike-green.svg";
        break;
      case "Rented":
        url = "/bike-red.svg";
        break;
      case "Disabled":
        url = "/bike-gray.svg";
        break;
      default:
        url = "/bike-blue.svg";
    }
    return {
      url,
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 16),
    };
  };

  const markersToShow = showAllMarkers ? sortedBikes : currentBikes;

  // derivar objeto actualizado
  const selectedBike = bikes.find((b) => b.id === selectedBikeId);

  return (
    <div className="space-y-6">
      {/* tabla */}
      <div className="bg-white border rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Bikes</h3>
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="name">Name</option>
              <option value="status">Status</option>
              <option value="id">ID</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Bike
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
            {currentBikes.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-3 border">{b.id}</td>
                <td className="p-3 border">{b.name}</td>
                <td
                  className={`p-3 border text-center font-semibold ${b.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : b.status === "Rented"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {b.status}
                </td>
                <td className="p-3 border">Lat: {b.lat}, Lng: {b.lng}</td>
                <td className="p-3 border flex space-x-3">
                  <button
                    onClick={() => handleEditClick(b)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("¿Seguro que quieres eliminar esta bicicleta?")) {
                        deleteBike(b.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => disableBike(b.id)}
                    className="text-yellow-500 hover:text-yellow-700"
                    title="Disable"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                  {b.status === "Disabled" ? (
                    <LockClosedIcon
                      className="h-5 w-5 text-gray-400 cursor-not-allowed"
                      title="Bloqueada (deshabilitada)"
                    />
                  ) : (
                    <button
                      onClick={() => toggleLock(b)}
                      className="focus:outline-none"
                      title={b.blocked ? "Bloqueada" : "Desbloqueada"}
                    >
                      {b.blocked ? (
                        <LockClosedIcon className="h-5 w-5 text-gray-700 hover:text-gray-900" />
                      ) : (
                        <LockOpenIcon className="h-5 w-5 text-green-600 hover:text-green-800" />
                      )}
                    </button>
                  )}
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
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* mapa con toggle */}
      {isLoaded && (
        <div className="bg-white border rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Mapa de Bicicletas</h3>
            <button
              onClick={() => setShowAllMarkers(!showAllMarkers)}
              className={`px-3 py-1 rounded ${showAllMarkers ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
            >
              {showAllMarkers ? "Todos los registros" : "Solo página actual"}
            </button>
          </div>

          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={center}
            zoom={14}
          >
            {markersToShow.map((b) => (
              <Marker
                key={b.id}
                position={{ lat: parseFloat(b.lat), lng: parseFloat(b.lng) }}
                icon={getBikeIconByStatus(b.status)}
                onClick={() => setSelectedBikeId(b.id)}
              />
            ))}

            {selectedBike && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedBike.lat),
                  lng: parseFloat(selectedBike.lng),
                }}
                onCloseClick={() => setSelectedBikeId(null)}
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
                      onClick={() => {
                        if (
                          window.confirm(
                            "¿Seguro que quieres eliminar esta bicicleta?"
                          )
                        ) {
                          deleteBike(selectedBike.id);
                          setSelectedBikeId(null);
                        }
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>

                    {/* Candado clickeable */}
                    {selectedBike.status === "Disabled" ? (
                      <LockClosedIcon
                        className="h-5 w-5 text-gray-400 cursor-not-allowed"
                        title="Bloqueada (deshabilitada)"
                      />
                    ) : (
                      <button
                        onClick={() => toggleLock(selectedBike)}
                        className="focus:outline-none"
                        title={
                          selectedBike.blocked ? "Bloqueada" : "Desbloqueada"
                        }
                      >
                        {selectedBike.blocked ? (
                          <LockClosedIcon className="h-5 w-5 text-gray-700 hover:text-gray-900" />
                        ) : (
                          <LockOpenIcon className="h-5 w-5 text-green-600 hover:text-green-800" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      )}

      {/* modals */}
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
