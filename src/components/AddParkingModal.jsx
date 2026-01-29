import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function AddParkingModal({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = React.useState({
        name: "",
        type: "Cubierto",
        status: "Disponible",
        lat: null,
        lng: null,
    });

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

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
            lat: parseFloat(formData.lat),
            lng: parseFloat(formData.lng),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
                <h2 className="text-xl font-semibold mb-4">Agregar Estacionamiento</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Tipo</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="Cubierto">Cubierto</option>
                            <option value="Descubierto">Descubierto</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Estado</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="Ocupado">Ocupado</option>
                            <option value="Deshabilitado">Deshabilitado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Tipo</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="Calle">Calle</option>
                            <option value="Playon">Playon</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Sector</label>
                        <input
                            type="text"
                            name="sector"
                            value={formData.sector || ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Ej: P1200, I850, G14"
                            required
                        />
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
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            disabled={!formData.lat || !formData.lng}
                        >
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
