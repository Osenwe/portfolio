// data/projectDetailsData.js - Complete refactored version
import {
  assets
 } from '@/assets/assets'


import {
  buildArduinoProject,
  buildPythonProject,
  buildCTFChallenge,
  buildSensorComponent,
  buildActuatorComponent,
  PRESET_CONFIGS,
  validateAllProjects
} from './projectBuilders.js';

import {
  DIFFICULTY_LEVELS,
  TIME_ESTIMATES,
  RATINGS,
  AMAZON_LINKS,
  PLATFORM_LINKS
} from './projectConstants.js';

// ==================== PROJECT DEFINITIONS ====================

// Helper function to create detailed project data
const createDetailedProject = (baseProject, customData) => {
  return {
    ...baseProject,
    ...customData,
    // Ensure instructions array exists
    instructions: customData.instructions || [],
    // Add default image path if not provided
    image: customData.image || `/images/resources/${baseProject.projectName || 'default'}.jpg`
  };
};

// ==================== ARDUINO PROJECTS ====================

const project1 = createDetailedProject(
  buildArduinoProject({
    id: 1,
    title: 'LED Traffic Light System',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.MEDIUM,
    projectName: 'hkOtm2PTHTd-trafficlight?sharecode=hm36Uxh0kkzwqYYmA-yS8oX-1R-CuUqoAenmSUWen9I',
    additionalMaterials: [
      { name: 'Red LED (5mm)', amazonLink: AMAZON_LINKS.LED_5MM_ASSORTED },
      { name: 'Yellow LED (5mm)', amazonLink: AMAZON_LINKS.LED_5MM_ASSORTED },
      { name: 'Green LED (5mm)', amazonLink: AMAZON_LINKS.LED_5MM_ASSORTED },
      { name: '3x 100Ω Resistors', amazonLink: AMAZON_LINKS.RESISTOR_220_OHM }
    ],
    customFeatures: [
      'Realistic traffic light timing sequences',
      'Three-color LED control',
      'Customizable timing intervals'
    ],
    relatedProjects: [2, 5]
  }),
  {
    description: 'Build a realistic traffic light system with timed sequences. Great introduction to Arduino programming, digital outputs, and timing functions.',
    overview: `Learn the fundamentals of Arduino programming by building your own traffic light system! This project introduces you to digital outputs, timing functions, and basic programming logic.

The traffic light system will cycle through realistic timing sequences just like real traffic lights. You'll learn how to control LEDs, use delay functions, and create repeating loops.

This is perfect for beginners who want hands-on experience with Arduino while building something practical and fun. The concepts you learn here will be the foundation for more advanced projects.`,
    image: assets.traffic_light,
    cost: '$20-45',
    instructions: [
      {
        title: 'Set Up the Circuit',
        description: 'Connect the LEDs to digital pins 13 (Red), 12 (Yellow), and 11 (Green). Each LED needs a 100Ω resistor in series to limit current.',
        image: '/images/tutorials/traffic-light-circuit.jpg'
      },
      {
        title: 'Write the Basic Code',
        description: 'Start with defining pin numbers and setting them as outputs in the setup() function.',
        code: `cconst int redBulbPin = 13; 
const int yellowBulbPin = 12; 
const int blueBulbPin = 8;
int delay_time = 2000;

void setup()
{
  
  pinMode(redBulbPin, OUTPUT);
  pinMode(yellowBulbPin, OUTPUT);
  pinMode(blueBulbPin, OUTPUT);
}`
      },
      {
        title: 'Create the Traffic Light Sequence',
        description: 'In the loop() function, create a realistic traffic light sequence with proper timing.',
        code: `void loop()
{
  digitalWrite(redBulbPin, HIGH);
  digitalWrite(yellowBulbPin, LOW);
  digitalWrite(blueBulbPin, LOW);
  delay(delay_time * 2); // Wait for 4000 millisecond(s)
  
  digitalWrite(redBulbPin, LOW);
  digitalWrite(yellowBulbPin, HIGH);
  digitalWrite(blueBulbPin, LOW);
  delay(delay_time); // Wait for 2000 millisecond(s)
  
  digitalWrite(redBulbPin, LOW);
  digitalWrite(yellowBulbPin, LOW);
  digitalWrite(blueBulbPin, HIGH);
  delay(delay_time * 2); // Wait for 4000 millisecond(s)
}
}`
      },
      {
        title: 'Upload and Test',
        description: 'Upload the code to your Arduino and observe the traffic light sequence. Adjust timing as needed.',
        image: '/images/tutorials/traffic-light-working.jpg'
      },
      {
        title: 'Sample Code When Using Pyfirmata',
        description: 'Pyfirmata is a python library that allows us to use python code to control an arduni board',
        code: `# TRAFFIC LIGHT CONTROL USING PYFIRMATA
# CODE BY ANDREW BENYEOGOR
# 09/01/2024
#####################

from pyfirmata import Arduino, util
from time import sleep

# Replace 'COM3' with actual port you see on the PC 
board = Arduino('COM3')

# Define pins
red = board.get_pin('d:13:o')     # digital pin 13 as OUTPUT
yellow = board.get_pin('d:12:o')  # digital pin 12 as OUTPUT
blue = board.get_pin('d:8:o')     # digital pin 8 as OUTPUT

delay_time = 2  # seconds

def set_lights(r=False, y=False, b=False):
    red.write(1 if r else 0)
    yellow.write(1 if y else 0)
    blue.write(1 if b else 0)

while True:
    set_lights(r=True)
    sleep(delay_time * 2)

    set_lights(y=True)
    sleep(delay_time)

    set_lights(b=True)
    sleep(delay_time * 2)
`  }
    ]
  }
);

