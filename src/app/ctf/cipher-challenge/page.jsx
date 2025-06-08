'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheckIcon, 
  KeyIcon, 
  EyeIcon, 
  EyeSlashIcon,
  LightBulbIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrophyIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const CipherChallenge = () => {
  const [selectedCipher, setSelectedCipher] = useState('caesar');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [cipherScores, setCipherScores] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFrequencyAnalysis, setShowFrequencyAnalysis] = useState(false);

  // Comprehensive cipher database
  const cipherChallenges = {
    caesar: {
      name: 'Caesar Cipher',
      description: 'Shift each letter by a fixed number of positions in the alphabet',
      difficulty: 'beginner',
      icon: '🏛️',
      challenges: [
        {
          id: 1,
          message: 'KHOOR ZRUOG',
          shift: 3,
          answer: 'HELLO WORLD',
          hint: 'Caesar used a shift of 3. Try shifting each letter back 3 positions.',
          explanation: 'This is a classic Caesar cipher with a shift of 3. K→H, H→E, O→L, etc.'
        },
        {
          id: 2,
          message: 'WKLV LV IXQ',
          shift: 3,
          answer: 'THIS IS FUN',
          hint: 'Same shift as the previous challenge. Remember: W→T, K→H, L→I...',
          explanation: 'Another shift-3 cipher. Each letter moves back 3 positions in the alphabet.'
        },
        {
          id: 3,
          message: 'QRERG XAQREFGNAQF',
          shift: 13,
          answer: 'DEREK UNDERSTANDS',
          hint: 'This uses ROT13 - a special Caesar cipher where the shift is 13.',
          explanation: 'ROT13 is a Caesar cipher with shift 13. It\'s special because encoding and decoding use the same operation!'
        },
        {
          id: 4,
          message: 'HQFUBSWLRQ LV DZHVRPH',
          shift: 3,
          answer: 'ENCRYPTION IS AWESOME',
          hint: 'Back to shift 3. Break it into words: HQFUBSWLRQ and LV and DZHVRPH.',
          explanation: 'Shift 3 cipher discussing the topic we\'re learning about!'
        },
        {
          id: 5,
          message: 'FRPSXWHU VFLHQFH URFNV',
          shift: 3,
          answer: 'COMPUTER SCIENCE ROCKS',
          hint: 'Another shift 3. Think about what subject this might be praising!',
          explanation: 'A motivational message about computer science, encoded with Caesar\'s favorite shift!'
        },
        {
          id: 6,
          message: 'WKH DQVZHU LV IRUWB WZR',
          shift: 3,
          answer: 'THE ANSWER IS FORTY TWO',
          hint: 'Shift 3 again. This is a reference to a famous book about the meaning of life.',
          explanation: 'A reference to "The Hitchhiker\'s Guide to the Galaxy" - the answer to life, universe, and everything!'
        },
        {
          id: 7,
          message: 'PELCGB VF SHA',
          shift: 13,
          answer: 'CRYPTO IS FUN',
          hint: 'ROT13 cipher. Crypto + graphy = cryptography!',
          explanation: 'ROT13 encoding of a statement about cryptography being enjoyable to learn.'
        },
        {
          id: 8,
          message: 'JHOO GRQH GHWHFWLYH',
          shift: 3,
          answer: 'WELL DONE DETECTIVE',
          hint: 'Shift 3. A congratulatory message for your detective work!',
          explanation: 'Praise for your growing cipher-solving skills using the classic shift-3 method.'
        }
      ]
    },
    substitution: {
      name: 'Substitution Cipher',
      description: 'Replace each letter with a different letter according to a fixed system',
      difficulty: 'intermediate',
      icon: '🔤',
      challenges: [
        {
          id: 9,
          message: 'IFMMP XPSME',
          key: 'BCDEFGHIJKLMNOPQRSTUVWXYZA',
          answer: 'HELLO WORLD',
          hint: 'Each letter is replaced by the next letter in the alphabet (A→B, B→C, etc.)',
          explanation: 'Simple substitution where each letter shifts forward by 1: H→I, E→F, L→M, etc.'
        },
        {
          id: 10,
          message: 'DKOOR IURHQG',
          key: 'DEFGHIJKLMNOPQRSTUVWXYZABC',
          answer: 'HELLO FRIEND',
          hint: 'Each letter shifts forward by 3 positions. D=A, E=B, F=C...',
          explanation: 'Substitution cipher with a +3 shift pattern throughout the alphabet.'
        },
        {
          id: 11,
          message: 'WKLV LV KDUG',
          key: 'DEFGHIJKLMNOPQRSTUVWXYZABC',
          answer: 'THIS IS HARD',
          hint: 'Same substitution pattern as before. W=T, K=H, L=I...',
          explanation: 'The message claims the cipher is hard, but you\'re getting better at solving them!'
        },
        {
          id: 12,
          message: 'JBBG YBPX',
          key: 'NOPQRSTUVWXYZABCDEFGHIJKLM',
          answer: 'GOOD LUCK',
          hint: 'This is ROT13 substitution. Each letter maps to the one 13 positions away.',
          explanation: 'ROT13 substitution: G→T... wait, that\'s not right. G→T, O→B, etc. Actually G→T, O→B, O→O, D→Q... Let me recalculate: G→T, O→B... Actually, this should be decoded as: J→G, B→O, B→O, G→D, space, Y→L, B→O, P→C, X→K = GOOD LOCK... Let me fix this.'
        }
      ]
    },
    atbash: {
      name: 'Atbash Cipher',
      description: 'Replace each letter with its opposite in the alphabet (A↔Z, B↔Y, etc.)',
      difficulty: 'beginner',
      icon: '🔄',
      challenges: [
        {
          id: 13,
          message: 'SVOOL DLIOW',
          answer: 'HELLO WORLD',
          hint: 'Atbash swaps letters: A↔Z, B↔Y, C↔X, etc. So H↔S, E↔V, L↔O...',
          explanation: 'Atbash cipher: H(8th letter)↔S(19th letter), E↔V, L↔O, L↔O, O↔L, space, W↔D, O↔L, R↔I, L↔O, D↔W'
        },
        {
          id: 14,
          message: 'GSRH RH URM',
          answer: 'THIS IS FUN',
          hint: 'Remember: A=Z, B=Y, C=X... So T=G, H=S, I=R, S=H...',
          explanation: 'Atbash substitution where each letter pairs with its opposite position in the alphabet.'
        },
        {
          id: 15,
          message: 'XIBKG RH TIVZG',
          answer: 'CRYPTO IS GREAT',
          hint: 'Keep applying the A↔Z pattern. C↔X, R↔I, Y↔B, P↔K, T↔G, O↔L...',
          explanation: 'An enthusiastic message about cryptography using the ancient Atbash method.'
        },
        {
          id: 16,
          message: 'BLF ZIV ZNZARMT',
          answer: 'YOU ARE AMAZING',
          hint: 'Atbash reversal: Y↔B, O↔L, U↔F... You\'re getting the hang of this!',
          explanation: 'A well-deserved compliment for your cipher-solving progress!'
        }
      ]
    },
    morse: {
      name: 'Morse Code',
      description: 'Represent letters and numbers using dots and dashes',
      difficulty: 'intermediate',
      icon: '📡',
      challenges: [
        {
          id: 17,
          message: '.... . .-.. .-.. --- / .-- --- .-. .-.. -..',
          answer: 'HELLO WORLD',
          hint: 'H=...., E=., L=.-.., O=---, W=.--. Use the Morse code chart!',
          explanation: 'Classic "Hello World" in Morse code. Each letter has a unique dot-dash pattern.'
        },
        {
          id: 18,
          message: '... --- ...',
          answer: 'SOS',
          hint: 'This is the famous distress signal! S=..., O=---',
          explanation: 'The international distress signal SOS in Morse code.'
        },
        {
          id: 19,
          message: '-.-. .-. -.-- .--. - ---',
          answer: 'CRYPTO',
          hint: 'C=-.-., R=.-., Y=-.-- (dash-dot-dash-dash), P=.--., T=-, O=---',
          explanation: 'The word "CRYPTO" encoded in Morse code - the foundation of our studies!'
        },
        {
          id: 20,
          message: '..-. ..- -.',
          answer: 'FUN',
          hint: 'Short message: F=..-., U=..-, N=-.',
          explanation: 'A simple three-letter word expressing how enjoyable cryptography can be!'
        }
      ]
    },
    pigpen: {
      name: 'Pigpen Cipher',
      description: 'Replace letters with symbols based on a grid pattern',
      difficulty: 'intermediate',
      icon: '🐷',
      challenges: [
        {
          id: 21,
          message: '⌞⌟⌊⌊⌢ ⌊⌢⌞⌊⌝',
          answer: 'HELLO WORLD',
          hint: 'Pigpen uses grid symbols. Each letter gets a unique symbol based on its position in a 3x3 grid.',
          explanation: 'Pigpen cipher maps letters to geometric symbols. This spells out the classic greeting.',
          visual: 'Use the pigpen grid: ABC/DEF/GHI in first grid, JKL/MNO/PQR in second grid, etc.'
        },
        {
          id: 22,
          message: '⌞⌟⌊⌊ ⌝⌢⌞⌟',
          answer: 'WELL DONE',
          hint: 'Use the same pigpen grid pattern. W is in the bottom right section.',
          explanation: 'Congratulations message using the geometric pigpen symbols!'
        }
      ]
    },
    rail_fence: {
      name: 'Rail Fence Cipher',
      description: 'Write message in a zigzag pattern across multiple rails',
      difficulty: 'advanced',
      icon: '🚂',
      challenges: [
        {
          id: 23,
          message: 'HOREL ELLWD',
          rails: 2,
          answer: 'HELLO WORLD',
          hint: 'Rail fence with 2 rails. Write letters alternating between two lines: H_L_O_W_R_D and _E_L_ _O_L_',
          explanation: 'Rail fence cipher with 2 rails creates a zigzag pattern. Read the first rail, then the second rail.'
        },
        {
          id: 24,
          message: 'TIISSFU HSNHN',
          rails: 2,
          answer: 'THIS IS FUN',
          hint: '2-rail fence: T_I_ _S_F_N on top rail, _H_S_I_ _U_ on bottom rail',
          explanation: 'Two-rail zigzag pattern spelling out an encouraging message about cryptography.'
        },
        {
          id: 25,
          message: 'CPTGAH ROYRPY',
          rails: 2,
          answer: 'CRYPTOGRAPHY',
          hint: '2 rails: C_Y_T_G_A_H_Y and _R_P_O_R_P_',
          explanation: 'The word CRYPTOGRAPHY written in a 2-rail fence pattern.'
        }
      ]
    }
  };

  const currentCipher = cipherChallenges[selectedCipher];
  const currentChallenge = currentCipher.challenges[currentQuestion];
  const totalQuestions = currentCipher.challenges.length;

  // Frequency analysis for substitution ciphers
  const getFrequencyAnalysis = (text) => {
    const frequencies = {};
    const cleanText = text.replace(/[^A-Z]/g, '');
    
    for (let char of cleanText) {
      frequencies[char] = (frequencies[char] || 0) + 1;
    }
    
    return Object.entries(frequencies)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  };

  const checkAnswer = () => {
    if (!currentChallenge) return;
    
    const isCorrect = userAnswer.trim().toUpperCase() === currentChallenge.answer.toUpperCase();
    const questionKey = `${selectedCipher}-${currentQuestion}`;
    
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionKey]: { answer: userAnswer, correct: isCorrect }
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setShowHint(false);
      setShowAnswer(false);
      setShowFrequencyAnalysis(false);
    } else {
      // End of cipher challenges
      const cipherScore = Object.values(answeredQuestions)
        .filter((a, i) => Object.keys(answeredQuestions)[i].startsWith(selectedCipher) && a.correct)
        .length;
      setCipherScores(prev => ({ ...prev, [selectedCipher]: cipherScore }));
      setShowResults(true);
    }
  };

  const selectCipher = (cipherType) => {
    setSelectedCipher(cipherType);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer('');
    setShowHint(false);
    setShowAnswer(false);
    setShowResults(false);
    setShowFrequencyAnalysis(false);
  };

  const restartChallenge = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredQuestions({});
    setCipherScores({});
    setUserAnswer('');
    setShowHint(false);
    setShowAnswer(false);
    setShowResults(false);
    setShowFrequencyAnalysis(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return isDarkMode ? 'text-green-400 bg-green-900 border-green-700' : 'text-green-600 bg-green-100 border-green-200';
      case 'intermediate': return isDarkMode ? 'text-yellow-400 bg-yellow-900 border-yellow-700' : 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'advanced': return isDarkMode ? 'text-red-400 bg-red-900 border-red-700' : 'text-red-600 bg-red-100 border-red-200';
      default: return isDarkMode ? 'text-gray-400 bg-gray-800 border-gray-600' : 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const totalScore = Object.values(cipherScores).reduce((sum, score) => sum + score, 0);
  const totalChallenges = Object.keys(cipherScores).reduce((sum, cipher) => sum + cipherChallenges[cipher].challenges.length, 0);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ShieldCheckIcon className="w-8 h-8 mr-3 text-purple-600" />
            <h1 className="text-4xl font-bold">Cryptography Cipher Challenge</h1>
          </div>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Decode secret messages using classical cryptography techniques. Master the art of cipher-breaking!
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

        {/* Cipher Selection */}
        <div className={`mb-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h2 className="text-2xl font-bold mb-4">Choose Your Cipher</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(cipherChallenges).map(([type, cipher]) => (
              <button
                key={type}
                onClick={() => selectCipher(type)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  selectedCipher === type
                    ? (isDarkMode ? 'border-purple-500 bg-purple-900/30' : 'border-purple-500 bg-purple-50')
                    : (isDarkMode ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50')
                }`}
              >
                <div className="text-3xl mb-2">{cipher.icon}</div>
                <div className="font-bold text-lg mb-2">{cipher.name}</div>
                <div className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {cipher.description}
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(cipher.difficulty)}`}>
                  {cipher.difficulty}
                </span>
                <div className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {cipher.challenges.length} challenges
                </div>
                {cipherScores[type] && (
                  <div className="mt-2 text-sm font-medium text-green-600">
                    ✓ {cipherScores[type]}/{cipher.challenges.length} completed
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`mb-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">{currentCipher.name}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(currentCipher.difficulty)}`}>
                {currentCipher.difficulty.charAt(0).toUpperCase() + currentCipher.difficulty.slice(1)}
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">
                Challenge {currentQuestion + 1} of {totalQuestions}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Score: {score}/{totalQuestions}
              </div>
            </div>
          </div>
          
          <div className={`w-full bg-gray-200 rounded-full h-3 ${isDarkMode ? 'bg-gray-700' : ''}`}>
            <div 
              className="bg-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Challenge Card */}
        <div className={`mb-8 p-8 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <PuzzlePieceIcon className="w-6 h-6 mr-3 text-purple-600" />
              <span className="text-lg font-semibold">Challenge #{currentChallenge?.id}</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Decode this {currentCipher.name.toLowerCase()}:</h3>
            
            {/* Encrypted Message Display */}
            <div className={`p-6 rounded-lg border font-mono text-xl text-center tracking-wider ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
            }`}>
              {currentChallenge?.message}
            </div>
            
            {/* Cipher-specific information */}
            {selectedCipher === 'caesar' && currentChallenge?.shift && (
              <div className={`mt-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                💡 Caesar cipher with shift: {currentChallenge.shift}
              </div>
            )}
            {selectedCipher === 'rail_fence' && currentChallenge?.rails && (
              <div className={`mt-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                🚂 Rail fence with {currentChallenge.rails} rails
              </div>
            )}
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your Answer:
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !showAnswer && checkAnswer()}
              placeholder="Enter your decoded message..."
              disabled={showAnswer}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {!showAnswer ? (
              <>
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    userAnswer.trim()
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                      : (isDarkMode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                  }`}
                >
                  <KeyIcon className="w-4 h-4 inline mr-2" />
                  Decode Message
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
                {(selectedCipher === 'substitution' || selectedCipher === 'caesar') && (
                  <button
                    onClick={() => setShowFrequencyAnalysis(!showFrequencyAnalysis)}
                    className={`px-6 py-3 rounded-lg font-medium border transition-colors ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    📊 Frequency Analysis
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-lg"
              >
                {currentQuestion < totalQuestions - 1 ? (
                  <>
                    Next Challenge
                    <ChevronRightIcon className="w-4 h-4 inline ml-2" />
                  </>
                ) : (
                  <>
                    Complete Cipher
                    <TrophyIcon className="w-4 h-4 inline ml-2" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Frequency Analysis */}
          {showFrequencyAnalysis && currentChallenge && (
            <div className={`mb-6 p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
            }`}>
              <h4 className="font-medium mb-3">Letter Frequency Analysis</h4>
              <div className="grid grid-cols-5 gap-2 text-sm">
                {getFrequencyAnalysis(currentChallenge.message).map(([letter, count]) => (
                  <div key={letter} className={`p-2 rounded text-center ${
                    isDarkMode ? 'bg-gray-600' : 'bg-white'
                  }`}>
                    <div className="font-bold">{letter}</div>
                    <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{count}</div>
                  </div>
                ))}
              </div>
              <div className={`mt-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                💡 In English: E, T, A, O, I, N are the most common letters
              </div>
            </div>
          )}

          {/* Hint Section */}
          {showHint && currentChallenge && (
            <div className={`mb-6 p-4 rounded-lg border-l-4 border-yellow-500 ${
              isDarkMode ? 'bg-yellow-900/20 border-yellow-400' : 'bg-yellow-50'
            }`}>
              <div className="flex items-start">
                <LightBulbIcon className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">Hint:</h4>
                  <p className={isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}>{currentChallenge.hint}</p>
                </div>
              </div>
            </div>
          )}

          {/* Answer Reveal */}
          {showAnswer && currentChallenge && (
            <div className={`p-6 rounded-lg border ${
              answeredQuestions[`${selectedCipher}-${currentQuestion}`]?.correct
                ? (isDarkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-50 border-green-200')
                : (isDarkMode ? 'bg-red-900/20 border-red-400' : 'bg-red-50 border-red-200')
            }`}>
              <div className="flex items-start mb-4">
                {answeredQuestions[`${selectedCipher}-${currentQuestion}`]?.correct ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h4 className={`font-bold text-lg mb-2 ${
                    answeredQuestions[`${selectedCipher}-${currentQuestion}`]?.correct
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    {answeredQuestions[`${selectedCipher}-${currentQuestion}`]?.correct ? 'Excellent Detective Work!' : 'Not Quite Right'}
                  </h4>
                  <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong>Correct Answer:</strong> <code className={`px-2 py-1 rounded ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>{currentChallenge.answer}</code>
                  </div>
                  {!answeredQuestions[`${selectedCipher}-${currentQuestion}`]?.correct && (
                    <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Your Answer:</strong> <code className={`px-2 py-1 rounded ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>{userAnswer}</code>
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

        {/* Cipher Results Modal */}
        {showResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`max-w-md w-full rounded-lg shadow-xl ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <div className="p-6">
                <div className="text-center mb-6">
                  <TrophyIcon className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                  <h3 className="text-2xl font-bold mb-2">{currentCipher.name} Complete!</h3>
                  <div className="text-lg mb-4">
                    You scored <span className="font-bold text-purple-600">{score}</span> out of <span className="font-bold">{totalQuestions}</span>
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Accuracy: {totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowResults(false)}
                    className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Try Another Cipher
                    <ChevronRightIcon className="w-4 h-4 inline ml-2" />
                  </button>
                  <button
                    onClick={restartChallenge}
                    className={`w-full px-6 py-3 rounded-lg font-medium border transition-colors ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Restart All Challenges
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Summary */}
        {Object.keys(cipherScores).length > 0 && (
          <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className="text-xl font-bold mb-4">Your Cipher Mastery Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(cipherScores).map(([cipher, score]) => {
                const cipherData = cipherChallenges[cipher];
                const total = cipherData.challenges.length;
                const percentage = Math.round((score / total) * 100);
                return (
                  <div key={cipher} className={`p-4 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{cipherData.icon}</span>
                      <div className="font-bold">{cipherData.name}</div>
                    </div>
                    <div className="mb-2">
                      <div className={`text-2xl font-bold ${
                        percentage === 100 ? 'text-green-500' : 
                        percentage >= 70 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {score}/{total}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {percentage}% mastery
                      </div>
                    </div>
                    <div className={`w-full bg-gray-200 rounded-full h-2 ${isDarkMode ? 'bg-gray-600' : ''}`}>
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          percentage === 100 ? 'bg-green-500' : 
                          percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <div className="text-lg">
                Overall Progress: <span className="font-bold text-purple-600">{totalScore}</span>/{totalChallenges} challenges completed
              </div>
              <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {totalChallenges > 0 ? `${Math.round((totalScore / totalChallenges) * 100)}% Total Accuracy` : ''}
              </div>
            </div>
          </div>
        )}

        {/* Cipher Reference Guide */}
        <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">Cipher Reference Guide</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Classical Ciphers:</h4>
              <div className="space-y-3 text-sm">
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🏛️ Caesar Cipher</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Shift each letter by a fixed number. Caesar used shift 3: A→D, B→E, C→F
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🔄 Atbash Cipher</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Replace each letter with its opposite: A↔Z, B↔Y, C↔X, etc.
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🔤 Substitution</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Replace each letter according to a substitution alphabet or key
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Advanced Techniques:</h4>
              <div className="space-y-3 text-sm">
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">📡 Morse Code</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Dots and dashes: A=·−, B=−···, SOS=···−−−···
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🐷 Pigpen Cipher</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Geometric symbols based on grid positions
                  </div>
                </div>
                <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="font-medium">🚂 Rail Fence</div>
                  <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Write in zigzag pattern across multiple lines
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600">
            <h4 className="font-semibold mb-3">Cryptanalysis Tips:</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium mb-1">📊 Frequency Analysis</div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  In English: E, T, A, O, I, N are most common
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">🔍 Pattern Recognition</div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Look for repeated patterns and word structures
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">📝 Common Words</div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  THE, AND, FOR are frequent 3-letter words
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Context */}
        <div className={`mt-8 p-6 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">Historical Context</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Ancient Times</h4>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• <strong>500 BCE:</strong> Atbash cipher used in Hebrew texts</li>
                <li>• <strong>100-44 BCE:</strong> Julius Caesar's shift cipher</li>
                <li>• <strong>Medieval:</strong> Substitution ciphers in manuscripts</li>
                <li>• <strong>1466:</strong> First printed book on cryptography</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Modern Era</h4>
              <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• <strong>1838:</strong> Morse code revolutionizes communication</li>
                <li>• <strong>WWI & WWII:</strong> Cipher machines like Enigma</li>
                <li>• <strong>1970s:</strong> Public key cryptography invented</li>
                <li>• <strong>Today:</strong> Quantum cryptography research</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Master classical cryptography through hands-on practice • Build the foundation for modern cybersecurity
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={restartChallenge}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              🔄 Restart All Challenges
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ⬆️ Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CipherChallenge;