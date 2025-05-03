'use client';

import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart } from 'react-icons/fa';
import DecorativeElements from '../animation/DecorativeElements';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  coupleName: string;
  date: string;
  time: string;
  month: string;
  day: number;
  year: number;
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  coupleName,
  date,
  time,
  month,
  day,
  year,
  backgroundImage = '/img/couple_image/couple_2.png'
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Background image switching state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const backgroundImages = [
    '/img/couple_image/couple_0.png',
    '/img/couple_image/couple_1.jpg',
    '/img/couple_image/couple_2.png',
    '/img/couple_image/couple_3.jpg',
    '/img/couple_image/couple_4.jpg',
    '/img/couple_image/couple_5.jpg',
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 3000); // Reduced to 3 seconds for smoother transitions

    return () => clearInterval(interval);
  }, [mounted, backgroundImages.length]);

  if (!mounted) {
    return null;
  }

  const names = coupleName.split(' & ');

  return (
    <section
      ref={ref}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden navy-bg text-white"
    >
      {/* Initial Curtain Animation */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.645, 0.045, 0.355, 1.000],
        }}
        className="absolute inset-0 bg-navy origin-top z-50"
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaHeart className="text-white w-12 h-12 animate-pulse" />
        </motion.div>
      </motion.div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ 
              opacity: 0.4, 
              filter: 'blur(0px)',
              scale: 1
            }}
            exit={{ 
              opacity: 0,
              filter: 'blur(5px)',
              scale: 1.05
            }}
            transition={{ 
              duration: 1,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentImageIndex]}
              alt="Background"
              fill
              className="object-cover"
              priority
              quality={100}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-navy/50" 
        />
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <DecorativeElements type="sparkles" count={20} />
      </motion.div>

      {/* Floating Hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-romantic/20"
          initial={{ 
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: 1.5 + i * 0.2,
          }}
        >
          <FaHeart className="w-4 h-4" />
        </motion.div>
      ))}

      {/* Content Container */}
      <motion.div 
        className="container mx-auto px-6 relative z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {/* Day of Week & Date */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="uppercase tracking-widest figtree text-sm mb-4 text-gold/80">{date}</div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <motion.div 
              className="text-6xl sm:text-7xl playfair text-gold"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {month}
            </motion.div>
            <motion.div 
              className="text-6xl sm:text-7xl playfair text-gold"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {day}
            </motion.div>
            <motion.div 
              className="text-6xl sm:text-7xl playfair text-gold"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {year}
            </motion.div>
          </div>
          <motion.div 
            className="uppercase tracking-widest figtree text-sm mt-4 text-gold/80"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {time}
          </motion.div>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center gap-4 my-8"
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="relative">
            <img
              src="https://ext.same-assets.com/2441784941/2571036543.svg"
              alt="Elegant crown"
              className="h-10 w-auto"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <FaHeart className="text-romantic w-3 h-3" />
            </motion.div>
          </div>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="my-12 relative"
        >
          <h1 className="text-6xl md:text-8xl playfair mb-2 tracking-wide">
            <motion.span 
              className="block sm:inline-block"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {names[0]}
            </motion.span>
            <motion.span 
              className="block sm:inline-block mx-4 text-gold"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              &
            </motion.span>
            <motion.span 
              className="block sm:inline-block"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {names[1]}
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="figtree text-lg md:text-xl max-w-2xl mx-auto mt-8 leading-relaxed text-white/90"
        >
          Together with their families, request the pleasure of your company as they celebrate their marriage
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white/80"
          >
            <div className="relative h-16 w-[1px] mx-auto mb-2">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold to-transparent" />
            </div>
            <p className="text-xs uppercase tracking-widest text-gold/80">Scroll</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
