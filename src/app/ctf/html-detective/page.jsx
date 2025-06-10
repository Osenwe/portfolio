'use client'
import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
  TrophyIcon,
  ChevronRightIcon,
  BookOpenIcon,
  ComputerDesktopIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const HTMLDetectiveChallenge = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedLevels, setCompletedLevels] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDevToolsTip, setShowDevToolsTip] = useState(false);

  // Challenge levels with HTML content and hidden passwords
  const challenges = [
    {
      id: 1,
      title: "The Visible Secret",
      difficulty: "Very Easy",
      description: "Find the password hidden in plain sight in this HTML comment.",
      htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Detective</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f0f8ff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .lock { font-size: 48px; text-align: center; margin: 20px 0; }
        input[type="password"] { width: 100%; padding: 10px; margin: 10px 0; border: 2px solid #ddd; border-radius: 5px; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔒 Secure Area Access</h1>
        <p>Welcome, Detective! You need to find the password to access this secure area.</p>
        <!-- Password: detective123 -->
        <div class="lock">🔐</div>
        <form>
            <label for="password">Enter Password:</label>
            <input type="password" id="password" placeholder="Enter the secret password...">
            <button type="submit">Access Secure Area</button>
        </form>
        <p><em>Hint: Inspect the source code carefully...</em></p>
    </div>
</body>
</html>`,
      password: "detective123",
      hint: "Look for HTML comments in the source code. Comments are surrounded by <!-- and -->",
      explanation: "The password 'detective123' is hidden in an HTML comment between the paragraph and the lock icon. HTML comments are visible in the source code but not rendered on the page."
    },
    {
      id: 2,
      title: "Hidden in Attributes",
      difficulty: "Easy",
      description: "The password is concealed within an HTML element's attribute.",
      htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Level 2 - Attribute Hunt</title>
    <style>
        body { font-family: 'Courier New', monospace; background: #1a1a1a; color: #00ff00; margin: 40px; }
        .terminal { background: #000; padding: 20px; border-radius: 10px; border: 2px solid #00ff00; }
        .prompt { color: #00ff00; }
        .secret { display: none; }
        input { background: #000; color: #00ff00; border: 1px solid #00ff00; padding: 8px; }
        button { background: #00ff00; color: #000; border: none; padding: 8px 16px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="terminal">
        <h2>🖥️ SYSTEM ACCESS TERMINAL</h2>
        <p class="prompt">root@secure-server:~$ access_level_2</p>
        <p>Authorization required. Please enter security credentials.</p>
        
        <img src="/images/security-icon.png" alt="Security" data-secret="cyber2024" style="width: 64px; height: 64px; opacity: 0.3;">
        
        <div class="secret" data-password="hidden">This won't help you!</div>
        
        <form style="margin-top: 20px;">
            <label class="prompt">Enter Password: </label>
            <input type="password" placeholder="Required: 8+ characters">
            <button type="submit">AUTHENTICATE</button>
        </form>
        
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
            System Status: <span data-info="normal">OPERATIONAL</span> | 
            Security Level: <span class="highlight">MAXIMUM</span>
        </p>
    </div>
</body>
</html>`,
      password: "cyber2024",
      hint: "Check the attributes of HTML elements. Look for 'data-' attributes or other custom attributes that might contain the password.",
      explanation: "The password 'cyber2024' is hidden in the 'data-secret' attribute of the image element. Data attributes are commonly used to store custom information and can be viewed in the element inspector."
    },
    {
      id: 3,
      title: "CSS Concealment",
      difficulty: "Medium",
      description: "The password is hidden using CSS styling tricks.",
      htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Level 3 - Style Detective</title>
    <style>
        body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 40px; }
        .card { background: rgba(255,255,255,0.95); padding: 30px; border-radius: 15px; max-width: 500px; margin: 0 auto; box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
        .hidden-text { color: transparent; background: transparent; font-size: 0; opacity: 0; position: absolute; left: -9999px; }
        .invisible { visibility: hidden; }
        .zero-height { height: 0; overflow: hidden; }
        .same-color { color: #667eea; background: #667eea; }
        .tiny { font-size: 1px; line-height: 1px; }
        h2 { color: #333; text-align: center; margin-bottom: 30px; }
        .clue { background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0; }
        input { width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; margin: 10px 0; }
        button { background: #007bff; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; width: 100%; }
    </style>
</head>
<body>
    <div class="card">
        <h2>🎨 CSS Security Challenge</h2>
        <p>The password is somewhere on this page, but it's been hidden using CSS techniques!</p>
        
        <div class="clue">
            💡 <strong>Detective Tip:</strong> Sometimes secrets are hidden in plain sight, just styled to be invisible.
        </div>
        
        <div class="hidden-text">password: web123secure</div>
        <div class="invisible">Not this one: fake456</div>
        <div class="zero-height">Hidden: wrong789</div>
        <span class="same-color">web123secure</span>
        <div class="tiny">Tiny text: incorrect000</div>
        
        <p>Can you find the real password among all the CSS trickery?</p>
        
        <form>
            <label for="pwd">Enter the discovered password:</label>
            <input type="password" id="pwd" placeholder="Look carefully at the CSS...">
            <button type="submit">Unlock Secret</button>
        </form>
        
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
            <em>Hint: Try selecting all text on the page, or inspect element styles...</em>
        </p>
    </div>
</body>
</html>`,
      password: "web123secure",
      hint: "Look for text that has been hidden using CSS properties like 'color: transparent', same foreground/background colors, or very small font sizes. Try selecting all text or inspecting element styles.",
      explanation: "The password 'web123secure' appears twice: once with 'color: transparent' and once with the same color as the background. These CSS tricks make text invisible to users but still present in the HTML."
    },
    {
      id: 4,
      title: "JavaScript Secrets",
      difficulty: "Medium",
      description: "The password is embedded within JavaScript code.",
      htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Level 4 - Script Sleuth</title>
    <style>
        body { font-family: 'Monaco', 'Consolas', monospace; background: #282c34; color: #abb2bf; margin: 0; padding: 40px; }
        .container { max-width: 700px; margin: 0 auto; background: #21252b; padding: 30px; border-radius: 12px; border: 1px solid #3e4451; }
        .code-block { background: #1e2127; padding: 15px; border-radius: 8px; border: 1px solid #3e4451; margin: 15px 0; overflow-x: auto; }
        .string { color: #98c379; }
        .keyword { color: #c678dd; }
        .comment { color: #5c6370; font-style: italic; }
        h2 { color: #61dafb; text-align: center; }
        input { background: #3e4451; color: #abb2bf; border: 1px solid #5c6370; padding: 10px; border-radius: 5px; width: 100%; margin: 10px 0; }
        button { background: #61dafb; color: #282c34; border: none; padding: 12px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; }
    </style>
    <script>
        // Security configuration
        const config = {
            apiEndpoint: "https://api.security.example.com",
            timeout: 30000,
            retries: 3
        };
        
        // Authentication tokens - DO NOT EXPOSE IN PRODUCTION!
        const authTokens = {
            admin: "admin_token_xyz789",
            user: "user_token_abc123",
            guest: "guest_token_def456"
        };
        
        // Password verification function
        function verifyAccess(inputPassword) {
            const secretKey = "script2024pass"; // TODO: Move to secure storage
            if (inputPassword === secretKey) {
                return true;
            }
            return false;
        }
        
        // Decoy functions to confuse attackers
        function checkAuth() {
            const fakePass = "not_the_real_password";
            return fakePass;
        }
        
        function validateUser() {
            // This is just a red herring
            const dummy = "fake123wrong";
            console.log("Validation complete");
        }
        
        // Initialize security protocols
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Security system initialized');
            // The real password is: script2024pass
        });
    </script>
</head>
<body>
    <div class="container">
        <h2>🔧 JavaScript Security Analysis</h2>
        <p>Welcome to the JavaScript security challenge! The password is hidden somewhere in the page's scripts.</p>
        
        <div class="code-block">
            <div class="comment">// Sample code structure (not the actual source)</div>
            <div><span class="keyword">function</span> <span class="string">authenticate</span>() {</div>
            <div>&nbsp;&nbsp;<span class="keyword">return</span> <span class="string">"Access granted"</span>;</div>
            <div>}</div>
        </div>
        
        <p>🕵️ Your mission: Examine the JavaScript code to find the hidden password.</p>
        
        <form onsubmit="return false;">
            <label for="jsPassword">Enter the password found in JavaScript:</label>
            <input type="password" id="jsPassword" placeholder="Check the script tags...">
            <button type="submit" onclick="alert('Check the browser console for clues!')">Verify Access</button>
        </form>
        
        <div style="margin-top: 20px; padding: 15px; background: #3e4451; border-radius: 8px;">
            <strong>🛠️ Detective Tools:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>View Page Source (Ctrl+U)</li>
                <li>Open Developer Console (F12)</li>
                <li>Inspect JavaScript files and inline scripts</li>
            </ul>
        </div>
    </div>
</body>
</html>`,
      password: "script2024pass",
      hint: "Look through the JavaScript code in the page source. Check for variable assignments, function parameters, comments, or console.log statements that might contain the password.",
      explanation: "The password 'script2024pass' is found in multiple places in the JavaScript: as the value of 'secretKey' in the verifyAccess function, and mentioned in a comment within the DOMContentLoaded event listener."
    },
    {
      id: 5,
      title: "Network Inspector",
      difficulty: "Hard",
      description: "The password is hidden in HTTP headers or network requests.",
      htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Level 5 - Network Detective</title>
    <meta name="security-key" content="network2024key">
    <meta name="author" content="Security Team">
    <meta name="description" content="Advanced web security challenge">
    <style>
        body { font-family: 'Roboto', sans-serif; background: #0a0e27; color: #ffffff; margin: 0; padding: 40px; }
        .dashboard { max-width: 800px; margin: 0 auto; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); padding: 40px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.5); }
        .header { text-align: center; margin-bottom: 40px; }
        .network-info { background: rgba(255,255,255,0.1); padding: 25px; border-radius: 15px; margin: 20px 0; border: 1px solid rgba(255,255,255,0.2); }
        .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .status-card { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; text-align: center; border: 1px solid rgba(255,255,255,0.1); }
        input { background: rgba(255,255,255,0.1); color: white; border: 2px solid rgba(255,255,255,0.3); padding: 15px; border-radius: 10px; width: 100%; margin: 15px 0; }
        input::placeholder { color: rgba(255,255,255,0.6); }
        button { background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-weight: bold; width: 100%; transition: transform 0.2s; }
        button:hover { transform: translateY(-2px); }
        .hint-box { background: rgba(255,193,7,0.2); border: 2px solid #ffc107; padding: 20px; border-radius: 10px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>🌐 Network Security Dashboard</h1>
            <p>Advanced challenge: The password is hidden in the page's metadata or network information</p>
        </div>
        
        <div class="network-info">
            <h3>🔍 Network Analysis Required</h3>
            <p>This challenge tests your ability to examine HTTP headers, meta tags, and other network-level information.</p>
            
            <div class="status-grid">
                <div class="status-card">
                    <h4>🚦 Connection Status</h4>
                    <p>SECURE</p>
                </div>
                <div class="status-card">
                    <h4>🔐 Encryption</h4>
                    <p>TLS 1.3</p>
                </div>
                <div class="status-card">
                    <h4>📡 Protocol</h4>
                    <p>HTTPS</p>
                </div>
                <div class="status-card">
                    <h4>🌍 Server</h4>
                    <p>NGINX</p>
                </div>
            </div>
        </div>
        
        <form>
            <label for="networkPassword" style="font-weight: bold; font-size: 18px;">🕵️ Enter Network Password:</label>
            <input type="password" id="networkPassword" placeholder="Check meta tags and headers...">
            <button type="submit">Access Network Panel</button>
        </form>
        
        <div class="hint-box">
            <h4>🛠️ Network Investigation Tools:</h4>
            <ul style="margin: 15px 0; padding-left: 25px;">
                <li><strong>View Page Source:</strong> Look for &lt;meta&gt; tags in the &lt;head&gt; section</li>
                <li><strong>Developer Tools:</strong> Check the Network tab for request headers</li>
                <li><strong>Elements Inspector:</strong> Examine the HTML head section carefully</li>
                <li><strong>Meta Tags:</strong> Look for custom meta attributes that might contain secrets</li>
            </ul>
            <p style="margin-top: 15px; font-style: italic;">
                💡 Remember: Not all information is visible on the rendered page!
            </p>
        </div>
    </div>
    
    <script>
        // Add some realistic network simulation
        console.log('Network dashboard loaded');
        console.log('Checking security protocols...');
        
        // Simulate API calls (red herrings)
        setTimeout(() => {
            console.log('API Response: Connection established');
        }, 1000);
        
        setTimeout(() => {
            console.log('Security check: All systems operational');
        }, 2000);
    </script>
</body>
</html>`,
      password: "network2024key",
      hint: "Look in the HTML head section for meta tags. The password might be stored in a meta tag's 'content' attribute. Meta tags are used to provide metadata about the page.",
      explanation: "The password 'network2024key' is stored in the 'content' attribute of a meta tag with name 'security-key' in the page's head section. Meta tags are often overlooked but can contain sensitive information."
    }
  ];

  const currentChallenge = challenges.find(c => c.id === currentLevel);
  const totalLevels = challenges.length;

  const checkAnswer = () => {
    if (!currentChallenge) return;
    
    const isCorrect = userInput.trim().toLowerCase() === currentChallenge.password.toLowerCase();
    
    if (isCorrect) {
      setCompletedLevels(prev => ({ ...prev, [currentLevel]: true }));
      setScore(prev => prev + 1);
    }
    
    setShowAnswer(true);
  };

  const nextLevel = () => {
    if (currentLevel < totalLevels) {
      setCurrentLevel(prev => prev + 1);
      setUserInput('');
      setShowHint(false);
      setShowAnswer(false);
    } else {
      setShowResults(true);
    }
  };

  const resetChallenge = () => {
    setCurrentLevel(1);
    setUserInput('');
    setShowHint(false);
    setShowAnswer(false);
    setCompletedLevels({});
    setScore(0);
    setShowResults(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Very Easy': return isDarkMode ? 'text-blue-400 bg-blue-900 border-blue-700' : 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Easy': return isDarkMode ? 'text-green-400 bg-green-900 border-green-700' : 'text-green-600 bg-green-100 border-green-200';
      case 'Medium': return isDarkMode ? 'text-yellow-400 bg-yellow-900 border-yellow-700' : 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Hard': return isDarkMode ? 'text-red-400 bg-red-900 border-red-700' : 'text-red-600 bg-red-100 border-red-200';
      default: return isDarkMode ? 'text-gray-400 bg-gray-800 border-gray-600' : 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MagnifyingGlassIcon className="w-8 h-8 mr-3 text-blue-600" />
            <h1 className="text-4xl font-bold">HTML Detective Challenge</h1>
          </div>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Master web inspection tools by finding hidden passwords in HTML source code
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
                Solved: {score}/{totalLevels}
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
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Estimated time: 5-10 minutes
          </p>
        </div>

        {/* HTML Preview */}
        <div className={`mb-8 border rounded-lg overflow-hidden shadow-lg ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`px-4 py-3 border-b flex items-center justify-between ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
          }`}>
            <div className="flex items-center">
              <ComputerDesktopIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">Web Page Preview</span>
            </div>
            <button
              onClick={() => setShowDevToolsTip(!showDevToolsTip)}
              className={`px-3 py-1 rounded text-sm border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 hover:bg-gray-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              🛠️ Developer Tools Help
            </button>
          </div>
          
          {showDevToolsTip && (
            <div className={`p-4 border-b ${
              isDarkMode ? 'bg-blue-900/20 border-gray-700' : 'bg-blue-50 border-gray-200'
            }`}>
              <h4 className="font-semibold mb-2">🔧 How to Open Developer Tools:</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Windows/Linux:</strong>
                  <ul className="mt-1">
                    <li>• F12 key</li>
                    <li>• Ctrl + Shift + I</li>
                    <li>• Right-click → Inspect</li>
                  </ul>
                </div>
                <div>
                  <strong>Mac:</strong>
                  <ul className="mt-1">
                    <li>• Cmd + Option + I</li>
                    <li>• Right-click → Inspect Element</li>
                  </ul>
                </div>
                <div>
                  <strong>View Source:</strong>
                  <ul className="mt-1">
                    <li>• Ctrl + U (Windows/Linux)</li>
                    <li>• Cmd + U (Mac)</li>
                    <li>• Right-click → View Page Source</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white">
            <iframe
              srcDoc={currentChallenge?.htmlContent}
              className="w-full h-96 border-0"
              title={`Level ${currentLevel} Challenge`}
            />
          </div>
        </div>

        {/* Source Code View */}
        <div className={`mb-8 rounded-lg border overflow-hidden shadow-lg ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`px-4 py-3 border-b flex items-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
          }`}>
            <CodeBracketIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">HTML Source Code</span>
          </div>
          <div className={`p-4 overflow-x-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <pre className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <code>{currentChallenge?.htmlContent}</code>
            </pre>
          </div>
        </div>

        {/* Answer Input */}
        <div className={`mb-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">🔍 Enter the Hidden Password</h3>
          
          <div className="mb-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !showAnswer && checkAnswer()}
              placeholder="Enter the password you found..."
              disabled={showAnswer}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {!showAnswer ? (
              <>
                <button
                  onClick={checkAnswer}
                  disabled={!userInput.trim()}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    userInput.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                      : (isDarkMode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                  }`}
                >
                  <MagnifyingGlassIcon className="w-4 h-4 inline mr-2" />
                  Submit Password
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
              </>
            ) : (
              <button
                onClick={nextLevel}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-lg"
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
                  <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">Detective Hint:</h4>
                  <p className={isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}>{currentChallenge.hint}</p>
                </div>
              </div>
            </div>
          )}

          {/* Answer Reveal */}
          {showAnswer && currentChallenge && (
            <div className={`p-6 rounded-lg border ${
              completedLevels[currentLevel]
                ? (isDarkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-50 border-green-200')
                : (isDarkMode ? 'bg-red-900/20 border-red-400' : 'bg-red-50 border-red-200')
            }`}>
              <div className="flex items-start mb-4">
                {completedLevels[currentLevel] ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h4 className={`font-bold text-lg mb-2 ${
                    completedLevels[currentLevel]
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    {completedLevels[currentLevel] ? 'Excellent Detective Work!' : 'Keep Investigating!'}
                  </h4>
                  <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong>Correct Password:</strong> <code className={`px-2 py-1 rounded ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>{currentChallenge.password}</code>
                  </div>
                  {!completedLevels[currentLevel] && (
                    <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Your Answer:</strong> <code className={`px-2 py-1 rounded ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>{userInput}</code>
                    </div>
                  )}
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    <strong>Explanation:</strong> {currentChallenge.explanation}
                  </div>
                </div>
              </div>
            </div>
          )}
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
                  <h3 className="text-2xl font-bold mb-2">HTML Detective Challenge Complete!</h3>
                  <div className="text-lg mb-4">
                    You solved <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{totalLevels}</span> levels
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Success Rate: {totalLevels > 0 ? Math.round((score / totalLevels) * 100) : 0}%
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
                    Review Solutions
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
          <h3 className="text-xl font-bold mb-4">🎓 Web Inspection Skills Reference</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Essential Developer Tools:</h4>
              <div className="space-y-3 text-sm">
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🔍 Elements Inspector</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Right-click → Inspect Element to examine HTML structure
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">📄 View Source</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Ctrl+U (Windows) or Cmd+U (Mac) to see raw HTML
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🎨 Styles Panel</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Check CSS properties that might hide content
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Common Hiding Techniques:</h4>
              <div className="space-y-3 text-sm">
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">💬 HTML Comments</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    &lt;!-- Hidden text here --&gt;
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🏷️ HTML Attributes</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    data-secret="password" or other custom attributes
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🎭 CSS Hiding</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    display: none, visibility: hidden, color: transparent
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Applications */}
        <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">🌍 Real-World Applications</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">🛡️ Security Testing</h4>
              <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Finding exposed API keys</li>
                <li>• Discovering hidden admin panels</li>
                <li>• Locating debug information</li>
                <li>• Identifying development artifacts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">🔧 Web Development</h4>
              <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Debugging CSS layout issues</li>
                <li>• Understanding site structure</li>
                <li>• Learning from other websites</li>
                <li>• Testing responsive design</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">🕵️ Digital Forensics</h4>
              <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Analyzing malicious websites</li>
                <li>• Extracting hidden data</li>
                <li>• Investigating cyber incidents</li>
                <li>• Understanding attack vectors</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Master web inspection fundamentals • Build cybersecurity investigation skills
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

export default HTMLDetectiveChallenge;