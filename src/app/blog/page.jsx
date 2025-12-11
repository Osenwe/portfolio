'use client';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import BlogCard from '@/components/blog/BlogCard';
import BlogFilter from '@/components/blog/BlogFilter';
import { blogData } from '@/data/blogData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllPosts, setShowAllPosts] = useState(false);

  const INITIAL_POSTS_COUNT = 6;

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const filteredPosts = useMemo(() => {
    return blogData.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  const postsToDisplay = useMemo(() => {
    if (showAllPosts || filteredPosts.length <= INITIAL_POSTS_COUNT) {
      return filteredPosts;
    }
    return filteredPosts.slice(0, INITIAL_POSTS_COUNT);
  }, [filteredPosts, showAllPosts]);

  const shouldShowSeeMoreButton = filteredPosts.length > INITIAL_POSTS_COUNT;
  const hiddenPostsCount = filteredPosts.length - INITIAL_POSTS_COUNT;

  const categories = [...new Set(blogData.map(post => post.category))];
  const tags = [...new Set(blogData.flatMap(post => post.tags))];

  const handleFilterChange = (filterSetter, value) => {
    filterSetter(value);
    setShowAllPosts(false);
  };

  const handleSeeMoreClick = () => {
    setShowAllPosts(!showAllPosts);
    
    if (!showAllPosts) {
      setTimeout(() => {
        const seeMoreButton = document.getElementById('see-more-section');
        if (seeMoreButton) {
          seeMoreButton.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
          });
        }
      }, 100);
    }
  };

  return (
    <>
    <Navbar />
    <main className={`min-h-screen py-12 pt-20 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Blog
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Here, I share some of my experiences ....
          </p>
        </div>

        {/* Filter Section */}
        <BlogFilter
          categories={categories}
          tags={tags}
          selectedCategory={selectedCategory}
          selectedTag={selectedTag}
          searchQuery={searchQuery}
          onCategoryChange={(value) => handleFilterChange(setSelectedCategory, value)}
          onTagChange={(value) => handleFilterChange(setSelectedTag, value)}
          onSearchChange={(value) => handleFilterChange(setSearchQuery, value)}
          isDarkMode={isDarkMode}
        />

        {/* Results Summary */}
        <div className="mb-8">
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            {showAllPosts || filteredPosts.length <= INITIAL_POSTS_COUNT 
              ? `Showing all ${filteredPosts.length} of ${blogData.length} posts`
              : `Showing ${postsToDisplay.length} of ${filteredPosts.length} posts`
            }
            {selectedCategory !== 'all' && ` in ${selectedCategory.replace('-', ' ')}`}
            {selectedTag !== 'all' && ` tagged with "${selectedTag}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {postsToDisplay.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsToDisplay.map((post) => (
                <BlogCard key={post.id} post={post} isDarkMode={isDarkMode} />
              ))}
            </div>

            {/* See More / See Less Button */}
            {shouldShowSeeMoreButton && (
              <div id="see-more-section" className="flex justify-center mt-12">
                <button
                  onClick={handleSeeMoreClick}
                  className={`inline-flex items-center px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 ${
                    isDarkMode
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25'
                  }`}
                >
                  {showAllPosts ? (
                    <>
                      <ChevronUpIcon className="w-5 h-5 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon className="w-5 h-5 mr-2" />
                      See {hiddenPostsCount} More Posts
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className={`mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className={`text-xl font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              No posts found
            </h3>
            <p className={`mb-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTag('all');
                setSearchQuery('');
                setShowAllPosts(false);
              }}
              className={`px-6 py-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Statistics Section */}
        <div className={`mt-16 rounded-lg shadow-md p-8 ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Blog Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {blogData.length}
              </div>
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Total Posts
              </div>
            </div>
            {categories.map(category => {
              const count = blogData.filter(p => p.category === category).length;
              return (
                <div key={category} className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    {count}
                  </div>
                  <div className={`text-sm capitalize ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {category.replace('-', ' ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Categories Section */}
        {(showAllPosts || filteredPosts.length <= INITIAL_POSTS_COUNT) && categories.length > 1 && (
          <div className={`mt-16 rounded-lg shadow-md p-8 ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map(category => {
                const count = blogData.filter(p => p.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowAllPosts(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                      selectedCategory === category
                        ? (isDarkMode 
                            ? 'border-purple-500 bg-purple-900/30' 
                            : 'border-purple-500 bg-purple-50')
                        : (isDarkMode 
                            ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50')
                    }`}
                  >
                    <div className={`text-2xl font-bold mb-1 ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {count}
                    </div>
                    <div className={`text-sm font-medium capitalize ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {category.replace('-', ' ')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
    <Footer isDarkMode={isDarkMode} />
    </>
  );
}

export default BlogPage;