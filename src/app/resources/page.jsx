'use client';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ResourceCard from '@/components/resources/ResourceCard';
import ResourceFilter from '@/components/resources/ResourceFilter';
import { resourcesData } from '@/data/resourcesData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllResources, setShowAllResources] = useState(false);

  // Configuration for how many resources to show initially
  const INITIAL_RESOURCES_COUNT = 6; // Show 6 resources initially (2 rows of 3)

  // Get theme state from Redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // Filter resources based on selected filters
  const filteredResources = useMemo(() => {
    return resourcesData.filter(resource => {
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || resource.tags.includes(selectedTag);
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  // Get resources to display based on showAllResources state
  const resourcesToDisplay = useMemo(() => {
    if (showAllResources || filteredResources.length <= INITIAL_RESOURCES_COUNT) {
      return filteredResources;
    }
    return filteredResources.slice(0, INITIAL_RESOURCES_COUNT);
  }, [filteredResources, showAllResources]);

  // Check if we should show the "See More" button
  const shouldShowSeeMoreButton = filteredResources.length > INITIAL_RESOURCES_COUNT;
  const hiddenResourcesCount = filteredResources.length - INITIAL_RESOURCES_COUNT;

  // Get unique categories and tags for filter options
  const categories = [...new Set(resourcesData.map(resource => resource.category))];
  const tags = [...new Set(resourcesData.flatMap(resource => resource.tags))];

  // Reset showAllResources when filters change
  const handleFilterChange = (filterSetter, value) => {
    filterSetter(value);
    setShowAllResources(false);
  };

  const handleSeeMoreClick = () => {
    setShowAllResources(!showAllResources);
    
    // Scroll to see more content if expanding
    if (!showAllResources) {
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
            Learning Resources
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A curated collection of some of my teaching materials, and Arduino projects 
            that my students really loved. Find resources to accelerate your own growth.
          </p>
        </div>

        {/* Filter Section */}
        <ResourceFilter
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
            {showAllResources || filteredResources.length <= INITIAL_RESOURCES_COUNT 
              ? `Showing all ${filteredResources.length} of ${resourcesData.length} resources`
              : `Showing ${resourcesToDisplay.length} of ${filteredResources.length} resources`
            }
            {selectedCategory !== 'all' && ` in ${selectedCategory.replace('-', ' ')}`}
            {selectedTag !== 'all' && ` tagged with "${selectedTag}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Resources Grid */}
        {resourcesToDisplay.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resourcesToDisplay.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} isDarkMode={isDarkMode} />
              ))}
            </div>

            {/* See More / See Less Button */}
            {shouldShowSeeMoreButton && (
              <div id="see-more-section" className="flex justify-center mt-12">
                <button
                  onClick={handleSeeMoreClick}
                  className={`inline-flex items-center px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  {showAllResources ? (
                    <>
                      <ChevronUpIcon className="w-5 h-5 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon className="w-5 h-5 mr-2" />
                      See {hiddenResourcesCount} More Resources
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className={`text-xl font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              No resources found
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
                setShowAllResources(false);
              }}
              className={`px-6 py-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
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
            Resource Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => {
              const count = resourcesData.filter(r => r.category === category).length;
              return (
                <div key={category} className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
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

        {/* Featured Categories Section - Only show when all resources are displayed */}
        {(showAllResources || filteredResources.length <= INITIAL_RESOURCES_COUNT) && (
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
                const count = resourcesData.filter(r => r.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowAllResources(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                      selectedCategory === category
                        ? (isDarkMode 
                            ? 'border-blue-500 bg-blue-900/30' 
                            : 'border-blue-500 bg-blue-50')
                        : (isDarkMode 
                            ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50')
                    }`}
                  >
                    <div className={`text-2xl font-bold mb-1 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
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

export default ResourcesPage;