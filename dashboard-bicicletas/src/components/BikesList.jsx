import { useBikes } from '../hooks/useBikes';
import { PencilIcon, TrashIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import EditModal from './EditModal';
import AddBikeModal from './AddBikeModal';
import React, { useState } from 'react';

export default function BikesList() {
  const { data: bikes = [], isLoading, editBike, deleteBike, disableBike } = useBikes();
  const [selectedBike, setSelectedBike] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Estado para paginado
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(bikes.length / recordsPerPage);

  // Calcular bicis de la página actual
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentBikes = bikes.slice(indexOfFirst, indexOfLast);

  if (isLoading) return <p>Loading bikes...</p>;

  const handleEditClick = (bike) => {
    setSelectedBike(bike);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedBike) => {
    editBike({ id: updatedBike.id, payload: updatedBike });
  };

  const handleSaveNew = (newBike) => {
    editBike({ id: newBike.id, payload: newBike });
  };

  return (
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
            <th className="p-3 border">Coordinates</th> {/* 👈 nueva columna */}
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBikes.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50">
              <td className="p-3 border">{b.id}</td>
              <td className="p-3 border">{b.name}</td>
              <td className="p-3 border">{b.status}</td>
              <td className="p-3 border">
                Lat: {b.lat}, Lng: {b.lng} {/* 👈 mostramos coordenadas */}
              </td>
              <td className="p-3 border flex space-x-3">
                <button
                  onClick={() => handleEditClick(b)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteBike(b.id)}
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
