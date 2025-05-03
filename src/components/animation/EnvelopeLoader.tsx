'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRing, FaDove } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const EnvelopeLoader = () => {
  const [showLoader, setShowLoader] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      router.push('/');
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  if (!showLoader) return null;

  return (
    <div className="loading-overlay flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-navy to-navy-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 0.3, 0],
              x: [
                typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0
              ],
              y: [
                typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          >
            <FaDove className="text-4xl text-gold opacity-20" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Wedding Rings Animation */}
        <motion.div
          className="flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute -left-4"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaRing className="text-4xl text-gold drop-shadow-lg" />
            </motion.div>
            <motion.div
              className="absolute -right-4"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <FaRing className="text-4xl text-gold drop-shadow-lg" />
            </motion.div>
          </div>
        </motion.div>

        {/* Heart in the middle */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaHeart className="text-5xl text-romantic drop-shadow-lg" />
        </motion.div>
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 text-center z-10"
      >
        <motion.h2 
          className="text-3xl playfair text-white mb-2"
          animate={{
            textShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 10px rgba(255,255,255,0.5)",
              "0 0 0px rgba(255,255,255,0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Welcome to Our Wedding
        </motion.h2>
        <motion.p 
          className="text-gold text-lg"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading your invitation...
        </motion.p>
      </motion.div>

      {/* Loading Dots */}
      <motion.div
        className="flex items-center justify-center mt-6 space-x-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2.5 h-2.5 bg-gold rounded-full"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default EnvelopeLoader;
