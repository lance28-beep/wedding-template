'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight, FaSpinner, FaExpand } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import DecorativeElements from '../animation/DecorativeElements';

interface PrenupGalleryProps {
  videoUrl: string;
  images: {
    url: string;
    alt: string;
  }[];
}

const PrenupGallery: React.FC<PrenupGalleryProps> = ({ videoUrl, images }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | HTMLIFrameElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to check if URL is a YouTube URL
  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const isLocalVideo = videoUrl.endsWith('.mp4');
  const videoId = isYouTubeUrl(videoUrl) ? getYouTubeVideoId(videoUrl) : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&showinfo=0` : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if the user is typing in an input field or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === 'ArrowLeft') {
        previousImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isPlaying]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        previousImage();
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handlePlayPause = () => {
    if (isLocalVideo && videoRef.current) {
      const video = videoRef.current as HTMLVideoElement;
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-white to-gold-50/10 dark:from-navy-900 dark:via-navy-900 dark:to-navy-800 relative overflow-hidden">
      <DecorativeElements type="hearts" count={4} />
      
      {/* Section Title */}
      <div className="container mx-auto text-center mb-8 sm:mb-12 md:mb-16">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl playfair text-navy-900 dark:text-white mb-2 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Love Story in Pictures
        </motion.h2>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center my-2 sm:my-3"
        >
          <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-gold" />
        </motion.div>
        <motion.p
          className="text-sm sm:text-base md:text-lg text-navy-600 dark:text-navy-200 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto italic"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Capturing the moments that tell our story
        </motion.p>
      </div>

      {/* Video Section */}
      <div className="container mx-auto max-w-5xl mb-8 sm:mb-12 md:mb-16">
        <motion.div
          className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl bg-black"
          initial={mounted ? { opacity: 0, y: 20 } : undefined}
          animate={mounted && inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {isLocalVideo ? (
            <video
              ref={videoRef as React.RefObject<HTMLVideoElement>}
              src={videoUrl}
              className="w-full h-full object-cover"
              controls
              playsInline
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onLoadedData={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                console.error('Failed to load video');
              }}
            />
          ) : embedUrl ? (
            <iframe
              ref={videoRef as React.RefObject<HTMLIFrameElement>}
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Prenup Video"
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                console.error('Failed to load video');
              }}
            />
          ) : null}
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <FaSpinner className="text-2xl sm:text-3xl md:text-4xl text-white animate-spin" />
            </div>
          )}
          
          {isLocalVideo && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 hover:bg-black/40 group opacity-0 hover:opacity-100">
              <button
                onClick={handlePlayPause}
                className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 p-1.5 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <FaPause className="text-lg sm:text-xl" /> : <FaPlay className="text-lg sm:text-xl" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 p-1.5 sm:p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label="Toggle fullscreen"
              >
                <FaExpand className="text-lg sm:text-xl" />
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Image Slider */}
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          initial={mounted ? { opacity: 0, y: 20 } : undefined}
          animate={mounted && inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={mounted ? { opacity: 0, x: 100 } : undefined}
              animate={mounted ? { opacity: 1, x: 0 } : undefined}
              exit={mounted ? { opacity: 0, x: -100 } : undefined}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex].url}
                alt={images[currentImageIndex].alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 375px) 100vw, (max-width: 768px) 80vw, 1200px"
                quality={85}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4">
            <button
              onClick={previousImage}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 opacity-0 hover:opacity-100"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-base sm:text-lg md:text-xl" />
            </button>
            <button
              onClick={nextImage}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 opacity-0 hover:opacity-100"
              aria-label="Next image"
            >
              <FaChevronRight className="text-base sm:text-lg md:text-xl" />
            </button>
          </div>
        </motion.div>

        {/* Thumbnail Navigation */}
        <motion.div
          className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4"
          initial={mounted ? { opacity: 0, y: 20 } : undefined}
          animate={mounted && inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                currentImageIndex === index
                  ? 'ring-2 sm:ring-4 ring-gold-400 scale-105'
                  : 'ring-2 ring-transparent hover:ring-gold-200'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 375px) 45vw, (max-width: 768px) 30vw, 200px"
                quality={60}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PrenupGallery; 