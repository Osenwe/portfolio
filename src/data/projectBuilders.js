// data/projectBuilders.js - Fixed version with proper syntax

import {
  AMAZON_LINKS,
  PLATFORM_LINKS,
  MATERIAL_SETS,
  QUICK_LINK_TEMPLATES,
  EMBEDDED_CONTENT,
  LEARNING_OUTCOMES,
  DIFFICULTY_LEVELS,
  TIME_ESTIMATES,
  RATINGS,
  FEATURE_SETS,
  TAG_SETS,
  AUTHORS,
  createMaterialsList,
  createQuickLinks,
  createLearningOutcomes,
  createFeaturesList,
  createTagsList
} from './projectConstants.js';

// ==================== ARDUINO PROJECT BUILDERS ====================

export const buildArduinoProject = ({
  id,
  title,
  difficulty = DIFFICULTY_LEVELS.BEGINNER,
  timeEstimate = TIME_ESTIMATES.MEDIUM_LONG,
  rating = RATINGS.VERY_GOOD,
  projectName, // for URLs
  sensors = [],
  actuators = [],
  displays = [],
  additionalMaterials = [],
  customFeatures = [],
  relatedProjects = []
}) => {
  const author = difficulty === DIFFICULTY_LEVELS.BEGINNER ? AUTHORS.ARDUINO_BEGINNER : 
                 difficulty === DIFFICULTY_LEVELS.INTERMEDIATE ? AUTHORS.ARDUINO_INTERMEDIATE : 
                 AUTHORS.ARDUINO_ADVANCED;

  let materials = [...MATERIAL_SETS.ARDUINO_BASIC];
  let learningOutcomes = [...LEARNING_OUTCOMES.ARDUINO_BASIC];
  let features = [...FEATURE_SETS.SENSOR_MONITORING];
  let tags = [...TAG_SETS.ARDUINO_BASIC];

  // Add sensor-specific materials and outcomes
  if (sensors.length > 0) {
    materials.push(...MATERIAL_SETS.SENSOR_BASIC);
    learningOutcomes.push(...LEARNING_OUTCOMES.ARDUINO_SENSORS);
    tags.push(...TAG_SETS.ARDUINO_SENSORS);
  }

  // Add display-specific materials and outcomes
  if (displays.length > 0) {
    materials.push(...MATERIAL_SETS.LCD_SETUP);
    learningOutcomes.push(...LEARNING_OUTCOMES.ARDUINO_DISPLAY);
    features.push(...FEATURE_SETS.LCD_INTERFACE);
    tags.push(...TAG_SETS.ARDUINO_DISPLAY);
  }

  // Add automation features for complex projects
  if (actuators.length > 0) {
    learningOutcomes.push(...LEARNING_OUTCOMES.ARDUINO_AUTOMATION);
    features.push(...FEATURE_SETS.AUTOMATION_CONTROL);
    tags.push(...TAG_SETS.ARDUINO_AUTOMATION);
  }

  return {
    id,
    category: 'arduino-projects',
    title,
    author,
    difficulty,
    estimatedTime: timeEstimate,
    rating,
    tags: createTagsList(tags),
    materials: createMaterialsList(materials, sensors, actuators, displays, additionalMaterials),
    quickLinks: createQuickLinks(
      QUICK_LINK_TEMPLATES.tinkercadCircuit(projectName)
    ),
    learningOutcomes: createLearningOutcomes(learningOutcomes),
    features: createFeaturesList(features, customFeatures),
    embeddedContent: EMBEDDED_CONTENT.tinkercadSim(projectName),
    relatedProjects
  };
};

// ==================== PYTHON PROJECT BUILDERS ====================

export const buildPythonProject = ({
  id,
  title,
  projectType = 'basic', // 'basic', 'apcsp', 'productivity', 'security'
  difficulty = DIFFICULTY_LEVELS.BEGINNER,
  timeEstimate = TIME_ESTIMATES.LONG,
  rating = RATINGS.VERY_GOOD,
  projectName, // for URLs
  libraries = ['tkinter'],
  customFeatures = [],
  relatedProjects = []
}) => {
  const authorMap = {
    'basic': AUTHORS.PYTHON_STUDENT,
    'apcsp': AUTHORS.PYTHON_APCSP,
    'productivity': AUTHORS.PYTHON_PRODUCTIVITY,
    'security': AUTHORS.PYTHON_SECURITY,
    'creative': AUTHORS.PYTHON_CREATIVE
  };

  let learningOutcomes = [...LEARNING_OUTCOMES.PYTHON_BASIC];
  let features = [...FEATURE_SETS.PYTHON_APP_BASIC];
  let tags = [...TAG_SETS.PYTHON_BASIC];

  // Add GUI-specific outcomes if using modern libraries
  if (libraries.includes('ttkbootstrap') || libraries.includes('tkinter')) {
    learningOutcomes.push(...LEARNING_OUTCOMES.PYTHON_GUI);
  }

  // Add data analysis features for advanced projects
  if (libraries.includes('matplotlib') || libraries.includes('pandas')) {
    features.push(...FEATURE_SETS.DATA_ANALYSIS);
    tags.push(...TAG_SETS.PYTHON_ADVANCED);
  }

  const materials = [
    { name: 'Python 3.8+', amazonLink: PLATFORM_LINKS.PYTHON_DOWNLOAD },
    { name: 'Code editor (VS Code recommended)', amazonLink: PLATFORM_LINKS.VS_CODE_DOWNLOAD }
  ];

  // Add library-specific materials
  if (libraries.includes('ttkbootstrap')) {
    materials.push({ name: 'ttkbootstrap library', amazonLink: PLATFORM_LINKS.PYPI_TTKBOOTSTRAP });
  }

  return {
    id,
    category: 'python-apps',
    title,
    author: authorMap[projectType],
    difficulty,
    estimatedTime: timeEstimate,
    rating,
    cost: 'Free (Python required)',
    tags: createTagsList(tags, libraries),
    materials,
    quickLinks: createQuickLinks(
      QUICK_LINK_TEMPLATES.pythonSource(projectName),
      QUICK_LINK_TEMPLATES.amazonProduct('Python Learning Resources', AMAZON_LINKS.PYTHON_AUTOMATE_BOOK)
    ),
    learningOutcomes: createLearningOutcomes(learningOutcomes),
    features: createFeaturesList(features, customFeatures),
    embeddedContent: EMBEDDED_CONTENT.iframeDemos(projectName),
    relatedProjects
  };
};

// ==================== CTF CHALLENGE BUILDERS ====================

export const buildCTFChallenge = ({
  id,
  title,
  challengeType = 'web', // 'web', 'crypto', 'social', 'forensics'
  difficulty = DIFFICULTY_LEVELS.BEGINNER,
  timeEstimate = TIME_ESTIMATES.SHORT,
  rating = RATINGS.VERY_GOOD,
  challengeName, // for URLs
  customFeatures = [],
  relatedProjects = []
}) => {
  const authorMap = {
    'web': AUTHORS.CTF_WEB,
    'crypto': AUTHORS.CTF_CRYPTO,
    'social': AUTHORS.CTF_SOCIAL,
    'forensics': AUTHORS.CTF_HUMAN
  };

  let learningOutcomes = [...LEARNING_OUTCOMES.CYBERSECURITY_BASIC];
  let features = [...FEATURE_SETS.CTF_CHALLENGE];
  let tags = [...TAG_SETS.CYBERSECURITY];

  // Add crypto-specific outcomes
  if (challengeType === 'crypto') {
    learningOutcomes.push(...LEARNING_OUTCOMES.CRYPTOGRAPHY_BASIC);
    tags.push(...TAG_SETS.CRYPTOGRAPHY);
  }

  return {
    id,
    category: 'cybersecurity-ctf',
    title,
    author: authorMap[challengeType],
    difficulty,
    estimatedTime: timeEstimate,
    rating,
    cost: 'Free',
    tags: createTagsList(tags),
    quickLinks: createQuickLinks(
      QUICK_LINK_TEMPLATES.ctfChallenge(challengeName),
      challengeType === 'web' ? 
        QUICK_LINK_TEMPLATES.amazonProduct('Web Security Books', AMAZON_LINKS.WEB_SECURITY_BOOK) :
        null
    ),
    learningOutcomes: createLearningOutcomes(learningOutcomes),
    features: createFeaturesList(features, customFeatures),
    embeddedContent: EMBEDDED_CONTENT.ctfEmbed(challengeName),
    relatedProjects
  };
};

// ==================== SPECIFIC COMPONENT BUILDERS ====================

export const buildSensorComponent = (sensorType) => {
  const sensorComponents = {
    'ultrasonic': {
      material: { name: 'HC-SR04 Ultrasonic Sensor', amazonLink: AMAZON_LINKS.ULTRASONIC_HC_SR04 },
      features: ['Distance measurement', 'Motion detection', 'Proximity sensing'],
      tags: ['ultrasonic', 'distance', 'proximity']
    },
    'temperature': {
      material: { name: 'DHT22 Temperature/Humidity Sensor', amazonLink: AMAZON_LINKS.DHT22_SENSOR },
      features: ['Temperature monitoring', 'Humidity tracking', 'Environmental sensing'],
      tags: ['dht22', 'temperature', 'humidity', 'environmental']
    },
    'light': {
      material: { name: 'Photoresistor (LDR)', amazonLink: AMAZON_LINKS.PHOTORESISTOR },
      features: ['Light level detection', 'Automatic brightness control', 'Day/night sensing'],
      tags: ['photoresistor', 'light-sensor', 'ambient-light']
    },
    'water': {
      material: { name: 'Water Level Sensor', amazonLink: AMAZON_LINKS.WATER_LEVEL_SENSOR },
      features: ['Water level monitoring', 'Liquid detection', 'Tank management'],
      tags: ['water-sensor', 'liquid-level', 'monitoring']
    }
  };

  return sensorComponents[sensorType] || null;
};

export const buildActuatorComponent = (actuatorType) => {
  const actuatorComponents = {
    'servo': {
      material: { name: 'SG90 Servo Motor', amazonLink: AMAZON_LINKS.SERVO_SG90 },
      features: ['Precise angle control', 'Smooth movement', 'Position feedback'],
      tags: ['servo', 'motor', 'positioning']
    },
    'pump': {
      material: { name: '5V Water Pump', amazonLink: AMAZON_LINKS.WATER_PUMP_5V },
      features: ['Fluid pumping', 'Automatic water control', 'Flow management'],
      tags: ['pump', 'water', 'fluid-control']
    },
    'buzzer': {
      material: { name: 'Active Buzzer', amazonLink: AMAZON_LINKS.BUZZER_ACTIVE },
      features: ['Audio alerts', 'Sound notifications', 'Alarm systems'],
      tags: ['buzzer', 'audio', 'alarm']
    },
    'relay': {
      material: { name: '5V Relay Module', amazonLink: AMAZON_LINKS.RELAY_MODULE_5V },
      features: ['High power switching', 'Electrical isolation', 'AC/DC control'],
      tags: ['relay', 'switching', 'power-control']
    }
  };

  return actuatorComponents[actuatorType] || null;
};

// ==================== PRESET PROJECT CONFIGURATIONS ====================

export const PRESET_CONFIGS = {
  // Arduino Presets
  SIMPLE_LED_PROJECT: {
    sensors: [],
    actuators: [],
    displays: [],
    additionalMaterials: [
      { name: 'LEDs (assorted)', amazonLink: AMAZON_LINKS.LED_5MM_ASSORTED },
      { name: '220Ω Resistors', amazonLink: AMAZON_LINKS.RESISTOR_220_OHM }
    ]
  },

  SENSOR_DISPLAY_PROJECT: {
    displays: MATERIAL_SETS.LCD_SETUP,
    additionalMaterials: MATERIAL_SETS.SENSOR_BASIC
  },

  AUTOMATION_PROJECT: {
    displays: MATERIAL_SETS.LCD_SETUP,
    additionalMaterials: [
      ...MATERIAL_SETS.SENSOR_BASIC,
      ...MATERIAL_SETS.CONSTRUCTION_BASIC,
      { name: '9V Battery Pack', amazonLink: AMAZON_LINKS.BATTERY_9V_PACK }
    ]
  },

  // Python Presets
  BASIC_GUI_APP: {
    libraries: ['tkinter'],
    customFeatures: ['Simple interface', 'Basic file operations']
  },

  ADVANCED_GUI_APP: {
    libraries: ['ttkbootstrap', 'matplotlib'],
    customFeatures: ['Modern interface', 'Data visualization', 'Export capabilities']
  },

  APCSP_PROJECT: {
    libraries: ['ttkbootstrap'],
    customFeatures: ['Algorithm demonstration', 'Data processing', 'User interaction']
  },

  // CTF Presets
  WEB_SECURITY_CHALLENGE: {
    customFeatures: ['Browser-based challenge', 'Developer tools usage', 'Source code analysis']
  },

  CRYPTO_CHALLENGE: {
    customFeatures: ['Cipher solving', 'Pattern recognition', 'Mathematical analysis']
  }
};

// ==================== BULK PROJECT BUILDER ====================

export const buildMultipleProjects = (projectConfigs) => {
  return projectConfigs.map(config => {
    switch (config.type) {
      case 'arduino':
        return buildArduinoProject(config);
      case 'python':
        return buildPythonProject(config);
      case 'ctf':
        return buildCTFChallenge(config);
      default:
        throw new Error(`Unknown project type: ${config.type}`);
    }
  });
};

// ==================== VALIDATION HELPERS ====================

export const validateProjectData = (project) => {
  const required = ['id', 'title', 'category', 'difficulty', 'tags'];
  const missing = required.filter(field => !project[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  if (project.relatedProjects && project.relatedProjects.includes(project.id)) {
    console.warn(`Project ${project.id} references itself in relatedProjects`);
  }
  
  return true;
};

export const validateAllProjects = (projects) => {
  const ids = new Set();
  const errors = [];
  
  projects.forEach(project => {
    try {
      validateProjectData(project);
      
      if (ids.has(project.id)) {
        errors.push(`Duplicate ID found: ${project.id}`);
      }
      ids.add(project.id);
      
    } catch (error) {
      errors.push(`Project ${project.id || 'unknown'}: ${error.message}`);
    }
  });
  
  if (errors.length > 0) {
    throw new Error(`Validation errors:\n${errors.join('\n')}`);
  }
  
  return true;
};