'use client';
import { useState, useEffect } from 'react';
import { getRandomChallenges, getBalancedChallenges, getChallengesByCategory, getChallengeStats } from '@/data/phishingChallenges';

const PhishingDetectionLab = () => {
  const [challenges, setChallenges] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showRedFlags, setShowRedFlags] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [challengeMode, setChallengeMode] = useState('mixed');

  // Initialize challenges on component mount
  useEffect(() => {
    startNewChallenge('mixed');
  }, []);

  const startNewChallenge = (mode = 'mixed') => {
    let newChallenges;
    
    switch (mode) {
      case 'easy':
      case 'medium':
      case 'hard':
        newChallenges = getRandomChallenges(mode);
        break;
      case 'balanced':
        newChallenges = getBalancedChallenges();
        break;
      case 'financial':
      case 'technology':
      case 'ecommerce':
      case 'workplace':
      case 'government':
      case 'healthcare':
      case 'education':
        newChallenges = getChallengesByCategory(mode);
        break;
      default:
        newChallenges = getRandomChallenges('mixed');
    }
    
    setChallenges(newChallenges);
    setChallengeMode(mode);
    setCurrentChallenge(0);
    setScore(0);
    setAnsweredQuestions(new Set());
    setFeedback(null);
    setShowHint(false);
    setShowRedFlags(false);
    setShowNext(false);
    setIsCompleted(false);
    setSelectedAnswer(null);
  };

  const submitAnswer = (answer) => {
    if (selectedAnswer !== null) return; // Prevent multiple submissions
    
    const challenge = challenges[currentChallenge];
    const isCorrect = (answer === 'phishing') === challenge.isPhishing;
    
    setSelectedAnswer(answer);
    
    // Update score if this question hasn't been answered before
    if (!answeredQuestions.has(currentChallenge)) {
      const newAnsweredQuestions = new Set(answeredQuestions);
      newAnsweredQuestions.add(currentChallenge);
      setAnsweredQuestions(newAnsweredQuestions);
      
      if (isCorrect) {
        setScore(score + 1);
      }
    }

    // Set feedback
    setFeedback({
      isCorrect,
      message: isCorrect 
        ? `✅ Correct! ${challenge.isPhishing ? 'You correctly identified this as a phishing email.' : 'You correctly identified this as a legitimate email.'}`
        : `❌ Incorrect. This email is ${challenge.isPhishing ? 'a phishing attempt' : 'legitimate'}. ${challenge.isPhishing ? 'Always be cautious of emails asking for personal information or containing suspicious links.' : 'This email appears to be from a legitimate source with no suspicious elements.'}`
    });

    // Show red flags if it's a phishing email
    if (challenge.isPhishing && challenge.redFlags.length > 0) {
      setShowRedFlags(true);
    }

    setShowNext(true);
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setFeedback(null);
      setShowHint(false);
      setShowRedFlags(false);
      setShowNext(false);
      setSelectedAnswer(null);
    } else {
      setIsCompleted(true);
    }
  };

  const getScoreMessage = () => {
    const percentage = Math.round((score / challenges.length) * 100);
    if (percentage >= 90) return { emoji: '🏆', text: 'Excellent! You\'re a phishing detection expert!' };
    if (percentage >= 70) return { emoji: '👍', text: 'Good job! You have solid phishing detection skills.' };
    if (percentage >= 50) return { emoji: '📚', text: 'Not bad! Keep practicing to improve your skills.' };
    return { emoji: '⚠️', text: 'You may be vulnerable to phishing attacks. Practice more!' };
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      financial: '💰',
      technology: '💻',
      ecommerce: '🛒',
      workplace: '🏢',
      government: '🏛️',
      healthcare: '🏥',
      education: '🎓',
      entertainment: '🎬',
      social: '👥',
      cryptocurrency: '₿',
      subscription: '📱',
      employment: '💼',
      utilities: '⚡'
    };
    return icons[category] || '📧';
  };

  if (challenges.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Loading challenges...</p>
        </div>
      </div>
    );
  }

  const currentChallengeData = challenges[currentChallenge];
  const progressPercentage = ((currentChallenge) / challenges.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            🕵️ Phishing Email Detection Lab
          </h1>
          <p className="text-xl opacity-90">
            Learn to identify phishing emails and protect yourself from cyber threats
          </p>
        </div>

        {/* Challenge Mode Selector */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Challenge Mode</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: 'mixed', label: '🎲 Mixed', desc: 'Random challenges' },
              { key: 'balanced', label: '⚖️ Balanced', desc: 'All difficulties' },
              { key: 'easy', label: '🟢 Easy', desc: 'Beginner level' },
              { key: 'hard', label: '🔴 Hard', desc: 'Expert level' },
              { key: 'financial', label: '💰 Financial', desc: 'Banking & money' },
              { key: 'technology', label: '💻 Tech', desc: 'Tech companies' },
              { key: 'workplace', label: '🏢 Work', desc: 'Business emails' },
              { key: 'government', label: '🏛️ Gov', desc: 'Official notices' }
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => startNewChallenge(mode.key)}
                className={`p-3 rounded-lg border-2 text-sm transition-all hover:scale-105 ${
                  challengeMode === mode.key
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold">{mode.label}</div>
                <div className="text-xs text-gray-500">{mode.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {!isCompleted ? (
          <>
            {/* Progress Bar */}
            <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Challenge {currentChallenge + 1} of {challenges.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  Score: {score}/{challenges.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Challenge Container */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden mb-6">
              {/* Challenge Header */}
              <div className="bg-gray-800 text-white p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">
                  Email Analysis Challenge
                </h2>
                <div className="flex justify-center items-center gap-4 text-sm">
                  <span className={`px-3 py-1 rounded-full ${getDifficultyColor(currentChallengeData.difficulty)}`}>
                    {currentChallengeData.difficulty.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1">
                    {getCategoryIcon(currentChallengeData.category)}
                    {currentChallengeData.category}
                  </span>
                </div>
                <p className="mt-2 opacity-90">
                  Examine the email below and determine if it's legitimate or a phishing attempt
                </p>
              </div>

              {/* Email Container */}
              <div className="m-6 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                {/* Email Header */}
                <div className="bg-gray-100 p-4 border-b border-gray-200">
                  <div className="space-y-2 text-sm">
                    <div><strong className="text-gray-700 w-16 inline-block">From:</strong> {currentChallengeData.from}</div>
                    <div><strong className="text-gray-700 w-16 inline-block">To:</strong> {currentChallengeData.to}</div>
                    <div><strong className="text-gray-700 w-16 inline-block">Subject:</strong> {currentChallengeData.subject}</div>
                    <div><strong className="text-gray-700 w-16 inline-block">Date:</strong> {new Date().toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Email Body */}
                <div className="p-6 bg-white">
                  <div 
                    className="whitespace-pre-line leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: currentChallengeData.body.replace(
                        /https?:\/\/[^\s]+/g,
                        '<span class="text-blue-600 underline cursor-pointer hover:text-blue-800">$&</span>'
                      )
                    }}
                  />
                  <div className="text-xs text-gray-400 italic mt-4">
                    Email {currentChallenge + 1} of {challenges.length}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-800 mb-6">
                    Is this email legitimate or a phishing attempt?
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                    <button
                      onClick={() => submitAnswer('legitimate')}
                      disabled={selectedAnswer !== null}
                      className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed ${
                        selectedAnswer === 'legitimate'
                          ? 'bg-green-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      ✅ Legitimate Email
                    </button>
                    <button
                      onClick={() => submitAnswer('phishing')}
                      disabled={selectedAnswer !== null}
                      className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed ${
                        selectedAnswer === 'phishing'
                          ? 'bg-red-600 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      🚨 Phishing Email
                    </button>
                  </div>

                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    💡 Need a Hint?
                  </button>

                  {/* Hint */}
                  {showHint && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                      <strong>💡 Hint:</strong> {currentChallengeData.hint}
                    </div>
                  )}

                  {/* Feedback */}
                  {feedback && (
                    <div className={`mt-4 p-4 rounded-lg text-sm font-medium ${
                      feedback.isCorrect 
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                      {feedback.message}
                    </div>
                  )}

                  {/* Red Flags */}
                  {showRedFlags && currentChallengeData.redFlags.length > 0 && (
                    <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg text-sm">
                      <h4 className="font-semibold text-orange-800 mb-2">🚩 Red Flags to Watch For:</h4>
                      <ul className="list-disc list-inside space-y-1 text-orange-700">
                        {currentChallengeData.redFlags.map((flag, index) => (
                          <li key={index}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Next Button */}
                  {showNext && (
                    <button
                      onClick={nextChallenge}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                    >
                      {currentChallenge < challenges.length - 1 ? 'Next Challenge →' : 'See Results →'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Completion Screen */
          <div className="bg-white rounded-lg shadow-2xl p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Congratulations!
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                You've completed the Phishing Email Detection Lab!
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {score}/{challenges.length}
              </div>
              <div className="text-2xl text-gray-600 mb-4">
                ({Math.round((score / challenges.length) * 100)}%)
              </div>
              <div className="text-lg">
                <span className="text-2xl mr-2">{getScoreMessage().emoji}</span>
                {getScoreMessage().text}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                You're now better equipped to identify and avoid phishing attacks!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => startNewChallenge(challengeMode)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  🔄 Try Again
                </button>
                <button
                  onClick={() => startNewChallenge('mixed')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  🎲 New Random Set
                </button>
              </div>
            </div>

            {/* Performance Breakdown */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-green-600 font-semibold">Phishing Detected</div>
                <div className="text-2xl font-bold text-green-800">
                  {challenges.filter((c, i) => c.isPhishing && answeredQuestions.has(i) && 
                    ((selectedAnswer === 'phishing') === c.isPhishing)).length}
                </div>
                <div className="text-green-600">
                  /{challenges.filter(c => c.isPhishing).length} phishing emails
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-blue-600 font-semibold">Legitimate Verified</div>
                <div className="text-2xl font-bold text-blue-800">
                  {challenges.filter((c, i) => !c.isPhishing && answeredQuestions.has(i) && 
                    ((selectedAnswer === 'legitimate') === !c.isPhishing)).length}
                </div>
                <div className="text-blue-600">
                  /{challenges.filter(c => !c.isPhishing).length} legitimate emails
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-purple-600 font-semibold">Challenge Mode</div>
                <div className="text-lg font-bold text-purple-800 capitalize">
                  {challengeMode}
                </div>
                <div className="text-purple-600">
                  {challenges.length} challenges completed
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Footer */}
        <div className="mt-8 bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🛡️ Key Phishing Warning Signs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-red-500">⚠️</span>
              Urgent deadlines
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-red-500">🔗</span>
              Suspicious links
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-red-500">📧</span>
              Wrong domains
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-red-500">💰</span>
              Requests for money/info
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-4 text-center text-white/80 text-sm">
          <div className="flex justify-center gap-4 flex-wrap">
            <span>📊 {getChallengeStats().total} total challenges available</span>
            <span>🎯 Difficulty: Easy, Medium, Hard</span>
            <span>🏷️ Categories: Financial, Tech, Gov, and more</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingDetectionLab;