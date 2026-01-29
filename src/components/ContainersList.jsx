import { useContainers } from '../hooks/useContainers';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import EditContainerModal from './EditContainerModal';
import AddContainerModal from './AddContainerModal';
import React, { useState } from 'react';

// Google Maps API wrapper
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

export default function ContainersList() {
    const { data: containers = [], isLoading, editContainer, deleteContainer, addContainer } = useContainers();
    const [selectedContainer, setSelectedContainer] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Estado para paginado
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const totalPages = Math.ceil(containers.length / recordsPerPage);

    // Ordenar por nivel de llenado descendente
    const sortedContainers = [...containers].sort((a, b) => b.fillLevel - a.fillLevel);
    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentContainers = sortedContainers.slice(indexOfFirst, indexOfLast);

    // Estado para toggle 
    const [showAllMarkers, setShowAllMarkers] = useState(true);

    // Configuración del mapa
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    // Coordenadas de General Pico, La Pampa
    const center = { lat: -35.6593, lng: -63.7579 };

    if (isLoading) return <p>Loading containers...</p>;

    const handleEditClick = (container) => {
        setSelectedContainer(container);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (updatedContainer) => {
        editContainer({ id: updatedContainer.id, payload: updatedContainer });
    };

    const handleSaveNew = (newContainer) => {
        addContainer(newContainer);
    };

    // Ícono según nivel de llenado
    const getContainerIconByLevel = (level) => {
        let url;
        if (level < 40) {
            url = "/container-green.svg"; // poco lleno
        } else if (level < 75) {
            url = "/container-yellow.svg"; // medio lleno
        } else {
            url = "/container-red.svg"; // casi lleno
        }
        return {
            url,
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 16),
        };
    };

    return (
        <div className="space-y-6">
            {/* Tabla de contenedores */}
            <div className="bg-white border rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Contenedores</h3>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        <PlusIcon className="h-5 w-5 mr-1" /> Agregar Contenedor
                    </button>
                </div>

                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Nombre</th>
                            <th className="p-3 border">Tipo</th>
                            <th className="p-3 border">Nivel de llenado (%)</th>
                            <th className="p-3 border">Ubicacion</th>
                            <th className="p-3 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentContainers.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{c.id}</td>
                                <td className="p-3 border">{c.name}</td>
                                <td className="p-3 border">{c.type}</td>
                                <td
                                    className={`p-3 border text-center font-semibold ${c.fillLevel > 70
                                        ? "bg-red-100 text-red-700"
                                        : c.fillLevel > 30
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {c.fillLevel}%
                                </td>

                                <td className="p-3 border">Lat: {c.lat}, Lng: {c.lng}</td>
                                <td className="p-3 border flex space-x-3">
                                    <button onClick={() => handleEditClick(c)} className="text-blue-500 hover:text-blue-700" title="Editar">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => deleteContainer(c.id)} className="text-red-500 hover:text-red-700" title="Eliminar">
                                        <TrashIcon className="h-5 w-5" />
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

            {/* Mapa de Google con contenedores */}
            {isLoaded && (
                <div className="bg-white border rounded-lg shadow p-6">
                    {/* <h3 className="text-xl font-semibold mb-4">Mapa de Contenedores</h3> */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Mapa de Contenedores</h3>
                        <button
                            onClick={() => setShowAllMarkers(!showAllMarkers)}
                            className={`px-3 py-1 rounded ${showAllMarkers ? "bg-blue-500 text-white" : "bg-gray-300"
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
                        {(showAllMarkers ? sortedContainers : currentContainers).map((c) => (
                            <Marker
                                key={c.id}
                                position={{ lat: parseFloat(c.lat), lng: parseFloat(c.lng) }}
                                icon={getContainerIconByLevel(c.fillLevel)}
                                onClick={() => setSelectedContainer(c)}
                            />
                        ))}

                        {selectedContainer && (
                            <InfoWindow
                                position={{
                                    lat: parseFloat(selectedContainer.lat),
                                    lng: parseFloat(selectedContainer.lng),
                                }}
                                onCloseClick={() => setSelectedContainer(null)}
                            >
                                <div className="text-sm">
                                    <h4 className="font-semibold">{selectedContainer.name}</h4>
                                    <p>Tipo: {selectedContainer.type}</p>
                                    <p>Nivel de llenado: {selectedContainer.fillLevel}%</p>

                                    {/* Barra de progreso visual */}
                                    <div className="w-full bg-gray-200 rounded h-2 mt-1">
                                        <div
                                            className={`h-2 rounded ${selectedContainer.fillLevel > 75
                                                ? 'bg-red-500'
                                                : selectedContainer.fillLevel > 40
                                                    ? 'bg-yellow-500'
                                                    : 'bg-green-500'
                                                }`}
                                            style={{ width: `${selectedContainer.fillLevel}%` }}
                                        />
                                    </div>

                                    <p className="mt-1">Lat: {selectedContainer.lat}, Lng: {selectedContainer.lng}</p>

                                    <div className="flex space-x-2 mt-2">
                                        {/* Abrir modal de edición */}
                                        <button
                                            onClick={() => {
                                                setSelectedContainer(selectedContainer);
                                                setIsEditModalOpen(true);
                                            }}
                                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Editar
                                        </button>

                                        {/* Confirmación antes de eliminar */}
                                        <button
                                            onClick={() => {
                                                if (window.confirm("¿Seguro que quieres eliminar este contenedor?")) {
                                                    deleteContainer(selectedContainer.id);
                                                    setSelectedContainer(null);
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
            <EditContainerModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                container={selectedContainer}
                onSave={handleSaveEdit}
            />
            <AddContainerModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveNew}
            />
        </div>
    );
}
