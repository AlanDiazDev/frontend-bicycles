import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useBikes } from '../hooks/useBikes';
import { useStations } from '../hooks/useStations';

const containerStyle = { width: '100%', height: '500px' };
const center = { lat: -34.5, lng: -58.8 };

export default function MapView() {
  const { data: bikes = [] } = useBikes();
  const { data: stations = [] } = useStations();

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Map</h3>
      <LoadScript googleMapsApiKey="TU_API_KEY_AQUI">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {bikes.map(b => (
            <Marker
              key={b.id}
              position={{ lat: b.lat, lng: b.lng }}
              label={b.status === "Available" ? "🚲" : "❌"}
            />
          ))}
          {stations.map(s => (
            <Marker key={s.id} position={{ lat: s.lat, lng: s.lng }} label="🏠" />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
////AIzaSyDgNY-I2r_7XcPS-OJcex2e-B0zZZksdX8