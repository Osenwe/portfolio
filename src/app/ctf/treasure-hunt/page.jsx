'use client'
import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  EyeIcon, 
  CodeBracketIcon, 
  TrophyIcon, 
  LightBulbIcon, 
  CheckCircleIcon, 
  ChevronRightIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const InspectElementTreasureHunt = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [foundClues, setFoundClues] = useState({});
  const [showHint, setShowHint] = useState({});
  const [userInput, setUserInput] = useState('');
  const [showDevToolsGuide, setShowDevToolsGuide] = useState(false);
  const [completedLevels, setCompletedLevels] = useState(new Set());
  const [totalScore, setTotalScore] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Comprehensive treasure hunt challenge database
  const allChallenges = [
    {
      id: 1,
      title: "HTML Comment Detective",
      difficulty: "Beginner",
      instruction: "Find the hidden message in the HTML comments.",
      hint: "Right-click and select 'Inspect Element', then look for <!-- comments --> in the HTML",
      expectedAnswer: "SECRET_COMMENT",
      points: 100,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Welcome to the Treasure Hunt!</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Your mission is to uncover hidden secrets using browser developer tools.
          </p>
          {/* SECRET_COMMENT */}
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
            <p>This box contains your first clue. Use your inspection skills!</p>
          </div>
        </div>
      ),
      explanation: "HTML comments are written between <!-- and --> tags. They're invisible on the page but can be seen in the HTML source code."
    },
    {
      id: 2,
      title: "Data Attribute Hunt",
      difficulty: "Beginner",
      instruction: "Find the secret stored in a data attribute.",
      hint: "Look for data-* attributes in the HTML element properties",
      expectedAnswer: "ATTR_HUNTER",
      points: 100,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The Secret Container</h3>
          <div 
            className="bg-purple-100 dark:bg-purple-900 p-4 rounded cursor-pointer"
            data-secret="ATTR_HUNTER"
            data-clue="Found it!"
          >
            <p>Inspect this element to find the hidden data attribute!</p>
          </div>
        </div>
      ),
      explanation: "Data attributes (data-*) store custom data on HTML elements. They're commonly used to pass data between HTML and JavaScript."
    },
    {
      id: 3,
      title: "CSS Hidden Element",
      difficulty: "Beginner",
      instruction: "Find the text hidden by CSS styling.",
      hint: "Look for elements with 'display: none' or 'visibility: hidden'",
      expectedAnswer: "CSS_NINJA",
      points: 150,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The Invisible Message</h3>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
            <p>There's something hidden here...</p>
            <span style={{ display: 'none' }}>CSS_NINJA</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Use inspection to reveal the hidden content!
            </p>
          </div>
        </div>
      ),
      explanation: "CSS can hide elements using display: none, visibility: hidden, or opacity: 0. The content is still in the HTML but not visible."
    },
    {
      id: 4,
      title: "Console Message Hunter",
      difficulty: "Intermediate",
      instruction: "Find the secret message logged to the console.",
      hint: "Open the Console tab (F12 → Console) and look for logged messages",
      expectedAnswer: "CONSOLE_DETECTIVE",
      points: 200,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The Talking Button</h3>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => {
              console.log("🕵️ Secret Code: CONSOLE_DETECTIVE");
              console.log("Well done, detective!");
            }}
          >
            Click Me
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The secret isn't on the page... check the console!
          </p>
        </div>
      ),
      explanation: "JavaScript console.log() messages appear in the browser's Console tab. This is useful for debugging and can sometimes reveal hidden information."
    },
    {
      id: 5,
      title: "Title Attribute Secret",
      difficulty: "Beginner",
      instruction: "Find the message hidden in a title attribute.",
      hint: "Look for the 'title' attribute in HTML elements, or hover to see tooltips",
      expectedAnswer: "TITLE_MASTER",
      points: 100,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The Tooltip Mystery</h3>
          <div 
            className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded cursor-help"
            title="TITLE_MASTER"
          >
            <p>Hover over this box or inspect it to find the secret!</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sometimes secrets hide in plain sight...
            </p>
          </div>
        </div>
      ),
      explanation: "The title attribute creates a tooltip when you hover over an element. It's also visible in the HTML when inspecting."
    },
    {
      id: 6,
      title: "CSS Content Property",
      difficulty: "Intermediate",
      instruction: "Find the text generated by CSS content property.",
      hint: "Look for CSS ::before or ::after pseudo-elements with content property",
      expectedAnswer: "CSS_GENERATED",
      points: 250,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The CSS Generator</h3>
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded relative">
            <p>The secret is generated by CSS, not written in HTML!</p>
            <div className="css-secret-container">
              <style>
                {`.css-secret-container::after {
                  content: "CSS_GENERATED";
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  font-size: 12px;
                  opacity: 0;
                }`}
              </style>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Check the CSS styles for generated content!
            </p>
          </div>
        </div>
      ),
      explanation: "CSS can generate content using the content property with ::before and ::after pseudo-elements. This content doesn't exist in the HTML."
    },
    {
      id: 7,
      title: "Network Request Detective",
      difficulty: "Advanced",
      instruction: "Find the secret in a network request (simulated).",
      hint: "Check the Network tab for HTTP requests and their responses",
      expectedAnswer: "NETWORK_SPY",
      points: 300,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The API Caller</h3>
          <button 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => {
              console.log("📡 Simulated API Response: {secret: 'NETWORK_SPY'}");
              fetch('https://httpbin.org/json').catch(() => {
                console.log("Network request failed, but the secret is: NETWORK_SPY");
              });
            }}
          >
            Make API Call
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Watch the Network tab for the response data...
          </p>
        </div>
      ),
      explanation: "The Network tab shows all HTTP requests made by the page. You can inspect request/response headers and body data."
    },
    {
      id: 8,
      title: "LocalStorage Explorer",
      difficulty: "Advanced",
      instruction: "Find the secret stored in browser localStorage.",
      hint: "Check Application tab → Local Storage for stored data",
      expectedAnswer: "STORAGE_EXPLORER",
      points: 350,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The Memory Bank</h3>
          <button 
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('treasureSecret', 'STORAGE_EXPLORER');
                sessionStorage.setItem('bonusClue', 'Great detective work!');
              }
            }}
          >
            Store Secret Data
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The secret has been stored in your browser's memory...
          </p>
        </div>
      ),
      explanation: "Browser storage (localStorage, sessionStorage) persists data between page loads. Check the Application tab to explore stored data."
    },
    {
      id: 9,
      title: "Event Listener Investigator",
      difficulty: "Advanced",
      instruction: "Find the secret by triggering a special event.",
      hint: "Try different mouse events: click, double-click, right-click",
      expectedAnswer: "EVENT_MASTER",
      points: 300,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The Event Listener</h3>
          <div 
            className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded cursor-pointer"
            onDoubleClick={() => alert("Secret found: EVENT_MASTER")}
            onContextMenu={(e) => {
              e.preventDefault();
              console.log("Right-click secret: EVENT_MASTER");
            }}
          >
            <p>This element responds to special events...</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try different interactions or check the Event Listeners tab!
            </p>
          </div>
        </div>
      ),
      explanation: "Event listeners respond to user interactions. You can see all event listeners in the Elements panel's Event Listeners tab."
    },
    {
      id: 10,
      title: "Meta Tag Hunter",
      difficulty: "Intermediate",
      instruction: "Find the secret in the page's meta tags.",
      hint: "Look at the <head> section for <meta> tags with custom properties",
      expectedAnswer: "META_DETECTIVE",
      points: 200,
      content: () => {
        if (typeof document !== 'undefined') {
          const existingMeta = document.querySelector('meta[name="treasure-secret"]');
          if (!existingMeta) {
            const meta = document.createElement('meta');
            meta.name = 'treasure-secret';
            meta.content = 'META_DETECTIVE';
            document.head.appendChild(meta);
          }
        }
        return (
          <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <h3 className="text-xl font-bold mb-4">The Head Hunter</h3>
            <div className="bg-teal-100 dark:bg-teal-900 p-4 rounded">
              <p>The secret isn't in the visible content...</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check the page's &lt;head&gt; section for meta tags!
              </p>
            </div>
          </div>
        );
      },
      explanation: "Meta tags in the <head> section provide metadata about the page. They're not visible but can contain important information."
    },
    {
      id: 11,
      title: "Base64 Decoder Challenge",
      difficulty: "Advanced",
      instruction: "Decode the Base64 string to find the secret.",
      hint: "The string 'REVDT0RFRF9TRUNSRVQ=' needs to be decoded from Base64",
      expectedAnswer: "DECODED_SECRET",
      points: 400,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The Encoded Message</h3>
          <div 
            className="bg-orange-100 dark:bg-orange-900 p-4 rounded"
            data-encoded="REVDT0RFRF9TRUNSRVQ="
          >
            <p>Find the Base64 encoded string and decode it:</p>
            <code className="block mt-2 p-2 bg-gray-200 dark:bg-gray-700 rounded">
              REVDT0RFRF9TRUNSRVQ=
            </code>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Use atob() in the console or an online decoder!
            </p>
          </div>
        </div>
      ),
      explanation: "Base64 is a common encoding method. Use atob('REVDT0RFRF9TRUNSRVQ=') in the console or online tools to decode it."
    },
    {
      id: 12,
      title: "CSS Variable Explorer",
      difficulty: "Intermediate",
      instruction: "Find the secret stored in a CSS custom property.",
      hint: "Look for CSS custom properties (variables) starting with --",
      expectedAnswer: "CSS_VARIABLE",
      points: 250,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The CSS Variable Vault</h3>
          <div 
            className="bg-pink-100 dark:bg-pink-900 p-4 rounded"
            style={{ '--secret-data': 'CSS_VARIABLE' }}
          >
            <p>The secret is stored in a CSS custom property!</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Check the Computed tab or Styles panel for custom properties...
            </p>
          </div>
        </div>
      ),
      explanation: "CSS custom properties (variables) start with -- and can store data. They're visible in the Computed or Styles panels."
    },
    {
      id: 13,
      title: "DOM Manipulation Master",
      difficulty: "Expert",
      instruction: "Modify the DOM to reveal the hidden content.",
      hint: "Try removing the overlay element or changing CSS properties",
      expectedAnswer: "DOM_MASTER",
      points: 500,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The Locked Vault</h3>
          <div className="relative bg-gray-100 dark:bg-gray-800 p-4 rounded h-32 overflow-hidden">
            <div 
              className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-10"
              id="vault-overlay"
            >
              <span className="text-white font-bold">🔒 LOCKED</span>
            </div>
            <div className="hidden treasure-content">
              <p className="text-green-600 dark:text-green-400 font-bold text-xl">
                🎉 Secret Found: DOM_MASTER
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Delete the overlay or modify CSS to unlock the vault!
          </p>
        </div>
      ),
      explanation: "You can directly edit the DOM in the Elements tab. Delete elements, modify attributes, or change CSS to reveal hidden content."
    },
    {
      id: 14,
      title: "Cookie Crumb Trail",
      difficulty: "Advanced",
      instruction: "Find the secret stored in browser cookies.",
      hint: "Check Application tab → Cookies for stored cookie data",
      expectedAnswer: "COOKIE_HUNTER",
      points: 350,
      content: () => (
        <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <h3 className="text-xl font-bold mb-4">The Cookie Jar</h3>
          <button 
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => {
              if (typeof document !== 'undefined') {
                document.cookie = "treasureHunt=COOKIE_HUNTER; path=/";
                document.cookie = "detective=active; path=/";
              }
            }}
          >
            Bake the Cookies
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The secret has been stored in your browser's cookies...
          </p>
        </div>
      ),
      explanation: "Cookies store small pieces of data that persist between browser sessions. Check the Application tab → Cookies to see them."
    },
    {
      id: 15,
      title: "Source Map Explorer",
      difficulty: "Expert",
      instruction: "Find the comment hidden in the page source.",
      hint: "Use Ctrl+U (or Cmd+U on Mac) to view the raw page source",
      expectedAnswer: "SOURCE_EXPLORER",
      points: 400,
      content: () => {
        if (typeof document !== 'undefined') {
          const comment = document.createComment(' SOURCE_EXPLORER - Found in page source! ');
          document.body.appendChild(comment);
        }
        return (
          <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <h3 className="text-xl font-bold mb-4">The Source Code Vault</h3>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded">
              <p>The treasure is hidden in the raw source code of this page...</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Try viewing the page source (Ctrl+U) and search for "SOURCE_EXPLORER"
              </p>
            </div>
          </div>
        );
      },
      explanation: "The raw page source (Ctrl+U) shows the original HTML before JavaScript modifications. Comments and hidden content may be visible there."
    }
  ];

  // Randomly select 5 challenges for the current session
  useEffect(() => {
    const shuffled = [...allChallenges].sort(() => Math.random() - 0.5);
    setSelectedChallenges(shuffled.slice(0, 5));
  }, []);

  const currentChallenge = selectedChallenges[currentLevel - 1];

  useEffect(() => {
    console.log("🔍 Treasure Hunt initialized! Keep your eyes open...");
    console.log("💡 Tip: Try right-clicking and selecting 'Inspect Element'");
    
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        console.log("📡 Background scan complete. Happy hunting!");
      }, 2000);
    }
  }, []);

  const handleAnswerSubmit = () => {
    if (!currentChallenge) return;
    
    if (userInput.trim().toUpperCase() === currentChallenge.expectedAnswer) {
      setFoundClues(prev => ({ ...prev, [currentLevel]: true }));
      setCompletedLevels(prev => new Set([...prev, currentLevel]));
      setTotalScore(prev => prev + currentChallenge.points);
      setUserInput('');
      
      console.log(`🎉 Level ${currentLevel} completed! Points earned: ${currentChallenge.points}`);
      
      if (currentLevel < selectedChallenges.length) {
        setTimeout(() => {
          setCurrentLevel(prev => prev + 1);
        }, 2000);
      }
    } else {
      console.log("❌ Not quite right. Keep investigating!");
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': 
        return isDarkMode 
          ? 'text-green-400 bg-green-900/30 border-green-700' 
          : 'text-green-600 bg-green-100 border-green-200';
      case 'intermediate': 
        return isDarkMode 
          ? 'text-yellow-400 bg-yellow-900/30 border-yellow-700' 
          : 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'advanced': 
        return isDarkMode 
          ? 'text-orange-400 bg-orange-900/30 border-orange-700' 
          : 'text-orange-600 bg-orange-100 border-orange-200';
      case 'expert': 
        return isDarkMode 
          ? 'text-red-400 bg-red-900/30 border-red-700' 
          : 'text-red-600 bg-red-100 border-red-200';
      default: 
        return isDarkMode 
          ? 'text-gray-400 bg-gray-800 border-gray-600' 
          : 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const resetHunt = () => {
    setCurrentLevel(1);
    setFoundClues({});
    setShowHint({});
    setUserInput('');
    setCompletedLevels(new Set());
    setTotalScore(0);
    
    // Generate new random selection
    const shuffled = [...allChallenges].sort(() => Math.random() - 0.5);
    setSelectedChallenges(shuffled.slice(0, 5));
    
    console.clear();
    console.log("🔄 Treasure Hunt reset! Good luck detective!");
  };

  if (!currentChallenge) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Loading Treasure Hunt...</h1>
          <button onClick={resetHunt} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            Start Hunt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MagnifyingGlassIcon className="w-8 h-8 mr-3 text-blue-600" />
            <h1 className="text-4xl font-bold">Inspect Element Treasure Hunt</h1>
          </div>
          <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Master browser developer tools by finding hidden treasures in web pages
          </p>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-200' 
                : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Progress Overview */}
        <div className={`mb-8 p-6 rounded-lg border shadow-lg transition-colors ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">Level {currentLevel} of {selectedChallenges.length}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(currentChallenge.difficulty)}`}>
                  {currentChallenge.difficulty}
                </span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentChallenge.points} points
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">Total Score: {totalScore}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {completedLevels.size}/{selectedChallenges.length} levels completed
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedLevels.size / selectedChallenges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Developer Tools Guide */}
        <div className={`mb-8 p-6 rounded-lg border transition-colors ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'
        }`}>
          <button
            onClick={() => setShowDevToolsGuide(!showDevToolsGuide)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center">
              <CpuChipIcon className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-semibold">Developer Tools Quick Guide</span>
            </div>
            {showDevToolsGuide ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
          </button>
          
          {showDevToolsGuide && (
            <div className="mt-4 space-y-3 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Opening Developer Tools:</h4>
                  <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Press <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>F12</kbd></li>
                    <li>• Right-click → "Inspect Element"</li>
                    <li>• <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Ctrl+Shift+I</kbd> (Windows/Linux)</li>
                    <li>• <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Cmd+Option+I</kbd> (Mac)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Key Tabs:</h4>
                  <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• <strong>Elements:</strong> HTML structure & CSS</li>
                    <li>• <strong>Console:</strong> JavaScript output & errors</li>
                    <li>• <strong>Network:</strong> HTTP requests & responses</li>
                    <li>• <strong>Application:</strong> Storage, cookies, cache</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current Challenge */}
        <div className={`mb-8 p-8 rounded-lg border shadow-lg transition-colors ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">{currentChallenge.title}</h3>
              {foundClues[currentLevel] && (
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              )}
            </div>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {currentChallenge.instruction}
            </p>
          </div>

          {/* Challenge Content */}
          <div className="mb-6">
            {currentChallenge.content()}
          </div>

          {/* Answer Input */}
          {!foundClues[currentLevel] && (
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Enter the secret code you found:
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                  placeholder="Enter the secret code..."
                  className={`flex-1 px-4 py-3 rounded-lg border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                />
                <button
                  onClick={handleAnswerSubmit}
                  disabled={!userInput.trim()}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    userInput.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                      : (isDarkMode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Hint Section */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowHint(prev => ({ ...prev, [currentLevel]: !prev[currentLevel] }))}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <LightBulbIcon className="w-4 h-4 inline mr-2" />
              {showHint[currentLevel] ? 'Hide Hint' : 'Show Hint'}
            </button>
          </div>

          {/* Hint Display */}
          {showHint[currentLevel] && (
            <div className={`mt-4 p-4 rounded-lg border-l-4 border-yellow-500 ${
              isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
            }`}>
              <div className="flex items-start">
                <LightBulbIcon className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className={`font-medium mb-1 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>Hint:</h4>
                  <p className={isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}>{currentChallenge.hint}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {foundClues[currentLevel] && (
            <div className={`mt-6 p-6 rounded-lg border ${
              isDarkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                    🎉 Treasure Found!
                  </h4>
                  <p className={`mb-3 ${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
                    <strong>Code:</strong> {currentChallenge.expectedAnswer}
                  </p>
                  <p className={`mb-3 ${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
                    <strong>Points Earned:</strong> {currentChallenge.points}
                  </p>
                  <p className={isDarkMode ? 'text-green-200' : 'text-green-700'}>
                    <strong>Explanation:</strong> {currentChallenge.explanation}
                  </p>
                  {currentLevel < selectedChallenges.length && (
                    <div className="mt-4">
                      <button
                        onClick={() => setCurrentLevel(prev => prev + 1)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Continue to Next Level
                        <ChevronRightIcon className="w-4 h-4 inline ml-2" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Level Navigation */}
        <div className={`mb-8 p-6 rounded-lg border transition-colors ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Level Navigation</h3>
          <div className="grid grid-cols-5 gap-3">
            {selectedChallenges.map((challenge, index) => {
              const levelNum = index + 1;
              return (
                <button
                  key={challenge.id}
                  onClick={() => setCurrentLevel(levelNum)}
                  disabled={levelNum > currentLevel && !completedLevels.has(levelNum)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    completedLevels.has(levelNum)
                      ? (isDarkMode ? 'bg-green-900/30 border-green-700 text-green-300' : 'bg-green-100 border-green-300 text-green-800')
                      : levelNum === currentLevel
                      ? (isDarkMode ? 'bg-blue-900/30 border-blue-700 text-blue-300' : 'bg-blue-100 border-blue-300 text-blue-800')
                      : levelNum < currentLevel
                      ? (isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200')
                      : (isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed')
                  }`}
                >
                  <div>Level {levelNum}</div>
                  <div className="text-xs opacity-75">{challenge.difficulty}</div>
                  {completedLevels.has(levelNum) && <CheckCircleIcon className="w-4 h-4 mx-auto mt-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Completion Status */}
        {completedLevels.size === selectedChallenges.length && (
          <div className={`mb-8 p-8 rounded-lg border text-center transition-colors ${
            isDarkMode ? 'bg-purple-900/20 border-purple-400' : 'bg-purple-50 border-purple-200'
          }`}>
            <TrophyIcon className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-3xl font-bold mb-4">🎉 Congratulations, Master Detective!</h2>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
              You've completed all {selectedChallenges.length} levels and mastered browser developer tools!
            </p>
            <div className="text-2xl font-bold text-yellow-600 mb-4">
              Final Score: {totalScore} points
            </div>
            <div className="space-y-2 text-sm">
              <p>🔍 HTML source inspection mastered</p>
              <p>🎨 CSS style analysis completed</p>
              <p>⚡ JavaScript console expertise gained</p>
              <p>🌐 Network request monitoring learned</p>
              <p>💾 Browser storage exploration achieved</p>
              <p>🎯 DOM manipulation skills developed</p>
            </div>
          </div>
        )}

        {/* Skills Summary */}
        <div className={`mb-8 p-6 rounded-lg border transition-colors ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">Skills Mastered</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                HTML & CSS Investigation
              </h4>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>• Reading HTML source code and comments</li>
                <li>• Finding hidden elements and attributes</li>
                <li>• Understanding CSS display properties</li>
                <li>• Inspecting element styles and computed values</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <CodeBracketIcon className="w-5 h-5 mr-2 text-green-600" />
                JavaScript & Debugging
              </h4>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>• Using the browser console effectively</li>
                <li>• Understanding event listeners and handlers</li>
                <li>• Reading console logs and error messages</li>
                <li>• Basic DOM manipulation techniques</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <GlobeAltIcon className="w-5 h-5 mr-2 text-purple-600" />
                Network & Storage
              </h4>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>• Monitoring network requests and responses</li>
                <li>• Exploring browser storage mechanisms</li>
                <li>• Understanding cookies and session data</li>
                <li>• Analyzing API calls and data flow</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <EyeIcon className="w-5 h-5 mr-2 text-orange-600" />
                Security & Investigation
              </h4>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>• Web application security testing basics</li>
                <li>• Client-side data analysis techniques</li>
                <li>• Digital forensics and evidence gathering</li>
                <li>• Ethical hacking investigation skills</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-World Applications */}
        <div className={`mb-8 p-6 rounded-lg border transition-colors ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">Real-World Applications</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Web Development</h4>
              <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                <li>• Debugging website issues</li>
                <li>• Testing responsive design</li>
                <li>• Optimizing page performance</li>
                <li>• Analyzing competitor websites</li>
              </ul>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>Cybersecurity</h4>
              <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
                <li>• Web application penetration testing</li>
                <li>• Finding security vulnerabilities</li>
                <li>• Digital forensics investigations</li>
                <li>• Bug bounty hunting</li>
              </ul>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Quality Assurance</h4>
              <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                <li>• Testing web applications</li>
                <li>• Verifying data integrity</li>
                <li>• Performance monitoring</li>
                <li>• User experience analysis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advanced Tips */}
        <div className={`mb-8 p-6 rounded-lg border transition-colors ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">Pro Tips for Advanced Investigation</h3>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>🚀 Keyboard Shortcuts</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Windows/Linux:</p>
                  <ul className={isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}>
                    <li>• <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Ctrl+Shift+C</kbd> - Select element</li>
                    <li>• <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Ctrl+Shift+J</kbd> - Open console</li>
                    <li>• <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Ctrl+U</kbd> - View source</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Mac:</p>
                  <ul className={isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}>
                    <li>• <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Cmd+Shift+C</kbd> - Select element</li>
                    <li>• <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Cmd+Option+J</kbd> - Open console</li>
                    <li>• <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Cmd+Option+U</kbd> - View source</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>🔍 Search Techniques</h4>
              <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                <li>• Use <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Ctrl+F</kbd> in Elements tab to search HTML</li>
                <li>• Filter network requests by type (XHR, JS, CSS)</li>
                <li>• Use console commands like <code className={`px-1 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>document.querySelectorAll()</code></li>
                <li>• Search all files with <kbd className={`px-1 py-0.5 rounded text-xs ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Ctrl+Shift+F</kbd></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={resetHunt}
            className={`px-6 py-3 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            🔄 New Random Challenge Set
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Master web investigation techniques • Develop cybersecurity skills • Become a digital detective
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-xs">
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
              💡 Tip: Press F12 to open developer tools
            </span>
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
              🔍 Remember: Always inspect ethically
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectElementTreasureHunt;