'use client';

import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { blogData } from '@/data/blogData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CalendarIcon, ClockIcon, TagIcon, ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

// Import the blog content components
import ArduinoTeachingPost from '@/components/blog/posts/ArduinoTeachingPost';

const BlogPost = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Find the blog post by slug
  const post = blogData.find(p => p.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className={`min-h-screen py-12 pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4 text-center">
            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Coming Soon !!!!!!!!!!
            </h1>
            <button
              onClick={() => router.push('/blog')}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Back to Blog
            </button>
          </div>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setShowShareMenu(false);
  };

  return (
    <>
      <Navbar />
      <main className={`min-h-screen py-12 pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => router.push('/blog')}
            className={`inline-flex items-center gap-2 mb-8 transition-colors ${
              isDarkMode 
                ? 'text-purple-400 hover:text-purple-300' 
                : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Blog
          </button>

          {/* Post Header */}
          <header className={`rounded-lg shadow-md p-8 mb-8 ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            {/* Category Badge */}
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                isDarkMode 
                  ? 'bg-purple-900/50 text-purple-300' 
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className={`text-xl mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className={`flex flex-wrap gap-6 pb-6 border-b ${
              isDarkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'
            }`}>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">By {post.author}</span>
              </div>
            </div>

            {/* Tags and Share */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <TagIcon className="w-4 h-4" />
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ShareIcon className="w-5 h-5" />
                  Share
                </button>
                
                {showShareMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-10 ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                  }`}>
                    <button
                      onClick={copyLink}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Post Content */}
          <div className={`rounded-lg shadow-md p-8 ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            {/* Render the specific blog post content based on slug */}
            {slug === '12-weeks-teaching-with-arduino' && (
              <ArduinoTeachingPost isDarkMode={isDarkMode} />
            )}
          </div>

          {/* Navigation to other posts */}
          <div className="mt-12 text-center">
            <button
              onClick={() => router.push('/blog')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isDarkMode 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              View All Posts
            </button>
          </div>
        </article>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </>
  );
};

export default BlogPost;