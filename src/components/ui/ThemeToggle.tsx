'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaHeart } from 'react-icons/fa';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-transparent"></div>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 
        ${theme === 'dark' 
          ? 'bg-navy-800/80 hover:bg-navy-700/80' 
          : 'bg-white/90 hover:bg-white/80'} 
        shadow-lg backdrop-blur-sm border-2 
        ${theme === 'dark' ? 'border-gold-200/20' : 'border-gold-200/40'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          {theme === 'dark' ? (
            <div className="relative">
              <FaMoon className="w-5 h-5 text-gold-300" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaHeart className="w-2 h-2 text-romantic/70" />
              </motion.div>
            </div>
          ) : (
            <div className="relative">
              <FaSun className="w-5 h-5 text-gold-400" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <FaHeart className="w-2 h-2 text-romantic/70" />
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Background decoration */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(45deg, #C4A962, #0A1A3C)'
              : 'linear-gradient(45deg, #C4A962, #FFFFFF)'
          }}
        />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
