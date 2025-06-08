'use client';

import { useState, useEffect } from 'react';
import { portfolioEvents, trackEvent, gameEvents } from '@/utils/analytics/tracking';

const TicTacToe = () => {
  // Board size states
  const [boardSize, setBoardSize] = useState(3); // Default 3x3
  const [showSizeSelector, setShowSizeSelector] = useState(true);
  
  // Game states
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // true = player's turn (X), false = computer's turn (O)
  const [winner, setWinner] = useState(null);
  const [gameStatus, setGameStatus] = useState(''); // 'playing', 'won', 'lost', 'tie'
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [difficulty, setDifficulty] = useState('medium'); // 'easy', 'medium', 'hard'

  // Safely track events with your analytics implementation
  const safelyTrackGameEvent = (eventName, label) => {
    try {
      // Use your portfolio events with clickProject since that's what your implementation supports
      portfolioEvents.clickProject('404 TicTacToe Game', `${eventName}: ${label || ''}`);
      
      // Also use the new gameEvents structure
      if (eventName === 'tictactoe_won') {
        gameEvents.completeTicTacToeGame('win', difficulty);
      } else if (eventName === 'tictactoe_lost') {
        gameEvents.completeTicTacToeGame('lose', difficulty);
      } else if (eventName === 'tictactoe_tie') {
        gameEvents.completeTicTacToeGame('tie', difficulty);
      }
    } catch (error) {
      // Fallback to direct trackEvent if portfolioEvents fails
      try {
        trackEvent(eventName, 'game_completion', label);
      } catch (e) {
        // Silently continue if all tracking fails
        console.log('Analytics error (non-critical):', e);
      }
    }
  };

  // Track when component mounts (game viewed)
  useEffect(() => {
    try {
      gameEvents.playTicTacToeGame();
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  }, []);

  // Initialize board based on selected size
  const initializeBoard = (size) => {
    setBoardSize(size);
    setBoard(Array(size * size).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameStatus('');
    setShowSizeSelector(false);
    
    // Track board size selection
    safelyTrackGameEvent('tictactoe_size_selected', `size: ${size}x${size}`);
  };

  // Check for winner after each move
  useEffect(() => {
    if (showSizeSelector) return;
    
    const gameWinner = calculateWinner(board, boardSize);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameStatus(gameWinner === 'X' ? 'won' : 'lost');
      
      // Update scores
      if (gameWinner === 'X') {
        setPlayerScore(prevScore => prevScore + 1);
        // Track win with analytics
        safelyTrackGameEvent('tictactoe_won', `difficulty: ${difficulty}, size: ${boardSize}x${boardSize}`);
      } else {
        setComputerScore(prevScore => prevScore + 1);
        // Track loss with analytics
        safelyTrackGameEvent('tictactoe_lost', `difficulty: ${difficulty}, size: ${boardSize}x${boardSize}`);
      }
    } else if (!board.includes(null)) {
      // Tie game
      setGameStatus('tie');
      setTieScore(prevScore => prevScore + 1);
      // Track tie with analytics
      safelyTrackGameEvent('tictactoe_tie', `difficulty: ${difficulty}, size: ${boardSize}x${boardSize}`);
    }
  }, [board, difficulty, boardSize, showSizeSelector]);

  // Computer's turn
  useEffect(() => {
    // Only make a move if it's computer's turn, board isn't full, and there's no winner
    if (!isXNext && !winner && board.includes(null) && !showSizeSelector) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, board, showSizeSelector]);

  // Handle player's move
  const handleClick = (i) => {
    // Return if square is filled or game is over
    if (board[i] || winner || !isXNext || showSizeSelector) return;
    
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false); // Switch to computer's turn
  };

  // Computer move strategy based on difficulty
  const makeComputerMove = () => {
    const newBoard = [...board];
    let moveIndex;
    
    switch (difficulty) {
      case 'easy':
        // Make random moves
        moveIndex = getRandomEmptySquare(newBoard);
        break;
      
      case 'hard':
        // Try to win, or block player, or make strategic move
        moveIndex = findBestMove(newBoard);
        break;
      
      case 'medium':
      default:
        // 50% chance of making the best move, 50% chance of random move
        moveIndex = Math.random() < 0.5 
          ? findBestMove(newBoard) 
          : getRandomEmptySquare(newBoard);
        break;
    }
    
    newBoard[moveIndex] = 'O';
    setBoard(newBoard);
    setIsXNext(true); // Switch back to player's turn
  };

  // Get random empty square for computer move
  const getRandomEmptySquare = (board) => {
    const emptySquares = board
      .map((square, index) => square === null ? index : null)
      .filter(index => index !== null);
    
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  // Minimax algorithm for finding the best move (for hard difficulty)
  // This is an optimized version for larger boards
  const findBestMove = (board) => {
    // First, check if computer can win in one move
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = 'O';
        if (calculateWinner(newBoard, boardSize) === 'O') {
          return i;
        }
      }
    }
    
    // Second, check if player can win in one move and block
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = 'X';
        if (calculateWinner(newBoard, boardSize) === 'X') {
          return i;
        }
      }
    }
    
    // Take center if available
    const centerIndex = Math.floor(board.length / 2);
    if (boardSize % 2 === 1 && board[centerIndex] === null) {
      return centerIndex;
    }
    
    // Take a corner if available
    const corners = getCornerIndices(boardSize);
    const availableCorners = corners.filter(i => board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available edge
    const edges = getEdgeIndices(boardSize);
    const availableEdges = edges.filter(i => board[i] === null);
    if (availableEdges.length > 0) {
      return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }
    
    // Fallback to random move if somehow nothing else worked
    return getRandomEmptySquare(board);
  };

  // Helper to get corner indices for any board size
  const getCornerIndices = (size) => {
    return [
      0,                    // top left
      size - 1,             // top right
      size * (size - 1),    // bottom left
      size * size - 1       // bottom right
    ];
  };

  // Helper to get edge indices for any board size
  const getEdgeIndices = (size) => {
    const edges = [];
    
    // Top row (excluding corners)
    for (let i = 1; i < size - 1; i++) {
      edges.push(i);
    }
    
    // Bottom row (excluding corners)
    for (let i = 1; i < size - 1; i++) {
      edges.push(size * (size - 1) + i);
    }
    
    // Left column (excluding corners)
    for (let i = 1; i < size - 1; i++) {
      edges.push(i * size);
    }
    
    // Right column (excluding corners)
    for (let i = 1; i < size - 1; i++) {
      edges.push(i * size + (size - 1));
    }
    
    return edges;
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(boardSize * boardSize).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameStatus('');
    
    // Track game reset
    try {
      gameEvents.playTicTacToeGame();
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  };

  // Reset scores
  const resetScores = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setTieScore(0);
    resetGame();
  };

  // Change difficulty
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
    
    // Track difficulty change
    safelyTrackGameEvent('tictactoe_difficulty_changed', `difficulty: ${newDifficulty}`);
  };

  // Back to size selection
  const backToSizeSelection = () => {
    setShowSizeSelector(true);
    resetScores();
  };

  // Get status message based on game state
  const getStatusMessage = () => {
    if (winner) {
      return winner === 'X' ? 'You won! 🎉' : 'Computer won! 😓';
    } else if (!board.includes(null)) {
      return 'Tie game! 🤝';
    } else {
      return isXNext ? 'Your turn (X)' : 'Computer thinking... (O)';
    }
  };

  // Render board - using the original 3x3 style but adapting to board size
  const renderBoard = () => {
    const squares = [];
    
    for (let i = 0; i < boardSize * boardSize; i++) {
      squares.push(
        <div 
          key={i}
          onClick={() => handleClick(i)}
          className={`
            aspect-square flex items-center justify-center text-3xl md:text-4xl font-bold
            border border-gray-300 bg-white transition cursor-pointer
            ${board[i] ? 'cursor-default' : 'hover:bg-gray-100'}
            ${board[i] === 'X' ? 'text-blue-600' : board[i] === 'O' ? 'text-red-600' : ''}
          `}
        >
          {board[i]}
        </div>
      );
    }
    
    return (
      <div 
        className="grid gap-2 w-full max-w-md mx-auto"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize}, 1fr)`,
          aspectRatio: '1/1'
        }}
      >
        {squares}
      </div>
    );
  };

  // Render size selection screen
  const renderSizeSelector = () => {
    return (
      <div className="text-center">
        <h3 className="text-xl font-bold mb-6">Choose Board Size</h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 max-w-md mx-auto">
          {[3, 4, 5, 6].map(size => (
            <button
              key={size}
              onClick={() => initializeBoard(size)}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition cursor-pointer"
            >
              <span className="text-lg font-bold mb-2">{size}×{size}</span>
              <div 
                className="grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${size}, 1fr)`,
                  gridTemplateRows: `repeat(${size}, 1fr)`,
                  width: '70px',
                  height: '70px'
                }}
              >
                {Array(size * size).fill(null).map((_, i) => (
                  <div key={i} className="bg-gray-200"></div>
                ))}
              </div>
            </button>
          ))}
        </div>
        <p className="mt-6 text-gray-600">
          Larger boards are more challenging!
        </p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {showSizeSelector ? (
        renderSizeSelector()
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <div>
              <div className="text-lg font-bold">{getStatusMessage()}</div>
              <div className="text-sm text-gray-600">
                You: {playerScore} | Computer: {computerScore} | Ties: {tieScore}
              </div>
            </div>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              New Game
            </button>
          </div>
          
          {renderBoard()}
          
          <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => handleDifficultyChange('easy')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  difficulty === 'easy' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => handleDifficultyChange('medium')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  difficulty === 'medium' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => handleDifficultyChange('hard')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  difficulty === 'hard' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Hard
              </button>
            </div>
            
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={resetScores}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300"
              >
                Reset Scores
              </button>
              <button
                onClick={backToSizeSelection}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200"
              >
                Change Size
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Helper function to determine winner for any board size
function calculateWinner(squares, size) {
  // Check rows
  for (let i = 0; i < size; i++) {
    const rowStart = i * size;
    let rowWinner = squares[rowStart];
    if (rowWinner !== null) {
      let isWinningRow = true;
      for (let j = 1; j < size; j++) {
        if (squares[rowStart + j] !== rowWinner) {
          isWinningRow = false;
          break;
        }
      }
      if (isWinningRow) return rowWinner;
    }
  }

  // Check columns
  for (let i = 0; i < size; i++) {
    let colWinner = squares[i];
    if (colWinner !== null) {
      let isWinningColumn = true;
      for (let j = 1; j < size; j++) {
        if (squares[i + j * size] !== colWinner) {
          isWinningColumn = false;
          break;
        }
      }
      if (isWinningColumn) return colWinner;
    }
  }

  // Check main diagonal
  let diagWinner = squares[0];
  if (diagWinner !== null) {
    let isWinningDiagonal = true;
    for (let i = 1; i < size; i++) {
      if (squares[i * size + i] !== diagWinner) {
        isWinningDiagonal = false;
        break;
      }
    }
    if (isWinningDiagonal) return diagWinner;
  }

  // Check anti-diagonal
  diagWinner = squares[size - 1];
  if (diagWinner !== null) {
    let isWinningDiagonal = true;
    for (let i = 1; i < size; i++) {
      if (squares[(i * size) + (size - 1 - i)] !== diagWinner) {
        isWinningDiagonal = false;
        break;
      }
    }
    if (isWinningDiagonal) return diagWinner;
  }

  return null;
}

export default TicTacToe;