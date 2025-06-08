'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { gameEvents } from '@/utils/analytics/tracking';

// Tetromino shapes and their rotations
const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: 'bg-cyan-500',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: 'bg-blue-600',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: 'bg-orange-500',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'bg-yellow-400',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: 'bg-green-500',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: 'bg-purple-600',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: 'bg-red-500',
  }
};

// Board dimensions
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// Generate random tetromino
const randomTetromino = () => {
  const keys = Object.keys(TETROMINOS);
  const rand = keys[Math.floor(Math.random() * keys.length)];
  return { ...TETROMINOS[rand], type: rand };
};

// Create a fresh game board
const createBoard = () => {
  return Array.from({ length: BOARD_HEIGHT }, () => 
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
};

const TetrisGame = () => {
  const [board, setBoard] = useState(createBoard());
  const [tetromino, setTetromino] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [nextTetromino, setNextTetromino] = useState(randomTetromino());
  const [dropTime, setDropTime] = useState(1000); // Initial drop speed
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const gameRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(0);
  const dropCounterRef = useRef(0);
  const gameStartTimeRef = useRef(null);

  // Load high score from localStorage
  useEffect(() => {
    const storedHighScore = localStorage.getItem('tetris-high-score');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  // Save high score when score changes
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('tetris-high-score', score.toString());
      
      // Track high score achievement
      try {
        gameEvents.achieveHighScore('tetris_game', score);
      } catch (error) {
        console.log('Analytics error (non-critical):', error);
      }
    }
  }, [score, highScore]);

  // Initialize a new game
  const startGame = () => {
    // Track game start
    try {
      if (!gameStarted) {
        gameEvents.playTetrisGame();
        setGameStarted(true);
        gameStartTimeRef.current = Date.now();
      }
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }

    // Clear the board
    setBoard(createBoard());
    // Reset score and level
    setScore(0);
    setLevel(1);
    setLines(0);
    setDropTime(1000);
    setGameOver(false);
    setIsPaused(false);
    // Set initial tetromino and position
    spawnNewTetromino();
  };

  // Spawn a new tetromino and set next tetromino
  const spawnNewTetromino = useCallback(() => {
    // Set the current tetromino to the next tetromino
    setTetromino(nextTetromino);
    // Generate a new next tetromino
    setNextTetromino(randomTetromino());
    // Set the starting position
    setPosition({ x: Math.floor((BOARD_WIDTH - nextTetromino.shape[0].length) / 2), y: 0 });
  }, [nextTetromino]);

  // Check if the position is valid (within bounds and not colliding)
  const isPositionValid = useCallback((shape, newPosition) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = newPosition.x + x;
          const boardY = newPosition.y + y;
          
          // Check board boundaries
          if (
            boardX < 0 || 
            boardX >= BOARD_WIDTH || 
            boardY < 0 || 
            boardY >= BOARD_HEIGHT
          ) {
            return false;
          }
          
          // Check for collision with existing pieces
          if (board[boardY] && board[boardY][boardX] !== null) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  // Rotate the tetromino
  const rotateTetromino = useCallback(() => {
    if (!tetromino || gameOver || isPaused) return;
    
    // Create a rotated matrix
    const rotated = tetromino.shape.map((_, i) =>
      tetromino.shape.map(col => col[i]).reverse()
    );
    
    // Check if the rotation is valid
    if (isPositionValid(rotated, position)) {
      setTetromino({ ...tetromino, shape: rotated });
    } else {
      // Try to adjust position to make the rotation valid
      // Common wall kick technique
      const kicks = [
        { x: 1, y: 0 },  // Try right
        { x: -1, y: 0 }, // Try left
        { x: 0, y: -1 }  // Try up
      ];
      
      for (const kick of kicks) {
        const newPos = { x: position.x + kick.x, y: position.y + kick.y };
        if (isPositionValid(rotated, newPos)) {
          setTetromino({ ...tetromino, shape: rotated });
          setPosition(newPos);
          break;
        }
      }
    }
  }, [tetromino, position, isPositionValid, gameOver, isPaused]);

  // Move the tetromino horizontally
  const moveTetromino = useCallback((direction) => {
    if (!tetromino || gameOver || isPaused) return;
    
    const newPosition = { ...position, x: position.x + direction };
    if (isPositionValid(tetromino.shape, newPosition)) {
      setPosition(newPosition);
    }
  }, [tetromino, position, isPositionValid, gameOver, isPaused]);

  // Drop the tetromino
  const dropTetromino = useCallback(() => {
    if (!tetromino || gameOver || isPaused) return;
    
    const newPosition = { ...position, y: position.y + 1 };
    if (isPositionValid(tetromino.shape, newPosition)) {
      setPosition(newPosition);
    } else {
      // Lock the tetromino in place
      if (position.y <= 0) {
        // Game over if tetromino locks at the top
        setGameOver(true);
        
        // Track game completion with analytics
        try {
          const gameEndTime = Date.now();
          const timeSpent = gameStartTimeRef.current ? 
            Math.floor((gameEndTime - gameStartTimeRef.current) / 1000) : 0;
          
          gameEvents.completeTetrisGame(score, level);
          
          // Track time spent playing
          if (timeSpent > 0) {
            gameEvents.abandonGame('tetris_game', timeSpent);
          }
        } catch (error) {
          console.log('Analytics error (non-critical):', error);
        }
        
        return;
      }
      
      // Update the board with the locked tetromino
      const newBoard = [...board];
      tetromino.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              newBoard[boardY][boardX] = tetromino.color;
            }
          }
        });
      });
      
      setBoard(newBoard);
      
      // Check and clear completed lines
      clearLines(newBoard);
      
      // Spawn a new tetromino
      spawnNewTetromino();
    }
  }, [tetromino, position, board, isPositionValid, spawnNewTetromino, gameOver, isPaused, score, level]);

  // Hard drop
  const hardDrop = useCallback(() => {
    if (!tetromino || gameOver || isPaused) return;
    
    let newY = position.y;
    while (isPositionValid(tetromino.shape, { ...position, y: newY + 1 })) {
      newY++;
    }
    setPosition({ ...position, y: newY });
    dropTetromino();
  }, [tetromino, position, isPositionValid, dropTetromino, gameOver, isPaused]);

  // Clear completed lines
  const clearLines = useCallback((boardToCheck) => {
    let linesCleared = 0;
    
    const newBoard = boardToCheck.filter(row => {
      const isLineFilled = row.every(cell => cell !== null);
      if (isLineFilled) linesCleared++;
      return !isLineFilled;
    });
    
    // Add new empty lines at the top
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
    }
    
    if (linesCleared > 0) {
      // Update score
      // Scoring system: 100 * level * lines + (bonus for multiple lines)
      const linePoints = [100, 300, 500, 800]; // Points for 1, 2, 3, 4 lines
      const basePoints = linePoints[Math.min(linesCleared, 4) - 1] * level;
      
      setScore(prev => prev + basePoints);
      setLines(prev => {
        const newLines = prev + linesCleared;
        
        // Level up every 10 lines
        if (Math.floor(newLines / 10) > Math.floor(prev / 10)) {
          const newLevel = Math.floor(newLines / 10) + 1;
          setLevel(newLevel);
          setDropTime(Math.max(1000 - ((newLevel - 1) * 100), 100)); // Speed up with level
        }
        
        return newLines;
      });
      
      setBoard(newBoard);
    }
  }, [level]);

  // Handle pause toggle
  const togglePause = () => {
    if (gameOver) return;
    setIsPaused(prev => !prev);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      
      if (e.key === 'p' || e.key === 'P') {
        togglePause();
        return;
      }
      
      if (isPaused) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveTetromino(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveTetromino(1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          dropTetromino();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotateTetromino();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveTetromino, dropTetromino, rotateTetromino, hardDrop, gameOver, isPaused]);

  // Game loop
  useEffect(() => {
    let lastTime = 0;
    
    const gameLoop = (time) => {
      if (!isPaused && !gameOver && tetromino) {
        if (lastTime === 0) {
          lastTime = time;
        }
        
        const deltaTime = time - lastTime;
        
        dropCounterRef.current += deltaTime;
        
        if (dropCounterRef.current > dropTime) {
          dropTetromino();
          dropCounterRef.current = 0;
        }
        
        lastTime = time;
      }
      
      requestRef.current = requestAnimationFrame(gameLoop);
    };
    
    requestRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [dropTime, dropTetromino, isPaused, gameOver, tetromino]);

  // Auto-start game on mount
  useEffect(() => {
    startGame();
    // Focus the game div for keyboard controls
    if (gameRef.current) {
      gameRef.current.focus();
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Mobile/touch controls
  const handleTouchControl = (action) => {
    if (gameOver || isPaused) return;
    
    switch (action) {
      case 'left':
        moveTetromino(-1);
        break;
      case 'right':
        moveTetromino(1);
        break;
      case 'down':
        dropTetromino();
        break;
      case 'rotate':
        rotateTetromino();
        break;
      case 'drop':
        hardDrop();
        break;
      default:
        break;
    }
  };

  // Render the game
  return (
    <div 
      ref={gameRef}
      className="flex flex-col items-center w-full h-full"
      tabIndex={0}
    >
      {/* Game info */}
      <div className="flex justify-between w-full mb-4">
        <div className="flex flex-col">
          <span className="text-lg font-bold">Score: {score}</span>
          <span className="text-lg">Level: {level}</span>
          <span className="text-lg">Lines: {lines}</span>
          <span className="text-sm text-gray-600">High: {highScore}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">Next</span>
          <div className="w-16 h-16 grid grid-cols-4 grid-rows-4 gap-0.5 mt-1 bg-gray-200 p-1">
            {nextTetromino && nextTetromino.shape.map((row, y) => 
              row.map((cell, x) => (
                <div 
                  key={`next-${y}-${x}`}
                  className={`w-3 h-3 ${cell ? nextTetromino.color : 'bg-gray-200'}`}
                />
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Game board */}
      <div className="w-full max-w-xs bg-gray-200 p-2 rounded">
        <div className="grid grid-cols-10 gap-0.5 border-2 border-gray-400 bg-gray-800 p-0.5">
          {board.map((row, y) => 
            row.map((cell, x) => {
              // Check if the current cell has a falling tetromino piece
              let tetrominoCell = null;
              if (tetromino && !gameOver && !isPaused) {
                const tetroY = y - position.y;
                const tetroX = x - position.x;
                
                if (
                  tetroY >= 0 && tetroY < tetromino.shape.length &&
                  tetroX >= 0 && tetroX < tetromino.shape[0].length &&
                  tetromino.shape[tetroY][tetroX]
                ) {
                  tetrominoCell = tetromino.color;
                }
              }
              
              return (
                <div 
                  key={`${y}-${x}`}
                  className={`aspect-square ${tetrominoCell || cell || 'bg-gray-900'}`}
                />
              );
            })
          )}
        </div>
      </div>
      
      {/* Controls */}
      <div className="w-full mt-4">
        {gameOver ? (
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold text-red-600 mb-2">Game Over!</h3>
            <p className="text-lg mb-2">Final Score: {score}</p>
            {score === highScore && score > 0 && (
              <p className="text-green-600 font-bold mb-2">🎉 New High Score! 🎉</p>
            )}
            <button 
              onClick={startGame}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-2 flex justify-center">
              <button
                onClick={togglePause}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
            
            {isPaused && (
              <div className="text-center text-xl font-bold text-blue-600 mb-4">
                PAUSED
              </div>
            )}
            
            {/* Mobile controls */}
            <div className="flex justify-center mt-2 space-x-2 md:hidden">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleTouchControl('rotate')}
                  className="w-16 h-12 bg-gray-200 rounded mb-2 flex items-center justify-center hover:bg-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={() => handleTouchControl('drop')}
                  className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex space-x-2 mb-2">
                  <button
                    onClick={() => handleTouchControl('left')}
                    className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleTouchControl('right')}
                    className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => handleTouchControl('down')}
                  className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p className="mb-1">
          <strong>Controls:</strong> Arrow keys to move/rotate, Space to drop
        </p>
        <p className="hidden md:block">Press P to pause/resume</p>
      </div>
    </div>
  );
};

export default TetrisGame;