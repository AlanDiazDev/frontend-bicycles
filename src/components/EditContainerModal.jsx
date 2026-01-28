import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function EditContainerModal({ isOpen, onClose, container, onSave }) {
  const [formData, setFormData] = React.useState(container || {});
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  React.useEffect(() => {
    setFormData(container || {});
  }, [container]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMapClick = (e) => {
    setFormData({
      ...formData,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      fillLevel: parseInt(formData.fillLevel, 10),
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
    });
    onClose();
  };

  // Color dinámico para la barra de progreso
  const getFillColor = (level) => {
    if (level > 70) return "bg-red-500";
    if (level > 30) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
        <h2 className="text-xl font-semibold mb-4">Editar Contenedor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo</label>
            <select
              name="type"
              value={formData.type || "Plástico"}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Plástico">Plástico</option>
              <option value="Vidrio">Vidrio</option>
              <option value="Orgánico">Orgánico</option>
              <option value="Metal">Metal</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Nivel de llenado (%)</label>
            <input
              type="number"
              name="fillLevel"
              min="0"
              max="100"
              value={formData.fillLevel || 0}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            {/* Barra de progreso visual */}
            <div className="w-full bg-gray-200 rounded h-2 mt-2">
              <div
                className={`h-2 rounded ${getFillColor(formData.fillLevel)}`}
                style={{ width: `${formData.fillLevel}%` }}
              />
            </div>
          </div>

          {/* Mapa para seleccionar ubicación */}
          {isLoaded && (
            <div>
              <label className="block text-sm font-medium mb-2">Ubicación</label>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '300px' }}
                center={{
                  lat: formData.lat ? parseFloat(formData.lat) : -35.6593,
                  lng: formData.lng ? parseFloat(formData.lng) : -63.7579,
                }}
                zoom={14}
                onClick={handleMapClick}
              >
                {formData.lat && formData.lng && (
                  <Marker position={{ lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) }} />
                )}
              </GoogleMap>
              <p className="text-sm mt-2">
                Lat: {formData.lat || "—"}, Lng: {formData.lng || "—"}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
