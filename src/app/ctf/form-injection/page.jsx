'use client'
import React, { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  LightBulbIcon, 
  ShieldExclamationIcon,
  CodeBracketIcon,
  CpuChipIcon,
  TrophyIcon,
  ArrowRightIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const FormInjectionChallenge = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [formData, setFormData] = useState({});
  const [showHiddenFields, setShowHiddenFields] = useState(false);
  const [showSourceCode, setShowSourceCode] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [score, setScore] = useState(0);

  // Challenge levels with increasing complexity
  const challenges = [
    {
      id: 1,
      title: "Hidden Price Discovery",
      difficulty: "Beginner",
      description: "Find and modify the hidden price field to get a discount on this product.",
      scenario: "You're purchasing a premium software license that costs $99.99. Can you find a way to pay less?",
      hiddenFields: [
        { name: "price", value: "99.99", type: "hidden" },
        { name: "product_id", value: "SOFT-001", type: "hidden" }
      ],
      visibleFields: [
        { name: "customer_name", label: "Customer Name", type: "text", required: true },
        { name: "email", label: "Email Address", type: "email", required: true }
      ],
      winCondition: (data) => parseFloat(data.price) < 99.99,
      hint: "Use browser developer tools to inspect the form and look for hidden input fields.",
      explanation: "Hidden form fields can be modified by users, so never trust client-side data for pricing or security decisions.",
      learningPoints: [
        "Hidden fields are visible in HTML source code",
        "Client-side data can always be manipulated",
        "Server-side validation is essential for security"
      ]
    },
    {
      id: 2,
      title: "Admin Access Bypass",
      difficulty: "Beginner",
      description: "Modify the hidden user role field to gain administrator access.",
      scenario: "You have a regular user account, but there's a hidden field that controls your access level.",
      hiddenFields: [
        { name: "user_role", value: "user", type: "hidden" },
        { name: "user_id", value: "12345", type: "hidden" },
        { name: "session_token", value: "abc123xyz", type: "hidden" }
      ],
      visibleFields: [
        { name: "username", label: "Username", type: "text", required: true },
        { name: "current_password", label: "Current Password", type: "password", required: true }
      ],
      winCondition: (data) => data.user_role === "admin" || data.user_role === "administrator",
      hint: "Look for a field that might control user permissions or access levels.",
      explanation: "Applications should never rely on client-side fields to determine user privileges. Always verify permissions server-side.",
      learningPoints: [
        "User roles should be determined server-side",
        "Client-side access controls are ineffective",
        "Authentication and authorization must be verified on each request"
      ]
    },
    {
      id: 3,
      title: "Quantity Manipulation",
      difficulty: "Intermediate",
      description: "Find the hidden quantity controls and order more items than the visible limit allows.",
      scenario: "This store limits customers to 3 items per order, but can you bypass this restriction?",
      hiddenFields: [
        { name: "max_quantity", value: "3", type: "hidden" },
        { name: "item_price", value: "29.99", type: "hidden" },
        { name: "discount_code", value: "", type: "hidden" },
        { name: "inventory_check", value: "enabled", type: "hidden" }
      ],
      visibleFields: [
        { name: "item_name", label: "Item", type: "text", value: "Premium Widget", readonly: true },
        { name: "quantity", label: "Quantity (Max 3)", type: "number", min: "1", max: "3", required: true }
      ],
      winCondition: (data) => parseInt(data.quantity) > 3 || data.inventory_check === "disabled",
      hint: "There might be hidden fields that control quantity limits or inventory checking.",
      explanation: "Business logic enforcement should happen server-side. Client-side restrictions can be easily bypassed.",
      learningPoints: [
        "Business rules must be enforced server-side",
        "Client-side validation is only for user experience",
        "Inventory and quantity limits need backend verification"
      ]
    },
    {
      id: 4,
      title: "Payment Method Override",
      difficulty: "Intermediate",
      description: "Discover hidden payment processing fields and change the payment method.",
      scenario: "The visible form only shows credit card payment, but other payment methods might be available.",
      hiddenFields: [
        { name: "payment_method", value: "credit_card", type: "hidden" },
        { name: "processing_fee", value: "2.99", type: "hidden" },
        { name: "merchant_id", value: "MERCH-789", type: "hidden" },
        { name: "bypass_verification", value: "false", type: "hidden" }
      ],
      visibleFields: [
        { name: "card_number", label: "Credit Card Number", type: "text", required: true },
        { name: "cvv", label: "CVV", type: "text", required: true },
        { name: "total_amount", label: "Total Amount", type: "text", value: "$52.99", readonly: true }
      ],
      winCondition: (data) => data.payment_method !== "credit_card" || data.bypass_verification === "true",
      hint: "Look for fields related to payment processing or verification that might be hidden from view.",
      explanation: "Payment processing logic should never rely on client-side field values. All payment verification must be server-side.",
      learningPoints: [
        "Payment processing must be completely server-controlled",
        "Never trust client-side payment method selections",
        "Financial transactions require end-to-end server validation"
      ]
    },
    {
      id: 5,
      title: "Multi-Layer Form Injection",
      difficulty: "Advanced",
      description: "This complex form has multiple hidden security mechanisms. Find and manipulate them all.",
      scenario: "A sophisticated e-commerce form with multiple layers of client-side security controls.",
      hiddenFields: [
        { name: "security_token", value: "SEC-TOKEN-ABC123", type: "hidden" },
        { name: "admin_override", value: "false", type: "hidden" },
        { name: "price_verification", value: "enabled", type: "hidden" },
        { name: "user_tier", value: "basic", type: "hidden" },
        { name: "discount_eligible", value: "false", type: "hidden" },
        { name: "fraud_check", value: "enabled", type: "hidden" }
      ],
      visibleFields: [
        { name: "product_selection", label: "Product", type: "select", options: ["Basic Plan - $19.99", "Pro Plan - $49.99"] },
        { name: "billing_cycle", label: "Billing", type: "select", options: ["Monthly", "Annual"] },
        { name: "customer_email", label: "Email", type: "email", required: true }
      ],
      winCondition: (data) => {
        return (data.admin_override === "true" || 
                data.price_verification === "disabled" || 
                data.user_tier === "premium" || 
                data.discount_eligible === "true" ||
                data.fraud_check === "disabled");
      },
      hint: "This form has multiple security mechanisms. Try to disable verification systems or enable privileges.",
      explanation: "Complex forms often have multiple client-side controls that can all be manipulated. Every security decision must be validated server-side.",
      learningPoints: [
        "Complex client-side logic creates more attack surfaces",
        "Multiple hidden fields multiply security risks",
        "Server-side validation must check all critical parameters",
        "Client-side security controls provide no real protection"
      ]
    }
  ];

  // Helper function to provide specific goal hints
  const getGoalHint = (level) => {
    switch (level) {
      case 1: return "💰 Change the 'price' field from 99.99 to any lower value (like 9.99 or 1.00)";
      case 2: return "🔑 Change the 'user_role' field from 'user' to 'admin' or 'administrator'";
      case 3: return "📦 Change the 'quantity' field to more than 3, or set 'inventory_check' to 'disabled'";
      case 4: return "💳 Change 'payment_method' to something other than 'credit_card', or set 'bypass_verification' to 'true'";
      case 5: return "🎯 Change any security field: set 'admin_override' to 'true', 'user_tier' to 'premium', or disable any verification";
      default: return "Modify the hidden fields to bypass the security controls!";
    }
  };

  const currentChallenge = challenges[currentLevel - 1];

  // Initialize form data when challenge changes
  useEffect(() => {
    if (currentChallenge) {
      const initialData = {};
      
      // Add visible fields with proper default values
      currentChallenge.visibleFields.forEach(field => {
        if (field.type === 'select' && field.options && field.options.length > 0) {
          initialData[field.name] = field.value || field.options[0];
        } else {
          initialData[field.name] = field.value || '';
        }
      });
      
      // Add hidden fields
      currentChallenge.hiddenFields.forEach(field => {
        initialData[field.name] = field.value;
      });
      
      console.log('Initializing form data:', initialData); // Debug log
      setFormData(initialData);
      setSubmissionResult(null);
      setAttempts(0);
    }
  }, [currentLevel]);

  const handleInputChange = (fieldName, value) => {
    console.log(`Updating ${fieldName} to:`, value); // Debug log
    setFormData(prev => {
      const newData = {
        ...prev,
        [fieldName]: value
      };
      console.log('New form data:', newData); // Debug log
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempts(prev => prev + 1);
    
    console.log('Submitting form with data:', formData); // Debug log
    console.log('Testing win condition for level:', currentLevel); // Debug log
    
    const isSuccess = currentChallenge.winCondition(formData);
    console.log('Win condition result:', isSuccess); // Debug log
    
    if (isSuccess) {
      setSubmissionResult('success');
      if (!completedLevels.includes(currentLevel)) {
        setCompletedLevels(prev => [...prev, currentLevel]);
        setScore(prev => prev + (6 - currentLevel) * 20); // Higher points for harder levels
      }
    } else {
      setSubmissionResult('failure');
    }
  };

  const nextLevel = () => {
    if (currentLevel < challenges.length) {
      setCurrentLevel(prev => prev + 1);
      setShowHints(false);
      setShowHiddenFields(false);
      setShowSourceCode(false);
    }
  };

  const resetChallenge = () => {
    setCurrentLevel(1);
    setCompletedLevels([]);
    setScore(0);
    setShowHints(false);
    setShowHiddenFields(false);
    setShowSourceCode(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return isDarkMode ? 'text-green-400 bg-green-900' : 'text-green-600 bg-green-100';
      case 'intermediate': return isDarkMode ? 'text-yellow-400 bg-yellow-900' : 'text-yellow-600 bg-yellow-100';
      case 'advanced': return isDarkMode ? 'text-red-400 bg-red-900' : 'text-red-600 bg-red-100';
      default: return isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-gray-100';
    }
  };

  const generateFormHTML = () => {
    let html = '<form id="challenge-form" method="POST" action="/submit">\n';
    
    // Visible fields
    currentChallenge.visibleFields.forEach(field => {
      if (field.type === 'select') {
        html += `  <label for="${field.name}">${field.label}:</label>\n`;
        html += `  <select name="${field.name}" id="${field.name}"${field.required ? ' required' : ''}>\n`;
        field.options.forEach(option => {
          html += `    <option value="${option}">${option}</option>\n`;
        });
        html += `  </select>\n\n`;
      } else {
        html += `  <label for="${field.name}">${field.label}:</label>\n`;
        html += `  <input type="${field.type}" name="${field.name}" id="${field.name}"`;
        if (field.value) html += ` value="${field.value}"`;
        if (field.required) html += ' required';
        if (field.readonly) html += ' readonly';
        if (field.min) html += ` min="${field.min}"`;
        if (field.max) html += ` max="${field.max}"`;
        html += ' />\n\n';
      }
    });
    
    // Hidden fields
    html += '  <!-- Hidden Fields -->\n';
    currentChallenge.hiddenFields.forEach(field => {
      html += `  <input type="hidden" name="${field.name}" value="${field.value}" />\n`;
    });
    
    html += '\n  <button type="submit">Submit Order</button>\n';
    html += '</form>';
    
    return html;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ShieldExclamationIcon className="w-8 h-8 mr-3 text-orange-500" />
            <h1 className="text-4xl font-bold">Form Field Injection Challenge</h1>
          </div>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover how hidden form fields can be manipulated to change application behavior. 
            Learn about client-side security weaknesses through hands-on practice.
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

        {/* How the Challenge Works */}
        <div className={`mb-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-blue-900/20 border-blue-400' : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">🎮 How This Challenge Works</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Step-by-Step Process:</h4>
              <ol className={`text-sm space-y-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                <li>1. 📝 Fill out the visible form fields (name, email, etc.)</li>
                <li>2. 🔍 Click "Reveal Hidden Fields" to see what's hidden</li>
                <li>3. ✏️ Edit the hidden field values to meet the challenge goal</li>
                <li>4. 🚀 Submit the form to see if you succeeded</li>
                <li>5. 🎉 Learn from the explanation and move to the next level</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Learning Objectives:</h4>
              <ul className={`text-sm space-y-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                <li>• Understand that hidden form fields can be modified</li>
                <li>• Learn why client-side security controls are ineffective</li>
                <li>• Practice using browser developer tools</li>
                <li>• Recognize real-world security vulnerabilities</li>
                <li>• Appreciate the importance of server-side validation</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`mb-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">Level {currentLevel} of {challenges.length}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentChallenge.difficulty)}`}>
                {currentChallenge.difficulty}
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">Score: {score}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Completed: {completedLevels.length}/{challenges.length}
              </div>
            </div>
          </div>
          
          <div className={`w-full bg-gray-200 rounded-full h-3 ${isDarkMode ? 'bg-gray-700' : ''}`}>
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentLevel / challenges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Challenge Description */}
          <div className={`p-6 rounded-lg border shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className="text-xl font-bold mb-4">{currentChallenge.title}</h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {currentChallenge.description}
            </p>
            
            <div className={`p-4 rounded-lg border-l-4 border-blue-500 mb-6 ${
              isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <h4 className="font-semibold mb-2">Scenario:</h4>
              <p className={isDarkMode ? 'text-blue-200' : 'text-blue-800'}>
                {currentChallenge.scenario}
              </p>
            </div>

            {/* Hint Section */}
            <div className="mb-6">
              <button
                onClick={() => setShowHints(!showHints)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <LightBulbIcon className="w-4 h-4 mr-2" />
                {showHints ? 'Hide Hint' : 'Show Hint'}
              </button>
              
              {showHints && (
                <div className={`mt-4 p-4 rounded-lg border-l-4 border-yellow-500 ${
                  isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
                }`}>
                  <p className={isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}>
                    💡 {currentChallenge.hint}
                  </p>
                </div>
              )}
            </div>

            {/* Developer Tools Section */}
            <div className="space-y-3">
              <button
                onClick={() => setShowHiddenFields(!showHiddenFields)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  showHiddenFields 
                    ? 'bg-orange-600 text-white' 
                    : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                }`}
              >
                {showHiddenFields ? <EyeSlashIcon className="w-4 h-4 mr-2" /> : <EyeIcon className="w-4 h-4 mr-2" />}
                {showHiddenFields ? 'Hide' : 'Reveal'} Hidden Fields
              </button>
              
              <button
                onClick={() => setShowSourceCode(!showSourceCode)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  showSourceCode 
                    ? 'bg-blue-600 text-white' 
                    : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                }`}
              >
                <CodeBracketIcon className="w-4 h-4 mr-2" />
                {showSourceCode ? 'Hide' : 'View'} HTML Source
              </button>
            </div>
          </div>

          {/* Interactive Form */}
          <div className={`p-6 rounded-lg border shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className="text-xl font-bold mb-4">Target Form</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Debug Info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  <strong>Debug - Current Form Data:</strong>
                  <pre>{JSON.stringify(formData, null, 2)}</pre>
                </div>
              )}
              
              {/* Visible Fields */}
              {currentChallenge.visibleFields.map((field, index) => (
                <div key={`visible-${field.name}-${index}`}>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {field.label}:
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      {field.options && field.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required={field.required}
                      readOnly={field.readonly}
                      min={field.min}
                      max={field.max}
                      placeholder={field.label}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors ${
                        field.readonly
                          ? (isDarkMode ? 'bg-gray-600 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-500')
                          : (isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900')
                      } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                  )}
                </div>
              ))}

              {/* Hidden Fields (when revealed) */}
              {showHiddenFields && (
                <div className={`p-4 rounded-lg border-2 border-dashed border-orange-500 ${
                  isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
                }`}>
                  <h4 className="font-bold mb-3 text-orange-600">🔍 Hidden Fields (Edit These!):</h4>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-orange-200' : 'text-orange-700'}`}>
                    💡 In real web forms, you'd edit these using browser developer tools. Here you can edit them directly to simulate the attack!
                  </p>
                  {currentChallenge.hiddenFields.map((field, index) => (
                    <div key={`hidden-${field.name}-${index}`} className="mb-3">
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>
                        {field.name}: 
                        <span className="text-xs ml-2 opacity-75">(originally: {field.value})</span>
                      </label>
                      <input
                        type="text"
                        value={formData[field.name] || field.value}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={`Original: ${field.value}`}
                        className={`w-full px-3 py-2 rounded-lg border-2 border-orange-400 transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-700 text-white placeholder-gray-400' 
                            : 'bg-white text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      />
                    </div>
                  ))}
                  <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h5 className="font-semibold mb-2">🎯 Challenge Goal:</h5>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {getGoalHint(currentLevel)}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors shadow-lg"
              >
                Submit Form
              </button>
            </form>

            {/* Submission Result */}
            {submissionResult && (
              <div className={`mt-6 p-4 rounded-lg border ${
                submissionResult === 'success'
                  ? (isDarkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-50 border-green-200')
                  : (isDarkMode ? 'bg-red-900/20 border-red-400' : 'bg-red-50 border-red-200')
              }`}>
                <div className="flex items-start">
                  {submissionResult === 'success' ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircleIcon className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg mb-2 ${
                      submissionResult === 'success'
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {submissionResult === 'success' ? '🎉 Challenge Completed!' : '❌ Challenge Failed'}
                    </h4>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {submissionResult === 'success' 
                        ? `Excellent! You successfully manipulated the hidden form fields. Attempts: ${attempts}`
                        : `The form submission didn't meet the win condition. Try modifying the hidden fields. Attempts: ${attempts}`
                      }
                    </p>
                    {submissionResult === 'success' && currentLevel < challenges.length && (
                      <button
                        onClick={nextLevel}
                        className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Next Level <ArrowRightIcon className="w-4 h-4 inline ml-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* HTML Source Code View */}
        {showSourceCode && (
          <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className="text-xl font-bold mb-4">📄 HTML Source Code</h3>
            <pre className={`p-4 rounded-lg overflow-x-auto text-sm ${
              isDarkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-300'
            }`}>
              <code>{generateFormHTML()}</code>
            </pre>
          </div>
        )}

        {/* Learning Section */}
        {submissionResult === 'success' && (
          <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className="text-xl font-bold mb-4">🎓 What You Learned</h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {currentChallenge.explanation}
            </p>
            <h4 className="font-semibold mb-2">Key Learning Points:</h4>
            <ul className="space-y-2">
              {currentChallenge.learningPoints.map((point, index) => (
                <li key={index} className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Progress Summary */}
        <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">📊 Challenge Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {challenges.map((challenge, index) => (
              <div key={challenge.id} className={`text-center p-3 rounded-lg border ${
                completedLevels.includes(challenge.id)
                  ? (isDarkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-50 border-green-200')
                  : challenge.id === currentLevel
                    ? (isDarkMode ? 'bg-orange-900/20 border-orange-400' : 'bg-orange-50 border-orange-200')
                    : (isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200')
              }`}>
                <div className="text-lg font-bold">#{challenge.id}</div>
                <div className="text-xs">{challenge.difficulty}</div>
                {completedLevels.includes(challenge.id) && (
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto mt-1" />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={resetChallenge}
              className={`px-6 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              🔄 Restart All Challenges
            </button>
          </div>
        </div>

        {/* Security Best Practices */}
        <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">🛡️ Security Best Practices</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-red-600 dark:text-red-400">❌ What NOT to Do</h4>
              <ul className="space-y-2 text-sm">
                <li className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Never trust hidden form fields for security decisions
                </li>
                <li className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Don't rely on client-side validation for business logic
                </li>
                <li className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Avoid putting sensitive data in hidden fields
                </li>
                <li className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Don't use hidden fields for user roles or permissions
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">✅ Best Practices</h4>
              <ul className="space-y-2 text-sm">
                <li className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Always validate all input on the server side
                </li>
                <li className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Use server-side sessions for user authentication
                </li>
                <li className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Implement proper authorization checks
                </li>
                <li className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Use CSRF tokens for form protection
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">🌍 Real-World Impact</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className="font-semibold mb-2 text-orange-600">E-commerce Fraud</h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Attackers modify pricing fields to purchase expensive items for pennies, 
                causing significant financial losses to businesses.
              </p>
            </div>
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className="font-semibold mb-2 text-red-600">Privilege Escalation</h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Users gain unauthorized admin access by modifying hidden role fields, 
                potentially accessing sensitive data or system controls.
              </p>
            </div>
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <h4 className="font-semibold mb-2 text-blue-600">Data Manipulation</h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Business logic bypass allows users to exceed limits, access restricted 
                features, or manipulate critical application workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Tools Tutorial */}
        <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">🔧 How to Use Developer Tools</h3>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
              isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <h4 className="font-semibold mb-2">Step 1: Open Developer Tools</h4>
              <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                Right-click on the form and select "Inspect Element" or press F12 (Chrome/Firefox), 
                Cmd+Option+I (Mac), or Ctrl+Shift+I (Windows/Linux).
              </p>
            </div>
            <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
              isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
            }`}>
              <h4 className="font-semibold mb-2">Step 2: Find Hidden Fields</h4>
              <p className={`text-sm ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                Look for &lt;input type="hidden"&gt; elements in the HTML. These contain 
                the hidden fields that control application behavior.
              </p>
            </div>
            <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${
              isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
            }`}>
              <h4 className="font-semibold mb-2">Step 3: Modify Values</h4>
              <p className={`text-sm ${isDarkMode ? 'text-orange-200' : 'text-orange-800'}`}>
                Double-click on the value attribute of hidden fields to edit them. 
                Try changing prices, user roles, or other sensitive parameters.
              </p>
            </div>
            <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
              isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'
            }`}>
              <h4 className="font-semibold mb-2">Step 4: Submit and Observe</h4>
              <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                Submit the form with your modified values and observe how the application 
                responds. This demonstrates why server-side validation is crucial.
              </p>
            </div>
          </div>
        </div>

        {/* Completion Certificate */}
        {completedLevels.length === challenges.length && (
          <div className={`mt-8 p-8 rounded-lg border-2 border-dashed border-gold-500 text-center ${
            isDarkMode ? 'bg-yellow-900/20 border-yellow-400' : 'bg-yellow-50 border-yellow-400'
          }`}>
            <TrophyIcon className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
              🎉 Congratulations! Challenge Master!
            </h3>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
              You've successfully completed all form injection challenges!
            </p>
            <div className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
              <p>Final Score: <span className="font-bold">{score} points</span></p>
              <p>You now understand the importance of server-side validation and secure form handling!</p>
            </div>
            <button
              onClick={resetChallenge}
              className="mt-4 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
            >
              🔄 Start Over for Practice
            </button>
          </div>
        )}

        {/* Additional Resources */}
        <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">📚 Learn More</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Recommended Reading</h4>
              <ul className="space-y-2 text-sm">
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  • OWASP Top 10 - Input Validation Failures
                </li>
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  • Web Application Security Testing Guide
                </li>
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  • Secure Coding Practices for Web Applications
                </li>
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  • Client-Side vs Server-Side Validation
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Related Challenges</h4>
              <ul className="space-y-2 text-sm">
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  • HTML Detective Challenge
                </li>
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  • Cookie Monster Challenge
                </li>
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  • URL Parameter Manipulation Lab
                </li>
                <li className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  • Inspect Element Treasure Hunt
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Form Field Injection Challenge • Learn ethical hacking through hands-on practice
          </p>
          <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Remember: Always practice ethical hacking in controlled environments and with proper authorization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormInjectionChallenge;