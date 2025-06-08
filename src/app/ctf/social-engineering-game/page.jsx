'use client'
import React, { useState, useEffect } from 'react';
import { 
  ShieldExclamationIcon, 
  EyeIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  UserIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
  TrophyIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const SocialEngineeringGame = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedScenarios, setCompletedScenarios] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  // Comprehensive scenario database
  const scenarios = [
    {
      id: 1,
      type: 'phishing',
      difficulty: 'beginner',
      title: 'Suspicious Email Alert',
      scenario: `You receive an email from "security@yourbank.com" stating:

"URGENT: Your account has been compromised! Click the link below within 24 hours to secure your account or it will be permanently closed.

🔒 SECURE MY ACCOUNT NOW: http://bank-security-update.net/login

This is an automated message from YourBank Security Team."

The email has your bank's logo and looks official.`,
      question: 'What should you do?',
      options: [
        'Click the link immediately to secure your account',
        'Check the sender\'s email address and verify with your bank directly',
        'Forward the email to friends to warn them',
        'Reply asking for more information'
      ],
      correctAnswer: 1,
      explanation: 'This is a classic phishing email. Red flags include: urgent language, threatening account closure, suspicious URL (bank-security-update.net instead of your bank\'s real domain), and unsolicited security warnings. Always verify directly with your bank through official channels.',
      redFlags: [
        'Urgent/threatening language',
        'Suspicious URL domain',
        'Unsolicited security warning',
        'Pressure to act quickly'
      ],
      tips: 'Always verify suspicious emails by contacting the organization directly through official channels, not through links in the email.'
    },
    {
      id: 2,
      type: 'phone',
      difficulty: 'beginner',
      title: 'Tech Support Scam Call',
      scenario: `You receive a phone call from someone claiming to be from Microsoft Technical Support:

"Hello, this is David from Microsoft. We've detected malicious activity on your computer. Your Windows license is about to expire and hackers are trying to access your personal files. I need to help you fix this immediately.

Can you please turn on your computer and go to teamviewer.com so I can help you remove the viruses?"

The caller has a foreign accent but claims to be calling from Microsoft headquarters.`,
      question: 'How should you respond?',
      options: [
        'Follow their instructions since they\'re from Microsoft',
        'Ask for their employee ID and call Microsoft back to verify',
        'Hang up immediately - Microsoft doesn\'t make unsolicited calls',
        'Let them help but don\'t give any passwords'
      ],
      correctAnswer: 2,
      explanation: 'Microsoft (and other legitimate tech companies) never make unsolicited calls about computer problems. This is a common tech support scam. Scammers use urgency, fear tactics, and remote access tools to steal money or install malware.',
      redFlags: [
        'Unsolicited call about computer problems',
        'Urgent/fear-based language',
        'Request for remote access',
        'Claims to be from well-known company'
      ],
      tips: 'Legitimate tech companies don\'t make cold calls about computer issues. Always hang up and contact the company directly if you have concerns.'
    },
    {
      id: 3,
      type: 'pretexting',
      difficulty: 'intermediate',
      title: 'HR Impersonation',
      scenario: `You receive a call at work from someone claiming to be from your company's HR department:

"Hi, this is Jennifer from HR. I'm updating our employee records and need to verify some information. Can you confirm your employee ID, date of birth, and the last four digits of your Social Security number?

I know this is unusual, but our system crashed and we're trying to restore everyone's information quickly. Your manager already provided their details this morning."

You don't recognize the voice, but they know you work at the company and mentioned your manager's name.`,
      question: 'What\'s the most appropriate response?',
      options: [
        'Provide the information since they\'re from HR',
        'Ask for their extension and call them back through the company directory',
        'Give them some but not all of the information',
        'Ask them to email you the request instead'
      ],
      correctAnswer: 1,
      explanation: 'This is pretexting - creating a false scenario to gain trust and extract information. Real HR would have access to your information already. Always verify the caller\'s identity through official company channels before sharing any personal data.',
      redFlags: [
        'Unexpected request for personal information',
        'Claims of system problems/urgency',
        'Pressure to provide information quickly',
        'Unable to verify caller\'s identity'
      ],
      tips: 'When someone requests personal information over the phone, always verify their identity by calling them back through official company channels.'
    },
    {
      id: 4,
      type: 'baiting',
      difficulty: 'intermediate',
      title: 'USB Drive Found',
      scenario: `While walking through the company parking lot, you find a USB drive labeled "Q4 Employee Bonuses - CONFIDENTIAL" near the main entrance.

The USB drive looks official and has your company's logo on it. You're curious about the bonus information, especially since your department has been working on a big project.

Your laptop is in your car, and you could easily check what's on the drive.`,
      question: 'What should you do with the USB drive?',
      options: [
        'Plug it into your laptop to see if it contains important company information',
        'Take it to IT security without plugging it in anywhere',
        'Ignore it and leave it where you found it',
        'Ask coworkers if they lost a USB drive'
      ],
      correctAnswer: 1,
      explanation: 'This is a classic "baiting" attack. Attackers deliberately leave infected USB drives where curious people will find them. The drive likely contains malware that would infect your computer. Always report found devices to IT security.',
      redFlags: [
        'Suspicious USB drive found in public area',
        'Enticing label to encourage usage',
        'Unknown origin and contents',
        'Could contain malware'
      ],
      tips: 'Never plug unknown USB drives into your computer. They could contain malware designed to steal data or compromise your system.'
    },
    {
      id: 5,
      type: 'social_media',
      difficulty: 'intermediate',
      title: 'LinkedIn Connection Trap',
      scenario: `You receive a LinkedIn connection request from "Sarah Johnson, Senior Recruiter at TechCorp Industries" with a professional-looking profile photo.

Her message says: "Hi! I came across your profile and am impressed with your background. We have an exciting senior-level position that pays $150,000+ and matches your skills perfectly. 

I'd love to discuss this opportunity. Can you send me your updated resume and current salary information so I can present you to our hiring team immediately? We're looking to fill this position this week."

Her profile shows 500+ connections and previous experience at well-known companies.`,
      question: 'How should you handle this request?',
      options: [
        'Send your resume immediately - this sounds like a great opportunity',
        'Research the company and recruiter before sharing any information',
        'Ask for salary information first before sending your resume',
        'Connect with her and then send your personal information'
      ],
      correctAnswer: 1,
      explanation: 'This could be a fake recruiter profile designed to harvest personal information. Professional recruiters rarely ask for salary information upfront or create artificial urgency. Always research the company and verify the recruiter\'s identity before sharing personal data.',
      redFlags: [
        'Unsolicited job offer with high salary',
        'Requests for personal information upfront',
        'Artificial urgency ("this week")',
        'Difficult to verify recruiter\'s authenticity'
      ],
      tips: 'Research recruiters and companies thoroughly. Legitimate recruiters will provide detailed company information and won\'t pressure you for immediate personal details.'
    },
    {
      id: 6,
      type: 'physical',
      difficulty: 'advanced',
      title: 'Tailgating Security',
      scenario: `You're entering your office building using your key card when you notice someone behind you carrying a large box and wearing a delivery uniform.

The person says: "Oh great timing! I'm delivering these supplies to the IT department on the 3rd floor, but my hands are full. Could you hold the door for me? I have the delivery receipt if you need to see it."

They seem friendly and professional, but you don't recognize them as a regular delivery person for your building.`,
      question: 'What\'s the most secure response?',
      options: [
        'Hold the door - they seem legitimate and are just delivering supplies',
        'Ask them to wait while you call the IT department to confirm the delivery',
        'Let them in but escort them to the IT department personally',
        'Direct them to the main reception desk to check in properly'
      ],
      correctAnswer: 3,
      explanation: 'This is tailgating - following authorized people into secure areas. Even legitimate delivery people should check in at reception and be escorted. Security protocols exist for everyone\'s protection, regardless of how legitimate someone appears.',
      redFlags: [
        'Unfamiliar person requesting building access',
        'Carrying props (box) to appear legitimate',
        'Friendly demeanor to build trust',
        'Bypassing normal security procedures'
      ],
      tips: 'Never let strangers into secure areas, even if they appear legitimate. Direct them to proper check-in procedures to verify their identity and purpose.'
    },
    {
      id: 7,
      type: 'quid_pro_quo',
      difficulty: 'advanced',
      title: 'IT Survey Scam',
      scenario: `You receive a call from someone claiming to conduct an IT security survey for your company:

"Hello, I'm conducting a security audit for your organization. We're testing employee awareness of cybersecurity best practices. 

Can you tell me what antivirus software you use, how often you update your passwords, and what your current password requirements are? This information will help us improve your company's security training.

Oh, and to verify that our security systems are working, could you try logging into this test portal with your regular credentials? The URL is company-security-test.com."

They sound professional and knowledgeable about cybersecurity.`,
      question: 'How should you respond to this request?',
      options: [
        'Participate in the survey to help improve company security',
        'Verify the survey through your IT department first',
        'Provide general information but not specific passwords',
        'Ask for their credentials and company authorization'
      ],
      correctAnswer: 1,
      explanation: 'This is quid pro quo - offering something (security improvement) in exchange for information. Real security audits are coordinated through official channels and never ask for actual credentials or to test login portals with real passwords.',
      redFlags: [
        'Unsolicited security survey',
        'Requests for specific security information',
        'Asking to test credentials on external site',
        'Not coordinated through official channels'
      ],
      tips: 'Legitimate security audits are always coordinated through official company channels. Never provide security information or test credentials for unsolicited requests.'
    },
    {
      id: 8,
      type: 'authority',
      difficulty: 'advanced',
      title: 'Executive Pressure',
      scenario: `You receive an urgent email that appears to be from your company's CEO:

"I need you to process an urgent wire transfer immediately. Due to a confidential acquisition, I need $50,000 transferred to our legal firm's account today.

Account Details:
Bank: International Business Bank
Account: 789456123
Routing: 987654321

This is time-sensitive and confidential. Please complete this transfer within the hour and confirm when done. Do not discuss this with anyone else as it could jeopardize the deal.

Thank you for your discretion and prompt action."

The email address appears to be from the CEO, but something feels off about the tone.`,
      question: 'What should you do?',
      options: [
        'Process the transfer immediately as requested by the CEO',
        'Verify the request by calling the CEO directly before processing',
        'Forward the email to your supervisor for approval',
        'Ask the CEO to come to your office to sign the request in person'
      ],
      correctAnswer: 1,
      explanation: 'This is a Business Email Compromise (BEC) scam using authority and urgency. Criminals often impersonate executives to pressure employees into making unauthorized transactions. Always verify high-value or unusual requests through direct communication.',
      redFlags: [
        'Urgent financial request from executive',
        'Requests for secrecy/confidentiality',
        'Unusual request pattern for the executive',
        'Pressure to act quickly without verification'
      ],
      tips: 'Always verify unusual financial requests, especially urgent ones, by calling the person directly using a known phone number, not replying to the email.'
    },
    {
      id: 9,
      type: 'emergency',
      difficulty: 'expert',
      title: 'Family Emergency Scam',
      scenario: `You receive a frantic phone call at work from someone claiming to be your nephew:

"Aunt/Uncle, it's me, Jake! I'm in trouble and need your help right away. I was in a car accident while visiting friends in another state. I'm okay, but I hit someone and the police arrested me.

My lawyer says I need $5,000 for bail money right away or I'll have to stay in jail over the weekend. My parents don't know, and I'm too embarrassed to tell them. Can you wire the money to my lawyer's office?

Please don't call my parents - I want to handle this myself. The lawyer's name is Mr. Peterson and his office number is 555-0123. I'm using the jail phone so I can't talk long."

The voice sounds similar to your nephew, but you're not completely sure.`,
      question: 'What\'s your best course of action?',
      options: [
        'Wire the money immediately to help your nephew',
        'Ask detailed personal questions only your nephew would know',
        'Hang up and call your nephew\'s parents or his regular phone number',
        'Ask to speak with the lawyer first to verify the situation'
      ],
      correctAnswer: 2,
      explanation: 'This is the "grandparent scam" or family emergency scam. Criminals research social media to gather family information and create believable emergencies. Always verify by calling the family member directly or through other family members before sending money.',
      redFlags: [
        'Unexpected family emergency call',
        'Request for immediate money transfer',
        'Requests not to contact other family members',
        'Use of generic terms like "aunt/uncle"'
      ],
      tips: 'Family emergency scams prey on emotions. Always verify by calling the family member directly or through other relatives before taking any action or sending money.'
    },
    {
      id: 10,
      type: 'advanced_phishing',
      difficulty: 'expert',
      title: 'Sophisticated Spear Phishing',
      scenario: `You receive an email that appears to be from your company's project management system:

"From: ProjectManager@yourcompany.com
Subject: Urgent: Q4 Project Review - Action Required

Hi [Your Name],

Your Q4 project submission for the Henderson client is incomplete. Our system shows missing compliance documents that must be submitted before the 5 PM deadline today.

Your project status: PENDING REVIEW
Missing items: Compliance Certificate #HC-2024-789

Please log in to complete your submission:
👉 Complete Project Submission

Note: This is an automated reminder. The Henderson project deadline cannot be extended due to regulatory requirements.

Best regards,
Project Management System
YourCompany Inc."

The email mentions a real client and uses your company's actual project management system name.`,
      question: 'How should you handle this email?',
      options: [
        'Click the link to complete the submission before the deadline',
        'Log into the project system separately to check your actual status',
        'Forward the email to your project manager for clarification',
        'Reply to the email asking for more details about the missing documents'
      ],
      correctAnswer: 1,
      explanation: 'This is spear phishing - a targeted attack using specific company and project information. The attackers researched your company to make the email appear legitimate. Always access systems through your normal login methods, not through email links.',
      redFlags: [
        'Urgent deadline with consequences',
        'Link to login rather than direct system access',
        'Uses specific company/client information to appear legitimate',
        'Creates artificial urgency'
      ],
      tips: 'Spear phishing uses research about your organization to appear legitimate. Always access company systems directly through your normal methods, not through email links.'
    }
  ];

  // Timer for timed challenges
  useEffect(() => {
    if (timeLeft > 0 && gameStarted && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameStarted, showResult]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(45); // 45 seconds per question
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === scenarios[currentScenario].correctAnswer;
    
    setShowResult(true);
    setTimeLeft(null);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setCompletedScenarios([...completedScenarios, {
      id: scenarios[currentScenario].id,
      correct: isCorrect,
      selectedAnswer,
      timeSpent: 45 - (timeLeft || 0)
    }]);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
      setTimeLeft(45);
    } else {
      setGameComplete(true);
    }
  };

  const restartGame = () => {
    setCurrentScenario(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    setScore(0);
    setCompletedScenarios([]);
    setGameComplete(false);
    setGameStarted(false);
    setTimeLeft(null);
  };

  const getScenarioIcon = (type) => {
    switch (type) {
      case 'phishing': return <EnvelopeIcon className="w-6 h-6" />;
      case 'phone': return <PhoneIcon className="w-6 h-6" />;
      case 'pretexting': return <UserIcon className="w-6 h-6" />;
      case 'baiting': return <ExclamationTriangleIcon className="w-6 h-6" />;
      case 'social_media': return <UserIcon className="w-6 h-6" />;
      case 'physical': return <ShieldExclamationIcon className="w-6 h-6" />;
      case 'quid_pro_quo': return <ExclamationTriangleIcon className="w-6 h-6" />;
      case 'authority': return <UserIcon className="w-6 h-6" />;
      case 'emergency': return <PhoneIcon className="w-6 h-6" />;
      case 'advanced_phishing': return <EnvelopeIcon className="w-6 h-6" />;
      default: return <EyeIcon className="w-6 h-6" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return isDarkMode ? 'text-green-400 bg-green-900 border-green-600' : 'text-green-700 bg-green-100 border-green-300';
      case 'intermediate': return isDarkMode ? 'text-yellow-400 bg-yellow-900 border-yellow-600' : 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'advanced': return isDarkMode ? 'text-orange-400 bg-orange-900 border-orange-600' : 'text-orange-700 bg-orange-100 border-orange-300';
      case 'expert': return isDarkMode ? 'text-red-400 bg-red-900 border-red-600' : 'text-red-700 bg-red-100 border-red-300';
      default: return isDarkMode ? 'text-gray-400 bg-gray-800 border-gray-600' : 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const currentScenarioData = scenarios[currentScenario];

  // Game Complete Screen
  if (gameComplete) {
    const accuracy = Math.round((score / scenarios.length) * 100);
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className={`text-center p-8 rounded-lg border shadow-xl ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <TrophyIcon className="w-24 h-24 mx-auto mb-6 text-yellow-500" />
            <h1 className="text-4xl font-bold mb-4">Game Complete!</h1>
            <div className="text-6xl font-bold mb-6 text-blue-600">{accuracy}%</div>
            <p className="text-xl mb-8">
              You correctly identified <span className="font-bold text-green-600">{score}</span> out of <span className="font-bold">{scenarios.length}</span> social engineering attempts
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm">Correct Answers</div>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-2xl font-bold text-green-600">
                  {completedScenarios.filter(s => s.correct).length}
                </div>
                <div className="text-sm">Threats Identified</div>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(completedScenarios.reduce((avg, s) => avg + s.timeSpent, 0) / completedScenarios.length)}s
                </div>
                <div className="text-sm">Avg. Response Time</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={restartGame}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mr-4"
              >
                Play Again
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`px-6 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Start Screen
  if (!gameStarted) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <ShieldExclamationIcon className="w-12 h-12 mr-4 text-red-500" />
              <h1 className="text-5xl font-bold">Social Engineering Awareness Game</h1>
            </div>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Test your ability to recognize and defend against social engineering attacks
            </p>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`mt-4 px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          <div className={`p-8 rounded-lg border shadow-xl mb-8 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className="text-2xl font-bold mb-6">How to Play</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">🎯 Your Mission</h3>
                <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• Analyze 10 realistic social engineering scenarios</li>
                  <li>• Identify the best response to each threat</li>
                  <li>• Learn to recognize red flags and warning signs</li>
                  <li>• Develop skills to protect yourself and others</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">⚡ Game Rules</h3>
                <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• 45 seconds per scenario</li>
                  <li>• Choose the most secure response</li>
                  <li>• Learn from detailed explanations</li>
                  <li>• Track your security awareness score</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg border mb-8 ${
            isDarkMode ? 'bg-yellow-900/20 border-yellow-600' : 'bg-yellow-50 border-yellow-300'
          }`}>
            <div className="flex items-start">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Important Reminder</h3>
                <p className={`text-sm ${isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
                  Social engineering attacks target human psychology, not just technology. The scenarios in this game are based on real-world attacks. Stay vigilant and always verify suspicious requests through official channels.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startGame}
              className="px-12 py-6 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🚨 Start Security Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Header with Progress */}
        <div className={`mb-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              {getScenarioIcon(currentScenarioData.type)}
              <div className="ml-3">
                <h2 className="text-xl font-bold">Scenario {currentScenario + 1} of {scenarios.length}</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(currentScenarioData.difficulty)}`}>
                  {currentScenarioData.difficulty.charAt(0).toUpperCase() + currentScenarioData.difficulty.slice(1)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-lg font-semibold">
                <ClockIcon className="w-5 h-5 mr-2" />
                {timeLeft !== null ? `${timeLeft}s` : '--'}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Score: {score}/{scenarios.length}
              </div>
            </div>
          </div>
          
          <div className={`w-full bg-gray-200 rounded-full h-3 ${isDarkMode ? 'bg-gray-700' : ''}`}>
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Scenario Card */}
        <div className={`mb-8 p-8 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">{currentScenarioData.title}</h3>
            <div className={`p-6 rounded-lg border-l-4 border-red-500 ${
              isDarkMode ? 'bg-red-900/20' : 'bg-red-50'
            }`}>
              <div className="whitespace-pre-line text-base leading-relaxed">
                {currentScenarioData.scenario}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">{currentScenarioData.question}</h4>
            <div className="space-y-3">
              {currentScenarioData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                    selectedAnswer === index
                      ? (isDarkMode ? 'border-blue-500 bg-blue-900/30' : 'border-blue-500 bg-blue-50')
                      : (isDarkMode ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50')
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start">
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 text-sm font-bold ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : (isDarkMode ? 'border-gray-500 text-gray-400' : 'border-gray-400 text-gray-600')
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {!showResult ? (
              <button
                onClick={submitAnswer}
                disabled={selectedAnswer === null || timeLeft === 0}
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                  selectedAnswer !== null && timeLeft > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                    : (isDarkMode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={nextScenario}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-lg"
              >
                {currentScenario < scenarios.length - 1 ? (
                  <>
                    Next Scenario
                    <ArrowRightIcon className="w-4 h-4 inline ml-2" />
                  </>
                ) : (
                  <>
                    View Results
                    <TrophyIcon className="w-4 h-4 inline ml-2" />
                  </>
                )}
              </button>
            )}
            
            {showResult && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className={`px-6 py-3 rounded-lg border font-medium transition-colors ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <LightBulbIcon className="w-4 h-4 inline mr-2" />
                {showExplanation ? 'Hide Details' : 'Show Analysis'}
              </button>
            )}
          </div>

          {/* Time's Up Message */}
          {timeLeft === 0 && !showResult && (
            <div className={`p-4 rounded-lg border-l-4 border-red-500 mb-6 ${
              isDarkMode ? 'bg-red-900/20' : 'bg-red-50'
            }`}>
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 text-red-500 mr-2" />
                <span className="font-medium text-red-700 dark:text-red-300">Time's up! Submit your answer or move to the next scenario.</span>
              </div>
            </div>
          )}

          {/* Answer Result */}
          {showResult && (
            <div className={`p-6 rounded-lg border ${
              selectedAnswer === currentScenarioData.correctAnswer
                ? (isDarkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-50 border-green-200')
                : (isDarkMode ? 'bg-red-900/20 border-red-400' : 'bg-red-50 border-red-200')
            }`}>
              <div className="flex items-start mb-4">
                {selectedAnswer === currentScenarioData.correctAnswer ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h4 className={`font-bold text-lg mb-2 ${
                    selectedAnswer === currentScenarioData.correctAnswer
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    {selectedAnswer === currentScenarioData.correctAnswer ? '🛡️ Threat Neutralized!' : '⚠️ Security Breach!'}
                  </h4>
                  <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong>Correct Response:</strong> {currentScenarioData.options[currentScenarioData.correctAnswer]}
                  </div>
                  {selectedAnswer !== currentScenarioData.correctAnswer && (
                    <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Your Response:</strong> {currentScenarioData.options[selectedAnswer]}
                    </div>
                  )}
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    <strong>Analysis:</strong> {currentScenarioData.explanation}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Analysis */}
          {showResult && showExplanation && (
            <div className={`mt-6 p-6 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
            }`}>
              <h4 className="font-bold text-lg mb-4">🔍 Security Analysis</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-3 text-red-600 dark:text-red-400">🚩 Red Flags Identified:</h5>
                  <ul className="space-y-2">
                    {currentScenarioData.redFlags.map((flag, index) => (
                      <li key={index} className={`flex items-start text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">💡 Security Best Practice:</h5>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {currentScenarioData.tips}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Summary */}
        {completedScenarios.length > 0 && (
          <div className={`p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className="text-lg font-bold mb-4">Your Security Awareness Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`text-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm">Threats Identified</div>
              </div>
              <div className={`text-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-green-600">
                  {completedScenarios.filter(s => s.correct).length}
                </div>
                <div className="text-sm">Correct Responses</div>
              </div>
              <div className={`text-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round((score / (currentScenario + (showResult ? 1 : 0))) * 100) || 0}%
                </div>
                <div className="text-sm">Accuracy Rate</div>
              </div>
              <div className={`text-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-purple-600">
                  {completedScenarios.length > 0 ? Math.round(completedScenarios.reduce((avg, s) => avg + s.timeSpent, 0) / completedScenarios.length) : 0}s
                </div>
                <div className="text-sm">Avg Response Time</div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Footer */}
        <div className={`mt-8 p-6 rounded-lg border ${
          isDarkMode ? 'bg-blue-900/20 border-blue-600' : 'bg-blue-50 border-blue-300'
        }`}>
          <div className="flex items-start">
            <ShieldExclamationIcon className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Remember: Trust but Verify</h3>
              <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Social engineering attacks exploit human psychology and trust. Always verify unusual requests through official channels, 
                be skeptical of urgent demands, and never hesitate to ask for help when something seems suspicious.
              </p>
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-lg border transition-colors mr-4 ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            onClick={restartGame}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            🔄 Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialEngineeringGame;