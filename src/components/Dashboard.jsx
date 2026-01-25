import React, { useState } from 'react';
import UsersList from './UsersList';
import BikesList from './BikesList';
import PaymentsList from './PaymentsList';
import StationsListWithMap from './StationsListWithMap';
import StatsDashboard from './StatsDashboard';
import BikesMap from './BikesMap';
import EditModal from './EditModal';

import { useUsers } from '../hooks/useUsers';
import { useBikes } from '../hooks/useBikes';
import { useStations } from '../hooks/useStations';
import { usePayments } from '../hooks/usePayments';

// Importar íconos
import { UserIcon, CogIcon, MapIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('stats');

  // Traemos datos desde los hooks
  const { data: users = [] } = useUsers();
  const { data: bikes = [], disableBike, deleteBike, editBike } = useBikes();
  const { data: stations = [] } = useStations();
  const { data: payments = [] } = usePayments();

  // Estado para modales de bicis
  const [selectedBike, setSelectedBike] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Cálculos
  const usersCount = users.length;
  const activeUsersCount = users.filter(u => u.status === "Active").length;
  const bikesCount = bikes.length;
  const availableBikesCount = bikes.filter(b => b.status === "Available").length;
  const stationsCount = stations.length;
  const paymentsCount = payments.length;

  // Funciones para mapa
  const handleEditBike = (bike) => {
    setSelectedBike(bike);
    setIsEditModalOpen(true);
  };

  const handleDisableBike = (id) => {
    disableBike(id);
  };

  const handleDeleteBike = (id) => {
    deleteBike(id);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Tabs internas */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded ${activeTab === 'stats' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Estadísticas
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <UserIcon className="h-5 w-5 mr-2" /> Usuarios
        </button>
        <button
          onClick={() => setActiveTab('bikes')}
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'bikes' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <CogIcon className="h-5 w-5 mr-2" /> Bicis
        </button>
        <button
          onClick={() => setActiveTab('bikesmap')}
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'bikesmap' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <MapIcon className="h-5 w-5 mr-2" /> Mapa Bicis
        </button>
        <button
          onClick={() => setActiveTab('stations')}
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'stations' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <MapIcon className="h-5 w-5 mr-2" /> Estaciones
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`flex items-center px-4 py-2 rounded ${activeTab === 'payments' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <CurrencyDollarIcon className="h-5 w-5 mr-2" /> Pagos
        </button>
      </div>

      {/* Contenido según pestaña */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'stats' && (
          <StatsDashboard
            usersCount={usersCount}
            activeUsersCount={activeUsersCount}
            bikesCount={bikesCount}
            availableBikesCount={availableBikesCount}
            stationsCount={stationsCount}
            paymentsCount={paymentsCount}
          />
        )}
        {activeTab === 'users' && <UsersList />}
        {activeTab === 'bikes' && <BikesList />}
        {activeTab === 'bikesmap' && (
          <BikesMap
            bikes={bikes}
            onEditBike={handleEditBike}
            onDisableBike={handleDisableBike}
            onDeleteBike={handleDeleteBike}
          />
        )}
        {activeTab === 'stations' && <StationsListWithMap />}
        {activeTab === 'payments' && <PaymentsList />}
      </div>

      {/* Modal de edición centralizado */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        bike={selectedBike}
        onSave={(updatedBike) => {
          editBike({ id: updatedBike.id, payload: updatedBike });
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
}
