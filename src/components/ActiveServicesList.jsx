import React, { useState } from "react";
import { useActiveServices } from "../hooks/useActiveServices";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

export default function ActiveServicesList() {
  const { data: services = [], isLoading } = useActiveServices();

  // paginado
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(services.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentServices = services.slice(indexOfFirst, indexOfLast);

  // toggle mapa
  const [showAllMarkers, setShowAllMarkers] = useState(true);

  // mapa
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const center = { lat: -35.6593, lng: -63.7579 };

  // InfoWindow seleccionado
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const selectedService = services.find((s) => s.id === selectedServiceId);

  // calcular tiempo activo
  const getActiveTime = (startTime) => {
    const now = new Date();
    const diffMs = now - new Date(startTime);
    const diffMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  if (isLoading) return <p>Cargando servicios...</p>;

  const markersToShow = showAllMarkers ? services : currentServices;

  return (
    <div className="space-y-6">
      {/* tabla */}
      <div className="bg-white border rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Servicios Activos</h3>
        </div>

        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">ID Servicio</th>
              <th className="p-3 border">ID Bicicleta</th>
              <th className="p-3 border">ID Usuario</th>
              <th className="p-3 border">Fecha y Hora Inicio</th>
              <th className="p-3 border">Tiempo Activo</th>
              <th className="p-3 border">Distancia Recorrida (km)</th>
              <th className="p-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentServices.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-3 border">{s.id}</td>
                <td className="p-3 border">{s.bikeId}</td>
                <td className="p-3 border">{s.userId}</td>
                <td className="p-3 border">
                  {new Date(s.startTime).toLocaleString()}
                </td>
                <td className="p-3 border">{getActiveTime(s.startTime)}</td>
                <td className="p-3 border">{s.distance}</td>
                <td className="p-3 border">
                  <span className="text-gray-400">Sin acciones</span>
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
          <span>
            Página {currentPage} de {totalPages}
          </span>
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
            <h3 className="text-xl font-semibold">Mapa de Servicios Activos</h3>
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
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={center}
            zoom={13}
          >
            {markersToShow.map((s) => (
              <Marker
                key={s.id}
                position={{ lat: parseFloat(s.lat), lng: parseFloat(s.lng) }}
                onClick={() => setSelectedServiceId(s.id)}
                title={`Bike ${s.bikeId} - Usuario ${s.userId}`}
              />
            ))}

            {selectedService && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedService.lat),
                  lng: parseFloat(selectedService.lng),
                }}
                onCloseClick={() => setSelectedServiceId(null)}
              >
                <div className="text-sm">
                  <h4 className="font-semibold">
                    Servicio #{selectedService.id}
                  </h4>
                  <p>Bicicleta: {selectedService.bikeId}</p>
                  <p>Usuario: {selectedService.userId}</p>
                  <p>
                    Inicio: {new Date(selectedService.startTime).toLocaleString()}
                  </p>
                  <p>Tiempo activo: {getActiveTime(selectedService.startTime)}</p>
                  <p>Distancia: {selectedService.distance} km</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      )}
    </div>
  );
}
