import React from 'react';

export default function EditScooterModal({ isOpen, onClose, scooter, onSave }) {
  const [formData, setFormData] = React.useState(scooter || {});

  React.useEffect(() => {
    setFormData(scooter || {});
  }, [scooter]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Scooter</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text" name="name" value={formData.name || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select name="status" value={formData.status || "Available"} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Latitude</label>
            <input type="number" step="any" name="lat" value={formData.lat || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Longitude</label>
            <input type="number" step="any" name="lng" value={formData.lng || ""} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
