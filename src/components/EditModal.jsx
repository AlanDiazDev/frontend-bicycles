import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";

export default function EditBikeModal({ isOpen, onClose, bike, onSave }) {
  const [formData, setFormData] = React.useState(bike || {});
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  React.useEffect(() => {
    setFormData(bike || {});
  }, [bike]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let blockedValue = formData.blocked;

    // lógica automática del candado según estado
    if (name === "status") {
      if (value === "Rented") {
        blockedValue = false;
      } else {
        blockedValue = true;
      }
    }

    setFormData({ ...formData, [name]: value, blocked: blockedValue });
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
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
        <h2 className="text-xl font-semibold mb-4">Editar Bicicleta</h2>
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
            <label className="block text-sm font-medium">Estado</label>
            <select
              name="status"
              value={formData.status || "Available"}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Available">Disponible</option>
              <option value="Rented">Ocupada</option>
              <option value="Disabled">Deshabilitada</option>
            </select>
          </div>

          {/* Candado visual */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Candado:</span>
            {formData.blocked ? (
              <LockClosedIcon className="h-6 w-6 text-gray-700" title="Bloqueada" />
            ) : (
              <LockOpenIcon className="h-6 w-6 text-green-600" title="Desbloqueada" />
            )}
          </div>

          {isLoaded && (
            <div>
              <label className="block text-sm font-medium mb-2">Ubicación</label>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "300px" }}
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
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
