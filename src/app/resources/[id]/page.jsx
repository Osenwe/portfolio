// app/resources/[id]/page.js
'use client'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { projectDetailsData } from '@/data/projectDetailsData'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { portfolioEvents } from '@/utils/analytics/tracking'
import { 
  ClockIcon, 
  UserIcon, 
  ArrowLeftIcon, 
  ArrowTopRightOnSquareIcon,
  ShoppingCartIcon,
  CodeBracketIcon,
  CpuChipIcon 
} from '@heroicons/react/24/outline'


export default function ResourcePage() {
  const { id } = useParams()
  const isDarkMode = useSelector((state) => state.theme.isDarkMode)
  
  // Get project details from the detailed dataset
  const project = projectDetailsData.find(p => p.id === parseInt(id))
  
  // Track page view
  useEffect(() => {
    if (project) {
      try {
        portfolioEvents.viewProject(project.title, {
          projectId: project.id,
          category: project.category,
          difficulty: project.difficulty,
          estimatedTime: project.estimatedTime
        });
      } catch (error) {
        console.log('Analytics error (non-critical):', error);
      }
    } 
  }, [project]);

  // Track link clicks
  const handleLinkClick = (linkType, url, linkLabel) => {
    try {
      portfolioEvents.clickProjectLink(project.title, {
        linkType,
        linkLabel,
        url,
        projectId: project.id
      });
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  };

  // Track material link clicks
  const handleMaterialClick = (materialName, amazonLink) => {
    try {
      portfolioEvents.clickMaterialLink(project.title, {
        materialName,
        amazonLink,
        projectId: project.id
      });
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  };

  // Track section engagement
  const handleSectionView = (sectionName) => {
    try {
      portfolioEvents.engageWithSection(project.title, {
        sectionName,
        projectId: project.id
      });
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  };
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
          <Link href="/resources" className="text-blue-600 hover:underline">
            ← Back to Resources
          </Link>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getLinkIcon = (type) => {
    switch (type) {
      case 'codehs': return <CodeBracketIcon className="w-4 h-4" />
      case 'amazon': return <ShoppingCartIcon className="w-4 h-4" />
      case 'tinkercad': return <CpuChipIcon className="w-4 h-4" />
      default: return <ArrowTopRightOnSquareIcon className="w-4 h-4" />
    }
  }

  const getLinkColor = (type) => {
    switch (type) {
      case 'codehs': return 'bg-blue-600 hover:bg-blue-700'
      case 'amazon': return 'bg-orange-600 hover:bg-orange-700'
      case 'tinkercad': return 'bg-green-600 hover:bg-green-700'
      default: return 'bg-gray-600 hover:bg-gray-700'
    }
  }

  return (
    <>
      <Navbar />
      <main className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className={`hover:underline ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Home
              </Link>
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</span>
              <Link 
                href="/resources" 
                className={`hover:underline ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                onClick={() => handleSectionView('breadcrumb-resources')}
              >
                Resources
              </Link>
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</span>
              <Link 
                href={`/resources/categories/${project.category}`} 
                className={`hover:underline ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                onClick={() => handleSectionView('breadcrumb-category')}
              >
                {project.category.replace('-', ' ')}
              </Link>
              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>/</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{project.title}</span>
            </div>
          </nav>

          {/* Back Button */}
          <Link 
            href="/resources"
            className={`inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-white hover:bg-gray-100 text-gray-700'
            } shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            onClick={() => handleSectionView('back-to-resources')}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Resources</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              
              {/* Project Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                  </span>
                </div>
                
                <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-4 h-4" />
                    <span>{project.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>{project.estimatedTime}</span>
                  </div>
                </div>
                
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {project.description}
                </p>
              </div>

              {/* Project Image */}
              <div className="mb-8">
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Overview Section */}
              {project.overview && (
                <section className="mb-8" onFocus={() => handleSectionView('overview')}>
                  <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Project Overview
                  </h2>
                  <div className={`prose max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                    {project.overview.split('\n').map((paragraph, index) => (
                      <p key={index} className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              )}

              {/* Learning Outcomes */}
              {project.learningOutcomes && (
                <section className="mb-8" onFocus={() => handleSectionView('learning-outcomes')}>
                  <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    What You'll Learn
                  </h2>
                  <ul className="space-y-2">
                    {project.learningOutcomes.map((outcome, index) => (
                      <li key={index} className={`flex items-start space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Features (for software projects) */}
              {project.features && (
                <section className="mb-8" onFocus={() => handleSectionView('features')}>
                  <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      } shadow-sm`}>
                        <div className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Step-by-Step Instructions */}
              {project.instructions && (
                <section className="mb-8" onFocus={() => handleSectionView('instructions')}>
                  <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Step-by-Step Instructions
                  </h2>
                  <div className="space-y-6">
                    {project.instructions.map((step, index) => (
                      <div key={index} className={`flex space-x-4 p-6 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      } shadow-sm`}>
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {step.title}
                          </h3>
                          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                            {step.description}
                          </p>
                          {step.code && (
                            <div className={`bg-gray-900 rounded-md p-4 overflow-x-auto`}>
                              <pre className="text-gray-300 text-sm">
                                <code>{step.code}</code>
                              </pre>
                            </div>
                          )}
                          {step.image && (
                            <div className="mt-4">
                              <Image
                                src={step.image}
                                alt={step.title}
                                width={400}
                                height={200}
                                className="rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Embedded Content */}
              {project.embeddedContent && (
                <section className="mb-8" onFocus={() => handleSectionView('embedded-content')}>
                  <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Interactive Demo
                  </h2>
                  {project.embeddedContent.type === 'tinkercad' && (
                    <div className="aspect-video w-full">
                      <iframe
                        src={project.embeddedContent.url}
                        className="w-full h-full rounded-lg border"
                        allowFullScreen
                      />
                    </div>
                  )}
                  {project.embeddedContent.type === 'youtube' && (
                    <div className="aspect-video w-full">
                      <iframe
                        src={project.embeddedContent.url}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                      />
                    </div>
                  )}
                </section>
              )}

              {/* Tags */}
              <section className="mb-8">
                <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Quick Actions */}
                <div className={`p-6 rounded-lg border shadow-sm ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Quick Links
                  </h3>
                  <div className="space-y-3">
                    {project.quickLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLinkClick(link.type, link.url, link.label)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-md text-white transition-colors ${getLinkColor(link.type)}`}
                      >
                        {getLinkIcon(link.type)}
                        <span className="flex-1">{link.label}</span>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

                    {project.category === 'arduino-projects' && (
                    <div className={`p-6 rounded-lg border shadow-sm ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Materials Needed
                      </h3>
                      <ul className="space-y-3">
                        {project.materials.map((material, index) => (
                          <li key={index} className={`flex items-start space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="flex-1">{material.name}</span>
                            {material.amazonLink && (
                              <a
                                href={material.amazonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleMaterialClick(material.name, material.amazonLink)}
                                className="text-orange-600 hover:text-orange-700"
                                title="Buy on Amazon"
                              >
                                <ShoppingCartIcon className="w-4 h-4" />
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Project Stats */}
                <div className={`p-6 rounded-lg border shadow-sm ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Project Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Difficulty:</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Estimated Time:</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {project.estimatedTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Category:</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {project.category.replace('-', ' ')}
                      </span>
                    </div>
                    {project.cost && (
                      <div className="flex justify-between">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Est. Cost:</span>
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {project.cost}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Related Projects */}
                {project.relatedProjects && (
                  <div className={`p-6 rounded-lg border shadow-sm ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Related Projects
                    </h3>
                    <div className="space-y-3">
                      {project.relatedProjects.map((relatedId, index) => {
                        const relatedProject = projectDetailsData.find(p => p.id === relatedId)
                        return relatedProject ? (
                          <Link
                            key={index}
                            href={`/resources/${relatedId}`}
                            onClick={() => handleSectionView('related-project-click')}
                            className={`block p-3 rounded-md border transition-colors ${
                              isDarkMode 
                                ? 'border-gray-600 hover:bg-gray-700' 
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <div className="text-sm font-medium">{relatedProject.title}</div>
                            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {relatedProject.difficulty} • {relatedProject.estimatedTime}
                            </div>
                          </Link>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </>
  )
}

