'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
  venue?: string;
  time?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate, 
  className = '',
  venue = "Santiago, Georgia, Santa Cruz, CA",
  time = "6 pm at"
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const images = [
    '/img/couple_image/couple_0.png',
    '/img/couple_image/couple_1.jpg',
    '/img/couple_image/couple_2.png',
    '/img/couple_image/couple_3.jpg',
    '/img/couple_image/couple_4.jpg',
    '/img/couple_image/couple_5.jpg'
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const imageInterval = setInterval(() => {
      setDirection(1);
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 400);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, [mounted, images.length]);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = (): void => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, mounted]);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        setIsLoading(true);
        await Promise.all(
          images.map((src) => {
            return new Promise<void>((resolve, reject) => {
              const img = new window.Image();
              img.src = src;
              img.onload = () => resolve();
              img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            });
          })
        );
        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error('Image loading error:', err);
        setError('Failed to load some images');
        setIsLoading(false);
      }
    };

    if (mounted) {
      preloadImages();
    }
  }, [images, mounted]);

  const handleImageTransition = (newIndex: number, newDirection: number) => {
    if (isTransitioning) return;
    setDirection(newDirection);
    setIsTransitioning(true);
    setCurrentImageIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToNextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    handleImageTransition(newIndex, 1);
  };

  const goToPrevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    handleImageTransition(newIndex, -1);
  };

  if (!mounted) {
    return null;
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="relative w-full bg-navy-900 overflow-hidden">
      {/* Background Pattern - Subtle on mobile */}
      <div className="absolute inset-0 opacity-[0.02] md:opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-12 md:w-28 h-12 md:h-28">
          <Image
            src="/img/weddingDeco.png"
            alt="Corner Decoration"
            width={112}
            height={112}
            className={`transform scale-75 ${isDark ? 'opacity-40 invert' : 'opacity-60'}`}
            priority
            sizes="(max-width: 375px) 48px, 112px"
          />
        </div>
        <div className="absolute top-0 right-0 w-12 md:w-28 h-12 md:h-28">
          <Image
            src="/img/weddingDeco.png"
            alt="Corner Decoration"
            width={112}
            height={112}
            className={`transform -scale-x-75 scale-y-75 ${isDark ? 'opacity-40 invert' : 'opacity-60'}`}
            priority
            sizes="(max-width: 375px) 48px, 112px"
          />
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-4 pt-4 pb-2 md:py-6 relative z-10 max-w-3xl">
        {/* Date and Venue - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-3 md:mb-4"
        >
          <h2 className="text-sm md:text-2xl text-gold mb-0.5 playfair font-medium tracking-wide">
            {formatDate(targetDate)}
          </h2>
          <p className="text-[10px] md:text-base text-navy-200/90 font-light tracking-wider">
            {time} {venue}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-3 md:space-y-6">
          {/* Welcome Message - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-lg md:text-4xl lg:text-5xl playfair text-white font-light tracking-wide">
              Our Wedding
            </h1>
            <div className="w-6 md:w-16 h-px bg-gold/40 mx-auto mt-1" />
          </motion.div>

          {/* Countdown Timer - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-xs md:max-w-xl bg-navy-800/20 backdrop-blur-sm rounded-lg p-2 md:p-4"
          >
            <div className="grid grid-cols-4 gap-1 md:gap-3">
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HOURS', value: timeLeft.hours },
                { label: 'MINUTES', value: timeLeft.minutes },
                { label: 'SECONDS', value: timeLeft.seconds }
              ].map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="text-center py-1 px-0.5 md:p-2 rounded-md bg-navy-800/30 backdrop-blur-sm"
                >
                  <div className="text-base md:text-3xl lg:text-4xl font-light text-gold playfair leading-none mb-0.5 md:mb-1">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="text-[8px] md:text-xs text-navy-200/90 tracking-wider font-light uppercase">
                    {unit.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section - Mobile Optimized */}
          <div className="w-full">
            {/* Main Image Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full aspect-[4/3] md:aspect-[3/2] rounded-lg overflow-hidden shadow-lg bg-navy-800/20 relative mb-1"
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-navy-800/10 backdrop-blur-sm">
                  <div className="w-6 h-6 md:w-7 md:h-7 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
                </div>
              ) : error ? (
                <div className="absolute inset-0 flex items-center justify-center bg-navy-800/10 backdrop-blur-sm">
                  <p className="text-[10px] md:text-xs text-navy-200/90">{error}</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ 
                      opacity: 0,
                      x: direction * 20,
                      scale: 1.05
                    }}
                    animate={{ 
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1]
                      }
                    }}
                    exit={{ 
                      opacity: 0,
                      x: direction * -20,
                      scale: 0.95,
                      transition: {
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1]
                      }
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt="Wedding Preview"
                      fill
                      className="object-cover transform transition-transform duration-[400ms]"
                      priority
                      sizes="(max-width: 375px) 100vw, (max-width: 768px) 100vw, 800px"
                      quality={85}
                      onError={() => setError('Failed to load image')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/10 to-transparent opacity-90" />

                    {/* Navigation Controls - Mobile Optimized */}
                    <div className="absolute inset-x-0 bottom-2 flex justify-center items-center gap-2 md:gap-3 z-10">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={goToPrevImage}
                        disabled={isTransitioning}
                        className={`w-6 h-6 md:w-7 md:h-7 rounded-full bg-navy-900/50 backdrop-blur-sm flex items-center justify-center 
                          active:bg-navy-900/70 transition-all duration-200
                          ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-navy-900/60'}`}
                        aria-label="Previous image"
                      >
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>

                      {/* Dots - Mobile Optimized */}
                      <div className="flex gap-0.5 md:gap-1">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              if (index === currentImageIndex || isTransitioning) return;
                              handleImageTransition(
                                index,
                                index > currentImageIndex ? 1 : -1
                              );
                            }}
                            className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all duration-300 
                              ${currentImageIndex === index 
                                ? 'bg-gold/90 w-2 md:w-2.5' 
                                : isTransitioning 
                                  ? 'bg-white/30 cursor-not-allowed'
                                  : 'bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to image ${index + 1}`}
                            disabled={isTransitioning}
                          />
                        ))}
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={goToNextImage}
                        disabled={isTransitioning}
                        className={`w-6 h-6 md:w-7 md:h-7 rounded-full bg-navy-900/50 backdrop-blur-sm flex items-center justify-center 
                          active:bg-navy-900/70 transition-all duration-200
                          ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-navy-900/60'}`}
                        aria-label="Next image"
                      >
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>

            {/* Thumbnail Grid - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-6 gap-0.5 md:gap-1 w-full mt-1"
            >
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square rounded overflow-hidden cursor-pointer relative transition-all duration-200
                    ${currentImageIndex === index ? 'ring-1 ring-gold scale-[0.95]' : 'hover:scale-[0.98]'}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={src}
                    alt={`Wedding Preview ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300"
                    sizes="(max-width: 375px) 16vw, (max-width: 768px) 16vw, 100px"
                    quality={60}
                  />
                  <div className={`absolute inset-0 transition-all duration-200
                    ${currentImageIndex === index 
                      ? 'bg-navy-900/20' 
                      : 'bg-navy-900/40 hover:bg-navy-900/20'}`} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
