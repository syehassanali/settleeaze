import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUserCheck, FaBoxOpen, FaClipboardList, FaEnvelopeOpenText, FaDollarSign, FaChartLine, FaChartPie, FaMapMarkerAlt, FaEdit, FaTrash, FaBan, FaRedo, FaFileCsv, FaPlus, FaStar, FaFileAlt, FaPaperclip, FaCheckCircle, FaUserTie, FaImage, FaUserShield, FaBell } from 'react-icons/fa';
import api from '../../services/api';
import { useRef } from 'react';

const summaryTiles = [
  { label: 'Total Registered Users', icon: <FaUsers className="text-2xl text-indigo-600" />, key: 'totalUsers' },
  { label: 'Active Users (30d)', icon: <FaUserCheck className="text-2xl text-green-600" />, key: 'activeUsers' },
  { label: 'Custom Package Requests', icon: <FaBoxOpen className="text-2xl text-purple-600" />, key: 'customPackages' },
  { label: 'Service Bookings', icon: <FaClipboardList className="text-2xl text-blue-600" />, key: 'bookings' },
  { label: 'Pending Inquiries', icon: <FaEnvelopeOpenText className="text-2xl text-yellow-600" />, key: 'inquiries' },
  { label: 'Revenue', icon: <FaDollarSign className="text-2xl text-green-700" />, key: 'revenue' },
];

