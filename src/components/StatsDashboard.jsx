import React from 'react';
import { UserIcon, CogIcon, CheckCircleIcon, MapIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
// import { Pie, Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  // BarElement,
} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

export default function StatsDashboard({
  usersCount,
  activeUsersCount,
  bikesCount,
  availableBikesCount,
  stationsCount,
  paymentsCount,
  activeServicesCount,
}) {
  const stats = [
    { name: 'Total Users', value: usersCount, icon: UserIcon, color: 'bg-blue-500' },
    { name: 'Total Bikes', value: bikesCount, icon: CogIcon, color: 'bg-green-500' },
    { name: 'Available Bikes', value: availableBikesCount, icon: CheckCircleIcon, color: 'bg-yellow-500' },
    { name: 'Stations', value: stationsCount, icon: MapIcon, color: 'bg-purple-500' },
    { name: 'Total Payments', value: paymentsCount, icon: CurrencyDollarIcon, color: 'bg-pink-500' },
    { name: 'Active Services', value: activeServicesCount, icon: faStreetView, color: 'bg-red-500', isFontAwesome: true },
  ];

  const bikesPieData = {
    labels: ['Available Bikes', 'Occupied Bikes'],
    datasets: [
      {
        data: [availableBikesCount, bikesCount - availableBikesCount],
        backgroundColor: ['#FACC15', '#EF4444'],
      },
    ],
  };

  const usersPieData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        data: [activeUsersCount, usersCount - activeUsersCount],
        backgroundColor: ['#3B82F6', '#9CA3AF'],
      },
    ],
  };

  // const barData = {
  //   labels: ['Users', 'Active Users', 'Stations'],
  //   datasets: [
  //     {
  //       label: 'Totals',
  //       data: [usersCount, activeUsersCount, stationsCount],
  //       backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6'],
  //     },
  //   ],
  // };

  // const barOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: { display: false },
  //     title: { display: true, text: 'Comparativa General' },
  //   },
  //   scales: {
  //     y: { beginAtZero: true },
  //   },
  // };

  return (
    <div className="space-y-8">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className={`${stat.color} p-3 rounded-full text-white`}>
              {stat.isFontAwesome ? (
                <FontAwesomeIcon icon={stat.icon} className="h-6 w-6" />
              ) : (
                <stat.icon className="h-6 w-6" />
              )}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Disponibilidad de Bicis</h2>
          <div className="w-64 h-64">
            <Pie data={bikesPieData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Usuarios Activos</h2>
          <div className="w-64 h-64">
            <Pie data={usersPieData} />
          </div>
        </div>
      </div>

      {/* Bar Chart
      <div className="bg-white rounded-lg shadow p-6">
        <Bar data={barData} options={barOptions} />
      </div> */}
    </div>
  );
}
