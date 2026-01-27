import React, { useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import UsersList from './UsersList';
import BikesList from './BikesList';
import PaymentsList from './PaymentsList';
import StationsListWithMap from './StationsListWithMap';
import ScootersList from './ScootersList';
import CarsList from './CarsList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faPersonSkating, faRoute, faCar } from '@fortawesome/free-solid-svg-icons'

import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  MapIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobilityOpen, setMobilityOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white fixed h-screen transition-all duration-300 z-40 
          ${isOpen ? 'w-64' : 'w-16'}`}
      >
        <div className="p-4 flex justify-between items-center">
          {isOpen && <span className="text-xl font-bold">🚲 Bike Admin</span>}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        <nav className="mt-6 space-y-2">
          {/* Dashboard */}
          <NavLink to="/" end className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
          }>
            <HomeIcon className="h-5 w-5" />
            {isOpen && <span className="ml-2">Dashboard</span>}
          </NavLink>

          {/* Users */}
          <NavLink to="/users" className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
          }>
            <UsersIcon className="h-5 w-5" />
            {isOpen && <span className="ml-2">Usuarios</span>}
          </NavLink>

          {/* Movilidad (submenu) */}
          <div className="relative group">
            <button
              onClick={() => setMobilityOpen(!mobilityOpen)}
              className="flex items-center w-full px-4 py-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              {/* <CogIcon className="h-5 w-5" /> */}
              <FontAwesomeIcon icon={faRoute} />
              {isOpen && <span className="ml-2">Movilidad</span>}
            </button>
            {mobilityOpen && isOpen && (
              <div className="ml-8 mt-2 space-y-1">
                <NavLink to="/bikes" className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
                }>
                  {/* <AcademicCapIcon className="h-5 w-5" /> */}
                  <FontAwesomeIcon icon={faBicycle} />
                  <span className="ml-2">Bicicletas</span>
                </NavLink>
                <NavLink to="/scooters" className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
                }>
                  {/* <RocketLaunchIcon className="h-5 w-5" /> */}
                  <FontAwesomeIcon icon={faPersonSkating} />
                  <span className="ml-2">Monopatines</span>
                </NavLink>
                <NavLink to="/cars" className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
                }>
                  {/* <TruckIcon className="h-5 w-5" /> */}
                  <FontAwesomeIcon icon={faCar} />
                  <span className="ml-2">Automotores</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Stations */}
          <NavLink to="/stations" className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
          }>
            <MapIcon className="h-5 w-5" />
            {isOpen && <span className="ml-2">Estaciones</span>}
          </NavLink>

          {/* Payments */}
          <NavLink to="/payments" className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
          }>
            <CurrencyDollarIcon className="h-5 w-5" />
            {isOpen && <span className="ml-2">Pagos</span>}
          </NavLink>
        </nav>
      </aside>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 h-14 bg-white shadow flex items-center px-4 z-30 transition-all duration-300 
          ${isOpen ? 'ml-64' : 'ml-16'}`}
      >
        <h1 className="ml-4 text-lg font-semibold flex items-center">
          <img src="/icons/general-pico-logo.png" alt="Logo General Pico" className="h-10 w-10 md:h-12 md:w-12" />
        </h1>
      </header>

      {/* Content */}
      <main
        className={`flex-1 mt-14 overflow-y-auto bg-gray-50 p-6 transition-all duration-300 
          ${isOpen ? 'ml-64' : 'ml-16'}`}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/bikes" element={<BikesList />} />
          <Route path="/scooters" element={<ScootersList />} />
          <Route path="/cars" element={<CarsList />} />
          <Route path="/stations" element={<StationsListWithMap />} />
          <Route path="/payments" element={<PaymentsList />} />
        </Routes>
      </main>
    </div>
  );
}
