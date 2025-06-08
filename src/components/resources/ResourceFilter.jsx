'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

const ResourceFilter = ({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  searchQuery,
  onCategoryChange,
  onTagChange,
  onSearchChange
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get theme from Redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const clearAllFilters = () => {
    onCategoryChange('all');
    onTagChange('all');
    onSearchChange('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedTag !== 'all' || searchQuery !== '';

  return (
    <div className={`rounded-lg shadow-md p-6 mb-8 ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700' 
        : 'bg-white'
    }`}>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className={`h-5 w-5 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search resources by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`block w-full pl-10 pr-3 py-3 border rounded-md leading-5 transition-colors focus:outline-none focus:ring-1 ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
        </div>
      </div>

      {/* Filter Toggle Button (Mobile) */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h3 className={`text-lg font-medium ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Filters
        </h3>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center ${
            isDarkMode 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <span className="mr-2">
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </span>
          <svg 
            className={`w-4 h-4 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter Options */}
      <div className={`space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 ${isFilterOpen || 'hidden md:grid'}`}>
        {/* Category Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:outline-none ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            }`}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Tag
          </label>
          <select
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className={`block w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:outline-none ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            }`}
          >
            <option value="all">All Tags</option>
            {tags.sort().map(tag => (
              <option key={tag} value={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={clearAllFilters}
            disabled={!hasActiveFilters}
            className={`w-full px-4 py-2 rounded-md transition-colors ${
              hasActiveFilters
                ? (isDarkMode 
                    ? 'bg-gray-600 text-white hover:bg-gray-500' 
                    : 'bg-gray-600 text-white hover:bg-gray-700')
                : (isDarkMode 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed')
            }`}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className={`mt-4 pt-4 border-t ${
          isDarkMode ? 'border-gray-600' : 'border-gray-200'
        }`}>
          <div className="flex flex-wrap gap-2">
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Active filters:
            </span>
            {selectedCategory !== 'all' && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isDarkMode 
                  ? 'bg-blue-900 text-blue-200' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {selectedCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                <button
                  onClick={() => onCategoryChange('all')}
                  className={`ml-1 ${
                    isDarkMode 
                      ? 'text-blue-300 hover:text-blue-100' 
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {selectedTag !== 'all' && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isDarkMode 
                  ? 'bg-green-900 text-green-200' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {selectedTag.charAt(0).toUpperCase() + selectedTag.slice(1)}
                <button
                  onClick={() => onTagChange('all')}
                  className={`ml-1 ${
                    isDarkMode 
                      ? 'text-green-300 hover:text-green-100' 
                      : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {searchQuery && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isDarkMode 
                  ? 'bg-purple-900 text-purple-200' 
                  : 'bg-purple-100 text-purple-800'
              }`}>
                "{searchQuery}"
                <button
                  onClick={() => onSearchChange('')}
                  className={`ml-1 ${
                    isDarkMode 
                      ? 'text-purple-300 hover:text-purple-100' 
                      : 'text-purple-600 hover:text-purple-800'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceFilter;