// data/resourcesData.js - Realigned with sequential IDs

import { assets } from '@/assets/assets'

export const resourcesData = [
  // ==================== ARDUINO PROJECTS ====================
  
  {
    id: 1,
    category: 'arduino-projects',
    title: 'LED Traffic Light System',
    author: 'Beginner Arduino Project',
    description: 'Build a realistic traffic light system with timed sequences. Great introduction to Arduino programming, digital outputs, and timing functions.',
    image: assets.traffic_light,
    rating: 4,
    difficulty: 'beginner',
    estimatedTime: '30 minutes',
    tags: ['arduino', 'led', 'beginner', 'timing', 'digital-output'],
    materials: [
      'Arduino Uno',
      '3x LEDs (Red, Yellow, Green)',
      '3x 100Ω Resistors',
      'Breadboard',
      'Jumper Wires',
      'USB Cable'
    ],
    links: [
      {
        type: 'circuit-diagram',
        url: 'https://www.tinkercad.com/things/hkOtm2PTHTd-copy-of-trafficlight?sharecode=hm36Uxh0kkzwqYYmA-yS8oX-1R-CuUqoAenmSUWen9I',
        label: 'View Circuit on Tinkercad'
      }
    ]
  },
  
  {
    id: 2,
    category: 'arduino-projects',
    title: 'Ultrasonic Distance Sensor Alarm',
    author: 'Intermediate Arduino Project',
    description: 'Create a proximity alarm system using an ultrasonic sensor. Features adjustable sensitivity and both visual and audio alerts.',
    image: assets.ultrasound,
    rating: 5,
    difficulty: 'intermediate',
    estimatedTime: '3-4 hours',
    tags: ['arduino', 'ultrasonic', 'sensor', 'alarm', 'buzzer'],
    materials: [
      'Arduino Uno',
      'HC-SR04 Ultrasonic Sensor',
      'Buzzer',
      'LED',
      '220Ω Resistor',
      'Potentiometer',
      'Breadboard',
      'Jumper Wires'
    ],
    links: [
      {
        type: 'circuit-diagram',
        url: 'https://www.tinkercad.com/things/ultrasonic-alarm-circuit',
        label: 'View Circuit on Tinkercad'
      },
      {
        type: 'code',
        url: 'https://github.com/yourusername/ultrasonic-alarm',
        label: 'Download Code'
      }
    ]
  },

  {
    id: 3,
    category: 'arduino-projects',
    title: 'Temperature & Humidity Monitor with LCD',
    author: 'Intermediate Arduino Project',
    description: 'Monitor environmental conditions using a DHT22 sensor and display readings on an LCD screen. Includes data logging capabilities.',
    image: '/images/resources/temp-humidity-monitor.jpg',
    rating: 4,
    difficulty: 'intermediate',
    estimatedTime: '4-5 hours',
    tags: ['arduino', 'dht22', 'lcd', 'temperature', 'humidity', 'monitoring'],
    materials: [
      'Arduino Uno',
      'DHT22 Temperature/Humidity Sensor',
      '16x2 LCD Display',
      'Potentiometer (for LCD contrast)',
      '10kΩ Resistor',
      'Breadboard',
      'Jumper Wires',
      'SD Card Module (optional for logging)'
    ],
    links: [
      {
        type: 'circuit-diagram',
        url: 'https://www.tinkercad.com/things/temp-humidity-monitor',
        label: 'View Circuit on Tinkercad'
      },
      {
        type: 'code',
        url: 'https://github.com/yourusername/temp-humidity-monitor',
        label: 'Download Code'
      }
    ]
  },

  {
    id: 4,
    category: 'arduino-projects',
    title: 'Smart Automated Bin System',
    author: 'Intermediate Arduino Project',
    description: 'Automated smart trash bin with ultrasonic motion detection, servo-controlled lid opening, and LCD display showing distance measurements. Opens automatically when someone approaches and displays real-time proximity data.',
    image: assets.smntbin,
    rating: 4,
    difficulty: 'intermediate',
    estimatedTime: '6-8 hours',
    tags: ['arduino', 'automation', 'ultrasonic-sensor', 'servo', 'lcd', 'proximity'],
    materials: [
      'Arduino Uno R3',
      'HC-SR04 Ultrasonic Sensor',
      'SG90 Servo Motor',
      '16x2 LCD Display',
      '10kΩ Potentiometer',
      '220Ω Resistors (x3)',
      'Breadboard',
      'Jumper Wires (Male-Male, Male-Female)',
      'Cardboard Sheets',
      'Hot Glue Gun & Sticks',
      '9V Battery Pack',
      'Power Jack Connector',
      'Small Hinges (for lid)',
      'Craft Knife',
      'Ruler'
    ],
    links: [
      {
        type: 'circuit-diagram',
        url: 'https://www.tinkercad.com/things/4Xep6bp7JfE/editel?sharecode=0e0NfeTg5obNkaQ9EynnwC-yjk2yBrPPPvjVnc2lObY',
        label: 'View Circuit on Tinkercad'
      }
    ]
  },

  {
    id: 5,
    category: 'arduino-projects',
    title: 'Smart Light Sensor LED Controller',
    author: 'Beginner Arduino Project',
    description: 'Automatic LED lighting system that responds to ambient light levels. LED brightness adjusts based on light sensor readings - perfect for night lights or automatic room lighting.',
    image: '/images/resources/light-sensor-led.jpg',
    rating: 4,
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    tags: ['arduino', 'photoresistor', 'led', 'analog-input', 'pwm'],
    materials: [
      'Arduino Uno',
      'Photoresistor (LDR)',
      'LED',
      '10kΩ Resistor',
      '220Ω Resistor',
      'Breadboard',
      'Jumper Wires'
    ],
    links: [
      {
        type: 'circuit-diagram',
        url: 'https://www.tinkercad.com/things/light-sensor-led',
        label: 'View Circuit on Tinkercad'
      },
      {
        type: 'code',
        url: 'https://github.com/yourusername/light-sensor-led',
        label: 'Download Code'
      }
    ]
  },

  {
    id: 6,
    category: 'arduino-projects',
    title: 'Water Level Monitor & Pump Controller',
    author: 'Intermediate Arduino Project',
    description: 'Smart water management system with level sensing and automatic pump control. Features LCD display, adjustable thresholds, and overflow protection.',
    image: '/images/resources/water-level-pump.jpg',
    rating: 5,
    difficulty: 'intermediate',
    estimatedTime: '4-6 hours',
    tags: ['arduino', 'water-sensor', 'pump', 'relay', 'lcd', 'automation'],
    materials: [
      'Arduino Uno',
      'Water Level Sensor',
      '5V Water Pump',
      'Relay Module',
      '16x2 LCD Display',
      'Potentiometer',
      'LEDs (Red, Green)',
      'Resistors',
      'Breadboard',
      'Jumper Wires',
      'Water Container'
    ],
    links: [
      {
        type: 'circuit-diagram',
        url: 'https://www.tinkercad.com/things/water-level-pump',
        label: 'View Circuit on Tinkercad'
      },
      {
        type: 'code',
        url: 'https://github.com/yourusername/water-level-pump',
        label: 'Download Code'
      }
    ]
  },

  // ==================== PYTHON/TKINTER PROJECTS ====================
  
  {
    id: 7,
    category: 'python-apps',
    title: 'Leap Year Calculator Pro - AP CSP',
    author: 'Created by my students and improved by me',
    description: 'Advanced leap year calculator that generates lists of leap years between any two given years. Features data export, statistical analysis, and modern GUI with ttkbootstrap.',
    image: assets.leapyear_ques,
    rating: 4,
    difficulty: 'beginner',
    estimatedTime: '3-4 hours',
    tags: ['python', 'ttkbootstrap', 'apcsp', 'algorithms', 'data-analysis'],
    links: [
      {
        type: 'source-code',
        url: 'https://codehs.com/sandbox/id/leapyear-m32lPu',
        label: 'View Source Code'
      }
    ]
  },

  {
    id: 8,
    category: 'python-apps',
    title: 'Digital Recipe Manager - AP CSP',
    author: 'Andrew Benyeogor',
    description: 'Comprehensive recipe management system with ingredient tracking, meal planning, and nutrition calculations. Perfect for organizing family recipes.',
    image: '/images/resources/recipe-manager.jpg',
    rating: 5,
    difficulty: 'intermediate',
    estimatedTime: '6-8 hours',
    tags: ['python', 'ttkbootstrap', 'database', 'crud', 'json'],
    links: [
      {
        type: 'source-code',
        url: 'https://codehs.com/sandbox/id/recipemanager-z6A3gt',
        label: 'View Source Code'
      },
      {
        type: 'sample-data',
        url: '/downloads/sample-recipes.json',
        label: 'Sample Recipe Database'
      }
    ]
  },

  {
    id: 9,
    category: 'python-apps',
    title: 'Student GPA Calculator & Tracker - AP CSP',
    author: 'Andrew Benyeogor',
    description: 'Complete GPA management system for students. Track grades across multiple semesters, visualize progress, and generate academic reports.',
    image: '/images/resources/gpa-calculator.jpg',
    rating: 4,
    difficulty: 'intermediate',
    estimatedTime: '5-7 hours',
    tags: ['python', 'ttkbootstrap', 'matplotlib', 'data-visualization', 'education'],
    links: [
      {
        type: 'source-code',
        url: 'https://github.com/yourusername/gpa-calculator',
        label: 'View Source Code'
      },
      {
        type: 'demo-video',
        url: 'https://youtube.com/watch?v=gpa-calc-demo',
        label: 'Feature Demo Video'
      }
    ]
  },

  /*{
    id: 10,
    category: 'python-apps',
    title: 'Personal Finance Tracker',
    author: 'Student-Friendly Python Project',
    description: 'Simple yet powerful expense tracking app perfect for teenagers learning money management. Features budgeting, savings goals, and spending analysis.',
    image: '/images/resources/finance-tracker.jpg',
    rating: 4,
    difficulty: 'beginner',
    estimatedTime: '4-5 hours',
    tags: ['python', 'tkinter', 'finance', 'budgeting', 'charts'],
    links: [
      {
        type: 'source-code',
        url: 'https://github.com/yourusername/finance-tracker',
        label: 'View Source Code'
      },
      {
        type: 'tutorial',
        url: '/tutorials/finance-tracker-guide.pdf',
        label: 'Tutorial Guide'
      }
    ]
  },

  {
    id: 11,
    category: 'python-apps',
    title: 'Study Planner & Pomodoro Timer',
    author: 'Productivity App for Students',
    description: 'All-in-one study companion with task management, Pomodoro timer, and progress tracking. Helps students stay organized and focused.',
    image: '/images/resources/study-planner.jpg',
    rating: 5,
    difficulty: 'intermediate',
    estimatedTime: '6-8 hours',
    tags: ['python', 'ttkbootstrap', 'productivity', 'timer', 'notifications'],
    links: [
      {
        type: 'source-code',
        url: 'https://github.com/yourusername/study-planner',
        label: 'View Source Code'
      },
      {
        type: 'setup-guide',
        url: '/tutorials/study-planner-setup.pdf',
        label: 'Setup Guide'
      }
    ]
  }, 

  {
    id: 12,
    category: 'python-apps',
    title: 'Music Playlist Organizer',
    author: 'Creative Python Project',
    description: 'Organize your music collection with this playlist management tool. Features song metadata editing, playlist creation, and music discovery.',
    image: '/images/resources/music-organizer.jpg',
    rating: 4,
    difficulty: 'intermediate',
    estimatedTime: '5-6 hours',
    tags: ['python', 'tkinter', 'music', 'file-management', 'metadata'],
    links: [
      {
        type: 'source-code',
        url: 'https://github.com/yourusername/music-organizer',
        label: 'View Source Code'
      },
      {
        type: 'demo-video',
        url: 'https://youtube.com/watch?v=music-organizer-demo',
        label: 'Demo Video'
      }
    ]
  },

  {
    id: 13,
    category: 'python-apps',
    title: 'Password Generator & Manager',
    author: 'Cybersecurity Python Project',
    description: 'Secure password generation and management tool. Perfect introduction to cybersecurity concepts and secure coding practices.',
    image: '/images/resources/password-manager.jpg',
    rating: 5,
    difficulty: 'intermediate',
    estimatedTime: '4-6 hours',
    tags: ['python', 'security', 'encryption', 'cybersecurity', 'tkinter'],
    links: [
      {
        type: 'source-code',
        url: 'https://github.com/yourusername/password-manager',
        label: 'View Source Code'
      },
      {
        type: 'security-guide',
        url: '/tutorials/password-security-guide.pdf',
        label: 'Security Guide'
      }
    ]
  },*/

  // ==================== CYBERSECURITY CTF CHALLENGES ====================
  
  {
    id: 14,
    category: 'cybersecurity-ctf',
    title: 'HTML Detective Challenge',
    author: 'Web Security CTF',
    description: 'Students must find a hidden password in HTML source code to gain access to a protected area. Introduces web inspection tools and source code analysis.',
    image: '/images/resources/html-detective.jpg',
    rating: 4,
    difficulty: 'beginner',
    estimatedTime: '30 minutes',
    tags: ['html', 'web-security', 'source-code', 'devtools', 'inspection'],
    links: [
      {
        type: 'challenge-site',
        url: '/ctf/html-detective',
        label: 'Start Challenge'
      },
    ]
  },

  {
    id: 15,
    category: 'cybersecurity-ctf',
    title: 'Cookie Monster Challenge',
    author: 'Web Security CTF',
    description: 'Learn about browser cookies and session management by manipulating cookie values to gain admin access to a web application.',
    image: '/images/resources/cookie-monster.jpg',
    rating: 4,
    difficulty: 'beginner',
    estimatedTime: '45 minutes',
    tags: ['cookies', 'session-management', 'web-security', 'browser-storage'],
    links: [
      {
        type: 'challenge-site',
        url: '/ctf/cookie-monster',
        label: 'Start Challenge'
      }
    ]
  },

  {
    id: 16,
    category: 'cybersecurity-ctf',
    title: 'Cryptography Cipher Challenge',
    author: 'Cryptography CTF',
    description: 'Decode secret messages using various cipher techniques. Progress through Caesar ciphers, substitution ciphers, and modern encryption basics.',
    image: '/images/resources/cipher-challenge.jpg',
    rating: 4,
    difficulty: 'beginner',
    estimatedTime: '1-2 hours',
    tags: ['cryptography', 'ciphers', 'decryption', 'puzzle-solving'],
    links: [
      {
        type: 'cipher-tools',
        url: '/ctf/cipher-decoder',
        label: 'Online Cipher Tools'
      }
    ]
  },

  {
    id: 17,
    category: 'cybersecurity-ctf',
    title: 'Social Engineering Awareness Game',
    author: 'Human Factor Security CTF',
    description: 'Interactive scenarios teaching students to recognize and defend against social engineering attacks like phishing and pretexting.',
    image: '/images/resources/social-engineering.jpg',
    rating: 5,
    difficulty: 'beginner',
    estimatedTime: '45 minutes',
    tags: ['social-engineering', 'phishing', 'awareness', 'human-factors'],
    links: [
      {
        type: 'scenario-game',
        url: '/ctf/social-engineering-game',
        label: 'Start Awareness Game'
      },
      {
        type: 'awareness-guide',
        url: '/tutorials/social-engineering-awareness.pdf',
        label: 'Awareness Guide'
      }
    ]
  },

  {
    id: 18,
    category: 'cybersecurity-ctf',
    title: 'Inspect Element Treasure Hunt',
    author: 'Web Security CTF',
    description: 'Multi-level challenge where students find clues hidden in CSS styles, JavaScript comments, and HTML attributes using browser developer tools.',
    image: '/images/resources/inspect-element.jpg',
    rating: 4,
    difficulty: 'beginner',
    estimatedTime: '45 minutes',
    tags: ['html', 'css', 'javascript', 'devtools', 'web-inspection'],
    links: [
      {
        type: 'treasure-hunt',
        url: '/ctf/treasure-hunt',
        label: 'Start Treasure Hunt'
      },
      {
        type: 'devtools-guide',
        url: '/tutorials/browser-devtools.pdf',
        label: 'Developer Tools Guide'
      }
    ]
  },

  {
    id: 19,
    category: 'cybersecurity-ctf',
    title: 'URL Parameter Manipulation',
    author: 'Web Security CTF',
    description: 'Learn about URL parameters and how modifying them can change web application behavior. Practice safe parameter manipulation techniques.',
    image: '/images/resources/url-params.jpg',
    rating: 4,
    difficulty: 'beginner',
    estimatedTime: '30 minutes',
    tags: ['url-parameters', 'web-security', 'http-requests', 'get-parameters'],
    links: [
      {
        type: 'lab-site',
        url: '/ctf/url-parameter-lab',
        label: 'Start Lab'
      },
      {
        type: 'url-guide',
        url: '/tutorials/url-parameters.pdf',
        label: 'URL Parameters Guide'
      }
    ]
  },

  {
    id: 20,
    category: 'cybersecurity-ctf',
    title: 'Form Field Injection Challenge',
    author: 'Web Security CTF',
    description: 'Discover how hidden form fields can be modified to change application behavior. Learn about client-side security weaknesses.',
    image: '/images/resources/form-injection.jpg',
    rating: 3,
    difficulty: 'beginner',
    estimatedTime: '20 minutes',
    tags: ['forms', 'hidden-fields', 'client-side-security', 'html-manipulation'],
    links: [
      {
        type: 'form-challenge',
        url: '/ctf/form-injection',
        label: 'Start Challenge'
      },
      {
        type: 'form-security',
        url: '/tutorials/form-security.pdf',
        label: 'Form Security Guide'
      }
    ]
  },

  {
    id: 21,
    category: 'cybersecurity-ctf',
    title: 'Caesar Cipher Decoder Ring',
    author: 'Cryptography CTF',
    description: 'Interactive Caesar cipher challenge with varying shift values. Includes frequency analysis tools and hints for solving.',
    image: '/images/resources/caesar-cipher.jpg',
    rating: 4,
    difficulty: 'beginner',
    estimatedTime: '30-45 minutes',
    tags: ['caesar-cipher', 'cryptography', 'frequency-analysis', 'substitution'],
    links: [
      {
        type: 'cipher-challenge',
        url: '/ctf/caesar-cipher',
        label: 'Start Cipher Challenge'
      },
      {
        type: 'frequency-tool',
        url: '/tools/frequency-analyzer',
        label: 'Frequency Analysis Tool'
      }
    ]
  },

  {
    id: 22,
    category: 'cybersecurity-ctf',
    title: 'Base64 Encoding',
    author: 'Cryptography CTF',
    description: 'Learn about Base64 encoding through progressive challenges. Decode messages, images, and understand data encoding formats.',
    image: '/images/resources/base64.jpg',
    rating: 3,
    difficulty: 'beginner',
    estimatedTime: '25 minutes',
    tags: ['base64', 'encoding', 'data-formats', 'decoding'],
    links: [
      {
        type: 'encoding-challenge',
        url: '/ctf/base64-adventure',
        label: 'Start Adventure'
      },
      {
        type: 'base64-tool',
        url: '/tools/base64-decoder',
        label: 'Base64 Decoder Tool'
      }
    ]
  },

  {
    id: 23,
    category: 'cybersecurity-ctf',
    title: 'Phishing Email Detection',
    author: 'Social Engineering CTF',
    description: 'Interactive training to identify increasingly sophisticated phishing emails. Lookout for red flags and verification techniques.',
    image: '/images/resources/phishing-lab.jpg',
    rating: 5,
    difficulty: 'beginner',
    estimatedTime: '30 minutes',
    tags: ['phishing', 'email-security', 'social-engineering', 'awareness'],
    links: [
      {
        type: 'email-lab',
        url: '/ctf/phishing-detection-lab',
        label: 'Start Email Lab'
      }
    ]
  },
  
];