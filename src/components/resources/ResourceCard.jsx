'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioEvents } from '@/utils/analytics/tracking';

export default function ResourceCard({ resource }) {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get theme from Redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleLinkClick = (linkType, url, title) => {
    // Track resource link clicks
    try {
      portfolioEvents.clickProject(`Resource: ${title}`, `${linkType}: ${url}`);
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  };

  const handleViewDetails = () => {
    try {
      portfolioEvents.clickProject(`View Details: ${resource.title}`, `Project ID: ${resource.id}`);
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'books':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'youtube-channels':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'teaching-materials':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'arduino-projects':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'python-apps':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'cybersecurity-ctf':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const getDifficultyColor = (difficulty) => {
    if (isDarkMode) {
      switch (difficulty) {
        case 'beginner':
          return 'bg-green-900 text-green-200';
        case 'intermediate':
          return 'bg-yellow-900 text-yellow-200';
        case 'advanced':
          return 'bg-red-900 text-red-200';
        default:
          return 'bg-gray-700 text-gray-300';
      }
    } else {
      switch (difficulty) {
        case 'beginner':
          return 'bg-green-100 text-green-800';
        case 'intermediate':
          return 'bg-yellow-100 text-yellow-800';
        case 'advanced':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
  };

  // Check if this is an advanced Arduino project with extra details
  const hasAdvancedDetails = resource.category === 'arduino-projects' && 
    (resource.features || resource.specifications || resource.learningOutcomes);

  // Check if this resource should have a detailed project page
  const hasDetailedPage = ['arduino-projects', 'python-apps', 'cybersecurity-ctf'].includes(resource.category);

  return (
    <div className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      {/* Resource Image */}
      {resource.image && !imageError && (
        <div className="relative h-48 w-full">
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
              {getCategoryIcon(resource.category)}
            </div>
            <span className={`text-sm font-medium capitalize ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {resource.category.replace('-', ' ')}
            </span>
          </div>
          {resource.difficulty && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
              {resource.difficulty}
            </span>
          )}
        </div>

        {/* Title and Description */}
        <h3 className={`text-xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {resource.title}
        </h3>
        {resource.author && (
          <p className={`text-sm mb-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            by {resource.author}
          </p>
        )}
        <p className={`mb-4 line-clamp-3 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {isExpanded ? resource.description : `${resource.description.slice(0, 120)}${resource.description.length > 120 ? '...' : ''}`}
        </p>
        
        {resource.description.length > 120 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-sm font-medium mb-4 ${
              isDarkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 text-xs rounded-full ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arduino Project Information with Tabs */}
        {resource.category === 'arduino-projects' && (
          <div className="mb-4">
            {/* Tab Navigation for Advanced Projects */}
            {hasAdvancedDetails && (
              <div className={`flex space-x-1 mb-3 p-1 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeTab === 'overview' 
                      ? (isDarkMode ? 'bg-gray-600 text-blue-400 shadow-sm' : 'bg-white text-blue-600 shadow-sm')
                      : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900')
                  }`}
                >
                  Overview
                </button>
                {resource.features && (
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeTab === 'features' 
                        ? (isDarkMode ? 'bg-gray-600 text-blue-400 shadow-sm' : 'bg-white text-blue-600 shadow-sm')
                        : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900')
                    }`}
                  >
                    Features
                  </button>
                )}
                {resource.specifications && (
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeTab === 'specs' 
                        ? (isDarkMode ? 'bg-gray-600 text-blue-400 shadow-sm' : 'bg-white text-blue-600 shadow-sm')
                        : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900')
                    }`}
                  >
                    Specs
                  </button>
                )}
                {resource.learningOutcomes && (
                  <button
                    onClick={() => setActiveTab('learning')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeTab === 'learning' 
                        ? (isDarkMode ? 'bg-gray-600 text-blue-400 shadow-sm' : 'bg-white text-blue-600 shadow-sm')
                        : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900')
                    }`}
                  >
                    Learning
                  </button>
                )}
              </div>
            )}

            {/* Tab Content */}
            <div className={`p-3 rounded-md ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              {/* Overview Tab (Default for all projects) */}
              {(!hasAdvancedDetails || activeTab === 'overview') && (
                <>
                  {resource.materials && (
                    <div className="mb-3">
                      <h4 className={`text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        Materials Needed:
                      </h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {resource.materials.map((material, index) => (
                          <div key={index} className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            • {material}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {resource.estimatedTime && (
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <strong>Estimated Time:</strong> {resource.estimatedTime}
                    </div>
                  )}
                </>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && resource.features && (
                <div>
                  <h4 className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Key Features:
                  </h4>
                  <ul className={`text-xs space-y-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {resource.features.slice(0, 5).map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                    {resource.features.length > 5 && (
                      <li className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>
                        + {resource.features.length - 5} more features
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specs' && resource.specifications && (
                <div>
                  <h4 className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Specifications:
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {Object.entries(resource.specifications).slice(0, 4).map(([key, value]) => (
                      <div key={key} className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}
                      </div>
                    ))}
                    {Object.keys(resource.specifications).length > 4 && (
                      <div className={`text-xs ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        + {Object.keys(resource.specifications).length - 4} more specs
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Learning Outcomes Tab */}
              {activeTab === 'learning' && resource.learningOutcomes && (
                <div>
                  <h4 className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    What You'll Learn:
                  </h4>
                  <ul className={`text-xs space-y-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {resource.learningOutcomes.slice(0, 4).map((outcome, index) => (
                      <li key={index}>• {outcome}</li>
                    ))}
                    {resource.learningOutcomes.length > 4 && (
                      <li className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>
                        + {resource.learningOutcomes.length - 4} more topics
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* View Details Button for Detailed Projects */}
          {hasDetailedPage && (
            
            <Link
              href={`/resources/${resource.id}`}
              onClick={handleViewDetails}
              className={`flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Full Details
            </Link>
          )}

          {/* Quick Links for Arduino Projects */}
          {resource.category === 'arduino-projects' && (
            <div className="space-y-2">
              {resource.links
                .filter(link => link.type === 'circuit-diagram')
                .map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(link.type, link.url, resource.title)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors group ${
                      isDarkMode
                        ? 'bg-green-800 hover:bg-green-700 border border-green-700'
                        : 'bg-green-50 hover:bg-green-100 border border-green-200'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <svg className={`w-4 h-4 ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      <span className={`font-medium ${
                        isDarkMode ? 'text-green-300' : 'text-green-700'
                      }`}>
                        {link.label}
                      </span>
                    </span>
                    <svg className={`w-4 h-4 ${
                      isDarkMode 
                        ? 'text-green-400 group-hover:text-green-300' 
                        : 'text-green-500 group-hover:text-green-700'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
            </div>
          )}

          {/* Links for Non-Arduino Projects (or all links if no detailed page) */}
          {(resource.category !== 'arduino-projects' || !hasDetailedPage) && (
            <div className="space-y-2">
              {resource.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link.type, link.url, resource.title)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors group ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="capitalize font-medium">{link.type.replace('-', ' ')}</span>
                    {link.label && (
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        - {link.label}
                      </span>
                    )}
                  </span>
                  <svg className={`w-4 h-4 ${
                    isDarkMode 
                      ? 'text-gray-400 group-hover:text-gray-300' 
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))} 
            </div>
          )}
        </div>
      </div>
    </div>
  );
}