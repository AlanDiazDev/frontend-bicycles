import React, { useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import UsersList from './UsersList';
import BikesList from './BikesList';
import PaymentsList from './PaymentsList';
import StationsListWithMap from './StationsListWithMap';
import { Bars3Icon, XMarkIcon, HomeIcon, UsersIcon, CogIcon, MapIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white fixed h-screen transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 md:translate-x-0'
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <span className="text-xl font-bold">🚲 Bike Admin</span>
          <button onClick={() => setIsOpen(false)} className="md:hidden">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6 space-y-2">
          <NavLink to="/" end className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
          }>
            <HomeIcon className="h-5 w-5 mr-2" /> Dashboard
          </NavLink>

          <NavLink to="/users" className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
          }>
            <UsersIcon className="h-5 w-5 mr-2" /> Users
          </NavLink>

          <NavLink to="/bikes" className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
          }>
            <CogIcon className="h-5 w-5 mr-2" /> Bikes
          </NavLink>

          <NavLink to="/stations" className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
          }>
            <MapIcon className="h-5 w-5 mr-2" /> Stations
          </NavLink>
          <NavLink to="/payments" className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
          }>
            <CurrencyDollarIcon className="h-5 w-5 mr-2" /> Payments
          </NavLink>
        </nav>
      </aside>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white shadow flex items-center px-4 z-30 md:ml-64">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-gray-800"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h1 className="ml-4 text-lg font-semibold">Bike Rental Dashboard</h1>
      </header>

      {/* Content */}
      <main className="flex-1 ml-0 md:ml-64 mt-14 overflow-y-auto bg-gray-50 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/bikes" element={<BikesList />} />
          <Route path="/stations" element={<StationsListWithMap />} />
          <Route path="/payments" element={<PaymentsList />} />
        </Routes>
      </main>
    </div>
  );
}