const project2 = createDetailedProject(
  buildArduinoProject({
    id: 2,
    title: 'Ultrasonic Distance Sensor Alarm',
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeEstimate: TIME_ESTIMATES.MEDIUM,
    projectName: 'aHj3s2g4oRp-ultrasonicsensors?sharecode=X9ijsSIJW_NL0aQLN-A8-8gzdi5sootwlHJwe1MRVS8',
    sensors: [
      { name: 'HC-SR04 Ultrasonic Sensor', amazonLink: AMAZON_LINKS.ULTRASONIC_HC_SR04 }
    ],
    actuators: [
    ],
    additionalMaterials: [
      { name: 'Red LED', amazonLink: AMAZON_LINKS.LED_5MM_ASSORTED },
      { name: '100Ω Resistor', amazonLink: AMAZON_LINKS.RESISTOR_220_OHM }
    ],
    customFeatures: [
      'Adjustable sensitivity control',
      'Visual and audio alerts',
      'Distance measurement display',
      'Serial monitor output'
    ],
    relatedProjects: [1, 4, 6]
  }),
  {
    description: 'Create a proximity alarm system using an ultrasonic sensor. Features adjustable sensitivity and both visual and audio alerts.',
    overview: `Build a sophisticated proximity alarm system using ultrasonic technology! This project teaches you how to work with sensors, process analog data, and create responsive alert systems.

The HC-SR04 ultrasonic sensor works like sonar, sending out sound waves and measuring the time it takes for them to bounce back. You'll learn how to convert this timing data into distance measurements.

This project includes both visual (LED) and audio (buzzer) alerts, with adjustable sensitivity using a potentiometer. It's perfect for security applications, parking sensors, or robotics projects.`,
    image: assets.ultrasound,
    cost: '$25-30',
    instructions: [
      {
        title: 'Wire the Ultrasonic Sensor',
        description: 'Connect VCC to 5V, GND to ground, Trig to pin 7, and Echo to pin 6. The sensor needs clean power connections.',
        image: assets.ultrasound
      },
      {
        title: 'Add Alarm Components',
        description: 'Connect the buzzer to pin 8, LED to pin 13 with a resistor, and potentiometer to A0 for sensitivity adjustment.',
        code: `const int trigPin = 7;     // Trig pin of the ultrasonic sensor
const int echoPin = 8;     // Echo pin of the ultrasonic sensor
const int ledPin = 13;     // Pin for the LED indicator
const int delayTime = 100;


void setup() {
  // Initialize serial communication
  Serial.begin(9600);

  // Configure pins
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);
}`
      },
      {
        title: 'Write Distance Measurement Code',
        description: 'Create a function to measure distance using the ultrasonic sensor timing method.',
        code: `void loop() {
  float duration;
  float distance;

  // Trigger the sensor
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Measure the duration of the echo signal
  duration = pulseIn(echoPin, HIGH);

  // Convert duration to distance
  distance = (duration * 0.0343 ) / 2;

  // LED indicator for close objects
  if (distance < 5) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }

  // Print results to the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);

  // Delay for stability
  delay(100);
}`
      }
    ]
  }
);

const project3 = createDetailedProject(
  buildArduinoProject({
    id: 3,
    title: 'Temperature & Humidity Monitor with LCD',
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeEstimate: TIME_ESTIMATES.MEDIUM,
    projectName: 'temp-humidity-monitor',
    sensors: [
      { name: 'DHT22 Temperature/Humidity Sensor', amazonLink: AMAZON_LINKS.DHT22_SENSOR }
    ],
    displays: [
      { name: '16x2 LCD Display', amazonLink: AMAZON_LINKS.LCD_16X2 }
    ],
    additionalMaterials: [
      { name: '10kΩ Pull-up Resistor', amazonLink: AMAZON_LINKS.RESISTOR_10K_OHM },
      { name: 'SD Card Module (optional)', amazonLink: AMAZON_LINKS.SD_CARD_MODULE },
      { name: 'MicroSD Card', amazonLink: AMAZON_LINKS.MICRO_SD_CARD }
    ],
    customFeatures: [
      'Environmental monitoring',
      'Data logging capabilities',
      'Min/max value tracking',
      'Multi-screen display'
    ],
    relatedProjects: [1, 2, 4, 6]
  }),
  {
    description: 'Monitor environmental conditions using a DHT22 sensor and display readings on an LCD screen. Includes data logging capabilities.',
    overview: `Build a professional environmental monitoring station that tracks temperature and humidity in real-time! This project introduces you to working with sensors, LCD displays, and data logging.

The DHT22 sensor provides accurate temperature and humidity readings, while the 16x2 LCD display shows current conditions and historical data. You'll learn about sensor calibration, data validation, and user interface design.

This project is perfect for understanding how environmental monitoring systems work in buildings, greenhouses, or weather stations. The skills you learn here apply to IoT projects, home automation, and scientific data collection.`,
    image: '/images/resources/temp-humidity-monitor.jpg',
    cost: '$30-40'
  }
);

const project4 = createDetailedProject(
  buildArduinoProject({
    id: 4,
    title: 'Smart Automated Bin System',
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeEstimate: TIME_ESTIMATES.LONG,
    projectName: 'smart-bin-system',
    sensors: [
      { name: 'HC-SR04 Ultrasonic Sensor', amazonLink: AMAZON_LINKS.ULTRASONIC_HC_SR04 }
    ],
    actuators: [
      { name: 'SG90 Servo Motor', amazonLink: AMAZON_LINKS.SERVO_SG90 }
    ],
    displays: [
      { name: '16x2 LCD Display', amazonLink: AMAZON_LINKS.LCD_16X2 },
      { name: '10kΩ Potentiometer', amazonLink: AMAZON_LINKS.POTENTIOMETER_10K }
    ],
    additionalMaterials: [
      { name: '220Ω Resistors (x3)', amazonLink: AMAZON_LINKS.RESISTOR_220_OHM },
      { name: 'Cardboard Sheets', amazonLink: AMAZON_LINKS.CARDBOARD_SHEETS },
      { name: 'Hot Glue Gun & Sticks', amazonLink: AMAZON_LINKS.HOT_GLUE_GUN },
      { name: '9V Battery Pack', amazonLink: AMAZON_LINKS.BATTERY_9V_PACK },
      { name: 'Power Jack Connector', amazonLink: AMAZON_LINKS.POWER_JACK },
      { name: 'Small Hinges for Lid', amazonLink: AMAZON_LINKS.SMALL_HINGES },
      { name: 'Craft Knife', amazonLink: AMAZON_LINKS.CRAFT_KNIFE }
    ],
    customFeatures: [
      'Automatic lid opening/closing',
      'Real-time distance display',
      'LED status indicators',
      'Manual override mode',
      'Safety features'
    ],
    relatedProjects: [2, 3, 6]
  }),
  {
    description: 'Automated smart trash bin with ultrasonic motion detection, servo-controlled lid opening, and LCD display showing distance measurements. Opens automatically when someone approaches and displays real-time proximity data.',
    overview: `Build an intelligent waste management system that opens automatically when someone approaches! This project combines multiple sensors and actuators to create a touchless, hygienic solution perfect for kitchens, offices, or public spaces.

The system uses an ultrasonic sensor to detect approaching people, a servo motor to smoothly open and close the lid, and an LCD display to show real-time distance measurements and system status. You'll learn about sensor fusion, mechanical control, and user interface design.

This project demonstrates practical IoT applications, introduces automation concepts, and can be enhanced with features like fill-level monitoring, data logging, and smartphone connectivity. It's perfect for understanding how smart home devices work.`,
    image: '/images/resources/smart-bin.jpg',
    cost: '$35-45'
  }
);

const project5 = createDetailedProject(
  buildArduinoProject({
    id: 5,
    title: 'Smart Light Sensor LED Controller',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.MEDIUM,
    projectName: 'light-sensor-led',
    sensors: [
      { name: 'Photoresistor (LDR)', amazonLink: AMAZON_LINKS.PHOTORESISTOR }
    ],
    additionalMaterials: [
      { name: 'LED (5mm or 10mm)', amazonLink: AMAZON_LINKS.LED_5MM_ASSORTED },
      { name: '10kΩ Resistor', amazonLink: AMAZON_LINKS.RESISTOR_10K_OHM },
      { name: '220Ω Resistor', amazonLink: AMAZON_LINKS.RESISTOR_220_OHM },
      { name: '10kΩ Potentiometer', amazonLink: AMAZON_LINKS.POTENTIOMETER_10K }
    ],
    customFeatures: [
      'Automatic brightness control',
      'Multiple lighting modes',
      'Sensitivity adjustment',
      'PWM output control'
    ],
    relatedProjects: [1, 2, 3, 6]
  }),
  {
    description: 'Automatic LED lighting system that responds to ambient light levels. LED brightness adjusts based on light sensor readings - perfect for night lights or automatic room lighting.',
    overview: `Create an intelligent lighting system that automatically adjusts to ambient light conditions! This project teaches you about analog sensors, PWM output, and responsive control systems.

Using a photoresistor (Light Dependent Resistor), the system measures ambient light levels and automatically controls LED brightness. When it gets dark, the LED brightness increases, and when it's bright, the LED dims or turns off completely.

This project demonstrates fundamental concepts used in smart home lighting, automatic street lights, and energy-efficient building systems. You'll learn about sensor calibration, analog-to-digital conversion, and smooth control algorithms.`,
    image: '/images/resources/light-sensor-led.jpg',
    cost: '$15-25'
  }
);

