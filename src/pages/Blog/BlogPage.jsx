import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postsData from '../../data/blogPosts.json';

const categories = [
  'All',
  ...Array.from(new Set(postsData.map(post => post.category)))
];

const BlogPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [posts, setPosts] = useState(postsData);

  useEffect(() => {
    let filtered = postsData;
    if (category !== 'All') filtered = filtered.filter(p => p.category === category);
    if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    setPosts(filtered);
  }, [search, category]);

  return (
    <div className="bg-neutral-light min-h-screen font-body">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-blue-400 py-16 text-center text-white mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Student Resources & Guides</h1>
        <p className="text-xl md:text-2xl mb-6">Helpful tips, checklists, and advice for international students starting a new journey.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full md:w-48 px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </section>

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Main Blog Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
                {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="h-40 w-full object-cover rounded mb-3" />}
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded mb-2 w-max">{post.category}</span>
                <h2 className="text-lg font-bold mb-1">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{post.summary}</p>
                <div className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString()} • {post.author}</div>
                <Link to={`/blog/${post.slug}`} className="mt-auto inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">Read More</Link>
              </div>
            ))}
          </div>
        </main>
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <h3 className="font-bold mb-2">Categories</h3>
            <ul className="space-y-1">
              {categories.map(cat => (
                <li key={cat}>
                  <button onClick={() => setCategory(cat)} className={`text-left w-full ${category === cat ? 'font-bold text-indigo-600' : 'text-gray-700'}`}>{cat}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <h3 className="font-bold mb-2">Recent Posts</h3>
            <ul className="space-y-1">
              {postsData.slice(0, 5).map(post => (
                <li key={post.id}>
                  <Link to={`/blog/${post.slug}`} className="text-indigo-600 hover:underline text-sm">{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-bold mb-2">Newsletter Signup</h3>
            <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded mb-2 border" />
            <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Subscribe</button>
          </div>
        </aside>
      </div>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need help settling in?</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/packages" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">Explore Packages</Link>
          <Link to="/contact" className="px-6 py-3 bg-white border border-indigo-600 text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition">Contact Support</Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPage; 