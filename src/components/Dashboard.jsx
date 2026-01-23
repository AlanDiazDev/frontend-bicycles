import React from 'react';
import MapView from './MapView';

export default function Dashboard() {
  return (
    <div className="flex flex-1 p-6 gap-6 bg-gray-50">
      <div className="flex-1">
        <MapView />
      </div>
      <div className="w-1/3 flex flex-col gap-6">
        {/* Panel Bicicletas */}
        <div className="bg-white border rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Bicicletas</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-100 rounded">Bici #1 - Disponible</li>
            <li className="p-2 bg-gray-100 rounded">Bici #2 - Alquilada</li>
          </ul>
        </div>

        {/* Panel Puntos de Retiro */}
        <div className="bg-white border rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Puntos de Retiro</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-100 rounded">Estación Central</li>
            <li className="p-2 bg-gray-100 rounded">Plaza Norte</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

