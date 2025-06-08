'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gameEvents, portfolioEvents, trackEvent } from '@/utils/analytics/tracking';

// Game constants
const canvasSize = 400;
const scale = 20;
const rows = canvasSize / scale;
const cols = canvasSize / scale;
const initialSpeed = 300;
const speedIncrease = 5; // Regular speed increase per food
const minSpeed = 100; // Maximum speed cap
const EGGS_FOR_SPEED_BOOST = 20; // Number of eggs needed for a speed boost
const SPEED_BOOST_PERCENT = 1; // 1% boost after every 10 eggs

const SnakeGame = () => {
  // Canvas ref
  const canvasRef = useRef();
  
  // Game state
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([5, 5]);
  const [dir, setDir] = useState([1, 0]); // Start going right
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(initialSpeed);
  
  // Track eggs eaten for speed boost
  const [eggsEaten, setEggsEaten] = useState(0);
  
  // CRITICAL: Keep a separate reference to the current direction
  const currentDirRef = useRef([1, 0]);
  
  // Refs for intervals
  const gameLoopRef = useRef(null);
  
  // Updated analytics function to use the new gameEvents structure
  const safelyTrackGameEvent = (eventType, data = {}) => {
    try {
      switch (eventType) {
        case 'game_start':
          gameEvents.playSnakeGame();
          break;
        case 'game_over':
          gameEvents.completeSnakeGame(data.score);
          // Also track high score if achieved
          if (data.isHighScore) {
            gameEvents.achieveHighScore('snake_game', data.score);
          }
          break;
        case 'speed_boost':
          // Track when player gets a speed boost
          trackEvent('speed_boost_achieved', 'game_progression', 'snake_game', data.eggsEaten);
          break;
        default:
          break;
      }
      
      // Keep the old tracking for compatibility
      portfolioEvents.clickProject('404 Snake Game', `${eventType}: ${JSON.stringify(data)}`);
    } catch (error) {
      try {
        trackEvent(eventType, 'game_completion', JSON.stringify(data));
      } catch (e) {
        console.log('Analytics error (non-critical):', e);
      }
    }
  };

  // Generate random food position
  const getRandomPosition = () => {
    const position = [
      Math.floor(Math.random() * cols),
      Math.floor(Math.random() * rows)
    ];
    
    // Make sure food doesn't spawn on the snake
    if (snake.some(segment => segment[0] === position[0] && segment[1] === position[1])) {
      return getRandomPosition();
    }
    
    return position;
  };

  // Handle keyboard input
  const handleKeyDown = (e) => {
    e.preventDefault(); // Prevent default scrolling with arrow keys
    
    // Map arrow keys to directions
    let newDir;
    switch (e.key) {
      case 'ArrowUp':    
      case 'w':          
      case 'W':          newDir = [0, -1]; break;
      case 'ArrowDown':  
      case 's':          
      case 'S':          newDir = [0, 1]; break;
      case 'ArrowLeft':  
      case 'a':          
      case 'A':          newDir = [-1, 0]; break;
      case 'ArrowRight': 
      case 'd':          
      case 'D':          newDir = [1, 0]; break;
      case ' ':          // Space key
        if (gameOver) resetGame();
        return;
      default: return; // Exit if not a relevant key
    }
    
    // Don't allow reversing direction
    const currentDir = currentDirRef.current;
    if (
      (newDir[0] === -currentDir[0] && newDir[1] === -currentDir[1])
    ) {
      return;
    }
    
    // Update both state and ref
    setDir(newDir);
    currentDirRef.current = newDir;
    
    // Start game with arrow key if not running
    if (!isRunning && !gameOver) {
      startGame();
    }
  };
  
  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    // Load high score
    const storedHighScore = localStorage.getItem('snake-high-score');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);
  
  // Game loop
  useEffect(() => {
    if (!isRunning || gameOver) return;
    
    // Clear any existing intervals
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    
    // Start the game loop
    gameLoopRef.current = setInterval(() => {
      moveSnake();
    }, speed);
    
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isRunning, gameOver, speed]);
  
  // Apply speed boost after eating 10 eggs - WITH ANALYTICS
  useEffect(() => {
    // Check if we've reached the threshold for a speed boost
    if (eggsEaten >= EGGS_FOR_SPEED_BOOST) {
      // Apply 1% speed boost
      setSpeed(prevSpeed => {
        const boostedSpeed = prevSpeed * (1 - SPEED_BOOST_PERCENT / 100);
        return Math.max(boostedSpeed, minSpeed);
      });
      
      // Track speed boost achievement
      safelyTrackGameEvent('speed_boost', { eggsEaten: eggsEaten });
      
      // Reset the counter
      setEggsEaten(0);
    }
  }, [eggsEaten]);
  
  // Move the snake
  const moveSnake = () => {
    setSnake(prevSnake => {
      // Get current direction from the ref
      const currentDir = currentDirRef.current;
      
      // Calculate new head position
      const head = [...prevSnake[0]];
      head[0] += currentDir[0];
      head[1] += currentDir[1];
      
      // Check wall collisions
      if (head[0] < 0 || head[0] >= cols || head[1] < 0 || head[1] >= rows) {
        handleGameOver();
        return prevSnake;
      }
      
      // Check self collisions
      if (prevSnake.slice(1).some(segment => segment[0] === head[0] && segment[1] === head[1])) {
        handleGameOver();
        return prevSnake;
      }
      
      // Create new snake
      const newSnake = [head, ...prevSnake];
      
      // Check food collision
      if (head[0] === food[0] && head[1] === food[1]) {
        setFood(getRandomPosition());
        setScore(prev => prev + 1);
        
        // Increase eggs eaten count for speed boost
        setEggsEaten(prev => prev + 1);
        
        // Regular small speed increase per food
        setSpeed(prevSpeed => Math.max(prevSpeed - speedIncrease, minSpeed));
        
        return newSnake; // Don't remove tail (grow)
      }
      
      // Remove tail
      newSnake.pop();
      return newSnake;
    });
  };
  
  // Handle game over - UPDATED WITH BETTER ANALYTICS
  const handleGameOver = () => {
    setIsRunning(false);
    setGameOver(true);
    
    // Clear intervals
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    
    const isNewHighScore = score > highScore;
    
    // Update high score
    if (isNewHighScore) {
      setHighScore(score);
      localStorage.setItem('snake-high-score', score.toString());
    }
    
    // Track game completion with detailed data
    safelyTrackGameEvent('game_over', {
      score: score,
      finalLength: snake.length,
      eggsEaten: eggsEaten,
      isHighScore: isNewHighScore,
      speedBoostsEarned: Math.floor(eggsEaten / EGGS_FOR_SPEED_BOOST)
    });
  };
  
  // Start game - UPDATED WITH ANALYTICS
  const startGame = () => {
    setIsRunning(true);
    setGameOver(false);
    
    // Track game start
    safelyTrackGameEvent('game_start');
  };
  
  // Reset game
  const resetGame = () => {
    // Clear intervals
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    
    // Reset state
    setSnake([[10, 10]]);
    setFood(getRandomPosition());
    setDir([1, 0]);
    currentDirRef.current = [1, 0];
    setScore(0);
    setGameOver(false);
    setIsRunning(false);
    setSpeed(initialSpeed);
    setEggsEaten(0);
  };
  
  // Render game - ALL ORIGINAL RENDERING CODE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    
    // Draw grid lines
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    
    // Draw vertical grid lines
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * scale, 0);
      ctx.lineTo(i * scale, canvasSize);
      ctx.stroke();
    }
    
    // Draw horizontal grid lines
    for (let i = 0; i <= rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * scale);
      ctx.lineTo(canvasSize, i * scale);
      ctx.stroke();
    }
    
    // Draw food
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(
      (food[0] + 0.5) * scale, 
      (food[1] + 0.5) * scale, 
      scale / 2 * 0.8, 
      0, 
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw snake with gradient colors and curved ends
    if (snake.length > 0) {
      // Draw the snake body segments
      snake.forEach((segment, index) => {
        const x = segment[0] * scale;
        const y = segment[1] * scale;
        
        // Create gradient color based on position in snake
        if (index === 0) {
          // Head - solid green color
          ctx.fillStyle = '#27ae60';
        } else if (index === snake.length - 1) {
          // Tail - different color
          ctx.fillStyle = '#2980b9';
        } else {
          // For the snake body, create a linear gradient
          const percentage = index / Math.max(snake.length - 1, 1); // 0 to 1
          
          // Create gradient
          const gradient = ctx.createLinearGradient(x, y, x + scale, y + scale);
          
          // Calculate colors based on position
          const startColor = `hsl(145, 70%, ${50 - percentage * 10}%)`;
          const endColor = `hsl(${145 - percentage * 60}, 70%, ${40 - percentage * 5}%)`;
          
          gradient.addColorStop(0, startColor);
          gradient.addColorStop(1, endColor);
          
          ctx.fillStyle = gradient;
        }
        
        // Determine the orientation of this segment
        let prevSegment = index > 0 ? snake[index - 1] : null;
        let nextSegment = index < snake.length - 1 ? snake[index + 1] : null;
        
        // Draw with appropriate rounding
        if (index === 0 || index === snake.length - 1) {
          // For head and tail, use more rounded corners
          const radius = scale / 2.5;
          
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.arcTo(x + scale, y, x + scale, y + scale, radius);
          ctx.arcTo(x + scale, y + scale, x, y + scale, radius);
          ctx.arcTo(x, y + scale, x, y, radius);
          ctx.arcTo(x, y, x + scale, y, radius);
          ctx.closePath();
          ctx.fill();
          
          // Draw eyes on the head
          if (index === 0) {
            ctx.fillStyle = 'white';
            
            // Position eyes based on direction
            let eyeX1, eyeY1, eyeX2, eyeY2;
            
            if (dir[0] === 1) { // Right
              eyeX1 = x + scale * 0.7;
              eyeY1 = y + scale * 0.3;
              eyeX2 = x + scale * 0.7;
              eyeY2 = y + scale * 0.7;
            } else if (dir[0] === -1) { // Left
              eyeX1 = x + scale * 0.3;
              eyeY1 = y + scale * 0.3;
              eyeX2 = x + scale * 0.3;
              eyeY2 = y + scale * 0.7;
            } else if (dir[1] === -1) { // Up
              eyeX1 = x + scale * 0.3;
              eyeY1 = y + scale * 0.3;
              eyeX2 = x + scale * 0.7;
              eyeY2 = y + scale * 0.3;
            } else { // Down
              eyeX1 = x + scale * 0.3;
              eyeY1 = y + scale * 0.7;
              eyeX2 = x + scale * 0.7;
              eyeY2 = y + scale * 0.7;
            }
            
            ctx.beginPath();
            ctx.arc(eyeX1, eyeY1, scale / 8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(eyeX2, eyeY2, scale / 8, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // For body segments, use slightly rounded corners
          const radius = scale / 6;
          
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.arcTo(x + scale, y, x + scale, y + scale, radius);
          ctx.arcTo(x + scale, y + scale, x, y + scale, radius);
          ctx.arcTo(x, y + scale, x, y, radius);
          ctx.arcTo(x, y, x + scale, y, radius);
          ctx.closePath();
          ctx.fill();
        }
      });
    }
    
    // Draw game over message
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvasSize / 2, canvasSize / 2 - 20);
      
      ctx.font = '16px Arial';
      ctx.fillText(`Score: ${score}`, canvasSize / 2, canvasSize / 2 + 10);
      ctx.fillText('Press Space to Restart', canvasSize / 2, canvasSize / 2 + 40);
    }
  }, [snake, food, dir, gameOver, score]);
  
  // Handle mobile controls
  const handleButtonControl = (newDir) => {
    // Don't allow reversing direction
    const currentDir = currentDirRef.current;
    if (
      (newDir[0] === -currentDir[0] && newDir[1] === -currentDir[1])
    ) {
      return;
    }
    
    // Update both state and ref
    setDir(newDir);
    currentDirRef.current = newDir;
    
    // Start game if not running
    if (!isRunning && !gameOver) {
      startGame();
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <div className="text-lg">Score: <span className="font-bold">{score}</span></div>
          <div className="text-sm text-gray-600">High Score: {highScore}</div>
          <div className="text-xs text-gray-500">
            Eggs to next speed boost: {EGGS_FOR_SPEED_BOOST - eggsEaten}
          </div>
        </div>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Reset Game
        </button>
      </div>
      
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-inner">
        <canvas 
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="w-full h-full"
        />
        
        {/* Game start overlay */}
        {!isRunning && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
            <h3 className="text-2xl font-bold mb-4">Snake Game</h3>
            <p className="mb-6 text-center max-w-xs">
              Use arrow keys or WASD to move. Collect food to grow longer.
              <br />Don't hit the walls or yourself!
            </p>
            <button 
              onClick={startGame}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
      
      {/* Touch controls for mobile */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <button
            onClick={() => handleButtonControl([0, -1])}
            className="w-full py-3 bg-gray-200 rounded-md flex justify-center hover:bg-gray-300"
            aria-label="Move Up"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        <div className="col-start-1 row-start-2">
          <button
            onClick={() => handleButtonControl([-1, 0])}
            className="w-full py-3 bg-gray-200 rounded-md flex justify-center hover:bg-gray-300"
            aria-label="Move Left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="col-start-2 row-start-2">
          {gameOver ? (
            <button
              onClick={resetGame}
              className="w-full py-3 bg-blue-600 text-white rounded-md flex justify-center hover:bg-blue-700"
            >
              Restart
            </button>
          ) : (
            <div className="w-full py-3 bg-gray-100 rounded-md flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        <div className="col-start-3 row-start-2">
          <button
            onClick={() => handleButtonControl([1, 0])}
            className="w-full py-3 bg-gray-200 rounded-md flex justify-center hover:bg-gray-300"
            aria-label="Move Right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="col-start-2 row-start-3">
          <button
            onClick={() => handleButtonControl([0, 1])}
            className="w-full py-3 bg-gray-200 rounded-md flex justify-center hover:bg-gray-300"
            aria-label="Move Down"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Use arrow keys or touch controls to move. Collect food to grow longer.</p>
        <p className="mt-1">The snake gets 1% faster every 10 eggs eaten!</p>
      </div>
    </div>
  );
};

export default SnakeGame;