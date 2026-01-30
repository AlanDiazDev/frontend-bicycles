import { useCars } from '../hooks/useCars';
import { PencilIcon, TrashIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import EditCarModal from './EditCarModal';
import AddCarModal from './AddCarModal';
import React, { useState } from 'react';

// Google Maps API wrapper
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

export default function CarsListWithMap() {
    const { data: cars = [], isLoading, editCar, deleteCar, disableCar, addCar } = useCars();
    const [selectedCar, setSelectedCar] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Estado para paginado
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const totalPages = Math.ceil(cars.length / recordsPerPage);

    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentCars = cars.slice(indexOfFirst, indexOfLast);

    // Configuración del mapa
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    // Coordenadas de General Pico, La Pampa
    const center = { lat: -35.6593, lng: -63.7579 };

    if (isLoading) return <p>Loading cars...</p>;

    const handleEditClick = (car) => {
        setSelectedCar(car);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (updatedCar) => {
        editCar({ id: updatedCar.id, payload: updatedCar });
    };

    const handleSaveNew = (newCar) => {
        addCar(newCar); // usamos la mutación addCar del hook
    };

    const getCarIconByStatus = (status) => {
        let url;
        switch (status) {
            case "Available": url = "/car-green.svg"; break;
            case "Rented": url = "/car-red.svg"; break;
            case "Disabled": url = "/car-gray.svg"; break;
            default: url = "/car-blue.svg";
        }
        return {
            url,
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 16),
        };
    };

    return (
        <div className="space-y-6">
            {/* Tabla de autos */}
            <div className="bg-white border rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Autos</h3>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        <PlusIcon className="h-5 w-5 mr-1" /> Agregar Auto
                    </button>
                </div>

                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 border">Id</th>
                            <th className="p-3 border">Nombre</th>
                            <th className="p-3 border">Estado</th>
                            <th className="p-3 border">Ubicacion</th>
                            <th className="p-3 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCars.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{c.id}</td>
                                <td className="p-3 border">{c.name}</td>
                                <td className="p-3 border">{c.status}</td>
                                <td className="p-3 border">Lat: {c.lat}, Lng: {c.lng}</td>
                                <td className="p-3 border flex space-x-3">
                                    <button onClick={() => handleEditClick(c)} className="text-blue-500 hover:text-blue-700" title="Edit">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => deleteCar(c.id)} className="text-red-500 hover:text-red-700" title="Delete">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => disableCar(c.id)} className="text-yellow-500 hover:text-yellow-700" title="Disable">
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

            {/* Mapa de Google con autos de la página actual */}
            {isLoaded && (
                <div className="bg-white border rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-4">Mapa de Autos</h3>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        center={center}
                        zoom={14}
                    >
                        {currentCars.map((c) => (
                            <Marker
                                key={c.id}
                                position={{ lat: parseFloat(c.lat), lng: parseFloat(c.lng) }}
                                icon={getCarIconByStatus(c.status)}
                                onClick={() => setSelectedCar(c)}
                            />
                        ))}

                        {selectedCar && (
                            <InfoWindow
                                position={{ lat: parseFloat(selectedCar.lat), lng: parseFloat(selectedCar.lng) }}
                                onCloseClick={() => setSelectedCar(null)}
                            >
                                <div className="text-sm">
                                    <h4 className="font-semibold">{selectedCar.name}</h4>
                                    <p>Estado: {selectedCar.status}</p>
                                    <p>Lat: {selectedCar.lat}, Lng: {selectedCar.lng}</p>
                                    <div className="flex space-x-2 mt-2">
                                        <button
                                            onClick={() => editCar({ id: selectedCar.id, payload: selectedCar })}
                                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => disableCar(selectedCar.id)}
                                            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Deshabilitar
                                        </button>
                                        <button
                                            onClick={() => deleteCar(selectedCar.id)}
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
            <EditCarModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                car={selectedCar}
                onSave={handleSaveEdit}
            />
            <AddCarModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveNew}
            />
        </div>
    );
}
