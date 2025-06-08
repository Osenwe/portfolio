'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SnakeGame from './SnakeGame';
import TicTacToe from './TicTacToe';
import TetrisGame from './TetrisGame';
import { gameEvents, portfolioEvents, trackEvent } from '@/utils/analytics/tracking';

const GameHub = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  
  const games = [
    {
      id: 'snake',
      name: 'Snake',
      description: 'The classic snake game - eat food and grow without hitting walls',
      component: SnakeGame,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      )
    },
    {
      id: 'tetris',
      name: 'Tetris',
      description: 'Classic block-stacking puzzle game - arrange falling pieces to clear lines',
      component: TetrisGame,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      description: 'Play against the computer in this classic game',
      component: TicTacToe,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  // Track when GameHub is viewed (when component mounts)
  useEffect(() => {
    try {
      // Track that user reached the game hub
      gameEvents.viewGameHub();
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  }, []);

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId);
    
    try {
      // Track game selection using the new gameEvents structure
      gameEvents.selectGame(gameId);
      
      // Also track using portfolio events for compatibility
      portfolioEvents.clickProject('404 Game', gameId);
      
      // Track specific game play events
      switch (gameId) {
        case 'snake':
          gameEvents.playSnakeGame();
          break;
        case 'tetris':
          gameEvents.playTetrisGame();
          break;
        case 'tictactoe':
          gameEvents.playTicTacToeGame();
          break;
        default:
          break;
      }
    } catch (error) {
      // Fallback to direct trackEvent if other methods fail
      try {
        trackEvent('404_game_selected', 'engagement', gameId);
      } catch (e) {
        // Silently continue if all tracking fails
        console.log('Analytics error (non-critical):', e);
      }
    }
  };

  const handleBackToSelection = () => {
    setSelectedGame(null);
    
    // Track that user returned to game selection
    try {
      gameEvents.viewGameHub();
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  };

  // Render selected game
  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    const GameComponent = game.component;
    
    return (
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">{game.name}</h2>
          <button 
            onClick={handleBackToSelection}
            className="px-3 py-1 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Back to Selection
          </button>
        </div>
        <div className="p-4">
          <GameComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose a Game</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => handleGameSelect(game.id)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center group"
          >
            <div className="mb-4 text-blue-600 group-hover:text-blue-700 transition-colors">
              {game.icon}
            </div>
            <h3 className="text-xl text-black font-bold mb-2 group-hover:text-blue-600 transition-colors">{game.name}</h3>
            <p className="text-gray-600 text-sm">{game.description}</p>
          </button>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default GameHub;