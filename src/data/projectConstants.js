// data/projectConstants.js - Centralized constants and reusable data

// ==================== AMAZON PRODUCT LINKS ====================
export const AMAZON_LINKS = {
  // Arduino Components
  ARDUINO_UNO: 'https://amazon.com/dp/B008GRTSV6',
  BREADBOARD: 'https://amazon.com/dp/B082VYXDF1',
  JUMPER_WIRES: 'https://amazon.com/dp/B077N58HFK',
  USB_CABLE: 'https://amazon.com/dp/B00NH13S44',
  
  // Resistors
  RESISTOR_220_OHM: 'https://amazon.com/dp/B072BL2VX1',
  RESISTOR_10K_OHM: 'https://amazon.com/dp/B072BL2VX1',
  RESISTOR_ASSORTED: 'https://amazon.com/dp/B072BL2VX1',
  
  // LEDs and Displays
  LED_5MM_ASSORTED: 'https://amazon.com/dp/B077XGF3YR',
  LCD_16X2: 'https://amazon.com/dp/B01GPUMP9C',
  POTENTIOMETER_10K: 'https://amazon.com/dp/B07S69443J',
  
  // Sensors
  DHT22_SENSOR: 'https://amazon.com/dp/B01N9BA0O4',
  ULTRASONIC_HC_SR04: 'https://amazon.com/dp/B01JG09DCK',
  PHOTORESISTOR: 'https://amazon.com/dp/B01N7V536K',
  WATER_LEVEL_SENSOR: 'https://amazon.com/dp/B07THDH7Y4',
  
  // Motors and Actuators
  SERVO_SG90: 'https://amazon.com/dp/B07MLR1498',
  WATER_PUMP_5V: 'https://amazon.com/dp/B01M0E90HM',
  BUZZER_ACTIVE: 'https://amazon.com/dp/B07DQBHP4F',
  
  // Power and Control
  RELAY_MODULE_5V: 'https://amazon.com/dp/B00VRUAHLE',
  BATTERY_9V_PACK: 'https://amazon.com/dp/B00ZWJQZHA',
  POWER_JACK: 'https://amazon.com/dp/B01J1WZENK',
  POWER_SUPPLY_12V: 'https://amazon.com/dp/B01GEA8PQA',
  
  // Storage and Logging
  SD_CARD_MODULE: 'https://amazon.com/dp/B009QZV0UW',
  MICRO_SD_CARD: 'https://amazon.com/dp/B073JYVKNX',
  
  // Construction Materials
  CARDBOARD_SHEETS: 'https://amazon.com/dp/B01MQGKB4Q',
  HOT_GLUE_GUN: 'https://amazon.com/dp/B01178RVI2',
  SMALL_HINGES: 'https://amazon.com/dp/B07F72KTBP',
  CRAFT_KNIFE: 'https://amazon.com/dp/B005KRSWM6',
  AQUARIUM_TUBING: 'https://amazon.com/dp/B01JJ7LM8W',
  WATER_CONTAINER: 'https://amazon.com/dp/B01HZJP3Y2',
  PUSH_BUTTONS: 'https://amazon.com/dp/B07C7211PJ',
  
  // Learning Resources
  PYTHON_AUTOMATE_BOOK: 'https://www.w3schools.com/python/',
  WEB_SECURITY_BOOK: 'https://amazon.com/dp/1118026470'
};

// ==================== EXTERNAL PLATFORM LINKS ====================
export const PLATFORM_LINKS = {
  // Code Repositories
  GITHUB_BASE: 'https://github.com/yourusername',
  CODEHS_BASE: 'https://codehs.com/sandbox',
  
  // Simulation Platforms
  TINKERCAD_BASE: 'https://www.tinkercad.com/things',
  TINKERCAD_EMBED_BASE: 'https://www.tinkercad.com/embed',
  
  // Development Tools
  PYTHON_DOWNLOAD: 'https://python.org/downloads',
  VS_CODE_DOWNLOAD: 'https://code.visualstudio.com/',
  PYPI_TTKBOOTSTRAP: 'https://pypi.org/project/ttkbootstrap/',
  
  // Internal CTF Challenges
  CTF_BASE: '/ctf',
  TUTORIALS_BASE: '/tutorials',
  TOOLS_BASE: '/tools',
  DOWNLOADS_BASE: '/downloads'
};

// ==================== COMMON MATERIALS LISTS ====================
export const MATERIAL_SETS = {
  // Basic Arduino kit
  ARDUINO_BASIC: [
    { name: 'Arduino Uno R3', amazonLink: AMAZON_LINKS.ARDUINO_UNO },
    { name: 'Breadboard', amazonLink: AMAZON_LINKS.BREADBOARD },
    { name: 'Jumper Wires', amazonLink: AMAZON_LINKS.JUMPER_WIRES },
    { name: 'USB Cable', amazonLink: AMAZON_LINKS.USB_CABLE }
  ],
  
  // LED Project basics
  LED_BASIC: [
    { name: 'LED (5mm)', amazonLink: AMAZON_LINKS.LED_5MM_ASSORTED },
    { name: '100Ω Resistor', amazonLink: AMAZON_LINKS.RESISTOR_220_OHM }
  ],
  
  // LCD Display setup
  LCD_SETUP: [
    { name: '16x2 LCD Display', amazonLink: AMAZON_LINKS.LCD_16X2 }
  ],
  
  // Sensor basics
  SENSOR_BASIC: [
    // { name: '10kΩ Resistor', amazonLink: AMAZON_LINKS.RESISTOR_10K_OHM }
  ],
  
  // Construction materials
  CONSTRUCTION_BASIC: [
    { name: 'Cardboard Sheets', amazonLink: AMAZON_LINKS.CARDBOARD_SHEETS },
    { name: 'Hot Glue Gun & Sticks', amazonLink: AMAZON_LINKS.HOT_GLUE_GUN },
    { name: 'Craft Knife', amazonLink: AMAZON_LINKS.CRAFT_KNIFE }
  ]
};

// ==================== QUICK LINKS TEMPLATES ====================
export const QUICK_LINK_TEMPLATES = {
  // Tinkercad circuit links
  tinkercadCircuit: (projectName) => ({
    type: 'tinkercad',
    label: 'View Circuit on Tinkercad',
    url: `${PLATFORM_LINKS.TINKERCAD_BASE}/${projectName}`
  }),
  
  // GitHub code links
  githubCode: (projectName) => ({
    type: 'codehs',
    label: 'Get Complete Code',
    url: `${PLATFORM_LINKS.CODEHS_BASE}/arduino/${projectName}`
  }),
  
  // CTF challenge links
  ctfChallenge: (challengeName) => ({
    type: 'codehs',
    label: 'Start Challenge',
    url: `${PLATFORM_LINKS.CTF_BASE}/${challengeName}`
  }),
  
  // Python source code
  pythonSource: (projectName) => ({
    type: 'codehs',
    label: 'View Source Code',
    url: `${PLATFORM_LINKS.CODEHS_BASE}/${projectName}`
  }),
  
  // Amazon product recommendation
  amazonProduct: (productName, link) => ({
    type: 'amazon',
    label: productName,
    url: link
  })
};

// ==================== EMBEDDED CONTENT TEMPLATES ====================
export const EMBEDDED_CONTENT = {
  tinkercadSim: (projectName) => ({
    type: 'tinkercad',
    url: `${PLATFORM_LINKS.TINKERCAD_EMBED_BASE}/${projectName}`
  }),
  
  iframeDemos: (demoPath) => ({
    type: 'iframe',
    url: `/demos/${demoPath}`
  }),
  
  ctfEmbed: (challengeName) => ({
    type: 'iframe',
    url: `${PLATFORM_LINKS.CTF_BASE}/${challengeName}/embed`
  })
};

// ==================== LEARNING OUTCOMES TEMPLATES ====================
export const LEARNING_OUTCOMES = {
  ARDUINO_BASIC: [
    'Understanding digital pin outputs',
    'Using delay() functions for timing',
    'Creating loops and sequences',
    'Basic circuit building',
    'Arduino IDE fundamentals',
    'Troubleshooting common issues'
  ],
  
  ARDUINO_SENSORS: [
    'Analog sensor reading and processing',
    'Sensor calibration techniques',
    'Data validation',
    'Serial monitor for debugging'
  ],
  
  ARDUINO_DISPLAY: [
    'LCD display programming and control',
    'Real-time data monitoring'
  ],
  
  ARDUINO_AUTOMATION: [
    'State machine programming',
    'Automated control systems',
  ],
  
  PYTHON_BASIC: [
    'Algorithm development and optimization',
    'Data validation and error handling',
    'User experience design principles'
  ],
  
  PYTHON_GUI: [
    'GUI programming with ttkbootstrap',
    'Event-driven programming',
    'Modern interface design',
    'User input validation'
  ],
  
  CYBERSECURITY_BASIC: [
    'Browser developer tools navigation',
    'Security researcher mindset',
    'Basic digital forensics concepts',
    'Understanding client-side security flaws'
  ],
  
  CRYPTOGRAPHY_BASIC: [
    'Understanding encryption principles',
    'Pattern recognition in ciphers',
    'Data encoding and decoding',
    'Historical cryptography methods'
  ]
};

// ==================== DIFFICULTY AND TIME ESTIMATES ====================
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

export const TIME_ESTIMATES = {
  SHORT: '30 minutes',
  MEDIUM_SHORT: '45 minutes',
  MEDIUM: '1-2 hours',
  MEDIUM_LONG: '2-3 hours',
  LONG: '3-4 hours',
  VERY_LONG: '4-6 hours',
  PROJECT: '6-8 hours'
};

// ==================== RATING SYSTEM ====================
export const RATINGS = {
  GOOD: 3,
  VERY_GOOD: 4,
  EXCELLENT: 5
};

// ==================== COMMON FEATURES LISTS ====================
export const FEATURE_SETS = {
  SENSOR_MONITORING: [
    'Real-time sensor data display',
    'Data validation and error handling',
    'Serial monitor output',
    'Adjustable refresh rates'
  ],
  
  LCD_INTERFACE: [
    'Real-time data updates',
    'User-friendly information layout',
    'Status indicators'
  ],
  
  AUTOMATION_CONTROL: [
    'Automatic operation mode'
  ],
  
  PYTHON_APP_BASIC: [
    'Modern GUI interface',
    'Input validation and error handling'
  ],
  
  DATA_ANALYSIS: [
    'Statistical analysis features',
    'Data visualization',
    'Export to multiple formats',
    'Historical data tracking'
  ],
  
  CTF_CHALLENGE: [
    'Progressive difficulty levels',
    'Instant feedback system'
  ]
};

// ==================== COMMON TAGS ====================
export const TAG_SETS = {
  ARDUINO_BASIC: ['arduino', 'beginner', 'electronics'],
  ARDUINO_SENSORS: ['arduino', 'sensor', 'monitoring'],
  ARDUINO_DISPLAY: ['arduino', 'lcd', 'display'],
  ARDUINO_AUTOMATION: ['arduino', 'automation'],
  PYTHON_BASIC: ['python', 'gui', 'beginner'],
  PYTHON_ADVANCED: ['python', 'data-analysis', 'visualization'],
  CYBERSECURITY: ['cybersecurity', 'web-security', 'ethical-hacking'],
  CRYPTOGRAPHY: ['cryptography', 'encryption', 'puzzle-solving']
};

// ==================== AUTHORS/CATEGORIES ====================
export const AUTHORS = {
  ARDUINO_BEGINNER: 'Beginner Arduino Project',
  ARDUINO_INTERMEDIATE: 'Intermediate Arduino Project',
  ARDUINO_ADVANCED: 'Advanced Arduino Project',
  PYTHON_APCSP: 'APCSP Create Task Project',
  PYTHON_STUDENT: 'Student-Friendly Python Project',
  PYTHON_PRODUCTIVITY: 'Productivity App for Students',
  PYTHON_CREATIVE: 'Creative Python Project',
  PYTHON_SECURITY: 'Cybersecurity Python Project',
  CTF_WEB: 'Web Security CTF',
  CTF_CRYPTO: 'Cryptography CTF',
  CTF_SOCIAL: 'Social Engineering CTF',
  CTF_HUMAN: 'Human Factor Security CTF'
};

// ==================== HELPER FUNCTIONS ====================
export const createMaterialsList = (...materialSets) => {
  return materialSets.flat();
};

export const createQuickLinks = (...linkTemplates) => {
  return linkTemplates.filter(Boolean);
};

export const createLearningOutcomes = (...outcomeSets) => {
  return outcomeSets.flat();
};

export const createFeaturesList = (...featureSets) => {
  return featureSets.flat();
};

export const createTagsList = (...tagSets) => {
  return [...new Set(tagSets.flat())]; // Remove duplicates
};