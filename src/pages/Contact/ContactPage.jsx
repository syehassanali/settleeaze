import React, { useState } from 'react';
import { FaWhatsapp, FaTelegram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUniversity, FaPlane } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for universities and airports
const universityIcon = L.divIcon({
  className: 'custom-div-icon',
  html: '<div style="background-color: #4f46e5; width: 30px; height: 30px; display: block; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"><i class="fa fa-university" style="color: white; font-size: 16px; line-height: 24px; text-align: center; width: 100%;"></i></div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const airportIcon = L.divIcon({
  className: 'custom-div-icon',
  html: '<div style="background-color: #dc2626; width: 30px; height: 30px; display: block; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"><i class="fa fa-plane" style="color: white; font-size: 16px; line-height: 24px; text-align: center; width: 100%;"></i></div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const universities = [
  { 
    name: 'University of Melbourne', 
    lat: -37.7963, 
    lng: 144.9614,
    type: 'university',
    description: 'Australia\'s leading university, located in the heart of Melbourne'
  },
  { 
    name: 'RMIT University', 
    lat: -37.8080, 
    lng: 144.9634,
    type: 'university',
    description: 'Global university of technology, design and enterprise'
  },
  { 
    name: 'Monash University (City)', 
    lat: -37.8075, 
    lng: 144.9631,
    type: 'university',
    description: 'One of Australia\'s leading universities with a city campus'
  },
  { 
    name: 'Deakin University (City)', 
    lat: -37.8150, 
    lng: 144.9550,
    type: 'university',
    description: 'Modern university with a strong focus on innovation'
  },
  { 
    name: 'Swinburne University', 
    lat: -37.8220, 
    lng: 145.0380,
    type: 'university',
    description: 'Technology-focused university in Hawthorn'
  },
];

const airports = [
  {
    name: 'Melbourne Airport (MEL)',
    lat: -37.8136,
    lng: 144.9631,
    type: 'airport',
    description: 'Main international airport serving Melbourne'
  },
  {
    name: 'Avalon Airport (AVV)',
    lat: -38.0390,
    lng: 144.4690,
    type: 'airport',
    description: 'Secondary airport for domestic flights'
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', type: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <div className="bg-neutral-light min-h-screen font-body">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
            <label className="font-medium">Name
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full mt-1 px-3 py-2 border rounded" />
            </label>
            <label className="font-medium">Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full mt-1 px-3 py-2 border rounded" />
            </label>
            <label className="font-medium">Inquiry Type
              <select name="type" value={form.type} onChange={handleChange} required className="w-full mt-1 px-3 py-2 border rounded">
                <option value="">Select...</option>
                <option value="General">General Inquiry</option>
                <option value="Partnership">Partnership</option>
                <option value="Support">Support</option>
              </select>
            </label>
            <label className="font-medium">Message
              <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className="w-full mt-1 px-3 py-2 border rounded" />
            </label>
            <button type="submit" className="bg-indigo-600 text-white py-2 rounded font-medium hover:bg-indigo-700 transition">Send Message</button>
            {submitted && <div className="text-green-600 font-medium mt-2">Thank you! We'll get back to you soon.</div>}
          </form>
          {/* Contact Info & Map */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow p-6 mb-4">
              <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
              <div className="flex items-center gap-2 mb-2"><FaEnvelope className="text-indigo-600" /> support@studentarrival.com</div>
              <div className="flex items-center gap-2 mb-2"><FaPhone className="text-indigo-600" /> +61 400 123 456</div>
              <div className="flex items-center gap-2 mb-2"><FaMapMarkerAlt className="text-indigo-600" /> Melbourne, Australia</div>
              <div className="flex gap-4 mt-2 text-2xl">
                <a href="https://wa.me/61400123456" target="_blank" rel="noopener noreferrer" className="hover:text-green-500"><FaWhatsapp /></a>
                <a href="https://t.me/settleeaze" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaTelegram /></a>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Interactive Map - Universities & Airports</h2>
              <div className="mb-4 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <span>Universities</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span>Airports</span>
                </div>
              </div>
              <div className="h-80 rounded-lg overflow-hidden">
                <MapContainer 
                  center={[-37.8136, 144.9631]} 
                  zoom={10} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {universities.map((uni, index) => (
                    <Marker 
                      key={`uni-${index}`} 
                      position={[uni.lat, uni.lng]} 
                      icon={universityIcon}
                    >
                      <Popup>
                        <div className="text-center">
                          <FaUniversity className="text-indigo-600 text-xl mx-auto mb-2" />
                          <h3 className="font-bold text-indigo-600">{uni.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{uni.description}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  {airports.map((airport, index) => (
                    <Marker 
                      key={`airport-${index}`} 
                      position={[airport.lat, airport.lng]} 
                      icon={airportIcon}
                    >
                      <Popup>
                        <div className="text-center">
                          <FaPlane className="text-red-600 text-xl mx-auto mb-2" />
                          <h3 className="font-bold text-red-600">{airport.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{airport.description}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-indigo-600 mb-2 flex items-center gap-2">
                    <FaUniversity /> Universities
                  </h4>
                  <ul className="space-y-1">
                    {universities.map(uni => (
                      <li key={uni.name} className="text-gray-700">• {uni.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                    <FaPlane /> Airports
                  </h4>
                  <ul className="space-y-1">
                    {airports.map(airport => (
                      <li key={airport.name} className="text-gray-700">• {airport.name}</li>
                ))}
              </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 