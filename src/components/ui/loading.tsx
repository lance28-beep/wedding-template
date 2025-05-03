'use client';

import { motion } from 'framer-motion';

export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
} 