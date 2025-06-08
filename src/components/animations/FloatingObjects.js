'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingObjects = () => {
  const [objects, setObjects] = useState([]);
  
  useEffect(() => {
    // Generate random objects on mount
    const objectsToGenerate = 15;
    const newObjects = [];
    
    for (let i = 0; i < objectsToGenerate; i++) {
      newObjects.push({
        id: i,
        x: Math.random() * 100, // random position (percentage of viewport)
        y: Math.random() * 100,
        size: Math.random() * 20 + 10, // random size between 10-30px
        duration: Math.random() * 20 + 10, // random animation duration
        delay: Math.random() * 5,
        type: Math.floor(Math.random() * 4) // 4 different types of objects
      });
    }
    
    setObjects(newObjects);
  }, []);
  
  // Render different object shapes based on type
  const renderObject = (type, size) => {
    switch (type) {
      case 0:
        return (
          <div 
            className="bg-blue-500 rounded-full opacity-20" 
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        );
      case 1:
        return (
          <div 
            className="bg-green-500 rotate-45 opacity-20" 
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        );
      case 2:
        return (
          <div className="opacity-20">
            <svg 
              width={size} 
              height={size} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="text-red-500"
            >
              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
            </svg>
          </div>
        );
      case 3:
      default:
        return (
          <div 
            className="border-2 border-purple-500 rounded-full opacity-20" 
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        );
    }
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {objects.map(obj => (
        <motion.div
          key={obj.id}
          className="absolute"
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, 0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: obj.duration,
            ease: "linear",
            repeat: Infinity,
            delay: obj.delay
          }}
        >
          {renderObject(obj.type, obj.size)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingObjects;