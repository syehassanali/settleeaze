import React, { useState, useEffect } from 'react';

const API_URL = '/api/admin/services';

const initialForm = {
  title: '',
  description: '',
  details: '',
  price: '',
  category: '',
  imageUrl: '',
  visibility: 'Published',
};

function ServicesAdminPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [showDeleted, setShowDeleted] = useState(false);

  // Fetch services from API
  useEffect(() => {
    setLoading(true);
    setError('');
    let url = `${API_URL}?limit=100`;
    const params = [];
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (category) params.push(`category=${encodeURIComponent(category)}`);
    if (visibility) params.push(`visibility=${encodeURIComponent(visibility)}`);
    if (params.length) url += '&' + params.join('&');
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load services');
        setLoading(false);
      });
  }, [search, category, visibility, refresh]);

  // Snackbar helpers
  const showError = (msg) => { setError(msg); setTimeout(() => setError(''), 3000); };
  const showSuccess = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(''), 2000); };

  // Handlers
  const handleSearch = (e) => setSearch(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleVisibility = (e) => setVisibility(e.target.value);

  const openAddModal = () => {
    setForm(initialForm);
    setShowAddModal(true);
  };
  const openEditModal = (service) => {
    setEditService(service);
    setForm({ ...service });
    setShowEditModal(true);
  };
  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditService(null);
  };

  // Add Service
  const handleAdd = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add service');
      showSuccess('Service added');
      closeModals();
      setRefresh(r => r + 1);
    } catch (err) {
      showError(err.message);
    }
  };

  // Edit Service
  const handleEdit = async () => {
    try {
      const res = await fetch(`${API_URL}/${editService._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update service');
      showSuccess('Service updated');
      closeModals();
      setRefresh(r => r + 1);
    } catch (err) {
      showError(err.message);
    }
  };

  // Soft Delete
  const handleDelete = async (service) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`${API_URL}/${service._id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service');
      showSuccess('Service deleted');
      setRefresh(r => r + 1);
    } catch (err) {
      showError(err.message);
    }
  };

  // Restore
  const handleRestore = async (service) => {
    try {
      const res = await fetch(`${API_URL}/${service._id}/restore`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to restore service');
      showSuccess('Service restored');
      setRefresh(r => r + 1);
    } catch (err) {
      showError(err.message);
    }
  };

  // Toggle Visibility
  const handleToggleVisibility = async (service) => {
    try {
      const newVisibility = service.visibility === 'Published' ? 'Hidden' : 'Published';
      const res = await fetch(`${API_URL}/${service._id}/visibility`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visibility: newVisibility }),
      });
      if (!res.ok) throw new Error('Failed to update visibility');
      showSuccess('Visibility updated');
      setRefresh(r => r + 1);
    } catch (err) {
      showError(err.message);
    }
  };

  // Unique categories for filter
  const categories = Array.from(new Set(services.map(s => s.category).filter(Boolean)));
  const visibleServices = showDeleted ? services : services.filter(s => !s.isDeleted);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <input className="input input-bordered px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Search services..." value={search} onChange={handleSearch} />
            <select className="input input-bordered px-3 py-2 rounded-md border border-gray-300" value={category} onChange={handleCategory}>
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select className="input input-bordered px-3 py-2 rounded-md border border-gray-300" value={visibility} onChange={handleVisibility}>
              <option value="">All</option>
              <option value="Published">Published</option>
              <option value="Hidden">Hidden</option>
            </select>
            <label className="flex items-center gap-1 text-sm ml-2">
              <input type="checkbox" checked={showDeleted} onChange={e => setShowDeleted(e.target.checked)} className="accent-indigo-600" /> Show Deleted
            </label>
          </div>
          <button onClick={openAddModal} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md shadow transition">+ Add New Service</button>
        </div>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-lg text-indigo-600 font-semibold">Loading...</div>
          ) : visibleServices.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No Services Yet. <button onClick={openAddModal} className="text-indigo-600 underline">Add New Service</button></div>
          ) : (
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Thumbnail</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Description</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Price</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Created</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Updated</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Visibility</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleServices.map(service => (
                  <tr key={service._id} className={service.isDeleted ? 'opacity-50 line-through' : ''}>
                    <td className="px-4 py-2">
                      {service.imageUrl && <img src={service.imageUrl} alt="thumb" className="w-12 h-12 object-cover rounded shadow" />}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900">{service.title}</td>
                    <td className="px-4 py-2 text-gray-700">{service.description?.slice(0, 40)}...</td>
                    <td className="px-4 py-2">{service.price || 'Free'}</td>
                    <td className="px-4 py-2">{service.category}</td>
                    <td className="px-4 py-2">{service.createdAt ? new Date(service.createdAt).toLocaleDateString() : ''}</td>
                    <td className="px-4 py-2">{service.updatedAt ? new Date(service.updatedAt).toLocaleDateString() : ''}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleToggleVisibility(service)} disabled={service.isDeleted} className="text-xl">
                        {service.visibility === 'Published' ? '👁️' : '🙈'}
                      </button>
                    </td>
                    <td className="px-4 py-2 space-x-1">
                      {!service.isDeleted ? (
                        <>
                          <button onClick={() => openEditModal(service)} className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">Edit</button>
                          <button onClick={() => handleDelete(service)} className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Delete</button>
                        </>
                      ) : (
                        <button onClick={() => handleRestore(service)} className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition">Restore</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Add New Service</h2>
            <div className="space-y-3">
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Short Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <textarea className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Details" value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
              <select className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" value={form.visibility} onChange={e => setForm({ ...form, visibility: e.target.value })}>
                <option value="Published">Published</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={handleAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow">Save</button>
              <button onClick={closeModals} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded shadow">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Service</h2>
            <div className="space-y-3">
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Short Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <textarea className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Details" value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
              <select className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" value={form.visibility} onChange={e => setForm({ ...form, visibility: e.target.value })}>
                <option value="Published">Published</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={handleEdit} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow">Save</button>
              <button onClick={closeModals} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded shadow">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesAdminPage; 