const AdminDashboard = () => {
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, customPackages: 0, bookings: 0, inquiries: 0, revenue: 0 });
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [logs, setLogs] = useState([]);
  const [cms, setCms] = useState({});
  const [cmsEdit, setCmsEdit] = useState({});
  const [bannerImage, setBannerImage] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [bookingFilter, setBookingFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [inquiryFilter, setInquiryFilter] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Service modal form state
  const [serviceForm, setServiceForm] = useState({ title: '', category: '', price: '', image: '', description: '', details: '', features: [], visibility: 'Published' });
  const fileInputRef = useRef();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Open modal for add/edit
  const openServiceModal = (service = null) => {
    setEditingService(service);
    setServiceForm(service ? { ...service, features: service.features || [] } : { title: '', category: '', price: '', image: '', description: '', details: '', features: [], visibility: 'Published' });
    setServiceModalOpen(true);
  };

  // Handle form input
  const handleServiceInput = e => {
    const { name, value } = e.target;
    setServiceForm(f => ({ ...f, [name]: value }));
  };

  // Save service (add or edit)
  const handleServiceSave = async e => {
    e.preventDefault();
    try {
      if (editingService) {
        // Edit
        const res = await api.put(`/admin/services/${editingService._id}`, serviceForm);
        setServices(services.map(s => s._id === editingService._id ? res.data : s));
      } else {
        // Add
        const res = await api.post('/admin/services', serviceForm);
        setServices([res.data, ...services]);
      }
      setServiceModalOpen(false);
      alert('Service saved successfully!');
    } catch (err) {
      alert('Failed to save service.');
      console.error('Service save error:', err);
    }
  };

  // Delete service
  const handleDeleteService = async id => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/admin/services/${id}`);
        setServices(services.filter(service => service._id !== id));
      } catch (error) {
        alert('Error deleting service.');
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await api.post('/admin/services/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setServiceForm(f => ({ ...f, imageUrl: res.data.url }));
    } catch (err) {
      setUploadError('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const firstName = u.profile?.firstName || u.name || '';
    const lastName = u.profile?.lastName || '';
    const email = u.email || '';
    return (firstName + ' ' + lastName + ' ' + email).toLowerCase().includes(userFilter.toLowerCase());
  });

  // Booking status update handler
  const handleBookingStatusChange = async (bookingId, newStatus) => {
    try {
      await api.patch(`/admin/bookings/${bookingId}`, { status: newStatus });
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
    } catch (err) {
      alert('Failed to update booking status.');
      console.error('Booking status update error:', err);
    }
  };

  // Fetch all dashboard data
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
          api.get('/admin/users'),
          api.get('/admin/services'),
          api.get('/admin/bookings'),
      api.get('/admin/packages'), // <-- You must implement this endpoint in your backend
      api.get('/admin/inquiries'), // <-- You must implement this endpoint in your backend
      api.get('/admin/admin-users'), // <-- You must implement this endpoint in your backend
      api.get('/admin/payments'), // <-- You must implement this endpoint in your backend
      api.get('/admin/logs'), // <-- You must implement this endpoint in your backend
      api.get('/admin/notifications'), // <-- You must implement this endpoint in your backend
      api.get('/admin/cms'), // <-- You must implement this endpoint in your backend
      api.get('/admin/stats'), // <-- You must implement this endpoint in your backend
    ])
      .then(([
        usersRes,
        servicesRes,
        bookingsRes,
        packagesRes,
        inquiriesRes,
        adminUsersRes,
        paymentsRes,
        logsRes,
        notificationsRes,
        cmsRes,
        statsRes,
      ]) => {
        setUsers(usersRes.data);
        setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
        setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : bookingsRes.data.bookings || []);
        setPackages(packagesRes.data);
        setInquiries(inquiriesRes.data);
        setAdminUsers(adminUsersRes.data);
        setPayments(paymentsRes.data);
        setLogs(logsRes.data);
        setNotifications(notificationsRes.data);
        setCms(cmsRes.data);
        setCmsEdit(cmsRes.data);
        setStats(statsRes.data);
      })
      .catch((err) => {
        setError('Failed to load dashboard data.');
        console.error('Error fetching admin data:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Fetch stats for summary tiles (replace with real API calls)
    // setStats({
    //   totalUsers: 1200,
    //   activeUsers: 340,
    //   customPackages: 27,
    //   bookings: 410,
    //   inquiries: 8,
    //   revenue: 12500
    // });
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-xl font-bold text-indigo-700">Loading dashboard...</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-xl font-bold text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-dark text-white flex flex-col py-8 px-4 min-h-screen">
        <div className="text-2xl font-bold mb-10">SettleEaze Admin</div>
        <nav className="flex-1 space-y-2">
          <button className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${tab==='overview'?'bg-indigo-600':''}`} onClick={()=>setTab('overview')}>Overview</button>
          <button className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${tab==='users'?'bg-indigo-600':''}`} onClick={()=>setTab('users')}>Users</button>
          <button className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${tab==='services'?'bg-indigo-600':''}`} onClick={()=>setTab('services')}>Services</button>
          <button className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${tab==='packages'?'bg-indigo-600':''}`} onClick={()=>setTab('packages')}>Packages</button>
          <button className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${tab==='banking'?'bg-indigo-600':''}`} onClick={()=>setTab('banking')}>Banking</button>
          <button className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${tab==='bookings'?'bg-indigo-600':''}`} onClick={()=>setTab('bookings')}>Bookings</button>
          <button className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${tab==='inquiries'?'bg-indigo-600':''}`} onClick={()=>setTab('inquiries')}>Inquiries</button>
          <button className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${tab==='cms'?'bg-indigo-600':''}`} onClick={()=>setTab('cms')}>Content</button>
          <button className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${tab==='payments'?'bg-indigo-600':''}`} onClick={()=>setTab('payments')}>Payments</button>
          <button className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${tab==='logs'?'bg-indigo-600':''}`} onClick={()=>setTab('logs')}>Logs</button>
        </nav>
        <button className="mt-10 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold" onClick={()=>{/* logout logic */}}>Logout</button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 pt-24 md:pt-20">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-dark">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">admin@settleeaze.com</span>
            <img src="/dummy/airport.jpg" alt="Admin" className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600" />
          </div>
        </div>
        {/* Notifications Panel */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2"><FaBell className="text-yellow-500" /><span className="font-semibold">System Notifications</span></div>
          <div className="flex flex-wrap gap-4">
            {notifications.map(n => (
              <div key={n.id} className={`px-4 py-2 rounded-lg text-sm font-medium shadow ${n.type==='error'?'bg-red-100 text-red-700':n.type==='suspicious'?'bg-yellow-100 text-yellow-700':n.type==='booking'?'bg-blue-100 text-blue-700':'bg-green-100 text-green-700'}`}>{n.message} <span className="ml-2 text-gray-400">{n.time}</span></div>
            ))}
          </div>
        </div>
        {/* Overview Panel */}
        {tab==='overview' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {summaryTiles.map(tile => (
                <div key={tile.key} className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                  {tile.icon}
                  <div>
                    <div className="text-2xl font-bold text-neutral-dark">{stats[tile.key]}</div>
                    <div className="text-gray-500 text-sm font-medium">{tile.label}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Placeholder charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-2 mb-4"><FaChartLine className="text-indigo-600" /><span className="font-semibold">User Signups Over Time</span></div>
                <div className="h-48 flex items-center justify-center text-gray-400">[Line/Bar Chart Placeholder]</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-2 mb-4"><FaChartPie className="text-purple-600" /><span className="font-semibold">Service Usage Distribution</span></div>
                <div className="h-48 flex items-center justify-center text-gray-400">[Pie Chart Placeholder]</div>
              </div>
              <div className="bg-white rounded-xl shadow p-6 md:col-span-2">
                <div className="flex items-center gap-2 mb-4"><FaMapMarkerAlt className="text-green-600" /><span className="font-semibold">User Locations (Melbourne)</span></div>
                <div className="h-48 flex items-center justify-center text-gray-400">[Heatmap Placeholder]</div>
              </div>
            </div>
          </>
        )}
        {/* User Management Tab */}
        {tab==='users' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-neutral-dark">User Management</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  value={userFilter}
                  onChange={e => setUserFilter(e.target.value)}
                />
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition" onClick={()=>{/* export logic */}}><FaFileCsv />Export CSV</button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Registered</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 cursor-pointer" onClick={()=>setSelectedUser(user)}>{user.profile?.firstName || user.name || ''} {user.profile?.lastName || ''}</td>
                      <td className="px-4 py-2">{user.email || ''}</td>
                      <td className="px-4 py-2">{user.profile?.type || 'N/A'}</td>
                      <td className="px-4 py-2">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${user.suspended ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{user.suspended ? 'Suspended' : 'Active'}</span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800" title="Edit"><FaEdit /></button>
                        <button className="text-red-600 hover:text-red-800" title="Delete"><FaTrash /></button>
                        <button className="text-yellow-600 hover:text-yellow-800" title="Suspend"><FaBan /></button>
                        <button className="text-indigo-600 hover:text-indigo-800" title="Reset Password"><FaRedo /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* User Profile Modal */}
            {selectedUser && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
                  <button onClick={()=>setSelectedUser(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                  <h2 className="text-xl font-bold mb-4 text-indigo-700">User Profile</h2>
                  <div className="mb-2"><b>Name:</b> {selectedUser.profile?.firstName || selectedUser.name || ''} {selectedUser.profile?.lastName || ''}</div>
                  <div className="mb-2"><b>Email:</b> {selectedUser.email || ''}</div>
                  <div className="mb-2"><b>Type:</b> {selectedUser.profile?.type || 'N/A'}</div>
                  <div className="mb-2"><b>Registered:</b> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : '-'}</div>
                  <div className="mb-2"><b>Status:</b> {selectedUser.suspended ? 'Suspended' : 'Active'}</div>
                  <div className="mb-2"><b>Contact:</b> {selectedUser.profile?.phone || '-'} | {selectedUser.profile?.university || '-'}</div>
                  <div className="mb-2"><b>Bookings:</b> {selectedUser.bookings?.length || 0}</div>
                  <div className="mb-2"><b>Notes:</b> {selectedUser.notes || '-'}</div>
                  <div className="flex gap-2 mt-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Edit</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">Delete</button>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition">{selectedUser.suspended ? 'Reactivate' : 'Suspend'}</button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Reset Password</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Services Tab */}
        {tab==='services' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-neutral-dark">Service Management</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition" onClick={()=>openServiceModal(null)}><FaPlus />Add New Service</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.isArray(services) && services.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-8">No services found. Click "Add New Service" to create one.</div>
              ) : !Array.isArray(services) ? (
                <div className="col-span-full text-center text-red-500 py-8">Error: Services data is not an array.</div>
              ) : (
                services.map(service => (
                  <div key={service._id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
                    <img src={service.imageUrl || '/dummy/airport.jpg'} alt={service.title} className="w-full h-32 object-cover rounded mb-4" />
                    <h3 className="text-lg font-bold mb-1 text-indigo-700">{service.title}</h3>
                    <div className="text-sm text-gray-500 mb-2">{service.category}</div>
                    <div className="text-green-600 font-semibold mb-2">${service.price}</div>
                    <div className="flex gap-2 mt-2">
                      <button className="text-blue-600 hover:text-blue-800" title="Manage Details" onClick={()=>openServiceModal(service)}><FaEdit /> Manage</button>
                      <button className="text-red-600 hover:text-red-800" title="Delete" onClick={()=>handleDeleteService(service._id)}><FaTrash /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {serviceModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
                  <button onClick={()=>setServiceModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                  <h2 className="text-xl font-bold mb-4 text-indigo-700">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                  <form className="space-y-4" onSubmit={handleServiceSave}>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
                      <input type="text" name="title" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={serviceForm.title || ''} onChange={handleServiceInput} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
                      <input type="text" name="category" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={serviceForm.category || ''} onChange={handleServiceInput} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Price</label>
                      <input type="text" name="price" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={serviceForm.price || ''} onChange={handleServiceInput} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Image</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          name="imageUrl"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                          value={serviceForm.imageUrl || ''}
                          onChange={handleServiceInput}
                          placeholder="Paste image URL or upload below"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition font-semibold"
                          onClick={() => fileInputRef.current && fileInputRef.current.click()}
                          disabled={uploadingImage}
                        >
                          {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleImageUpload}
                        />
                      </div>
                      {uploadError && <div className="text-red-600 text-sm mt-1">{uploadError}</div>}
                      {serviceForm.imageUrl && (
                        <img src={serviceForm.imageUrl} alt="preview" className="w-full h-32 object-cover rounded mt-2" />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Short Description</label>
                      <input type="text" name="description" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={serviceForm.description || ''} onChange={handleServiceInput} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Details</label>
                      <textarea name="details" className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={4} value={serviceForm.details || ''} onChange={handleServiceInput}></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Features (comma separated)</label>
                      <input type="text" name="features" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={Array.isArray(serviceForm.features) ? serviceForm.features.join(', ') : (serviceForm.features || '')} onChange={e => setServiceForm(f => ({ ...f, features: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Visibility</label>
                      <select name="visibility" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={serviceForm.visibility || 'Published'} onChange={handleServiceInput}>
                        <option value="Published">Published</option>
                        <option value="Hidden">Hidden</option>
                      </select>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Save</button>
                      <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition" onClick={()=>setServiceModalOpen(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Packages Tab */}
        {tab==='packages' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-neutral-dark">Package Management</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition" onClick={()=>{/* open package modal for add */}}><FaPlus />Add New Package</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.isArray(packages) && packages.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-8">No packages found. Click "Add New Package" to create one.</div>
              ) : !Array.isArray(packages) ? (
                <div className="col-span-full text-center text-red-500 py-8">Error: Packages data is not an array.</div>
              ) : (
                Array.isArray(packages) && packages.map(pkg => (
                  <div key={pkg._id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
                    <img src={pkg.image || '/dummy/airport.jpg'} alt={pkg.name} className="w-full h-32 object-cover rounded mb-4" />
                    <h3 className="text-lg font-bold mb-1 text-indigo-700">{pkg.name}</h3>
                    <div className="text-sm text-gray-500 mb-2">{pkg.description}</div>
                    <div className="text-green-600 font-semibold mb-2">${pkg.price}</div>
                    <div className="flex gap-2 mt-2">
                      <button className="text-blue-600 hover:text-blue-800" title="Edit" onClick={()=>{/* open package modal for edit */}}><FaEdit /></button>
                      <button className="text-red-600 hover:text-red-800" title="Delete" onClick={()=>{/* handle delete package */}}><FaTrash /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Package Modal */}
            {packageModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
                  <button onClick={()=>setPackageModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                  <h2 className="text-xl font-bold mb-4 text-indigo-700">Package Details</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                      <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={3}></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Price</label>
                      <input type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Image URL</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                    </div>
                    <div className="flex gap-2 mt-6">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Save</button>
                      <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition" onClick={()=>setPackageModalOpen(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Banking Tab */}
        {tab==='banking' && (
          <div>
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Bank Management</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={async e => {
              e.preventDefault();
              try {
                await api.put(`/admin/cms/${cmsEdit._id}`, { ...cmsEdit });
                setCms(cmsEdit);
                alert('Bank info updated!');
              } catch (err) {
                alert('Failed to update bank info.');
              }
            }}>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                <h3 className="text-lg font-bold mb-2 text-indigo-700">Bank Details</h3>
                <input type="text" className="border rounded px-3 py-2" placeholder="Current Bank" value={cmsEdit.bankName || ''} onChange={e=>setCmsEdit({...cmsEdit, bankName: e.target.value})} />
                <input type="text" className="border rounded px-3 py-2" placeholder="Account Number" value={cmsEdit.accountNumber || ''} onChange={e=>setCmsEdit({...cmsEdit, accountNumber: e.target.value})} />
                <input type="text" className="border rounded px-3 py-2" placeholder="Routing Number" value={cmsEdit.routingNumber || ''} onChange={e=>setCmsEdit({...cmsEdit, routingNumber: e.target.value})} />
                <input type="text" className="border rounded px-3 py-2" placeholder="SWIFT Code" value={cmsEdit.swiftCode || ''} onChange={e=>setCmsEdit({...cmsEdit, swiftCode: e.target.value})} />
                <input type="text" className="border rounded px-3 py-2" placeholder="IBAN" value={cmsEdit.iban || ''} onChange={e=>setCmsEdit({...cmsEdit, iban: e.target.value})} />
                <input type="text" className="border rounded px-3 py-2" placeholder="Account Holder" value={cmsEdit.accountHolder || ''} onChange={e=>setCmsEdit({...cmsEdit, accountHolder: e.target.value})} />
                <input type="text" className="border rounded px-3 py-2" placeholder="Branch" value={cmsEdit.branch || ''} onChange={e=>setCmsEdit({...cmsEdit, branch: e.target.value})} />
                <input type="text" className="border rounded px-3 py-2" placeholder="Bank Address" value={cmsEdit.bankAddress || ''} onChange={e=>setCmsEdit({...cmsEdit, bankAddress: e.target.value})} />
                <input type="text" className="border rounded px-3 py-2" placeholder="Bank Phone" value={cmsEdit.bankPhone || ''} onChange={e=>setCmsEdit({...cmsEdit, bankPhone: e.target.value})} />
                <input type="text" className="border rounded px-3 py-2" placeholder="Bank Email" value={cmsEdit.bankEmail || ''} onChange={e=>setCmsEdit({...cmsEdit, bankEmail: e.target.value})} />
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                <h3 className="text-lg font-bold mb-2 text-indigo-700">Bank Transfer Instructions</h3>
                <textarea className="border rounded px-3 py-2" rows={6} placeholder="Bank Transfer Instructions" value={cmsEdit.bankInstructions || ''} onChange={e=>setCmsEdit({...cmsEdit, bankInstructions: e.target.value})}></textarea>
                <button type="submit" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Save</button>
              </div>
            </form>
          </div>
        )}
        {/* Bookings Management Tab */}
        {tab==='bookings' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-neutral-dark">Bookings Management</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search by user, package, or status..."
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  value={bookingFilter}
                  onChange={e => setBookingFilter(e.target.value)}
                />
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition" onClick={()=>{/* export logic */}}><FaFileCsv />Export CSV</button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm">
                    <th className="px-4 py-2 text-left">Booking ID</th>
                    <th className="px-4 py-2 text-left">User</th>
                    <th className="px-4 py-2 text-left">Package</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.filter(b =>
                    (b.user?.profile?.firstName + ' ' + b.user?.profile?.lastName + ' ' + b.packageName + ' ' + b.status).toLowerCase().includes(bookingFilter.toLowerCase())
                  ).map(booking => (
                    <tr key={booking._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono text-blue-600">{booking.bookingId}</td>
                      <td className="px-4 py-2">{booking.user?.profile?.firstName} {booking.user?.profile?.lastName}</td>
                      <td className="px-4 py-2">{booking.packageName}</td>
                      <td className="px-4 py-2">
                        <select className="px-2 py-1 rounded border" value={booking.status} onChange={e => handleBookingStatusChange(booking._id, e.target.value)}>
                          <option>Pending</option>
                          <option>Confirmed</option>
                          <option>Completed</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : '-'}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button className="text-indigo-600 hover:text-indigo-800" title="View Details" onClick={()=>setSelectedBooking(booking)}><FaFileAlt /></button>
                        <button className="text-gray-600 hover:text-gray-800" title="Attach Document"><FaPaperclip /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Booking Details Modal */}
            {selectedBooking && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
                  <button onClick={()=>setSelectedBooking(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                  <h2 className="text-xl font-bold mb-4 text-indigo-700">Booking Details</h2>
                  <div className="mb-2"><b>Booking ID:</b> {selectedBooking.bookingId}</div>
                  <div className="mb-2"><b>User:</b> {selectedBooking.user?.profile?.firstName} {selectedBooking.user?.profile?.lastName}</div>
                  <div className="mb-2"><b>Package:</b> {selectedBooking.packageName}</div>
                  <div className="mb-2"><b>Status:</b> {selectedBooking.status}</div>
                  <div className="mb-2"><b>Date:</b> {selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleDateString() : '-'}</div>
                  <div className="mb-2"><b>Notes:</b> <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2" rows={2} defaultValue={selectedBooking.notes || ''}></textarea></div>
                  <div className="mb-2"><b>Documents:</b> <span className="text-gray-500">[Attach/view docs placeholder]</span></div>
                  <div className="flex gap-2 mt-6">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Save</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition" onClick={()=>setSelectedBooking(null)}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Inquiries Management Tab */}
        {tab==='inquiries' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-neutral-dark">Inquiries Management</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search by type, subject, or status..."
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  value={inquiryFilter}
                  onChange={e => setInquiryFilter(e.target.value)}
                />
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition" onClick={()=>{/* export logic */}}><FaFileCsv />Export CSV</button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm">
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Subject</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Assigned</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.filter(i =>
                    (i.type + ' ' + i.subject + ' ' + i.status).toLowerCase().includes(inquiryFilter.toLowerCase())
                  ).map(inquiry => (
                    <tr key={inquiry._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{inquiry.type}</td>
                      <td className="px-4 py-2 cursor-pointer" onClick={()=>setSelectedInquiry(inquiry)}>{inquiry.subject}</td>
                      <td className="px-4 py-2">{inquiry.date}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${inquiry.status==='Read' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{inquiry.status}</span>
                      </td>
                      <td className="px-4 py-2">{inquiry.assigned || '-'}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button className="text-indigo-600 hover:text-indigo-800" title="View Details" onClick={()=>setSelectedInquiry(inquiry)}><FaFileAlt /></button>
                        <button className="text-green-600 hover:text-green-800" title="Mark as Read"><FaCheckCircle /></button>
                        <button className="text-blue-600 hover:text-blue-800" title="Assign"><FaUserTie /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Inquiry Details Modal */}
            {selectedInquiry && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
                  <button onClick={()=>setSelectedInquiry(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                  <h2 className="text-xl font-bold mb-4 text-indigo-700">Inquiry Details</h2>
                  <div className="mb-2"><b>Type:</b> {selectedInquiry.type}</div>
                  <div className="mb-2"><b>Subject:</b> {selectedInquiry.subject}</div>
                  <div className="mb-2"><b>Date:</b> {selectedInquiry.date}</div>
                  <div className="mb-2"><b>Status:</b> {selectedInquiry.status}</div>
                  <div className="mb-2"><b>Assigned:</b> <select className="border rounded px-2 py-1"><option>Unassigned</option><option>Priya</option><option>Amit</option></select></div>
                  <div className="mb-2"><b>Message:</b> <div className="bg-gray-50 rounded p-3 mt-1 text-gray-700">{selectedInquiry.message}</div></div>
                  <div className="mb-2"><b>Internal Note:</b> <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2" rows={2} defaultValue={selectedInquiry.note || ''}></textarea></div>
                  <div className="flex gap-2 mt-6">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Save</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition" onClick={()=>setSelectedInquiry(null)}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* CMS Tab */}
        {tab==='cms' && (
          <div>
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Page Content Management (CMS)</h2>
            <form className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Homepage Headline</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={cmsEdit.homepageHeadline} onChange={e=>setCmsEdit({...cmsEdit, homepageHeadline: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Homepage Subheading</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={2} value={cmsEdit.homepageSubheading} onChange={e=>setCmsEdit({...cmsEdit, homepageSubheading: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Hero Section Text</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={2} value={cmsEdit.heroText} onChange={e=>setCmsEdit({...cmsEdit, heroText: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Footer Text</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" value={cmsEdit.footerText} onChange={e=>setCmsEdit({...cmsEdit, footerText: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Services Page Description</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={2} value={cmsEdit.servicesDesc} onChange={e=>setCmsEdit({...cmsEdit, servicesDesc: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Packages Page Description</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={2} value={cmsEdit.packagesDesc} onChange={e=>setCmsEdit({...cmsEdit, packagesDesc: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">FAQs</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={2} value={cmsEdit.faqs} onChange={e=>setCmsEdit({...cmsEdit, faqs: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">About Us</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={2} value={cmsEdit.about} onChange={e=>setCmsEdit({...cmsEdit, about: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Terms & Conditions</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2" rows={2} value={cmsEdit.terms} onChange={e=>setCmsEdit({...cmsEdit, terms: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Upload Banner/Image</label>
                <div className="flex items-center gap-4">
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="Image URL (placeholder)" value={bannerImage} onChange={e=>setBannerImage(e.target.value)} />
                  <FaImage className="text-2xl text-gray-400" />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button type="button" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition" onClick={()=>setCms(cmsEdit)}>Save</button>
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition" onClick={()=>setCmsEdit(cms)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
        {/* Payments Tab */}
        {tab==='payments' && (
          <div>
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Payment Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-bold mb-2 text-indigo-700">Recent Payments</h3>
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 text-sm">
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">User</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                        <th className="px-4 py-2 text-left">Method</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map(payment => (
                        <tr key={payment._id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{payment.date}</td>
                          <td className="px-4 py-2">{payment.user?.profile?.firstName} {payment.user?.profile?.lastName}</td>
                          <td className="px-4 py-2">${payment.amount}</td>
                          <td className="px-4 py-2">{payment.method}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${payment.status==='Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{payment.status}</span>
                          </td>
                          <td className="px-4 py-2">Booking ID: {payment.bookingId}</td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-bold mb-2 text-indigo-700">Payment Settings</h3>
                <p className="text-gray-700 mb-4">Accepting Bank Transfers and Credit Cards.</p>
                <p className="text-gray-700 mb-4">Minimum Payment: $100</p>
                <p className="text-gray-700 mb-4">Processing Time: 1-2 business days</p>
                <p className="text-gray-700 mb-4">Refund Policy: 7 days after completion</p>
                <p className="text-gray-700 mb-4">Tax Information: GST (Goods and Services Tax) applicable</p>
              </div>
            </div>
          </div>
        )}
        {/* Logs Tab */}
        {tab==='logs' && (
          <div>
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">System Logs</h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm">
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Action</th>
                    <th className="px-4 py-2 text-left">User</th>
                    <th className="px-4 py-2 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{log.date}</td>
                      <td className="px-4 py-2">{log.action}</td>
                      <td className="px-4 py-2">{log.user}</td>
                      <td className="px-4 py-2">{log.details}</td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Roles & Permissions Tab */}
        {tab==='logs' && (
          <div>
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Admin User Roles & Permissions</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition mb-6" onClick={()=>{setEditingAdmin(null);setAdminModalOpen(true);}}><FaPlus />Add Admin User</button>
            <div className="overflow-x-auto rounded-xl shadow mb-8">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map(admin => (
                    <tr key={admin._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{admin.name}</td>
                      <td className="px-4 py-2">{admin.email}</td>
                      <td className="px-4 py-2">
                        <select className="border rounded px-2 py-1" value={admin.role} onChange={e=>{/* update role logic */}}>
                          <option>Super Admin</option>
                          <option>Content Manager</option>
                          <option>Booking Agent</option>
                          <option>Support Admin</option>
                          <option>Developer</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800" title="Edit" onClick={()=>{setEditingAdmin(admin);setAdminModalOpen(true);}}><FaEdit /></button>
                        <button className="text-red-600 hover:text-red-800" title="Delete"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Add/Edit Admin Modal */}
            {adminModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
                  <button onClick={()=>setAdminModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                  <h2 className="text-xl font-bold mb-4 text-indigo-700">{editingAdmin ? 'Edit Admin User' : 'Add Admin User'}</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2" defaultValue={editingAdmin?.name || ''} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                      <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2" defaultValue={editingAdmin?.email || ''} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Role</label>
                      <select className="w-full border border-gray-300 rounded-lg px-4 py-2" defaultValue={editingAdmin?.role || 'Support Admin'}>
                        <option>Super Admin</option>
                        <option>Content Manager</option>
                        <option>Booking Agent</option>
                        <option>Support Admin</option>
                        <option>Developer</option>
                      </select>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Save</button>
                      <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition" onClick={()=>setAdminModalOpen(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard
