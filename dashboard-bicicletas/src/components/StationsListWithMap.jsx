import { useStations } from '../hooks/useStations';
import { PencilIcon, TrashIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import EditStationModal from './EditStationModal';
import AddStationModal from './AddStationModal';
import React, { useState } from 'react';

// Importar Google Maps API wrapper (ejemplo con @react-google-maps/api)
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function StationsListWithMap() {
    const { data: stations = [], isLoading, editStation, deleteStation, disableStation } = useStations();
    const [selectedStation, setSelectedStation] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Estado para paginado
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const totalPages = Math.ceil(stations.length / recordsPerPage);

    // Calcular estaciones de la página actual
    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentStations = stations.slice(indexOfFirst, indexOfLast);

    // Configuración del mapa
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "api key" // reemplazar con tu API key
    });

    // Coordenadas de General Pico, La Pampa
    const center = { lat: -35.6593, lng: -63.7579 };


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
        <div className="space-y-6">
            {/* Tabla de estaciones */}
            <div className="bg-white border rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Stations</h3>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        <PlusIcon className="h-5 w-5 mr-1" /> Add Station
                    </button>
                </div>

                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Coordinates</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStations.map((s) => (
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

                {/* Controles de paginado */}
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

            {/* Mapa de Google con estaciones de la página actual */}
            {isLoaded && (
                <div className="bg-white border rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-4">Stations Map</h3>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        center={center}
                        zoom={14}
                    >
                        {currentStations.map((s) => (
                            //   <Marker key={s.id} position={{ lat: parseFloat(s.lat), lng: parseFloat(s.lng) }} />
                            <Marker
                                key={s.id}
                                position={{ lat: parseFloat(s.lat), lng: parseFloat(s.lng) }}
                                icon={{
                                    url: "/bike-station.png",
                                    scaledSize: new window.google.maps.Size(40, 40), // tamaño
                                }}
                            />

                        ))}
                    </GoogleMap>
                </div>
            )}

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
