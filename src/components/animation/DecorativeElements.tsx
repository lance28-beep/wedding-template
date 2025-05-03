'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { MdStar } from 'react-icons/md';
import { GiRose } from 'react-icons/gi';

// Custom hook to create random position and animation delay
const useRandomPosition = (count: number, minDelay = 0, maxDelay = 10) => {
  const [elements, setElements] = useState<Array<{
    id: number;
    left: string;
    top: string;
    delay: number;
    duration: number;
    size: number;
    rotate: number;
  }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      top: `${Math.random() * 90 + 5}%`,
      delay: Math.random() * (maxDelay - minDelay) + minDelay,
      duration: Math.random() * 5 + 5,
      size: Math.random() * 0.5 + 0.5,
      rotate: Math.random() * 360,
    }));
    setElements(newElements);
  }, [count, minDelay, maxDelay]);

  return mounted ? elements : [];
};

interface DecorativeElementsProps {
  type: 'sparkles' | 'hearts' | 'florals';
  count?: number;
  area?: 'local' | 'global';
  color?: string;
}

const DecorativeElements: React.FC<DecorativeElementsProps> = ({
  type = 'sparkles',
  count = 10,
  area = 'local',
  color = 'gold'
}) => {
  const elements = useRandomPosition(count);

  return (
    <div className={`${area === 'global' ? 'fixed inset-0 pointer-events-none z-50' : 'absolute inset-0 pointer-events-none'} overflow-hidden`}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: element.left,
            top: element.top,
            opacity: 0,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [-20, -100],
            x: [0, element.id % 2 === 0 ? 30 : -30],
            scale: [0, element.size, element.size, 0],
            rotate: [0, element.rotate]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 5 + 5,
          }}
        >
          {type === 'sparkles' && (
            <MdStar className={`text-${color} w-4 h-4`} />
          )}

          {type === 'hearts' && (
            <FaHeart className="text-romantic w-3 h-3" />
          )}

          {type === 'florals' && (
            <GiRose className="text-blush w-5 h-5" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default DecorativeElements;
