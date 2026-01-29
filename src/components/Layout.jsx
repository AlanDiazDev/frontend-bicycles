import React, { useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import UsersList from './UsersList';
import BikesList from './BikesList';
import PaymentsList from './PaymentsList';
import StationsListWithMap from './StationsListWithMap';
import ScootersList from './ScootersList';
import CarsList from './CarsList';
import ContainersList from './ContainersList';
import PollutionList from './PollutionList';
import ParkingList from './ParkingList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, faPersonSkating, faCar, faDumpster, faSmog, faParking, faList, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  MapIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  // Helper NavItem con tooltip estilizado
  const NavItem = ({ to, icon, label, heroIcon: HeroIcon, sectionColor }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative group flex items-center px-4 py-2 rounded 
         ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
      }
    >
      {HeroIcon ? <HeroIcon className="h-5 w-5" /> : <FontAwesomeIcon icon={icon} />}
      {isOpen && <span className="ml-2">{label}</span>}
      {!isOpen && (
        <span
          className={`absolute left-16 text-white text-xs rounded px-2 py-1 shadow-lg backdrop-blur-sm
                      opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 
                      transition-all duration-300 ease-out delay-150 ${sectionColor}`}
        >
          {label}
        </span>
      )}
    </NavLink>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white fixed h-screen transition-all duration-300 z-40 
          ${isOpen ? 'w-64' : 'w-16'}`}
      >
        <div className="p-4 flex justify-between items-center">
          {isOpen && (
            <span className="text-xl font-bold flex items-center">
              <FontAwesomeIcon icon={faList} className="mr-2" />
              Menu
            </span>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <FontAwesomeIcon icon={faAnglesLeft} /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        <nav className="mt-6 space-y-2">
          {/* General */}
          {isOpen && <div className="px-4 py-2 text-gray-400 uppercase text-xs">General</div>}
          <NavItem to="/" heroIcon={HomeIcon} label="Dashboard" sectionColor="bg-blue-600" />
          <NavItem to="/users" heroIcon={UsersIcon} label="Usuarios" sectionColor="bg-blue-600" />

          {/* Movilidad */}
          {isOpen && <div className="px-4 py-2 text-gray-400 uppercase text-xs">Movilidad</div>}
          {/* <NavItem to="/" icon={faCar} label="Automotores" sectionColor="bg-green-600" /> */}
          <div className="flex items-center px-4 py-2 text-white rounded-md opacity-50 cursor-not-allowed">
            <FontAwesomeIcon className="mr-2" icon={faCar} />
            Automotores
          </div>
          <NavItem to="/bikes" icon={faBicycle} label="Bicicletas" sectionColor="bg-green-600" />
          <NavItem to="/scooters" icon={faPersonSkating} label="Monopatines" sectionColor="bg-green-600" />
          <NavItem to="/stations" heroIcon={MapIcon} label="Estaciones" sectionColor="bg-green-600" />
          <NavItem to="/parking" icon={faParking} label="Estacionamiento" sectionColor="bg-green-600" />

          {/* Medio Ambiente */}
          {isOpen && <div className="px-4 py-2 text-gray-400 uppercase text-xs">Medio Ambiente</div>}
          <NavItem to="/containers" icon={faDumpster} label="Contenedores" sectionColor="bg-yellow-600" />
          <NavItem to="/pollution" icon={faSmog} label="Contaminación" sectionColor="bg-yellow-600" />

          {/* Finanzas */}
          {isOpen && <div className="px-4 py-2 text-gray-400 uppercase text-xs">Finanzas</div>}
          <NavItem to="/payments" heroIcon={CurrencyDollarIcon} label="Pagos" sectionColor="bg-purple-600" />
        </nav>
      </aside>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 h-14 bg-white shadow flex items-center px-4 z-30 transition-all duration-300 
          ${isOpen ? 'ml-64' : 'ml-16'}`}
      >
        <h1 className="ml-4 text-lg font-semibold flex items-center">
          <img src="/general-pico-logo.png" alt="Logo General Pico" className="h-10 w-10 md:h-12 md:w-12" />
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
          <Route path="/containers" element={<ContainersList />} />
          <Route path="/pollution" element={<PollutionList />} />
          <Route path="/parking" element={<ParkingList />} />
        </Routes>
      </main>
    </div>
  );
}
