import { useUsers } from '../hooks/useUsers';
import { PencilIcon, TrashIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import EditUserModal from './EditUserModal';
import AddUserModal from './AddUserModal';
import React, { useState } from 'react';

export default function UsersList() {
  const { data: users = [], isLoading, editUser, deleteUser, disableUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Estado para paginado
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const totalPages = Math.ceil(users.length / recordsPerPage);

  // Calcular usuarios de la página actual
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  if (isLoading) return <p>Loading users...</p>;

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedUser) => {
    editUser({ id: updatedUser.id, payload: updatedUser });
  };

  const handleSaveNew = (newUser) => {
    // En backend real sería un POST, acá simulamos con editUser
    editUser({ id: newUser.id, payload: newUser });
  };

  return (
    <div className="bg-white border rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Usuarios</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Agregar Usuario
        </button>
      </div>

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Id</th>
            <th className="p-3 border">Nombre</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">DNI</th>
            <th className="p-3 border">Último Ingreso</th>
            <th className="p-3 border">Estado</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="p-3 border">{u.id}</td>
              <td className="p-3 border">{u.name}</td>
              <td className="p-3 border">{u.email}</td>
              <td className="p-3 border">{u.dni}</td>
              <td className="p-3 border">{u.lastActivity}</td>
              <td className="p-3 border">{u.status}</td>
              <td className="p-3 border flex space-x-3">
                <button
                  onClick={() => handleEditClick(u)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => disableUser(u.id)}
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

      {/* Modals */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveEdit}
      />
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNew}
      />
    </div>
  );
}
