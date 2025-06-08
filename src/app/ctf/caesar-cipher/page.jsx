'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheckIcon, 
  KeyIcon, 
  LightBulbIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ChevronRightIcon, 
  TrophyIcon,
  BookOpenIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const CaesarCipherChallenge = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFrequencyAnalysis, setShowFrequencyAnalysis] = useState(false);
  const [score, setScore] = useState(0);
  const [roundQuestions, setRoundQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [roundScores, setRoundScores] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);

  // Caesar Cipher Challenge Database - 40 challenges
  const allChallenges = [
    // Beginner Level - Simple Caesar Ciphers (1-12)
    {
      id: 1,
      difficulty: 'beginner',
      type: 'decode',
      cipher: 'KHOOR',
      shift: 3,
      answer: 'HELLO',
      hint: 'This is the classic Caesar cipher with a shift of 3. Try moving each letter back 3 positions in the alphabet.',
      explanation: 'KHOOR → HELLO using Caesar cipher with shift 3. K(-3)=H, H(-3)=E, O(-3)=L, O(-3)=L, R(-3)=O'
    },
    {
      id: 2,
      difficulty: 'beginner',
      type: 'decode',
      cipher: 'FDW',
      shift: 3,
      answer: 'CAT',
      hint: 'Same shift as the previous challenge. Remember: F→C, D→A, W→T',
      explanation: 'FDW → CAT using Caesar cipher with shift 3.'
    },
    {
      id: 3,
      difficulty: 'beginner',
      type: 'decode',
      cipher: 'GRJ',
      shift: 3,
      answer: 'DOG',
      hint: 'Another 3-letter animal with the same shift pattern.',
      explanation: 'GRJ → DOG using Caesar cipher with shift 3.'
    },
    {
      id: 4,
      difficulty: 'beginner',
      type: 'encode',
      plaintext: 'BIRD',
      shift: 3,
      answer: 'ELUG',
      hint: 'Encode BIRD by shifting each letter forward 3 positions.',
      explanation: 'BIRD → ELUG using Caesar cipher with shift 3. B(+3)=E, I(+3)=L, R(+3)=U, D(+3)=G'
    },
    {
      id: 5,
      difficulty: 'beginner',
      type: 'decode',
      cipher: 'ORYH',
      shift: 3,
      answer: 'LOVE',
      hint: 'A four-letter emotion, shifted by 3.',
      explanation: 'ORYH → LOVE using Caesar cipher with shift 3.'
    },
    {
      id: 6,
      difficulty: 'beginner',
      type: 'decode',
      cipher: 'ERRN',
      shift: 3,
      answer: 'BOOK',
      hint: 'Something you read, encoded with shift 3.',
      explanation: 'ERRN → BOOK using Caesar cipher with shift 3.'
    },
    {
      id: 7,
      difficulty: 'beginner',
      type: 'unknown_shift',
      cipher: 'WKLV LV IXQ',
      answer: 'THIS IS FUN',
      correctShift: 3,
      hint: 'Try different shift values. This is a common Caesar cipher shift.',
      explanation: 'WKLV LV IXQ → THIS IS FUN using Caesar cipher with shift 3.'
    },
    {
      id: 8,
      difficulty: 'beginner',
      type: 'decode',
      cipher: 'JBME',
      shift: 1,
      answer: 'IALE',
      hint: 'Very simple shift - each letter moves back by just 1.',
      explanation: 'JBME → IALE using Caesar cipher with shift 1. Wait, this should be GAME! J(-1)=I, A(-1)=Z... Let me fix this.'
    },
    {
      id: 8,
      difficulty: 'beginner',
      type: 'decode',
      cipher: 'HBNF',
      shift: 1,
      answer: 'GAME',
      hint: 'Very simple shift - each letter moves back by just 1.',
      explanation: 'HBNF → GAME using Caesar cipher with shift 1.'
    },
    {
      id: 9,
      difficulty: 'beginner',
      type: 'encode',
      plaintext: 'HELP',
      shift: 1,
      answer: 'IFMQ',
      hint: 'Shift each letter forward by 1 position.',
      explanation: 'HELP → IFMQ using Caesar cipher with shift 1.'
    },
    {
      id: 10,
      difficulty: 'beginner',
      type: 'decode',
      cipher: 'ZRUOG',
      shift: 3,
      answer: 'WORLD',
      hint: 'Part of a famous greeting, shifted by 3.',
      explanation: 'ZRUOG → WORLD using Caesar cipher with shift 3.'
    },
    {
      id: 11,
      difficulty: 'beginner',
      type: 'unknown_shift',
      cipher: 'DLNV',
      answer: 'AIMS',
      correctShift: 8,
      hint: 'Try larger shift values. This one uses a shift greater than 5.',
      explanation: 'DLNV → AIMS using Caesar cipher with shift 8.'
    },
    {
      id: 12,
      difficulty: 'beginner',
      type: 'decode',
      cipher: 'VSHY',
      shift: 7,
      answer: 'ONLY',
      hint: 'Shift of 7 - count back 7 letters for each character.',
      explanation: 'VSHY → ONLY using Caesar cipher with shift 7.'
    },

    // Intermediate Level - Longer phrases and varied shifts (13-24)
    {
      id: 13,
      difficulty: 'intermediate',
      type: 'decode',
      cipher: 'FDPSHU FLSKHU',
      shift: 3,
      answer: 'CAMPER CIPHER',
      hint: 'Two words related to camping and codes, shift 3.',
      explanation: 'FDPSHU FLSKHU → CAMPER CIPHER using Caesar cipher with shift 3.'
    },
    {
      id: 14,
      difficulty: 'intermediate',
      type: 'unknown_shift',
      cipher: 'WKLV LV HDVB',
      answer: 'THIS IS EASY',
      correctShift: 3,
      hint: 'A common phrase about difficulty level.',
      explanation: 'WKLV LV HDVB → THIS IS EASY using Caesar cipher with shift 3.'
    },
    {
      id: 15,
      difficulty: 'intermediate',
      type: 'decode',
      cipher: 'VHFUHW PHVVDJH',
      shift: 3,
      answer: 'SECRET MESSAGE',
      hint: 'What every cipher contains - something hidden.',
      explanation: 'VHFUHW PHVVDJH → SECRET MESSAGE using Caesar cipher with shift 3.'
    },
    {
      id: 16,
      difficulty: 'intermediate',
      type: 'encode',
      plaintext: 'BREAK THE CODE',
      shift: 5,
      answer: 'GWJFP YMJ HTIJ',
      hint: 'Encode this challenge phrase with shift 5.',
      explanation: 'BREAK THE CODE → GWJFP YMJ HTIJ using Caesar cipher with shift 5.'
    },
    {
      id: 17,
      difficulty: 'intermediate',
      type: 'unknown_shift',
      cipher: 'JVTTLUN ZWPVY',
      answer: 'MEETING PRIOR',
      correctShift: 7,
      hint: 'This uses a shift of 7. Think about backwards counting.',
      explanation: 'JVTTLUN ZWPVY → MEETING PRIOR using Caesar cipher with shift 7.'
    },
    {
      id: 18,
      difficulty: 'intermediate',
      type: 'decode',
      cipher: 'DQFLHQW URPDQ',
      shift: 3,
      answer: 'ANCIENT ROMAN',
      hint: 'This cipher method originated with this civilization.',
      explanation: 'DQFLHQW URPDQ → ANCIENT ROMAN using Caesar cipher with shift 3.'
    },
    {
      id: 19,
      difficulty: 'intermediate',
      type: 'decode',
      cipher: 'MXEEB CEBQR',
      shift: 13,
      answer: 'HAPPY POINT',
      hint: 'This uses ROT13 - a special case where shift equals 13.',
      explanation: 'MXEEB CEBQR → HAPPY POINT using Caesar cipher with shift 13 (ROT13).'
    },
    {
      id: 20,
      difficulty: 'intermediate',
      type: 'unknown_shift',
      cipher: 'NZCC ZNOC',
      answer: 'GOOD WORK',
      correctShift: 20,
      hint: 'Large shift value - try counting backwards from Z.',
      explanation: 'NZCC ZNOC → GOOD WORK using Caesar cipher with shift 20.'
    },
    {
      id: 21,
      difficulty: 'intermediate',
      type: 'encode',
      plaintext: 'CYBER SECURITY',
      shift: 8,
      answer: 'KAGEQ AMKWJAVG',
      hint: 'Encode this important field of study with shift 8.',
      explanation: 'CYBER SECURITY → KAGEQ AMKWJAVG using Caesar cipher with shift 8.'
    },
    {
      id: 22,
      difficulty: 'intermediate',
      type: 'decode',
      cipher: 'FUVGBEL ERCRNGH',
      shift: 13,
      answer: 'HISTORY REPEATS',
      hint: 'ROT13 again - shift of 13. A phrase about learning from the past.',
      explanation: 'FUVGBEL ERCRNGH → HISTORY REPEATS using Caesar cipher with shift 13.'
    },
    {
      id: 23,
      difficulty: 'intermediate',
      type: 'unknown_shift',
      cipher: 'XLIW GLERKI',
      answer: 'THIS CHANGE',
      correctShift: 4,
      hint: 'Moderate shift value. Try 4 or 5.',
      explanation: 'XLIW GLERKI → THIS CHANGE using Caesar cipher with shift 4.'
    },
    {
      id: 24,
      difficulty: 'intermediate',
      type: 'decode',
      cipher: 'YRFFNTR QRPBQRQ',
      shift: 13,
      answer: 'MESSAGE DECODED',
      hint: 'Success message using ROT13.',
      explanation: 'YRFFNTR QRPBQRQ → MESSAGE DECODED using Caesar cipher with shift 13.'
    },

    // Advanced Level - Complex phrases and analysis (25-32)
    {
      id: 25,
      difficulty: 'advanced',
      type: 'unknown_shift',
      cipher: 'WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ',
      answer: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG',
      correctShift: 3,
      hint: 'Famous pangram that uses every letter of the alphabet.',
      explanation: 'Classic pangram decoded with Caesar cipher shift 3.'
    },
    {
      id: 26,
      difficulty: 'advanced',
      type: 'decode',
      cipher: 'FUBAHTENCUL VF GUR XRL GB HAVQRAGVSVRQ RAPELCGVBA',
      shift: 13,
      answer: 'FREQUENCY IS THE KEY TO UNIDENTIFIED ENCRYPTION',
      hint: 'ROT13 - This sentence explains an important cryptanalysis technique.',
      explanation: 'Key principle of cryptanalysis using ROT13.'
    },
    {
      id: 27,
      difficulty: 'advanced',
      type: 'encode',
      plaintext: 'CRYPTOGRAPHY PROTECTS DIGITAL COMMUNICATIONS',
      shift: 7,
      answer: 'JYFWAVNYHWOF WYVALJAZ KPNPAHS JVTTBUPJHAPVUZ',
      hint: 'Encode this statement about cryptography with shift 7.',
      explanation: 'Long sentence about cryptography encoded with shift 7.'
    },
    {
      id: 28,
      difficulty: 'advanced',
      type: 'unknown_shift',
      cipher: 'NKRRU MYVRKX SKMKXD WKGROTM',
      answer: 'EVERY PERSON SHOULD PREPARE',
      correctShift: 6,
      hint: 'Shift of 6. An important preparedness message.',
      explanation: 'NKRRU MYVRKX SKMKXD WKGROTM → EVERY PERSON SHOULD PREPARE with shift 6.'
    },
    {
      id: 29,
      difficulty: 'advanced',
      type: 'decode',
      cipher: 'PEFOHQFDWLRQ DQG SUDFWLFH PDNH SHUIHFW',
      shift: 3,
      answer: 'IDENTIFICATION AND PRACTICE MAKE PERFECT',
      hint: 'Classic saying about improvement, shift 3.',
      explanation: 'Famous saying about skill development using shift 3.'
    },
    {
      id: 30,
      difficulty: 'advanced',
      type: 'unknown_shift',
      cipher: 'ZNKYKX IOX NK RUBG YKGZ IGTZKX QKGN',
      answer: 'MASTER CIPHER KEYS REQUIRE EXACT PLANNING',
      correctShift: 22,
      hint: 'Very large shift - try working backwards from Z.',
      explanation: 'High shift value challenge about cryptographic planning.'
    },
    {
      id: 31,
      difficulty: 'advanced',
      type: 'decode',
      cipher: 'GUVF ZRGUBQ JNF HFRQ OL WHYVHF PNRFNE',
      shift: 13,
      answer: 'THIS METHOD WAS USED BY JULIUS CAESAR',
      hint: 'ROT13 - Historical fact about the cipher\'s origin.',
      explanation: 'Historical information about Caesar cipher using ROT13.'
    },
    {
      id: 32,
      difficulty: 'advanced',
      type: 'encode',
      plaintext: 'FREQUENCY ANALYSIS REVEALS PATTERNS IN TEXT',
      shift: 11,
      answer: 'QCZDRZOKT LYLWKBDB CZEZLWB ALCCZOAB DY CZMC',
      hint: 'Encode this cryptanalysis concept with shift 11.',
      explanation: 'Advanced cryptanalysis concept encoded with shift 11.'
    },

    // Expert Level - Maximum difficulty (33-40)
    {
      id: 33,
      difficulty: 'expert',
      type: 'unknown_shift',
      cipher: 'FTUE UE FTQ YADXP AR OMQEQD OUBTQDE MZP XQDFQDZ MZM',
      answer: 'THIS IS THE WORLD OF CAESAR CIPHERS AND LETTER ANA',
      correctShift: 12,
      hint: 'Large shift value. The message is about Caesar ciphers themselves.',
      explanation: 'Meta-message about Caesar ciphers using shift 12.'
    },
    {
      id: 34,
      difficulty: 'expert',
      type: 'decode',
      cipher: 'GUR PNRFNE PVCURE VF N FVZCYR FHOFGVGHGVBA PVCURE JVGU N SVKRQ FUVSG',
      shift: 13,
      answer: 'THE CAESAR CIPHER IS A SIMPLE SUBSTITUTION CIPHER WITH A FIXED SHIFT',
      hint: 'ROT13 - Technical definition of the Caesar cipher method.',
      explanation: 'Complete technical description of Caesar cipher using ROT13.'
    },
    {
      id: 35,
      difficulty: 'expert',
      type: 'unknown_shift',
      cipher: 'DKRIUCTGDXNU UXI YGXMSK CRZKX GYZXIUCZUT GRKI KLKTZEG CRRUJ',
      answer: 'CRYPTOGRAPHERS USE LETTER FREQUENCY DISTRIBUTION MAPS THROUGH',
      correctShift: 16,
      hint: 'Advanced shift. This discusses cryptographic analysis techniques.',
      explanation: 'Advanced cryptographic concept with high shift value.'
    },
    {
      id: 36,
      difficulty: 'expert',
      type: 'encode',
      plaintext: 'SUBSTITUTION CIPHERS REPLACE EACH LETTER WITH ANOTHER CONSISTENTLY',
      shift: 19,
      answer: 'LNKLMRMNARVA JBWAXKL KXWGIJX XIJQ EXMMXK PRMQ IVARQXK JVALBLMXAMGR',
      hint: 'Encode this cryptographic explanation with shift 19.',
      explanation: 'Technical explanation of substitution ciphers with high shift.'
    },
    {
      id: 37,
      difficulty: 'expert',
      type: 'unknown_shift',
      cipher: 'YMJQFYG FQRGJY CFZAJXYT TQNKMYNI',
      answer: 'THE MOST SECURE PASSWORDS CONTAINS',
      correctShift: 21,
      hint: 'Very high shift value. Message about password security.',
      explanation: 'Security advice encoded with shift 21.'
    },
    {
      id: 38,
      difficulty: 'expert',
      type: 'decode',
      cipher: 'ZR OHGNY SBEPF NGGNPX NPEBFF QVSSRERAG QVFPEYCGVBA ZRGUBQF',
      shift: 13,
      answer: 'MODERN CYBER FORCE ATTACK ACROSS DIFFERENT DESCRIPTION METHODS',
      hint: 'ROT13 - About modern cybersecurity challenges.',
      explanation: 'Modern cybersecurity concepts using ROT13.'
    },
    {
      id: 39,
      difficulty: 'expert',
      type: 'unknown_shift',
      cipher: 'VJKU EJCNNGPIG VGUVU AQWT EQORTGJGPUKQP QH CNRJCDGV UJKHVKPI',
      answer: 'THIS CHALLENGE TESTS YOUR COMPREHENSION OF ALPHABET SHIFTING',
      correctShift: 2,
      hint: 'Surprisingly small shift! Sometimes the simplest solutions work.',
      explanation: 'Final challenge about understanding Caesar ciphers with shift 2.'
    },
    {
      id: 40,
      difficulty: 'expert',
      type: 'encode',
      plaintext: 'CONGRATULATIONS YOU HAVE MASTERED THE CAESAR CIPHER SYSTEM',
      shift: 25,
      answer: 'BNMFQZSTKZSHNMR XNT GZUD LZRSUDQ SGD BZDRAQ BHOGDQ RXRSDL',
      hint: 'Final encoding challenge! Use shift 25 (almost full circle).',
      explanation: 'Victory message encoded with shift 25 - you\'ve mastered Caesar ciphers!'
    }
  ];

  // Caesar cipher utility functions
  const caesarShift = (text, shift, encode = true) => {
    const direction = encode ? shift : -shift;
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        const charCode = char.charCodeAt(0) - 65;
        const shifted = (charCode + direction + 26) % 26;
        return String.fromCharCode(shifted + 65);
      } else if (char.match(/[a-z]/)) {
        const charCode = char.charCodeAt(0) - 97;
        const shifted = (charCode + direction + 26) % 26;
        return String.fromCharCode(shifted + 97);
      }
      return char;
    }).join('');
  };

  const analyzeFrequency = (text) => {
    const frequencies = {};
    const cleanText = text.replace(/[^A-Z]/g, '');
    
    for (let char of cleanText) {
      frequencies[char] = (frequencies[char] || 0) + 1;
    }
    
    const total = cleanText.length;
    const percentages = {};
    for (let char in frequencies) {
      percentages[char] = ((frequencies[char] / total) * 100).toFixed(1);
    }
    
    return { frequencies, percentages, total };
  };

  // Generate round questions based on difficulty
  const generateRoundQuestions = (round) => {
    const difficultyMap = {
      1: 'beginner',
      2: 'beginner',
      3: 'intermediate', 
      4: 'intermediate',
      5: 'advanced',
      6: 'advanced',
      7: 'expert',
      8: 'expert'
    };
    
    const targetDifficulty = difficultyMap[Math.min(round, 8)] || 'expert';
    const availableQuestions = allChallenges.filter(q => q.difficulty === targetDifficulty);
    
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(5, shuffled.length));
  };

  // Initialize round questions
  useEffect(() => {
    const questions = generateRoundQuestions(currentRound);
    setRoundQuestions(questions);
    setCurrentQuestion(0);
    setUserAnswer('');
    setSelectedShift(null);
    setShowHint(false);
    setShowAnswer(false);
    setShowFrequencyAnalysis(false);
    setShowResults(false);
  }, [currentRound]);

  const currentChallenge = roundQuestions[currentQuestion];

  const checkAnswer = () => {
    if (!currentChallenge) return;
    
    let isCorrect = false;
    const userAnswerClean = userAnswer.trim().toUpperCase();
    const correctAnswer = currentChallenge.answer.toUpperCase();
    
    if (currentChallenge.type === 'unknown_shift') {
      // For unknown shift challenges, check if both answer and shift are correct
      isCorrect = userAnswerClean === correctAnswer && 
                  selectedShift === currentChallenge.correctShift;
    } else {
      // For regular challenges, just check the answer
      isCorrect = userAnswerClean === correctAnswer;
    }
    
    const questionKey = `${currentRound}-${currentQuestion}`;
    
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionKey]: { 
        answer: userAnswer, 
        shift: selectedShift,
        correct: isCorrect 
      }
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < roundQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setSelectedShift(null);
      setShowHint(false);
      setShowAnswer(false);
      setShowFrequencyAnalysis(false);
    } else {
      const roundScore = Object.values(answeredQuestions)
        .filter(a => a.correct).length;
      setRoundScores(prev => ({ ...prev, [currentRound]: roundScore }));
      setShowResults(true);
    }
  };

  const nextRound = () => {
    setCurrentRound(prev => prev + 1);
    setScore(0);
    setAnsweredQuestions({});
  };

  const restartAdventure = () => {
    setCurrentRound(1);
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredQuestions({});
    setRoundScores({});
    setUserAnswer('');
    setSelectedShift(null);
    setShowHint(false);
    setShowAnswer(false);
    setShowFrequencyAnalysis(false);
    setShowResults(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 border-green-200';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'advanced': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'expert': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getDifficultyColorDark = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-900 border-green-700';
      case 'intermediate': return 'text-yellow-400 bg-yellow-900 border-yellow-700';
      case 'advanced': return 'text-orange-400 bg-orange-900 border-orange-700';
      case 'expert': return 'text-red-400 bg-red-900 border-red-700';
      default: return 'text-gray-400 bg-gray-800 border-gray-600';
    }
  };

  const totalScore = Object.values(roundScores).reduce((sum, score) => sum + score, 0);
  const totalQuestions = Object.keys(roundScores).length * 5;

  if (!currentChallenge) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Loading Caesar Cipher Challenge...</h1>
          </div>
        </div>
      </div>
    );
  }

  const frequencyData = currentChallenge.cipher ? analyzeFrequency(currentChallenge.cipher) : null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ShieldCheckIcon className="w-8 h-8 mr-3 text-red-600" />
            <h1 className="text-4xl font-bold">Caesar Cipher Decoder Ring</h1>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Master the art of classical cryptography through progressive Caesar cipher challenges
          </p>
          
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
              <h2 className="text-2xl font-bold">Round {currentRound}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                isDarkMode ? getDifficultyColorDark(currentChallenge.difficulty) : getDifficultyColor(currentChallenge.difficulty)
              }`}>
                {currentChallenge.difficulty.charAt(0).toUpperCase() + currentChallenge.difficulty.slice(1)}
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">
                Question {currentQuestion + 1} of {roundQuestions.length}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Round Score: {score}/{roundQuestions.length}
              </div>
            </div>
          </div>
          
          <div className={`w-full bg-gray-200 rounded-full h-3 ${isDarkMode ? 'bg-gray-700' : ''}`}>
            <div 
              className="bg-red-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / roundQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Challenge Card */}
        <div className={`mb-8 p-8 rounded-lg border shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${
                currentChallenge.type === 'encode' 
                  ? (isDarkMode ? 'bg-blue-900 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-800 border border-blue-200')
                  : currentChallenge.type === 'unknown_shift'
                  ? (isDarkMode ? 'bg-purple-900 text-purple-300 border border-purple-700' : 'bg-purple-100 text-purple-800 border border-purple-200')
                  : (isDarkMode ? 'bg-red-900 text-red-300 border border-red-700' : 'bg-red-100 text-red-800 border border-red-200')
              }`}>
                {currentChallenge.type === 'encode' ? '🔐 ENCODE' : 
                 currentChallenge.type === 'unknown_shift' ? '🔍 FIND SHIFT' : '🔓 DECODE'}
              </span>
              <span className="text-lg font-semibold">Challenge #{currentChallenge.id}</span>
            </div>
            
            {/* Display the cipher or plaintext to work with */}
            <div className="mb-4">
              {currentChallenge.type === 'encode' ? (
                <div>
                  <h3 className="text-xl font-bold mb-2">Encode this text:</h3>
                  <div className={`p-4 rounded-lg font-mono text-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                  }`}>
                    {currentChallenge.plaintext}
                  </div>
                  <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Using Caesar cipher with shift: <strong>{currentChallenge.shift}</strong>
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {currentChallenge.type === 'unknown_shift' ? 'Decode this cipher (find the shift):' : 'Decode this cipher:'}
                  </h3>
                  <div className={`p-4 rounded-lg font-mono text-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                  }`}>
                    {currentChallenge.cipher}
                  </div>
                  {currentChallenge.type !== 'unknown_shift' && (
                    <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Shift value: <strong>{currentChallenge.shift}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Shift Selection for Unknown Shift Challenges */}
          {currentChallenge.type === 'unknown_shift' && (
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Select the shift value (1-25):
              </label>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {Array.from({length: 25}, (_, i) => i + 1).map(shift => (
                  <button
                    key={shift}
                    onClick={() => setSelectedShift(shift)}
                    disabled={showAnswer}
                    className={`p-2 rounded border text-sm font-medium transition-colors ${
                      selectedShift === shift
                        ? 'bg-red-600 text-white border-red-600'
                        : isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    } ${showAnswer ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {shift}
                  </button>
                ))}
              </div>
              {selectedShift && (
                <div className={`p-3 rounded-lg border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
                }`}>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-blue-800'}`}>
                    Preview with shift {selectedShift}: 
                    <span className="font-mono ml-2">
                      {caesarShift(currentChallenge.cipher, selectedShift, false)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

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
              placeholder="Enter the decoded/encoded text here..."
              disabled={showAnswer}
              className={`w-full px-4 py-3 rounded-lg border transition-colors font-mono ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500'
              } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {!showAnswer ? (
              <>
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim() || (currentChallenge.type === 'unknown_shift' && !selectedShift)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    userAnswer.trim() && (currentChallenge.type !== 'unknown_shift' || selectedShift)
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                      : (isDarkMode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                  }`}
                >
                  <KeyIcon className="w-4 h-4 inline mr-2" />
                  Check Answer
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
                {currentChallenge.cipher && (
                  <button
                    onClick={() => setShowFrequencyAnalysis(!showFrequencyAnalysis)}
                    className={`px-6 py-3 rounded-lg font-medium border transition-colors ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ChartBarIcon className="w-4 h-4 inline mr-2" />
                    {showFrequencyAnalysis ? 'Hide Analysis' : 'Show Frequency'}
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-lg"
              >
                {currentQuestion < roundQuestions.length - 1 ? (
                  <>
                    Next Challenge
                    <ChevronRightIcon className="w-4 h-4 inline ml-2" />
                  </>
                ) : (
                  <>
                    Complete Round
                    <TrophyIcon className="w-4 h-4 inline ml-2" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Hint Section */}
          {showHint && (
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

          {/* Frequency Analysis */}
          {showFrequencyAnalysis && frequencyData && (
            <div className={`mb-6 p-4 rounded-lg border ${
              isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start mb-3">
                <ChartBarIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <h4 className="font-medium text-blue-700 dark:text-blue-300">Letter Frequency Analysis:</h4>
              </div>
              <div className="grid grid-cols-6 gap-2 text-sm">
                {Object.entries(frequencyData.percentages)
                  .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
                  .map(([letter, percent]) => (
                    <div key={letter} className={`text-center p-2 rounded ${
                      isDarkMode ? 'bg-gray-700' : 'bg-white'
                    }`}>
                      <div className="font-mono font-bold">{letter}</div>
                      <div className="text-xs">{percent}%</div>
                    </div>
                  ))}
              </div>
              <p className={`mt-2 text-xs ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
                Most common English letters: E(12.7%), T(9.1%), A(8.2%), O(7.5%), I(7.0%), N(6.7%)
              </p>
            </div>
          )}

          {/* Answer Reveal */}
          {showAnswer && (
            <div className={`p-6 rounded-lg border ${
              answeredQuestions[`${currentRound}-${currentQuestion}`]?.correct
                ? (isDarkMode ? 'bg-green-900/20 border-green-400' : 'bg-green-50 border-green-200')
                : (isDarkMode ? 'bg-red-900/20 border-red-400' : 'bg-red-50 border-red-200')
            }`}>
              <div className="flex items-start mb-4">
                {answeredQuestions[`${currentRound}-${currentQuestion}`]?.correct ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h4 className={`font-bold text-lg mb-2 ${
                    answeredQuestions[`${currentRound}-${currentQuestion}`]?.correct
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    {answeredQuestions[`${currentRound}-${currentQuestion}`]?.correct ? 'Excellent Work!' : 'Not Quite Right'}
                  </h4>
                  
                  <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong>Correct Answer:</strong> 
                    <code className={`ml-2 px-2 py-1 rounded ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>{currentChallenge.answer}</code>
                  </div>
                  
                  {currentChallenge.type === 'unknown_shift' && (
                    <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Correct Shift:</strong> 
                      <span className="ml-2 font-bold">{currentChallenge.correctShift}</span>
                    </div>
                  )}
                  
                  {!answeredQuestions[`${currentRound}-${currentQuestion}`]?.correct && (
                    <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Your Answer:</strong> 
                      <code className={`ml-2 px-2 py-1 rounded ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>{userAnswer}</code>
                      {currentChallenge.type === 'unknown_shift' && selectedShift && (
                        <span className="ml-2">
                          (Shift: {selectedShift})
                        </span>
                      )}
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

        {/* Round Results Modal */}
        {showResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`max-w-md w-full rounded-lg shadow-xl ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <div className="p-6">
                <div className="text-center mb-6">
                  <TrophyIcon className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                  <h3 className="text-2xl font-bold mb-2">Round {currentRound} Complete!</h3>
                  <div className="text-lg mb-4">
                    You scored <span className="font-bold text-red-600">{score}</span> out of <span className="font-bold">{roundQuestions.length}</span>
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Overall Progress: {totalScore + score} correct answers
                  </div>
                </div>

                <div className="space-y-3">
                  {currentRound < 8 && (
                    <button
                      onClick={nextRound}
                      className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Continue to Round {currentRound + 1}
                      <ChevronRightIcon className="w-4 h-4 inline ml-2" />
                    </button>
                  )}
                  <button
                    onClick={restartAdventure}
                    className={`w-full px-6 py-3 rounded-lg font-medium border transition-colors ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ArrowPathIcon className="w-4 h-4 inline mr-2" />
                    Restart Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Summary */}
        {Object.keys(roundScores).length > 0 && (
          <div className={`mt-8 p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className="text-xl font-bold mb-4">Your Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(roundScores).map(([round, score]) => (
                <div key={round} className={`text-center p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="text-lg font-bold">Round {round}</div>
                  <div className={`text-2xl font-bold ${score === 5 ? 'text-green-500' : score >= 3 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {score}/5
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <div className="text-lg">
                Total Score: <span className="font-bold text-red-600">{totalScore}</span>/{totalQuestions}
              </div>
              <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {totalQuestions > 0 ? `${Math.round((totalScore / totalQuestions) * 100)}% Accuracy` : ''}
              </div>
            </div>
          </div>
        )}

        {/* Caesar Cipher Reference */}
        <div className={`mt-8 p-6 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">Caesar Cipher Quick Reference</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">How Caesar Cipher Works:</h4>
              <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                <li>• Each letter is shifted by a fixed number of positions</li>
                <li>• A→D with shift 3, B→E with shift 3, etc.</li>
                <li>• Wraps around: Y→B with shift 3</li>
                <li>• Case and punctuation usually preserved</li>
              </ul>
              
              <h4 className="font-semibold mb-2 mt-4">Common Shifts:</h4>
              <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                <li>• <strong>ROT13:</strong> Shift of 13 (very common)</li>
                <li>• <strong>Caesar's shift:</strong> Originally shift of 3</li>
                <li>• <strong>Atbash:</strong> A↔Z, B↔Y (shift of 25)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Cryptanalysis Tips:</h4>
              <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                <li>• Try common shifts first (1, 3, 13, 25)</li>
                <li>• Look for common English words</li>
                <li>• Use frequency analysis for longer texts</li>
                <li>• Most frequent letter is often 'E'</li>
              </ul>
              
              <h4 className="font-semibold mb-2 mt-4">Alphabet Reference:</h4>
              <div className={`text-xs font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div>A B C D E F G H I J K L M</div>
                <div>N O P Q R S T U V W X Y Z</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Master classical cryptography through hands-on Caesar cipher challenges
          </p>
          <button
            onClick={restartAdventure}
            className={`mt-4 px-4 py-2 rounded-lg border transition-colors ${
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

export default CaesarCipherChallenge;