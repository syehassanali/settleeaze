import React from 'react';
import { useParams, Link } from 'react-router-dom';
import postsData from '../../data/blogPosts.json';
import { FaWhatsapp, FaTwitter, FaFacebook } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = postsData.find(p => p.slug === slug);
  if (!post) return <div className="container mx-auto px-4 py-12">Post not found.</div>;

  // Related articles: same category, exclude current
  const related = postsData.filter(p => p.category === post.category && p.slug !== slug).slice(0, 3);

  // Share URLs
  const url = window.location.href;
  const shareText = encodeURIComponent(`${post.title} - ${url}`);

  return (
    <div className="bg-neutral-light min-h-screen font-body">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-6" />}
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-500 text-sm mb-4">By {post.author} • {new Date(post.date).toLocaleDateString()}</div>
        <div className="mb-6 prose max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => (
            <span key={tag} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">{tag}</span>
          ))}
        </div>
        {/* Share Buttons */}
        <div className="flex gap-4 mb-8">
          <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-green-500 text-2xl"><FaWhatsapp /></a>
          <a href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-2xl"><FaTwitter /></a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 text-2xl"><FaFacebook /></a>
        </div>
        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                  <div className="font-bold mb-1">{r.title}</div>
                  <div className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString()}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {/* CTA at the end */}
        <section className="text-center mt-8">
          <h2 className="text-2xl font-semibold mb-4">Want help with your arrival in Australia? Explore our packages designed for new students.</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/packages" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">Explore Packages</Link>
            <Link to="/packages" className="px-6 py-3 bg-white border border-indigo-600 text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition">Book Now</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPostPage; 