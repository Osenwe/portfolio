'use client'

import { getAnalyticsConsent } from '@/utils/cookies'

// Function to check if analytics consent has been given
export const hasAnalyticsConsent = () => {
  if (typeof window !== 'undefined') {
    // Use cookie instead of localStorage
    return getAnalyticsConsent()
  }
  return false
}

// Initialize Google Analytics in a privacy-centric way
// This can be called unconditionally for all visitors
export const initializeEssentialAnalytics = () => {
  if (typeof window === 'undefined') return;
  
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
  
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  
  // Configure GA with restricted settings for all users
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,             // Anonymize IP addresses
    advertising_features: false,     // Disable advertising features
    allow_google_signals: false,     // Disable Google signals
    allow_ad_personalization_signals: false, // Disable ad personalization
    restricted_data_processing: true, // Enable restricted data processing
    cookie_expires: 0,              // Session cookies only
    send_page_view: true            // Still record the page view
  });
}

// Track a basic page view - can be called for all visitors
export const trackEssentialPageView = (path) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
  
  // Track the page view with minimal parameters
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    anonymize_ip: true
  });
}

// Track custom events only if consent has been given
export const trackEvent = (action, category, label = null, value = null, customParams = {}) => {
  if (typeof window === 'undefined' || 
      !hasAnalyticsConsent() || 
      typeof window.gtag !== 'function') {
    return;
  }
  
  // Base event parameters
  const eventParams = {
    event_category: category,
    non_interaction: false,
  };
  
  // Add optional parameters if provided
  if (label !== null) eventParams.event_label = label;
  if (value !== null && !isNaN(value)) eventParams.value = value;
  
  // Add any custom parameters
  Object.assign(eventParams, customParams);
  
  // Send the event to Google Analytics
  window.gtag('event', action, eventParams);
  
  // Debug log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 GA Event:', { action, category, label, value, ...customParams });
  }
}

// Portfolio-specific tracking events
export const portfolioEvents = {
  // Track when someone views a project
  viewProject: (projectName) => {
    trackEvent('view_project', 'portfolio', projectName)
  },
  
  // Track when someone clicks on a project link
  clickProject: (projectName, url) => {
    trackEvent('click_project', 'portfolio', `${projectName}: ${url}`)
  },
  
  // Track when someone submits the contact form
  submitContactForm: () => {
    trackEvent('submit_form', 'contact', 'contact_form')
  },
  
  // Track when someone clicks on a resume/CV download
  downloadResume: () => {
    trackEvent('download', 'resume', 'resume_download')
  },
  
  // Track when someone clicks on your social media links
  clickSocialMedia: (platform) => {
    trackEvent('click_social', 'social_media', platform)
  }
}

// Research paper tracking events
export const researchEvents = {
  // Track when someone views the research section
  viewResearchSection: () => {
    trackEvent('view_section', 'research', 'research_papers')
  },
  
  // Track when someone clicks on a research paper
  viewPaper: (paperTitle, paperUrl) => {
    trackEvent('view_paper', 'research', paperTitle, null, {
      paper_url: paperUrl
    })
  },
  
  // Track journal/publication clicks
  viewJournal: (journalName) => {
    trackEvent('view_journal', 'research', journalName)
  }
}

// Blog-specific tracking events
export const blogEvents = {
  // Track when someone views the blog page
  viewBlogPage: () => {
    trackEvent('view_blog_page', 'blog', 'blog_landing')
  },
  
  // Track when someone clicks to navigate to blog from different locations
  navigateToBlog: (source) => {
    trackEvent('navigate_to_blog', 'blog', source) // 'footer', 'header', 'content', etc.
  },
  
  // Track when someone reads a blog post
  readBlogPost: (postTitle) => {
    trackEvent('read_post', 'blog', postTitle)
  },
  
  // Track when someone clicks on a blog post
  clickBlogPost: (postTitle, postUrl) => {
    trackEvent('click_post', 'blog', postTitle, null, {
      post_url: postUrl
    })
  },
  
  // Track blog post categories
  viewCategory: (categoryName) => {
    trackEvent('view_category', 'blog', categoryName)
  },
  
  // Track time spent on blog posts
  timeOnPost: (postTitle, timeSpent) => {
    trackEvent('time_on_post', 'blog', postTitle, timeSpent)
  },
  
  // Track when someone shares a blog post
  shareBlogPost: (postTitle, platform) => {
    trackEvent('share_post', 'blog', postTitle, null, {
      platform: platform // 'twitter', 'linkedin', 'facebook', etc.
    })
  },
  
  // Track blog search usage
  searchBlog: (searchTerm) => {
    trackEvent('search_blog', 'blog', searchTerm)
  }
}

export const gameEvents = {
  // Track when someone reaches the 404 page with games
  view404Page: () => {
    trackEvent('view_404_page', 'games', '404_game_hub')
  },

  // Track when someone opens the game hub
  viewGameHub: () => {
    trackEvent('view_game_hub', 'games', 'game_selection')
  },

  // Track when someone starts playing Snake game
  playSnakeGame: () => {
    trackEvent('play_game', 'games', 'snake_game')
  },

  // Track when someone completes Snake game
  completeSnakeGame: (score) => {
    trackEvent('complete_game', 'games', 'snake_game', score)
  },

  // Track when someone starts playing Tetris game
  playTetrisGame: () => {
    trackEvent('play_game', 'games', 'tetris_game')
  },

  // Track when someone completes Tetris game
  completeTetrisGame: (score, level) => {
    trackEvent('complete_game', 'games', 'tetris_game', score, {
      level: level
    })
  },

  // Track when someone starts playing Tic Tac Toe game
  playTicTacToeGame: () => {
    trackEvent('play_game', 'games', 'tictactoe_game')
  },

  // Track when someone completes Tic Tac Toe game
  completeTicTacToeGame: (result, difficulty) => {
    trackEvent('complete_game', 'games', 'tictactoe_game', null, {
      result: result, // 'win', 'lose', 'tie'
      difficulty: difficulty
    })
  },
  
  // Track general game selection
  selectGame: (gameName) => {
    trackEvent('select_game', 'games', gameName)
  },

  // Track game abandonment (when someone leaves mid-game)
  abandonGame: (gameName, timeSpent) => {
    trackEvent('abandon_game', 'games', gameName, timeSpent)
  },

  // Track high scores
  achieveHighScore: (gameName, score) => {
    trackEvent('high_score', 'games', gameName, score)
  }
}