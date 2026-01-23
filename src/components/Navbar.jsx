import React from 'react';
//import './Navbar.css';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-gray-100 px-6 py-3 shadow">
      <span className="text-lg font-semibold">Dashboard</span>
      <div className="space-x-4">
        <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
        <a href="#" className="text-gray-700 hover:text-blue-600">Reports</a>
        <a href="#" className="text-gray-700 hover:text-blue-600">Admin</a>
      </div>
    </div>
  );
}

