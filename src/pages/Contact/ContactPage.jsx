import React, { useState } from 'react';
import { FaWhatsapp, FaTelegram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const universities = [
  { name: 'University of Melbourne', lat: -37.7963, lng: 144.9614 },
  { name: 'RMIT University', lat: -37.8080, lng: 144.9634 },
  { name: 'Monash University (City)', lat: -37.8075, lng: 144.9631 },
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
      <div className="container mx-auto px-4 py-12 max-w-4xl">
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
              <h2 className="text-lg font-semibold mb-2">Melbourne Universities Map</h2>
              {/* Placeholder map image, replace with real map/embed if needed */}
              <img src="https://maps.googleapis.com/maps/api/staticmap?center=Melbourne,Australia&zoom=13&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:U%7C-37.7963,144.9614&markers=color:red%7Clabel:R%7C-37.8080,144.9634&markers=color:green%7Clabel:M%7C-37.8075,144.9631&key=YOUR_API_KEY" alt="Melbourne Map" className="w-full rounded" />
              <ul className="mt-2 text-sm text-gray-700">
                {universities.map(u => (
                  <li key={u.name}><b>{u.name}</b></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 