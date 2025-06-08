import React, { useState, useEffect } from 'react';
import { 
  CookieIcon,
  UserIcon,
  ShieldExclamationIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
  EyeIcon,
  EyeSlashIcon,
  TrophyIcon,
  ChevronRightIcon,
  KeyIcon,
  ComputerDesktopIcon,
  CodeBracketIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const CookieMonsterChallenge = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userRole, setUserRole] = useState('guest');
  const [showHint, setShowHint] = useState(false);
  const [showCookiePanel, setShowCookiePanel] = useState(false);
  const [completedLevels, setCompletedLevels] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cookies, setCookies] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Challenge levels with different cookie manipulation scenarios
  const challenges = [
    {
      id: 1,
      title: "Basic Cookie Inspector",
      difficulty: "Easy",
      description: "Discover how cookies store user information and find the hidden admin flag.",
      objective: "Find the secret admin flag stored in a cookie",
      initialCookies: {
        'user_role': 'guest',
        'session_id': 'sess_123456789',
        'admin_flag': 'flag{cookie_inspector_2024}',
        'last_visit': '2024-01-15'
      },
      targetCookie: 'admin_flag',
      successMessage: "You found the admin flag! Cookies can contain sensitive information that shouldn't be exposed.",
      hint: "Look through all the cookies set by this website. One of them contains a flag in the format flag{...}",
      explanation: "Cookies are often used to store various types of data. Developers sometimes accidentally leave sensitive information in cookies that can be viewed by anyone with access to developer tools."
    },
    {
      id: 2,
      title: "Role Elevation",
      difficulty: "Medium", 
      description: "Change your user role from 'guest' to 'admin' by modifying cookie values.",
      objective: "Modify the user_role cookie to gain admin access",
      initialCookies: {
        'user_role': 'guest',
        'user_id': '12345',
        'preferences': 'dark_mode=true',
        'csrf_token': 'abc123xyz789'
      },
      targetRole: 'admin',
      successMessage: "Welcome, Administrator! You've successfully elevated your privileges through cookie manipulation.",
      hint: "Find the cookie that controls your user role and change its value to 'admin'. Then refresh or interact with the page.",
      explanation: "This demonstrates why applications should never rely solely on client-side data (like cookies) for authorization. Server-side validation is crucial for security."
    },
    {
      id: 3,
      title: "Session Hijacking Simulation",
      difficulty: "Medium",
      description: "Simulate taking over another user's session by modifying session cookies.",
      objective: "Change your session to match admin_session_xyz to access admin account",
      initialCookies: {
        'session_token': 'user_session_123',
        'user_role': 'user',
        'username': 'john_doe',
        'admin_hint': 'admin_session_xyz'
      },
      targetSession: 'admin_session_xyz',
      successMessage: "Session hijacked! You're now logged in as an administrator through session manipulation.",
      hint: "Look for a cookie that controls your session, and check if there are any hints about admin session tokens.",
      explanation: "Session hijacking occurs when an attacker gains access to a user's session token. This is why secure session management and HTTPS are critical."
    },
    {
      id: 4,
      title: "Cookie Persistence Attack",
      difficulty: "Hard",
      description: "Exploit persistent cookies to maintain unauthorized access across browser sessions.",
      objective: "Set a persistent admin cookie that survives page refresh",
      initialCookies: {
        'user_type': 'standard',
        'remember_me': 'false', 
        'account_level': '1',
        'expiry_hint': 'Set Max-Age for persistence'
      },
      targetPersistence: true,
      successMessage: "Persistent access achieved! Your admin privileges now survive browser restarts.",
      hint: "Create or modify cookies to have extended expiration times. Look for cookies that control account levels or user types.",
      explanation: "Persistent cookies can be dangerous if they contain sensitive information, as they remain on the user's device even after closing the browser."
    },
    {
      id: 5,
      title: "Cookie Domain Manipulation",
      difficulty: "Hard",
      description: "Advanced: Understand how cookie domains affect security boundaries.",
      objective: "Modify cookie domain settings to understand security implications",
      initialCookies: {
        'site_access': 'limited',
        'subdomain_key': 'sub123',
        'security_level': 'low',
        'domain_flag': 'flag{domain_master_2024}'
      },
      targetDomain: true,
      successMessage: "Domain manipulation mastered! You understand how cookie scope affects security.",
      hint: "Examine how different domain settings for cookies affect their scope and accessibility.",
      explanation: "Cookie domain settings determine which sites can access the cookies. Improper domain configuration can lead to security vulnerabilities."
    }
  ];

  const currentChallenge = challenges.find(c => c.id === currentLevel);
  const totalLevels = challenges.length;

  // Initialize cookies when challenge changes
  useEffect(() => {
    if (currentChallenge) {
      setCookies(currentChallenge.initialCookies);
      setUserRole(currentChallenge.initialCookies.user_role || 'guest');
    }
  }, [currentLevel]);

  // Simulate setting a cookie
  const setCookie = (name, value, options = {}) => {
    setCookies(prev => ({ ...prev, [name]: value }));
    
    // Simulate browser cookie behavior
    const cookieString = `${name}=${value}; ${options.path ? `path=${options.path};` : ''} ${options.domain ? `domain=${options.domain};` : ''} ${options.maxAge ? `max-age=${options.maxAge};` : ''}`;
    console.log(`Cookie set: ${cookieString}`);
  };

  // Delete a cookie
  const deleteCookie = (name) => {
    setCookies(prev => {
      const newCookies = { ...prev };
      delete newCookies[name];
      return newCookies;
    });
  };

  // Check challenge completion
  const checkChallenge = () => {
    let isComplete = false;
    
    switch (currentLevel) {
      case 1:
        // Check if they found the admin flag
        isComplete = showCookiePanel && cookies.admin_flag;
        break;
      case 2:
        // Check if user_role is set to admin
        isComplete = cookies.user_role === 'admin';
        break;
      case 3:
        // Check if session token matches admin session
        isComplete = cookies.session_token === 'admin_session_xyz';
        break;
      case 4:
        // Check if they set persistent cookies
        isComplete = cookies.user_type === 'admin' || cookies.account_level === 'admin';
        break;
      case 5:
        // Check if they understand domain manipulation
        isComplete = cookies.site_access === 'full' || showCookiePanel;
        break;
    }

    if (isComplete) {
      setCompletedLevels(prev => ({ ...prev, [currentLevel]: true }));
      setScore(prev => prev + 1);
    }

    return isComplete;
  };

  const nextLevel = () => {
    if (currentLevel < totalLevels) {
      setCurrentLevel(prev => prev + 1);
      setShowHint(false);
      setShowCookiePanel(false);
    } else {
      setShowResults(true);
    }
  };

  const resetChallenge = () => {
    setCurrentLevel(1);
    setUserRole('guest');
    setShowHint(false);
    setShowCookiePanel(false);
    setCompletedLevels({});
    setScore(0);
    setShowResults(false);
    setCookies({});
    setLoginAttempts(0);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return isDarkMode ? 'text-green-400 bg-green-900 border-green-700' : 'text-green-600 bg-green-100 border-green-200';
      case 'Medium': return isDarkMode ? 'text-yellow-400 bg-yellow-900 border-yellow-700' : 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Hard': return isDarkMode ? 'text-red-400 bg-red-900 border-red-700' : 'text-red-600 bg-red-100 border-red-200';
      default: return isDarkMode ? 'text-gray-400 bg-gray-800 border-gray-600' : 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getUserRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-red-600 bg-red-100 border-red-300';
      case 'user': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'guest': return 'text-gray-600 bg-gray-100 border-gray-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  // Simulate a vulnerable web application
  const WebAppSimulation = () => (
    <div className={`p-6 rounded-lg border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">🌐 Vulnerable Web Application</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getUserRoleColor(cookies.user_role || 'guest')}`}>
          <UserIcon className="w-4 h-4 inline mr-1" />
          {(cookies.user_role || 'guest').toUpperCase()}
        </div>
      </div>
      
      <div className={`p-4 rounded border ${
        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
      }`}>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Current Session Info:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>User Role: <code className={isDarkMode ? 'bg-gray-600 px-1' : 'bg-gray-200 px-1'}>{cookies.user_role || 'guest'}</code></div>
            <div>Session: <code className={isDarkMode ? 'bg-gray-600 px-1' : 'bg-gray-200 px-1'}>{cookies.session_token || cookies.session_id || 'none'}</code></div>
          </div>
        </div>
        
        {/* Different content based on user role */}
        {(cookies.user_role === 'admin') ? (
          <div className="p-4 bg-red-100 border border-red-300 rounded">
            <h4 className="font-bold text-red-800">🚨 ADMIN PANEL ACCESS</h4>
            <p className="text-red-700">Congratulations! You have admin access through cookie manipulation.</p>
            <ul className="mt-2 text-sm text-red-600">
              <li>• View all user data</li>
              <li>• Modify system settings</li>
              <li>• Access sensitive information</li>
              <li>• Manage user accounts</li>
            </ul>
          </div>
        ) : (
          <div className={`p-4 rounded border ${
            isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-gray-100 border-gray-300'
          }`}>
            <h4 className="font-semibold">Limited Access</h4>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              You have {cookies.user_role || 'guest'} level access. Modify cookies to gain higher privileges.
            </p>
          </div>
        )}
        
        <button
          onClick={() => setLoginAttempts(prev => prev + 1)}
          className={`mt-4 px-4 py-2 rounded border transition-colors ${
            isDarkMode 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          Attempt Login ({loginAttempts} attempts)
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CookieIcon className="w-8 h-8 mr-3 text-blue-600" />
            <h1 className="text-4xl font-bold">Cookie Monster Challenge</h1>
          </div>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Learn about browser cookies and session management through hands-on security challenges
          </p>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`mt-4 px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 hover:bg-gray-700' 
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className={`mb-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">Level {currentLevel}: {currentChallenge?.title}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(currentChallenge?.difficulty)}`}>
                {currentChallenge?.difficulty}
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">
                Progress: {currentLevel} of {totalLevels}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Completed: {score}/{totalLevels}
              </div>
            </div>
          </div>
          
          <div className={`w-full bg-gray-200 rounded-full h-3 ${isDarkMode ? 'bg-gray-700' : ''}`}>
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentLevel / totalLevels) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Challenge Description */}
        <div className={`mb-6 p-6 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-3">{currentChallenge?.description}</h3>
          <div className={`p-4 rounded border-l-4 border-blue-500 ${
            isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
          }`}>
            <strong>Objective:</strong> {currentChallenge?.objective}
          </div>
        </div>

        {/* Web Application Simulation */}
        <div className="mb-8">
          <WebAppSimulation />
        </div>

        {/* Cookie Management Panel */}
        <div className={`mb-8 rounded-lg border shadow-lg ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`px-6 py-4 border-b flex items-center justify-between ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
          }`}>
            <div className="flex items-center">
              <CogIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">Cookie Management Panel</span>
            </div>
            <button
              onClick={() => setShowCookiePanel(!showCookiePanel)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 hover:bg-gray-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {showCookiePanel ? (
                <>
                  <EyeSlashIcon className="w-4 h-4 inline mr-2" />
                  Hide Cookies
                </>
              ) : (
                <>
                  <EyeIcon className="w-4 h-4 inline mr-2" />
                  Show Cookies
                </>
              )}
            </button>
          </div>
          
          {showCookiePanel && (
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h4 className="font-semibold mb-4">Current Cookies:</h4>
              <div className="space-y-3">
                {Object.entries(cookies).map(([name, value]) => (
                  <div key={name} className={`p-3 rounded border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{name}</div>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setCookie(name, e.target.value)}
                          className={`mt-1 w-full px-3 py-1 rounded border text-sm ${
                            isDarkMode 
                              ? 'bg-gray-600 border-gray-500 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      <button
                        onClick={() => deleteCookie(name)}
                        className="ml-3 px-2 py-1 text-red-600 hover:bg-red-100 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add New Cookie */}
              <div className={`mt-6 p-4 rounded border ${
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
              }`}>
                <h5 className="font-medium mb-3">Add New Cookie:</h5>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Cookie name"
                    id="newCookieName"
                    className={`px-3 py-2 rounded border ${
                      isDarkMode 
                        ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Cookie value"
                    id="newCookieValue"
                    className={`px-3 py-2 rounded border ${
                      isDarkMode 
                        ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
                <button
                  onClick={() => {
                    const name = document.getElementById('newCookieName').value;
                    const value = document.getElementById('newCookieValue').value;
                    if (name && value) {
                      setCookie(name, value);
                      document.getElementById('newCookieName').value = '';
                      document.getElementById('newCookieValue').value = '';
                    }
                  }}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Cookie
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Challenge Controls */}
        <div className={`mb-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">🎯 Challenge Progress</h3>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => {
                const isComplete = checkChallenge();
                if (isComplete) {
                  alert(currentChallenge.successMessage);
                } else {
                  alert("Challenge not complete yet. Keep trying!");
                }
              }}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-lg"
            >
              <CheckCircleIcon className="w-4 h-4 inline mr-2" />
              Check Progress
            </button>
            
            <button
              onClick={() => setShowHint(!showHint)}
              className={`px-6 py-3 rounded-lg font-medium border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <LightBulbIcon className="w-4 h-4 inline mr-2" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>

            {completedLevels[currentLevel] && (
              <button
                onClick={nextLevel}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg"
              >
                {currentLevel < totalLevels ? (
                  <>
                    Next Level
                    <ChevronRightIcon className="w-4 h-4 inline ml-2" />
                  </>
                ) : (
                  <>
                    Complete Challenge
                    <TrophyIcon className="w-4 h-4 inline ml-2" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Hint Section */}
          {showHint && currentChallenge && (
            <div className={`mb-6 p-4 rounded-lg border-l-4 border-yellow-500 ${
              isDarkMode ? 'bg-yellow-900/20 border-yellow-400' : 'bg-yellow-50'
            }`}>
              <div className="flex items-start">
                <LightBulbIcon className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">Challenge Hint:</h4>
                  <p className={isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}>{currentChallenge.hint}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {completedLevels[currentLevel] && (
            <div className={`p-6 rounded-lg border ${
              isDarkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-start mb-4">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2 text-green-700 dark:text-green-300">
                    Level Complete!
                  </h4>
                  <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong>Success:</strong> {currentChallenge.successMessage}
                  </div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    <strong>Explanation:</strong> {currentChallenge.explanation}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Browser DevTools Instructions */}
        <div className={`mb-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">🛠️ Real Browser Cookie Manipulation</h3>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            In real browsers, you can view and edit cookies using Developer Tools:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Chrome/Edge DevTools:</h4>
              <ol className={`text-sm space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>1. Press F12 or Ctrl+Shift+I</li>
                <li>2. Go to "Application" tab</li>
                <li>3. Click "Cookies" in left sidebar</li>
                <li>4. Select your domain</li>
                <li>5. Double-click values to edit</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Firefox DevTools:</h4>
              <ol className={`text-sm space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>1. Press F12 or Ctrl+Shift+I</li>
                <li>2. Go to "Storage" tab</li>
                <li>3. Expand "Cookies" in left panel</li>
                <li>4. Select your domain</li>
                <li>5. Right-click to add/edit/delete</li>
              </ol>
            </div>
          </div>
          
          <div className={`mt-4 p-4 rounded border ${
            isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'
          }`}>
            <strong>⚠️ Security Note:</strong> Never manipulate cookies on real websites without permission. This is for educational purposes only!
          </div>
        </div>

        {/* Challenge Results Modal */}
        {showResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`max-w-md w-full rounded-lg shadow-xl ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <div className="p-6">
                <div className="text-center mb-6">
                  <TrophyIcon className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                  <h3 className="text-2xl font-bold mb-2">Cookie Monster Challenge Complete!</h3>
                  <div className="text-lg mb-4">
                    You completed <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{totalLevels}</span> levels
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Security Mastery: {totalLevels > 0 ? Math.round((score / totalLevels) * 100) : 0}%
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={resetChallenge}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Try Again
                    <ChevronRightIcon className="w-4 h-4 inline ml-2" />
                  </button>
                  <button
                    onClick={() => setShowResults(false)}
                    className={`w-full px-6 py-3 rounded-lg font-medium border transition-colors ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Review Challenges
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Resources */}
        <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">🎓 Cookie Security Knowledge Base</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Cookie Attributes:</h4>
              <div className="space-y-3 text-sm">
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🔒 Secure</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Only sent over HTTPS connections
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🚫 HttpOnly</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Cannot be accessed by JavaScript
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🌐 SameSite</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Controls cross-site request behavior
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Security Best Practices:</h4>
              <div className="space-y-3 text-sm">
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">✅ Server-Side Validation</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Never trust client-side data for authorization
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🔄 Token Rotation</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Regularly refresh session tokens
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">⏰ Expiration</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Set appropriate cookie lifetimes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Impact */}
        <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">🌍 Real-World Cookie Attacks</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-red-600">Session Hijacking</h4>
              <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Stealing session tokens</li>
                <li>• Man-in-the-middle attacks</li>
                <li>• Unsecured WiFi exploitation</li>
                <li>• XSS-based cookie theft</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-orange-600">CSRF Attacks</h4>
              <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Cross-site request forgery</li>
                <li>• Unauthorized actions</li>
                <li>• State-changing requests</li>
                <li>• Social engineering tactics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Privacy Issues</h4>
              <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Tracking cookies</li>
                <li>• User profiling</li>
                <li>• Data collection</li>
                <li>• Third-party cookies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Master cookie security through hands-on experience • Understand web session management vulnerabilities
          </p>
          <button
            onClick={resetChallenge}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            🔄 Restart Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieMonsterChallenge;