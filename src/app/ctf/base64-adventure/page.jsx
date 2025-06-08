'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRightIcon, ChevronLeftIcon, TrophyIcon, BookOpenIcon, LightBulbIcon, CheckCircleIcon, XCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Base64Adventure = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [roundQuestions, setRoundQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [roundScores, setRoundScores] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Complete challenge database with 35 challenges
  const allChallenges = [
    // Beginner Level (1-10)
    {
      id: 1,
      difficulty: 'beginner',
      type: 'decode',
      question: 'Decode this Base64 string: SGVsbG8=',
      answer: 'Hello',
      hint: 'This is a simple greeting. Base64 typically ends with = for padding.',
      explanation: 'SGVsbG8= decodes to "Hello". The = is padding to make the string length divisible by 4.'
    },
    {
      id: 2,
      difficulty: 'beginner',
      type: 'encode',
      question: 'Encode this text to Base64: Hi',
      answer: 'SGk=',
      hint: 'Short words often need padding (=) at the end when encoded.',
      explanation: 'The text "Hi" encodes to "SGk=" in Base64. The = provides necessary padding.'
    },
    {
      id: 3,
      difficulty: 'beginner',
      type: 'decode',
      question: 'What does QWxpY2U= decode to?',
      answer: 'Alice',
      hint: 'This is a common name with 5 letters.',
      explanation: 'QWxpY2U= decodes to the name "Alice".'
    },
    {
      id: 4,
      difficulty: 'beginner',
      type: 'decode',
      question: 'Decode: Qm9i',
      answer: 'Bob',
      hint: 'A short, 3-letter name.',
      explanation: 'Qm9i decodes to "Bob". Notice there\'s no padding needed for exactly 3 characters.'
    },
    {
      id: 5,
      difficulty: 'beginner',
      type: 'encode',
      question: 'Encode "Cat" to Base64:',
      answer: 'Q2F0',
      hint: 'Three letters, no padding needed.',
      explanation: '"Cat" encodes to "Q2F0" - exactly 3 characters need no padding.'
    },
    {
      id: 6,
      difficulty: 'beginner',
      type: 'decode',
      question: 'What does MTIz decode to?',
      answer: '123',
      hint: 'These are consecutive numbers.',
      explanation: 'MTIz decodes to the numbers "123".'
    },
    {
      id: 7,
      difficulty: 'beginner',
      type: 'encode',
      question: 'Encode "Yes" to Base64:',
      answer: 'WWVz',
      hint: 'A simple affirmative word.',
      explanation: '"Yes" encodes to "WWVz" in Base64.'
    },
    {
      id: 8,
      difficulty: 'beginner',
      type: 'decode',
      question: 'Decode: Tm8=',
      answer: 'No',
      hint: 'The opposite of yes.',
      explanation: 'Tm8= decodes to "No". The = provides padding for the 2-character word.'
    },
    {
      id: 9,
      difficulty: 'beginner',
      type: 'decode',
      question: 'What does QUJDREVGRw== decode to?',
      answer: 'ABCDEFG',
      hint: 'The first letters of the alphabet.',
      explanation: 'QUJDREVGRw== decodes to "ABCDEFG" - the first 7 letters of the alphabet.'
    },
    {
      id: 10,
      difficulty: 'beginner',
      type: 'encode',
      question: 'Encode "Fun" to Base64:',
      answer: 'RnVu',
      hint: 'Something enjoyable to do.',
      explanation: '"Fun" encodes to "RnVu" in Base64.'
    },

    // Intermediate Level (11-20)
    {
      id: 11,
      difficulty: 'intermediate',
      type: 'decode',
      question: 'Decode: V2VsY29tZSB0byB0aGUgY2hhbGxlbmdlIQ==',
      answer: 'Welcome to the challenge!',
      hint: 'This is a welcoming message with punctuation.',
      explanation: 'This longer Base64 string decodes to "Welcome to the challenge!" - notice how spaces and punctuation are preserved.'
    },
    {
      id: 12,
      difficulty: 'intermediate',
      type: 'decode',
      question: 'What does dGhpcyBpcyBhIHNlY3JldA== decode to?',
      answer: 'this is a secret',
      hint: 'Something you might whisper to someone.',
      explanation: 'dGhpcyBpcyBhIHNlY3JldA== decodes to "this is a secret".'
    },
    {
      id: 13,
      difficulty: 'intermediate',
      type: 'encode',
      question: 'Encode "Base64 is cool!" to Base64:',
      answer: 'QmFzZTY0IGlzIGNvb2wh',
      hint: 'An enthusiastic statement about our encoding method.',
      explanation: '"Base64 is cool!" encodes to "QmFzZTY0IGlzIGNvb2wh".'
    },
    {
      id: 14,
      difficulty: 'intermediate',
      type: 'decode',
      question: 'Decode this hidden message: VGhlIGFuc3dlciBpcyA0Mg==',
      answer: 'The answer is 42',
      hint: 'A reference to a famous book about the meaning of life.',
      explanation: 'VGhlIGFuc3dlciBpcyA0Mg== decodes to "The answer is 42" - a reference to The Hitchhiker\'s Guide to the Galaxy.'
    },
    {
      id: 15,
      difficulty: 'intermediate',
      type: 'decode',
      question: 'What does UHl0aG9uIGlzIGF3ZXNvbWU= decode to?',
      answer: 'Python is awesome',
      hint: 'A programming language that many people love.',
      explanation: 'UHl0aG9uIGlzIGF3ZXNvbWU= decodes to "Python is awesome".'
    },
    {
      id: 16,
      difficulty: 'intermediate',
      type: 'encode',
      question: 'Encode "Learning is fun!" to Base64:',
      answer: 'TGVhcm5pbmcgaXMgZnVuIQ==',
      hint: 'An encouraging message about education.',
      explanation: '"Learning is fun!" encodes to "TGVhcm5pbmcgaXMgZnVuIQ==".'
    },
    {
      id: 17,
      difficulty: 'intermediate',
      type: 'decode',
      question: 'Decode: Q3liZXJzZWN1cml0eSBSb2Nrcw==',
      answer: 'Cybersecurity Rocks',
      hint: 'A subject that involves protecting digital systems.',
      explanation: 'Q3liZXJzZWN1cml0eSBSb2Nrcw== decodes to "Cybersecurity Rocks".'
    },
    {
      id: 18,
      difficulty: 'intermediate',
      type: 'decode',
      question: 'What does SWYgeW91IGNhbiByZWFkIHRoaXMsIHlvdSByb2NrIQ== decode to?',
      answer: 'If you can read this, you rock!',
      hint: 'A congratulatory message for your decoding skills.',
      explanation: 'SWYgeW91IGNhbiByZWFkIHRoaXMsIHlvdSByb2NrIQ== decodes to "If you can read this, you rock!"'
    },
    {
      id: 19,
      difficulty: 'intermediate',
      type: 'encode',
      question: 'Encode "Data encoding" to Base64:',
      answer: 'RGF0YSBlbmNvZGluZw==',
      hint: 'The process we\'re learning about right now.',
      explanation: '"Data encoding" encodes to "RGF0YSBlbmNvZGluZw==".'
    },
    {
      id: 20,
      difficulty: 'intermediate',
      type: 'decode',
      question: 'Decode: V2VsbCBkb25lLCBkZXRlY3RpdmUh',
      answer: 'Well done, detective!',
      hint: 'Praise for someone who solves mysteries.',
      explanation: 'V2VsbCBkb25lLCBkZXRlY3RpdmUh decodes to "Well done, detective!"'
    },

    // Advanced Level (21-30)
    {
      id: 21,
      difficulty: 'advanced',
      type: 'decode',
      question: 'Decode this complex message: VGhlIEJhc2U2NCBhbGdvcml0aG0gaXMgdXNlZCBmb3IgZW5jb2RpbmcgYmluYXJ5IGRhdGEgaW50byBhIHRleHQgZm9ybWF0Lg==',
      answer: 'The Base64 algorithm is used for encoding binary data into a text format.',
      hint: 'An explanation of what Base64 is used for.',
      explanation: 'This longer string explains the purpose of Base64 encoding - converting binary data to text format.'
    },
    {
      id: 22,
      difficulty: 'advanced',
      type: 'encode',
      question: 'Encode this sentence: "Cryptography protects our digital world."',
      answer: 'Q3J5cHRvZ3JhcGh5IHByb3RlY3RzIG91ciBkaWdpdGFsIHdvcmxkLg==',
      hint: 'A statement about the importance of encryption.',
      explanation: 'The sentence about cryptography encodes to this long Base64 string.'
    },
    {
      id: 23,
      difficulty: 'advanced',
      type: 'decode',
      question: 'Decode: VGhpcyBpcyBhIDY0LWJhc2UgZW5jb2RlZCBtZXNzYWdlIHdpdGggbnVtYmVyczogMTIzNDU2Nzg5MA==',
      answer: 'This is a 64-base encoded message with numbers: 1234567890',
      hint: 'A message that contains both text and all the digits.',
      explanation: 'This decodes to a message that contains text and the digits 0-9.'
    },
    {
      id: 24,
      difficulty: 'advanced',
      type: 'decode',
      question: 'What does U3BlY2lhbCBjaGFyYWN0ZXJzOiAhQCMkJV4mKigpXy0rPXt9W106IjsnPz4sPi4= decode to?',
      answer: 'Special characters: !@#$%^&*()_-+={}[]:";?>,<.',
      hint: 'A collection of keyboard symbols and punctuation marks.',
      explanation: 'This Base64 string contains many special characters and symbols found on a keyboard.'
    },
    {
      id: 25,
      difficulty: 'advanced',
      type: 'encode',
      question: 'Encode: "Information security is everyone\'s responsibility!"',
      answer: 'SW5mb3JtYXRpb24gc2VjdXJpdHkgaXMgZXZlcnlvbmUncyByZXNwb25zaWJpbGl0eSE=',
      hint: 'An important message about cybersecurity responsibility.',
      explanation: 'This security-focused message encodes to the given Base64 string.'
    },
    {
      id: 26,
      difficulty: 'advanced',
      type: 'decode',
      question: 'Decode: QmFzZTY0IGVuY29kaW5nIGlzIG5hbWVkIGFmdGVyIGl0cyA2NC1jaGFyYWN0ZXIgYWxwaGFiZXQu',
      answer: 'Base64 encoding is named after its 64-character alphabet.',
      hint: 'Educational information about why Base64 has its name.',
      explanation: 'This explains the origin of the "Base64" name - it uses a 64-character alphabet.'
    },
    {
      id: 27,
      difficulty: 'advanced',
      type: 'decode',
      question: 'What does VGhlIEJhc2U2NCBhbHBoYWJldCBpbmNsdWRlczogQS1aLCBhLXosIDAtOSwgKywgYW5kIC8= decode to?',
      answer: 'The Base64 alphabet includes: A-Z, a-z, 0-9, +, and /',
      hint: 'Information about the characters used in Base64 encoding.',
      explanation: 'This describes the complete 64-character alphabet used in Base64: uppercase letters, lowercase letters, digits, plus, and forward slash.'
    },
    {
      id: 28,
      difficulty: 'advanced',
      type: 'encode',
      question: 'Encode: "Every 3 bytes becomes 4 Base64 characters."',
      answer: 'RXZlcnkgMyBieXRlcyBiZWNvbWVzIDQgQmFzZTY0IGNoYXJhY3RlcnMu',
      hint: 'A technical fact about the Base64 encoding ratio.',
      explanation: 'This technical explanation about Base64\'s 3:4 byte-to-character ratio encodes to the given string.'
    },
    {
      id: 29,
      difficulty: 'advanced',
      type: 'decode',
      question: 'Decode: UGFkZGluZyB3aXRoID0gc2lnbnMgZW5zdXJlcyB0aGUgZW5jb2RlZCBzdHJpbmcgaXMgYSBtdWx0aXBsZSBvZiA0IGNoYXJhY3RlcnMu',
      answer: 'Padding with = signs ensures the encoded string is a multiple of 4 characters.',
      hint: 'An explanation of why we see = signs in Base64.',
      explanation: 'This explains the purpose of padding in Base64 - to ensure the output length is always divisible by 4.'
    },
    {
      id: 30,
      difficulty: 'advanced',
      type: 'decode',
      question: 'Final challenge! Decode: Q29uZ3JhdHVsYXRpb25zISBZb3UndmUgbWFzdGVyZWQgQmFzZTY0IGVuY29kaW5nIGFuZCBkZWNvZGluZyE=',
      answer: 'Congratulations! You\'ve mastered Base64 encoding and decoding!',
      hint: 'A celebratory message for completing the adventure!',
      explanation: 'You\'ve successfully completed the Base64 Adventure! This final message celebrates your newfound encoding skills.'
    },

    // Bonus Expert Challenges (31-35)
    {
      id: 31,
      difficulty: 'expert',
      type: 'decode',
      question: 'Expert challenge: VGhlIEJhc2U2NCBlbmNvZGluZyBzY2hlbWUgaXMgY29tbW9ubHkgdXNlZCB3aGVuIHRoZXJlIGlzIGEgbmVlZCB0byBlbmNvZGUgYmluYXJ5IGRhdGEgdGhhdCBuZWVkcyB0byBiZSBzdG9yZWQgYW5kIHRyYW5zZmVycmVkIG92ZXIgbWVkaWEgdGhhdCBhcmUgZGVzaWduZWQgdG8gZGVhbCB3aXRoIHRleHQuIA==',
      answer: 'The Base64 encoding scheme is commonly used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with text.',
      hint: 'A comprehensive explanation of Base64\'s primary use case.',
      explanation: 'This expert-level challenge provides a complete technical explanation of when and why Base64 encoding is used.'
    },
    {
      id: 32,
      difficulty: 'expert',
      type: 'encode',
      question: 'Encode this technical explanation: "Base64 encoding represents binary data in an ASCII string format by translating it into a radix-64 representation."',
      answer: 'QmFzZTY0IGVuY29kaW5nIHJlcHJlc2VudHMgYmluYXJ5IGRhdGEgaW4gYW4gQVNDSUkgc3RyaW5nIGZvcm1hdCBieSB0cmFuc2xhdGluZyBpdCBpbnRvIGEgcmFkaXgtNjQgcmVwcmVzZW50YXRpb24u',
      hint: 'A technical definition involving radix-64 representation.',
      explanation: 'This technical definition explains how Base64 works at a mathematical level using radix-64 representation.'
    },
    {
      id: 33,
      difficulty: 'expert',
      type: 'decode',
      question: 'Decode this data format info: SW4gSFRNTCBhbmQgWE1MLCBJRDA2NDQgZGF0YSBVUklzIGFyZSB1c2VkIHRvIGVtYmVkIGltYWdlcyBkaXJlY3RseSBpbiBzdHlsZXNoZWV0cyBhbmQgSFRNTCBkb2N1bWVudHMu',
      answer: 'In HTML and XML, ID0644 data URIs are used to embed images directly in stylesheets and HTML documents.',
      hint: 'Information about embedding images in web documents.',
      explanation: 'This explains how Base64 is used in web development to embed images directly in HTML and CSS files.'
    },
    {
      id: 34,
      difficulty: 'expert',
      type: 'decode',
      question: 'Complex decode: QmFzZTY0IGlzIGEgZ3JvdXAgb2YgYmluYXJ5LXRvLXRleHQgZW5jb2Rpbmcgc2NoZW1lcyB0aGF0IHJlcHJlc2VudCBiaW5hcnkgZGF0YSBpbiBBU0NJSSBzdHJpbmcgZm9ybWF0IGJ5IHRyYW5zbGF0aW5nIGl0IGludG8gYSByYWRpeC02NCByZXByZXNlbnRhdGlvbi4=',
      answer: 'Base64 is a group of binary-to-text encoding schemes that represent binary data in ASCII string format by translating it into a radix-64 representation.',
      hint: 'The complete technical definition of Base64 encoding.',
      explanation: 'This is the formal, complete definition of Base64 encoding from a computer science perspective.'
    },
    {
      id: 35,
      difficulty: 'expert',
      type: 'encode',
      question: 'Final expert challenge - encode: "You are now a certified Base64 expert! Your journey through binary-to-text encoding is complete."',
      answer: 'WW91IGFyZSBub3cgYSBjZXJ0aWZpZWQgQmFzZTY0IGV4cGVydCEgWW91ciBqb3VybmV5IHRocm91Z2ggYmluYXJ5LXRvLXRleHQgZW5jb2RpbmcgaXMgY29tcGxldGUu',
      hint: 'The ultimate congratulatory message for Base64 mastery!',
      explanation: 'Congratulations! You\'ve truly mastered Base64 encoding and decoding. You can now confidently work with binary-to-text encoding in real-world applications.'
    }
  ];

  // Generate random questions for the current round
  const generateRoundQuestions = (round) => {
    const difficultyMap = {
      1: 'beginner',
      2: 'beginner', 
      3: 'intermediate',
      4: 'intermediate',
      5: 'advanced',
      6: 'advanced',
      7: 'expert'
    };
    
    const targetDifficulty = difficultyMap[Math.min(round, 7)] || 'expert';
    const availableQuestions = allChallenges.filter(q => q.difficulty === targetDifficulty);
    
    // Shuffle and select 5 questions
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(5, shuffled.length));
  };

  // Initialize round questions
  useEffect(() => {
    const questions = generateRoundQuestions(currentRound);
    setRoundQuestions(questions);
    setCurrentQuestion(0);
    setUserAnswer('');
    setShowHint(false);
    setShowAnswer(false);
    setShowResults(false);
  }, [currentRound]);

  const currentChallenge = roundQuestions[currentQuestion];

  const checkAnswer = () => {
    if (!currentChallenge) return;
    
    const isCorrect = userAnswer.trim().toLowerCase() === currentChallenge.answer.toLowerCase();
    const questionKey = `${currentRound}-${currentQuestion}`;
    
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
    if (currentQuestion < roundQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setShowHint(false);
      setShowAnswer(false);
    } else {
      // End of round
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
    setShowHint(false);
    setShowAnswer(false);
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
            <h1 className="text-3xl font-bold mb-4">Loading Base64 Adventure...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpenIcon className="w-8 h-8 mr-3 text-blue-600" />
            <h1 className="text-4xl font-bold">Base64 Encoding Adventure</h1>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Master the art of binary-to-text encoding through progressive challenges
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
        <div className={`mb-8 p-6 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } shadow-lg`}>
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
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
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
                  : (isDarkMode ? 'bg-purple-900 text-purple-300 border border-purple-700' : 'bg-purple-100 text-purple-800 border border-purple-200')
              }`}>
                {currentChallenge.type === 'encode' ? '📤 ENCODE' : '📥 DECODE'}
              </span>
              <span className="text-lg font-semibold">Challenge #{currentChallenge.id}</span>
            </div>
            <h3 className="text-xl font-bold mb-4">{currentChallenge.question}</h3>
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
              placeholder="Enter your answer here..."
              disabled={showAnswer}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
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
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                      : (isDarkMode ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                  }`}
                >
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
              </>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-lg"
              >
                {currentQuestion < roundQuestions.length - 1 ? (
                  <>
                    Next Question
                    <ChevronRightIcon className="w-4 h-4 inline ml-2" />
                  </>
                ) : (
                  <>
                    Finish Round
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
                    {answeredQuestions[`${currentRound}-${currentQuestion}`]?.correct ? 'Correct!' : 'Incorrect'}
                  </h4>
                  <div className={`mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong>Correct Answer:</strong> <code className={`px-2 py-1 rounded ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>{currentChallenge.answer}</code>
                  </div>
                  {!answeredQuestions[`${currentRound}-${currentQuestion}`]?.correct && (
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
                    You scored <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{roundQuestions.length}</span>
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Overall Progress: {totalScore + score} correct answers
                  </div>
                </div>

                <div className="space-y-3">
                  {currentRound < 7 && (
                    <button
                      onClick={nextRound}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
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
                    Restart Adventure
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
                Total Score: <span className="font-bold text-blue-600">{totalScore}</span>/{totalQuestions}
              </div>
              <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {totalQuestions > 0 ? `${Math.round((totalScore / totalQuestions) * 100)}% Accuracy` : ''}
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className={`mt-8 p-6 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className="text-xl font-bold mb-4">Base64 Quick Reference</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">What is Base64?</h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Base64 is a way to represent binary data using only 64 ASCII characters: A-Z, a-z, 0-9, +, and /.
              </p>
              <h4 className="font-semibold mb-2">Common Uses:</h4>
              <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                <li>• Email attachments</li>
                <li>• Embedding images in HTML/CSS</li>
                <li>• API data transmission</li>
                <li>• Storing binary data in text formats</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Key Facts:</h4>
              <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                <li>• Every 3 bytes becomes 4 characters</li>
                <li>• = signs are used for padding</li>
                <li>• Output is always divisible by 4</li>
                <li>• Case-sensitive encoding</li>
              </ul>
              <h4 className="font-semibold mb-2 mt-4">Tips:</h4>
              <ul className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                <li>• Look for = padding at the end</li>
                <li>• Use online tools to verify answers</li>
                <li>• Practice with short words first</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Master Base64 encoding through hands-on practice • Challenge yourself with progressively difficult puzzles
          </p>
          <button
            onClick={restartAdventure}
            className={`mt-4 px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            🔄 Restart Adventure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Base64Adventure;