import React, { useState, useEffect, useRef } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import UsersList from "./UsersList";
import BikesList from "./BikesList";
import PaymentsList from "./PaymentsList";
import StationsListWithMap from "./StationsListWithMap";
import ScootersList from "./ScootersList";
import CarsList from "./CarsList";
import ContainersList from "./ContainersList";
import PollutionList from "./PollutionList";
import ParkingList from "./ParkingList";
import ActiveServicesList from "./ActiveServicesList";
import MotorcyclesList from './MotorcyclesList';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBicycle,
  faPersonSkating,
  faCar,
  faDumpster,
  faSmog,
  faParking,
  faList,
  faAnglesLeft,
  faRightFromBracket,
  faChevronDown,
  faChevronRight,
  faMotorcycle,
} from "@fortawesome/free-solid-svg-icons";

import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  MapIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [openSections, setOpenSections] = useState({
    general: true,
    movilidad: true,
    medioambiente: true,
    finanzas: true,
  });

  useEffect(() => {
    if (!isOpen) {
      setOpenSections({
        general: true,
        movilidad: true,
        medioambiente: true,
        finanzas: true,
      });
    }
  }, [isOpen]);


  const toggleSection = (s) =>
    setOpenSections((prev) => ({ ...prev, [s]: !prev[s] }));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================================
      NAV ITEM CON TOOLTIP FIXED
  ==================================*/
  const NavItem = ({ to, icon, label, heroIcon: HeroIcon, sectionColor }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });

    const onEnter = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setPos({
        top: r.top + r.height / 2,
        left: r.right + 12,
      });
      setShow(true);
    };

    const onLeave = () => setShow(false);

    return (
      <>
        <NavLink
          ref={ref}
          to={to}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded
             ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`
          }
        >
          {HeroIcon ? (
            <HeroIcon className="h-5 w-5" />
          ) : (
            <FontAwesomeIcon icon={icon} />
          )}
          {isOpen && <span className="ml-2">{label}</span>}
        </NavLink>

        {!isOpen && show && (
          <div
            className={`fixed z-[9999] text-white text-xs rounded px-2 py-1 shadow-lg
              ${sectionColor}`}
            style={{
              top: pos.top,
              left: pos.left,
              transform: "translateY(-50%)",
            }}
          >
            {label}
          </div>
        )}
      </>
    );
  };

  // Funcion para items deshabilitados en el nav
  // const DisabledNavItem = ({ icon, label }) => (
  //   <div className="relative flex items-center px-4 py-2 rounded opacity-50 cursor-not-allowed">
  //     <FontAwesomeIcon icon={icon} />
  //     {isOpen && <span className="ml-2">{label}</span>}
  //   </div>
  // );

  const SectionTitle = ({ label, open, onClick }) =>
    isOpen && (
      <div
        onClick={onClick}
        className="px-4 py-2 text-gray-400 uppercase text-xs cursor-pointer flex justify-between items-center"
      >
        {label}
        <FontAwesomeIcon
          icon={open ? faChevronDown : faChevronRight}
          className="text-sm"
        />
      </div>
    );

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside
        className={`bg-gray-800 text-white fixed h-screen z-40 transition-all duration-300
        ${isOpen ? "w-64" : "w-16"}`}
      >
        <div className="p-4 flex justify-between items-center">
          {isOpen && (
            <span className="text-xl font-bold flex items-center">
              <FontAwesomeIcon icon={faList} className="mr-2" /> Menu
            </span>
          )}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FontAwesomeIcon icon={faAnglesLeft} /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* NAV SCROLL (solo vertical) */}
        <nav className="h-[calc(100vh-80px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <div className="space-y-2 pb-6">
            <SectionTitle
              label="General"
              open={openSections.general}
              onClick={() => toggleSection("general")}
            />
            {openSections.general && (
              <>
                <NavItem to="/" heroIcon={HomeIcon} label="Dashboard" sectionColor="bg-blue-600" />
                <NavItem to="/users" heroIcon={UsersIcon} label="Usuarios" sectionColor="bg-blue-600" />
                <NavItem to="/active-services" icon={faList} label="Servicios Activos" sectionColor="bg-blue-600" />
              </>
            )}

            <SectionTitle
              label="Movilidad"
              open={openSections.movilidad}
              onClick={() => toggleSection("movilidad")}
            />
            {openSections.movilidad && (
              <>
                {/* <DisabledNavItem icon={faCar} label="Automotores" /> */}
                <NavItem to="/cars" icon={faCar} label="Autos" sectionColor="bg-green-600" />
                <NavItem to="/motorcycles" icon={faMotorcycle} label="Motos" sectionColor="bg-green-600" />
                <NavItem to="/bikes" icon={faBicycle} label="Bicicletas" sectionColor="bg-green-600" />
                <NavItem to="/scooters" icon={faPersonSkating} label="Monopatines" sectionColor="bg-green-600" />
                <NavItem to="/stations" heroIcon={MapIcon} label="Estaciones" sectionColor="bg-green-600" />
                <NavItem to="/parking" icon={faParking} label="Estacionamiento" sectionColor="bg-green-600" />
              </>
            )}

            <SectionTitle
              label="Medio Ambiente"
              open={openSections.medioambiente}
              onClick={() => toggleSection("medioambiente")}
            />
            {openSections.medioambiente && (
              <>
                <NavItem to="/containers" icon={faDumpster} label="Contenedores" sectionColor="bg-yellow-600" />
                <NavItem to="/pollution" icon={faSmog} label="Contaminación" sectionColor="bg-yellow-600" />
              </>
            )}

            <SectionTitle
              label="Finanzas"
              open={openSections.finanzas}
              onClick={() => toggleSection("finanzas")}
            />
            {openSections.finanzas && (
              <NavItem to="/payments" heroIcon={CurrencyDollarIcon} label="Pagos" sectionColor="bg-purple-600" />
            )}
          </div>
        </nav>
      </aside>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 h-14 bg-white shadow flex items-center justify-between px-4 z-30
        transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}
      >
        <img src="/general-pico-logo.png" alt="Logo" className="h-10" />

        <div ref={menuRef} className="relative">
          <div
            className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            A
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
              <div className="px-4 py-2 border-b">Perfil: Administrador</div>
              <button className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 text-red-500" />
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* CONTENT */}
      <main
        className={`flex-1 mt-14 overflow-y-auto bg-gray-50 p-6 transition-all duration-300
        ${isOpen ? "ml-64" : "ml-16"}`}
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
          <Route path="/active-services" element={<ActiveServicesList />} />
          <Route path="/motorcycles" element={<MotorcyclesList />} />
        </Routes>
      </main>
    </div>
  );
}
