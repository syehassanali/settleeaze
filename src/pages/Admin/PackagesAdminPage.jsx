import React, { useState, useEffect } from 'react';

const API_URL = '/api/admin/packages';

const initialForm = {
  title: '',
  price: '',
  tagline: '',
  features: [],
  description: '',
  type: 'Standard',
  visibility: true,
  priority: 0,
  mostPopular: false,
};

function PackagesAdminPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPackage, setEditPackage] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [showDeleted, setShowDeleted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refresh, setRefresh] = useState(0);

  // Fetch packages from API
  useEffect(() => {
    setLoading(true);
    setError('');
    let url = `${API_URL}?limit=100`;
    const params = [];
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (type) params.push(`type=${encodeURIComponent(type)}`);
    if (params.length) url += '&' + params.join('&');
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPackages(data.packages || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load packages');
        setLoading(false);
      });
  }, [search, type, refresh]);

  // Snackbar helpers
  const showError = (msg) => { setError(msg); setTimeout(() => setError(''), 3000); };
  const showSuccess = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(''), 2000); };

  const handleSearch = (e) => setSearch(e.target.value);
  const handleType = (e) => setType(e.target.value);

  const openAddModal = () => {
    setForm(initialForm);
    setShowAddModal(true);
  };
  const openEditModal = (pkg) => {
    setEditPackage(pkg);
    setForm({ ...pkg });
    setShowEditModal(true);
  };
  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditPackage(null);
  };

  // Add Package
  const handleAdd = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add package');
      showSuccess('Package added');
      closeModals();
      setRefresh(r => r + 1);
    } catch (err) {
      showError(err.message);
    }
  };

  // Edit Package
  const handleEdit = async () => {
    try {
      const res = await fetch(`${API_URL}/${editPackage._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update package');
      showSuccess('Package updated');
      closeModals();
      setRefresh(r => r + 1);
    } catch (err) {
      showError(err.message);
    }
  };

  // Soft Delete
  const handleDelete = async (pkg) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    try {
      const res = await fetch(`${API_URL}/${pkg._id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete package');
      showSuccess('Package deleted');
      setRefresh(r => r + 1);
    } catch (err) {
      showError(err.message);
    }
  };

  // Restore
  const handleRestore = async (pkg) => {
    try {
      const res = await fetch(`${API_URL}/${pkg._id}/restore`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to restore package');
      showSuccess('Package restored');
      setRefresh(r => r + 1);
    } catch (err) {
      showError(err.message);
    }
  };

  // Toggle Visibility
  const handleToggleVisibility = async (pkg) => {
    try {
      const newVisibility = !pkg.visibility;
      const res = await fetch(`${API_URL}/${pkg._id}/visibility`, {
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

  // Set/Unset Most Popular
  const handleSetMostPopular = async (pkg) => {
    try {
      const res = await fetch(`${API_URL}/${pkg._id}/most-popular`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mostPopular: !pkg.mostPopular }),
      });
      if (!res.ok) throw new Error('Failed to update most popular');
      showSuccess('Most Popular updated');
      setRefresh(r => r + 1);
    } catch (err) {
      showError(err.message);
    }
  };

  // Filtered packages
  const filtered = packages.filter(p =>
    (!search || p.title.toLowerCase().includes(search.toLowerCase())) &&
    (!type || p.type === type)
  );
  const visiblePackages = showDeleted ? filtered : filtered.filter(p => !p.isDeleted);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <input className="input input-bordered px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Search packages..." value={search} onChange={handleSearch} />
            <select className="input input-bordered px-3 py-2 rounded-md border border-gray-300" value={type} onChange={handleType}>
              <option value="">All Types</option>
              <option value="Standard">Standard</option>
              <option value="Custom">Custom</option>
            </select>
            <label className="flex items-center gap-1 text-sm ml-2">
              <input type="checkbox" checked={showDeleted} onChange={e => setShowDeleted(e.target.checked)} className="accent-indigo-600" /> Show Deleted
            </label>
          </div>
          <button onClick={openAddModal} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md shadow transition">+ Add New Package</button>
        </div>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-lg text-indigo-600 font-semibold">Loading...</div>
          ) : visiblePackages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No Packages Yet. <button onClick={openAddModal} className="text-indigo-600 underline">Add New Package</button></div>
          ) : (
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Price</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Tagline</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Features</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Visibility</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Priority</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Most Popular</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Created</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Updated</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visiblePackages.map(pkg => (
                  <tr key={pkg._id} className={pkg.isDeleted ? 'opacity-50 line-through' : ''}>
                    <td className="px-4 py-2 font-medium text-gray-900">{pkg.title}</td>
                    <td className="px-4 py-2">{pkg.price}</td>
                    <td className="px-4 py-2">{pkg.tagline}</td>
                    <td className="px-4 py-2">{pkg.features?.slice(0, 3).join(', ')}{pkg.features?.length > 3 && <span> +{pkg.features.length - 3} more</span>}</td>
                    <td className="px-4 py-2">{pkg.type}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleToggleVisibility(pkg)} disabled={pkg.isDeleted} className="text-xl">
                        {pkg.visibility ? '👁️' : '🙈'}
                      </button>
                    </td>
                    <td className="px-4 py-2">{pkg.priority}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleSetMostPopular(pkg)} disabled={pkg.isDeleted} className="text-xl">
                        {pkg.mostPopular ? '⭐' : '☆'}
                      </button>
                    </td>
                    <td className="px-4 py-2">{pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString() : ''}</td>
                    <td className="px-4 py-2">{pkg.updatedAt ? new Date(pkg.updatedAt).toLocaleDateString() : ''}</td>
                    <td className="px-4 py-2 space-x-1">
                      {!pkg.isDeleted ? (
                        <>
                          <button onClick={() => openEditModal(pkg)} className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">Edit</button>
                          <button onClick={() => handleDelete(pkg)} className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Delete</button>
                        </>
                      ) : (
                        <button onClick={() => handleRestore(pkg)} className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition">Restore</button>
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
            <h2 className="text-xl font-bold mb-4">Add New Package</h2>
            <div className="space-y-3">
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Tagline" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Features (comma separated)" value={form.features.join(', ')} onChange={e => setForm({ ...form, features: e.target.value.split(',').map(f => f.trim()) })} />
              <textarea className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <select className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="Standard">Standard</option>
                <option value="Custom">Custom</option>
              </select>
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Priority" type="number" value={form.priority} onChange={e => setForm({ ...form, priority: Number(e.target.value) })} />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.mostPopular} onChange={e => setForm({ ...form, mostPopular: e.target.checked })} className="accent-indigo-600" /> Most Popular
              </label>
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
            <h2 className="text-xl font-bold mb-4">Edit Package</h2>
            <div className="space-y-3">
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Tagline" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Features (comma separated)" value={form.features.join(', ')} onChange={e => setForm({ ...form, features: e.target.value.split(',').map(f => f.trim()) })} />
              <textarea className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <select className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="Standard">Standard</option>
                <option value="Custom">Custom</option>
              </select>
              <input className="w-full input input-bordered px-3 py-2 rounded border border-gray-300" placeholder="Priority" type="number" value={form.priority} onChange={e => setForm({ ...form, priority: Number(e.target.value) })} />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.mostPopular} onChange={e => setForm({ ...form, mostPopular: e.target.checked })} className="accent-indigo-600" /> Most Popular
              </label>
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

export default PackagesAdminPage; 