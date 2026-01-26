import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, MarkerClusterer } from '@react-google-maps/api';

export default function BikesMap({ bikes, onEditBike, onDisableBike, onDeleteBike }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [selectedBike, setSelectedBike] = useState(null);
  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    if (bikes.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      bikes.forEach((b) => bounds.extend({ lat: b.lat, lng: b.lng }));
      map.fitBounds(bounds);
    }
  }, [bikes]);

  if (!isLoaded) return <p>Cargando mapa...</p>;

  const getIconByStatus = (status) => {
    let color;
    switch (status) {
      case "Available": color = "green"; break;
      case "Rented": color = "red"; break;
      case "Disabled": color = "gray"; break;
      default: color = "blue";
    }
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.9,
      strokeColor: "white",
      strokeWeight: 1,
      scale: 8,
    };
  };

  return (
    <div className="bg-white border rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Mapa de Bicicletas</h3>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        onLoad={onLoad}
      >
        <MarkerClusterer>
          {(clusterer) =>
            bikes.map((b) => (
              <Marker
                key={b.id}
                position={{ lat: b.lat, lng: b.lng }}
                icon={getIconByStatus(b.status)}
                clusterer={clusterer}
                onClick={() => setSelectedBike(b)}
              />
            ))
          }
        </MarkerClusterer>

        {selectedBike && (
          <InfoWindow
            position={{ lat: selectedBike.lat, lng: selectedBike.lng }}
            onCloseClick={() => setSelectedBike(null)}
          >
            <div className="text-sm">
              <h4 className="font-semibold">{selectedBike.name}</h4>
              <p>Estado: {selectedBike.status}</p>
              <p>Lat: {selectedBike.lat}, Lng: {selectedBike.lng}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => onEditBike(selectedBike)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDisableBike(selectedBike.id)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Deshabilitar
                </button>
                <button
                  onClick={() => onDeleteBike(selectedBike.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