const project6 = createDetailedProject(
  buildArduinoProject({
    id: 6,
    title: 'Water Level Monitor & Pump Controller',
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeEstimate: TIME_ESTIMATES.MEDIUM_LONG,
    projectName: 'water-level-pump',
    sensors: [
      { name: 'Water Level Sensor', amazonLink: AMAZON_LINKS.WATER_LEVEL_SENSOR }
    ],
    actuators: [
      { name: '5V Water Pump', amazonLink: AMAZON_LINKS.WATER_PUMP_5V },
      { name: 'Relay Module (5V)', amazonLink: AMAZON_LINKS.RELAY_MODULE_5V }
    ],
    displays: [
      { name: '16x2 LCD Display', amazonLink: AMAZON_LINKS.LCD_16X2 },
      { name: '10kΩ Potentiometer', amazonLink: AMAZON_LINKS.POTENTIOMETER_10K }
    ],
    additionalMaterials: [
      { name: 'LEDs (Red, Green, Yellow)', amazonLink: AMAZON_LINKS.LED_5MM_ASSORTED },
      { name: '220Ω Resistors (x3)', amazonLink: AMAZON_LINKS.RESISTOR_220_OHM },
      { name: 'Push Buttons (x2)', amazonLink: AMAZON_LINKS.PUSH_BUTTONS },
      { name: 'Water Container', amazonLink: AMAZON_LINKS.WATER_CONTAINER },
      { name: 'Aquarium Tubing', amazonLink: AMAZON_LINKS.AQUARIUM_TUBING },
      { name: '12V Power Supply', amazonLink: AMAZON_LINKS.POWER_SUPPLY_12V }
    ],
    customFeatures: [
      'Automatic pump control',
      'Water level monitoring',
      'Safety features and alarms',
      'Hysteresis control algorithm'
    ],
    relatedProjects: [2, 3, 4, 5]
  }),
  {
    description: 'Smart water management system with level sensing and automatic pump control. Features LCD display, adjustable thresholds, and overflow protection.',
    overview: `Build a comprehensive water management system that automatically monitors water levels and controls pumps for filling or draining! This project teaches you about fluid sensors, relay control, and automated system design.

The system continuously monitors water levels using a water level sensor, displays real-time information on an LCD, and automatically controls pumps to maintain desired water levels. You'll learn about hysteresis control, safety systems, and industrial automation principles.

Perfect for applications like automatic plant watering, aquarium management, water tank monitoring, or any system requiring precise water level control. This project demonstrates real-world automation concepts used in industrial and agricultural systems.`,
    image: '/images/resources/water-level-pump.jpg',
    cost: '$40-55'
  }
);

// ==================== PYTHON PROJECTS ====================

const project7 = createDetailedProject(
  buildPythonProject({
    id: 7,
    title: 'Leap Year Calculator Pro',
    projectType: 'apcsp',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.MEDIUM,
    projectName: 'leap-year-calculator',
    libraries: ['ttkbootstrap'],
    customFeatures: [
      'Calculate individual leap years',
      'Generate leap year ranges',
      'Statistical analysis of patterns',
      'Export to CSV and TXT formats',
      'Modern, responsive interface'
    ],
    relatedProjects: [8, 9, 10]
  }),
  {
    description: 'Advanced leap year calculator that generates lists of leap years between any two given years. Features data export, statistical analysis, and modern GUI with ttkbootstrap.',
    overview: `Create a comprehensive leap year calculator that goes far beyond basic calculations! This project demonstrates algorithm development, data analysis, and modern GUI design principles.

Your calculator will not only determine if individual years are leap years, but also generate complete lists of leap years within any date range. The application includes statistical analysis features and professional data export capabilities.

This project is perfect for the APCSP Create Task, showcasing computational thinking, data representation, and user interface design. You'll work with mathematical algorithms, file I/O, and data visualization.`,
    image: '/images/resources/leap-year-calc.jpg',
    cost: 'Free (Python required)'
  }
);

const project8 = createDetailedProject(
  buildPythonProject({
    id: 8,
    title: 'Digital Recipe Manager',
    projectType: 'apcsp',
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeEstimate: TIME_ESTIMATES.PROJECT,
    projectName: 'recipe-manager',
    libraries: ['ttkbootstrap', 'json'],
    customFeatures: [
      'Recipe database management',
      'Ingredient tracking',
      'Meal planning features',
      'Nutrition calculations',
      'Recipe sharing capabilities'
    ],
    relatedProjects: [7, 9, 11]
  }),
  {
    description: 'Comprehensive recipe management system with ingredient tracking, meal planning, and nutrition calculations. Perfect for organizing family recipes.',
    overview: `Build a complete digital cookbook that helps organize, search, and manage your favorite recipes! This project teaches database concepts, CRUD operations, and practical application development.

The recipe manager allows you to store recipes with ingredients, instructions, nutritional information, and photos. You can search by ingredients, create meal plans, generate shopping lists, and even calculate nutritional values for your meals.

This project demonstrates real-world software development practices and is perfect for learning about data structures, file management, and user interface design. It's also great for the APCSP Create Task with clear data representation and algorithm implementation.`,
    image: '/images/resources/recipe-manager.jpg',
    cost: 'Free (Python required)'
  }
);

const project9 = createDetailedProject(
  buildPythonProject({
    id: 9,
    title: 'Student GPA Calculator & Tracker',
    projectType: 'apcsp',
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeEstimate: TIME_ESTIMATES.PROJECT,
    projectName: 'gpa-calculator',
    libraries: ['ttkbootstrap', 'matplotlib'],
    customFeatures: [
      'Grade tracking across semesters',
      'GPA calculations (weighted and unweighted)',
      'Progress visualization with charts',
      'Academic goal setting',
      'Transcript generation'
    ],
    relatedProjects: [7, 8, 10]
  }),
  {
    description: 'Complete GPA management system for students. Track grades across multiple semesters, visualize progress, and generate academic reports.',
    overview: `Create a comprehensive academic tracking system that helps students monitor their grades and calculate their GPA! This project teaches data analysis, visualization, and educational software development.

The GPA calculator tracks individual assignments, tests, and courses across multiple semesters. It calculates both weighted and unweighted GPAs, shows progress over time with charts and graphs, and helps students set and track academic goals.

Perfect for students who want to stay organized academically while learning programming concepts. The project demonstrates data persistence, mathematical calculations, and data visualization - ideal for APCSP portfolio projects.`,
    image: '/images/resources/gpa-calculator.jpg',
    cost: 'Free (Python required)'
  }
);

const project10 = createDetailedProject(
  buildPythonProject({
    id: 10,
    title: 'Personal Finance Tracker',
    projectType: 'basic',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.LONG,
    projectName: 'finance-tracker',
    libraries: ['tkinter'],
    customFeatures: [
      'Expense tracking and categorization',
      'Budget management and alerts',
      'Savings goals with progress tracking',
      'Financial reports and summaries',
      'Data visualization with charts'
    ],
    relatedProjects: [7, 9, 11]
  }),
  {
    description: 'Simple yet powerful expense tracking app perfect for teenagers learning money management. Features budgeting, savings goals, and spending analysis.',
    overview: `Build a practical personal finance application that helps track expenses, manage budgets, and achieve savings goals! This project teaches both programming concepts and important life skills.

The finance tracker allows users to log expenses, categorize spending, set budgets, and track progress toward financial goals. It includes visual charts to show spending patterns and helps develop healthy money management habits.

This is perfect for students who want to learn programming while building something immediately useful in their daily lives. The project demonstrates file handling, data analysis, and user interface design principles.`,
    image: '/images/resources/finance-tracker.jpg',
    cost: 'Free (Python required)'
  }
);

const project11 = createDetailedProject(
  buildPythonProject({
    id: 11,
    title: 'Study Planner & Pomodoro Timer',
    projectType: 'productivity',
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeEstimate: TIME_ESTIMATES.PROJECT,
    projectName: 'study-planner',
    libraries: ['ttkbootstrap'],
    customFeatures: [
      'Task management with priorities',
      'Pomodoro timer with breaks',
      'Study session tracking',
      'Progress analytics',
      'Desktop notifications'
    ],
    relatedProjects: [9, 10, 12]
  }),
  {
    description: 'All-in-one study companion with task management, Pomodoro timer, and progress tracking. Helps students stay organized and focused.',
    overview: `Create a comprehensive productivity application that combines task management with the proven Pomodoro Technique! This project teaches time management concepts while developing advanced GUI applications.

The study planner includes a task manager for assignments and projects, a customizable Pomodoro timer for focused work sessions, and analytics to track study habits over time. It helps students stay organized and maintain focus during study sessions.

Perfect for learning about desktop application development, timer programming, and productivity software design. The project demonstrates practical software engineering while building tools that improve academic performance.`,
    image: '/images/resources/study-planner.jpg',
    cost: 'Free (Python required)'
  }
);

const project12 = createDetailedProject(
  buildPythonProject({
    id: 12,
    title: 'Music Playlist Organizer',
    projectType: 'creative',
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeEstimate: TIME_ESTIMATES.PROJECT,
    projectName: 'music-organizer',
    libraries: ['tkinter'],
    customFeatures: [
      'Music library management',
      'Playlist creation and editing',
      'Song metadata editing',
      'Music discovery features',
      'Audio file organization'
    ],
    relatedProjects: [10, 11, 13]
  }),
  {
    description: 'Organize your music collection with this playlist management tool. Features song metadata editing, playlist creation, and music discovery.',
    overview: `Build a sophisticated music management application that helps organize digital music collections! This project teaches file handling, metadata processing, and multimedia application development.

The music organizer scans music libraries, extracts metadata from audio files, and provides tools for creating and managing playlists. It includes features for editing song information, discovering new music based on listening habits, and organizing large music collections.

This project is perfect for music lovers who want to learn programming while building tools for their hobby. It demonstrates file system operations, data processing, and creative software development.`,
    image: '/images/resources/music-organizer.jpg',
    cost: 'Free (Python required)'
  }
);

const project13 = createDetailedProject(
  buildPythonProject({
    id: 13,
    title: 'Password Generator & Manager',
    projectType: 'security',
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeEstimate: TIME_ESTIMATES.LONG,
    projectName: 'password-manager',
    libraries: ['tkinter'],
    customFeatures: [
      'Secure password generation',
      'Encrypted password storage',
      'Password strength analysis',
      'Security best practices education',
      'Two-factor authentication support'
    ],
    relatedProjects: [14, 15, 16]
  }),
  {
    description: 'Secure password generation and management tool. Perfect introduction to cybersecurity concepts and secure coding practices.',
    overview: `Create a security-focused application that generates strong passwords and stores them securely! This project introduces cybersecurity concepts while teaching secure programming practices.

The password manager generates cryptographically secure passwords, stores them using encryption, and provides tools for analyzing password strength. It teaches users about security best practices while demonstrating secure software development principles.

Perfect for students interested in cybersecurity who want to learn about encryption, secure storage, and security-conscious programming. The project emphasizes both technical skills and security awareness.`,
    image: '/images/resources/password-manager.jpg',
    cost: 'Free (Python required)'
  }
);

// ==================== CYBERSECURITY CTF CHALLENGES ====================

const project14 = createDetailedProject(
  buildCTFChallenge({
    id: 14,
    title: 'HTML Detective Challenge',
    challengeType: 'web',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.SHORT,
    challengeName: 'html-detective',
    customFeatures: [
      'Hidden password discovery',
      'HTML source analysis',
      'Browser developer tools practice',
      'Progressive difficulty levels'
    ],
    relatedProjects: [15, 18, 19]
  }),
  {
    description: 'Students must find a hidden password in HTML source code to gain access to a protected area. Introduces web inspection tools and source code analysis.',
    overview: `Welcome to your first web security investigation! This challenge teaches you how cybersecurity professionals analyze web pages to find vulnerabilities and hidden information.

You'll learn to use browser developer tools, understand HTML structure, and think like a security researcher. The challenge starts simple but introduces increasingly sophisticated hiding techniques.

This is perfect for beginners who want to understand how websites work and where security weaknesses might hide. The skills you learn here are fundamental to web security and digital forensics.`,
    image: '/images/resources/html-detective.jpg',
    cost: 'Free'
  }
);

const project15 = createDetailedProject(
  buildCTFChallenge({
    id: 15,
    title: 'Cookie Monster Challenge',
    challengeType: 'web',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.MEDIUM_SHORT,
    challengeName: 'cookie-monster',
    customFeatures: [
      'Cookie manipulation practice',
      'Session management concepts',
      'Browser storage exploration',
      'Authentication bypass techniques'
    ],
    relatedProjects: [14, 18, 19]
  }),
  {
    description: 'Learn about browser cookies and session management by manipulating cookie values to gain admin access to a web application.',
    overview: `Discover how web applications use cookies for session management and learn how these can be manipulated! This challenge teaches you about browser storage mechanisms and web application security.

You'll explore how cookies work, practice using browser developer tools to modify cookie values, and understand the security implications of client-side data storage. The challenge demonstrates why server-side validation is crucial for web security.

This hands-on challenge helps you understand one of the most common web application vulnerabilities while learning essential penetration testing techniques used by cybersecurity professionals.`,
    image: '/images/resources/cookie-monster.jpg',
    cost: 'Free'
  }
);

const project16 = createDetailedProject(
  buildCTFChallenge({
    id: 16,
    title: 'Cryptography Cipher Challenge',
    challengeType: 'crypto',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.MEDIUM,
    challengeName: 'cipher-challenge',
    customFeatures: [
      'Multiple cipher types (Caesar, substitution)',
      'Progressive difficulty levels',
      'Frequency analysis tools',
      'Historical cryptography context',
      'Pattern recognition practice'
    ],
    relatedProjects: [21, 22]
  }),
  {
    description: 'Decode secret messages using various cipher techniques. Progress through Caesar ciphers, substitution ciphers, and modern encryption basics.',
    overview: `Enter the fascinating world of cryptography by solving increasingly complex cipher puzzles! This challenge teaches you the fundamentals of encryption and code-breaking techniques used throughout history.

You'll start with simple Caesar ciphers and progress to more complex substitution ciphers, learning pattern recognition and frequency analysis along the way. The challenge includes both manual solving techniques and computational approaches.

Perfect for developing logical thinking skills while learning about information security. These problem-solving techniques are fundamental to both cybersecurity and computer science in general.`,
    image: '/images/resources/cipher-challenge.jpg',
    cost: 'Free'
  }
);

const project17 = createDetailedProject(
  buildCTFChallenge({
    id: 17,
    title: 'Social Engineering Awareness Game',
    challengeType: 'social',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.MEDIUM_SHORT,
    challengeName: 'social-engineering-game',
    customFeatures: [
      'Interactive scenario simulations',
      'Phishing email recognition',
      'Pretexting defense strategies',
      'Awareness training modules',
      'Real-world attack examples'
    ],
    relatedProjects: [23, 14, 15]
  }),
  {
    description: 'Interactive scenarios teaching students to recognize and defend against social engineering attacks like phishing and pretexting.',
    overview: `Learn to recognize and defend against the human side of cybersecurity threats! This interactive game teaches you how to identify social engineering attacks that target people rather than technology.

Through realistic scenarios, you'll practice identifying phishing emails, suspicious phone calls, and other manipulation techniques used by attackers. The game emphasizes awareness and critical thinking as your primary defense tools.

This challenge is essential for everyone in our connected world, as human factors are often the weakest link in cybersecurity. The skills you learn here apply to both personal and professional digital safety.`,
    image: '/images/resources/social-engineering.jpg',
    cost: 'Free'
  }
);

const project18 = createDetailedProject(
  buildCTFChallenge({
    id: 18,
    title: 'Inspect Element Treasure Hunt',
    challengeType: 'web',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.MEDIUM_SHORT,
    challengeName: 'treasure-hunt',
    customFeatures: [
      'Multi-level treasure hunt',
      'Hidden clues in CSS and JavaScript',
      'Advanced developer tools usage',
      'Web page structure exploration',
      'Progressive skill building'
    ],
    relatedProjects: [14, 15, 19]
  }),
  {
    description: 'Multi-level challenge where students find clues hidden in CSS styles, JavaScript comments, and HTML attributes using browser developer tools.',
    overview: `Embark on a digital treasure hunt that teaches advanced web inspection techniques! This multi-stage challenge hides clues throughout a website's code, requiring you to master browser developer tools.

You'll search through HTML attributes, CSS style definitions, JavaScript comments, and even network requests to find hidden messages and solve puzzles. Each level introduces new hiding techniques and developer tool features.

This challenge builds comprehensive web analysis skills used by both web developers and security researchers. You'll gain deep understanding of how websites work while developing practical investigation techniques.`,
    image: '/images/resources/inspect-element.jpg',
    cost: 'Free'
  }
);

const project19 = createDetailedProject(
  buildCTFChallenge({
    id: 19,
    title: 'URL Parameter Manipulation',
    challengeType: 'web',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.SHORT,
    challengeName: 'url-parameter-lab',
    customFeatures: [
      'URL structure analysis',
      'Parameter manipulation practice',
      'HTTP request understanding',
      'Web application behavior testing',
      'Security implication awareness'
    ],
    relatedProjects: [14, 15, 18]
  }),
  {
    description: 'Learn about URL parameters and how modifying them can change web application behavior. Practice safe parameter manipulation techniques.',
    overview: `Explore how web applications use URL parameters and learn to test them safely! This lab teaches you about HTTP requests, URL structure, and how applications process user input.

You'll practice modifying URL parameters to see how they affect web application behavior, learning both the legitimate uses and potential security implications. The lab emphasizes ethical testing techniques and responsible disclosure.

This foundational knowledge is essential for web developers, testers, and security professionals. Understanding URL parameters helps you build more secure applications and test existing ones effectively.`,
    image: '/images/resources/url-params.jpg',
    cost: 'Free'
  }
);

const project20 = createDetailedProject(
  buildCTFChallenge({
    id: 20,
    title: 'Form Field Injection Challenge',
    challengeType: 'web',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.SHORT,
    challengeName: 'form-injection',
    customFeatures: [
      'Hidden form field discovery',
      'Client-side validation bypass',
      'HTML manipulation practice',
      'Input validation concepts',
      'Secure coding awareness'
    ],
    relatedProjects: [14, 15, 19]
  }),
  {
    description: 'Discover how hidden form fields can be modified to change application behavior. Learn about client-side security weaknesses.',
    overview: `Learn about form security by discovering and manipulating hidden form fields! This challenge teaches you about client-side data handling and why server-side validation is crucial.

You'll practice finding hidden form fields, modifying their values, and observing how applications respond. The challenge demonstrates why applications should never trust client-side data and must validate all input on the server.

This knowledge is fundamental for both secure web development and security testing. Understanding form vulnerabilities helps you build better applications and identify potential security issues.`,
    image: '/images/resources/form-injection.jpg',
    cost: 'Free'
  }
);

const project21 = createDetailedProject(
  buildCTFChallenge({
    id: 21,
    title: 'Caesar Cipher Decoder Ring',
    challengeType: 'crypto',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.MEDIUM_SHORT,
    challengeName: 'caesar-cipher',
    customFeatures: [
      'Interactive Caesar cipher solving',
      'Multiple shift values',
      'Frequency analysis tools',
      'Automated solving techniques',
      'Historical cipher context'
    ],
    relatedProjects: [16, 22]
  }),
  {
    description: 'Interactive Caesar cipher challenge with varying shift values. Includes frequency analysis tools and hints for solving.',
    overview: `Master the classic Caesar cipher through hands-on practice and automated tools! This challenge teaches you both manual code-breaking techniques and computational approaches to cryptanalysis.

You'll solve Caesar ciphers with different shift values, learn frequency analysis techniques, and explore both brute-force and intelligent solving methods. The challenge includes historical context about how these ciphers were used and broken.

This foundational cryptography knowledge helps you understand both historical and modern encryption concepts. The problem-solving skills you develop apply to many areas of computer science and cybersecurity.`,
    image: '/images/resources/caesar-cipher.jpg',
    cost: 'Free'
  }
);

const project22 = createDetailedProject(
  buildCTFChallenge({
    id: 22,
    title: 'Base64 Encoding',
    challengeType: 'crypto',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.SHORT,
    challengeName: 'base64-adventure',
    customFeatures: [
      'Base64 encoding/decoding practice',
      'Multiple data format handling',
      'Progressive difficulty levels',
      'Text and image decoding',
      'Data format recognition'
    ],
    relatedProjects: [16, 21]
  }),
  {
    description: 'Learn about Base64 encoding through progressive challenges. Decode messages, images, and understand data encoding formats.',
    overview: `Discover the world of data encoding through Base64 challenges! This adventure teaches you about different data representation formats and how information can be encoded for transmission and storage.

You'll decode Base64-encoded messages, images, and other data types while learning about the underlying mathematics and practical applications. The challenge progresses from simple text to complex multi-format puzzles.

Understanding data encoding is essential for web development, cybersecurity, and general computer literacy. These skills help you work with APIs, understand network protocols, and analyze data in various formats.`,
    image: '/images/resources/base64.jpg',
    cost: 'Free'
  }
);

const project23 = createDetailedProject(
  buildCTFChallenge({
    id: 23,
    title: 'Phishing Email Detection',
    challengeType: 'social',
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    timeEstimate: TIME_ESTIMATES.SHORT,
    challengeName: 'phishing-detection-lab',
    customFeatures: [
      'Realistic phishing email examples',
      'Red flag identification training',
      'Email header analysis',
      'Link verification techniques',
      'Incident response practice'
    ],
    relatedProjects: [17, 14, 15]
  }),
  {
    description: 'Interactive training to identify increasingly sophisticated phishing emails. Learn red flags and verification techniques.',
    overview: `Develop essential email security skills through realistic phishing detection training! This lab presents increasingly sophisticated phishing emails and teaches you to identify the warning signs.

You'll analyze email headers, examine suspicious links, and learn verification techniques used by cybersecurity professionals. The lab includes both obvious scams and subtle, targeted attacks that might fool even experienced users.

These skills are critical for everyone who uses email, as phishing remains one of the most common and effective attack vectors. The detection techniques you learn protect both personal and professional digital communications.`,
    image: '/images/resources/phishing-lab.jpg',
    cost: 'Free'
  }
);



// ==================== FINAL PROJECT ARRAY ====================

export const projectDetailsData = [
  project1,   // LED Traffic Light System
  project2,   // Ultrasonic Distance Sensor Alarm
  project3,   // Temperature & Humidity Monitor with LCD
  project4,   // Smart Automated Bin System
  project5,   // Smart Light Sensor LED Controller
  project6,   // Water Level Monitor & Pump Controller
  project7,   // Leap Year Calculator Pro
  project8,   // Digital Recipe Manager
  project9,   // Student GPA Calculator & Tracker
  project10,  // Personal Finance Tracker
  project11,  // Study Planner & Pomodoro Timer
  project12,  // Music Playlist Organizer
  project13,  // Password Generator & Manager
  project14,  // HTML Detective Challenge
  project15,  // Cookie Monster Challenge
  project16,  // Cryptography Cipher Challenge
  project17,  // Social Engineering Awareness Game
  project18,  // Inspect Element Treasure Hunt
  project19,  // URL Parameter Manipulation Lab
  project20,  // Form Field Injection Challenge
  project21,  // Caesar Cipher Decoder Ring
  project22,  // Base64 Encoding Adventure
  project23   // Phishing Email Detection Lab
];

// ==================== VALIDATION ====================

// Validate all projects before export
try {
  validateAllProjects(projectDetailsData);
  console.log('✅ All projects validated successfully!');
  console.log(`📊 Total projects: ${projectDetailsData.length}`);
  
  // Log category breakdown
  const categoryBreakdown = projectDetailsData.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {});
  
  console.log('📈 Category breakdown:', categoryBreakdown);
  
} catch (error) {
  console.error('❌ Project validation failed:', error.message);
}

// ==================== HELPER FUNCTIONS ====================

export const getProjectById = (id) => {
  return projectDetailsData.find(project => project.id === parseInt(id));
};

export const getRelatedProjects = (projectId) => {
  const project = getProjectById(projectId);
  if (!project || !project.relatedProjects) return [];
  
  return project.relatedProjects.map(id => getProjectById(id)).filter(Boolean);
};

export const getProjectsByCategory = (category) => {
  return projectDetailsData.filter(project => project.category === category);
};

export const searchProjects = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return projectDetailsData.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    (project.overview && project.overview.toLowerCase().includes(lowercaseQuery))
  );
};

// ==================== CATEGORY CONSTANTS ====================

export const PROJECT_CATEGORIES = {
  ARDUINO: 'arduino-projects',
  PYTHON: 'python-apps', 
  CYBERSECURITY: 'cybersecurity-ctf'
};

// ==================== STATISTICS FUNCTIONS ====================

export const getProjectStats = () => {
  const stats = {
    total: projectDetailsData.length,
    byCategory: {},
    byDifficulty: {},
    averageRating: 0
  };
  
  let totalRating = 0;
  
  projectDetailsData.forEach(project => {
    // Category stats
    stats.byCategory[project.category] = (stats.byCategory[project.category] || 0) + 1;
    
    // Difficulty stats
    stats.byDifficulty[project.difficulty] = (stats.byDifficulty[project.difficulty] || 0) + 1;
    
    // Rating calculation
    totalRating += project.rating;
  });
  
  stats.averageRating = (totalRating / projectDetailsData.length).toFixed(1);
  
  return stats;
};

export const getProjectsByDifficulty = (difficulty) => {
  return projectDetailsData.filter(project => project.difficulty === difficulty);
};

export const getProjectsByRating = (minRating) => {
  return projectDetailsData.filter(project => project.rating >= minRating);
};

// ==================== EXPORT VALIDATION ====================

// Final validation check
const finalStats = getProjectStats();
console.log('📊 Final Project Statistics:', finalStats);

// Check for any missing required fields
const incompleteProjects = projectDetailsData.filter(project => 
  !project.description || !project.overview || !project.image
);

if (incompleteProjects.length > 0) {
  console.warn('⚠️  Projects missing some details:', 
    incompleteProjects.map(p => `ID ${p.id}: ${p.title}`));
}

// Check for proper ID sequence
const ids = projectDetailsData.map(p => p.id).sort((a, b) => a - b);
const expectedIds = Array.from({length: projectDetailsData.length}, (_, i) => i + 1);
const missingIds = expectedIds.filter(id => !ids.includes(id));

if (missingIds.length > 0) {
  console.warn('⚠️  Missing IDs in sequence:', missingIds);
}

console.log('✅ Project data export complete!');