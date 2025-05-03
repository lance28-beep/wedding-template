'use client';

import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaClock, FaCar, FaTshirt, FaUtensils, FaHeart, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
import DecorativeElements from '../animation/DecorativeElements';
import CircularGallery from './CircularGallery';
import { useState, useEffect } from 'react';

interface VenueImage {
  url: string;
  alt: string;
}

interface VenueInfo {
  name: string;
  address: string;
  googleMapsUrl: string;
  time: string;
  dresscode?: string;
  parkingInfo?: string;
  diningInfo?: string;
  additionalInfo?: string;
  galleryImages?: { image: string; text: string }[];
  venueImages?: VenueImage[];
}

interface MapVenueInfoProps {
  ceremonyInfo: VenueInfo;
  receptionInfo?: VenueInfo;
  title?: string;
  subtitle?: string;
}

const ImageSlider: React.FC<{ images: VenueImage[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        nextImage();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying, currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsAutoPlaying(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'Escape' && isFullscreen) {
      toggleFullscreen();
    }
  };

  return (
    <>
      <div 
        className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'w-full h-64'} overflow-hidden ${!isFullscreen && 'rounded-t-2xl'} group`}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Image slider"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-gold/5 animate-pulse" />
            )}
            <motion.img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className={`w-full ${isFullscreen ? 'h-full object-contain' : 'h-64 object-cover'} transition-transform duration-500 group-hover:scale-105`}
              onLoad={() => setIsLoading(false)}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={prevImage}
            className="w-10 h-10 rounded-full bg-white/80 dark:bg-navy-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-navy-700 transform hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2"
            aria-label="Previous image"
          >
            <FaChevronLeft className="text-navy-900 dark:text-white" aria-hidden="true" />
          </button>
          <button
            onClick={nextImage}
            className="w-10 h-10 rounded-full bg-white/80 dark:bg-navy-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-navy-700 transform hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2"
            aria-label="Next image"
          >
            <FaChevronRight className="text-navy-900 dark:text-white" aria-hidden="true" />
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-navy-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-navy-700 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          <FaExpand className="text-navy-900 dark:text-white" aria-hidden="true" />
        </button>

        {/* Image Counter */}
        <div 
          className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={`Image ${currentIndex + 1} of ${images.length}`}
        >
          {currentIndex + 1} / {images.length}
        </div>

        {/* Progress Indicators */}
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
          role="tablist"
          aria-label="Image navigation dots"
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const MapVenueInfo: React.FC<MapVenueInfoProps> = ({
  ceremonyInfo,
  receptionInfo,
  title = "Location & Details",
  subtitle = "Everything you need to know for our special day",
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 overflow-hidden transition-colors duration-500 dark:bg-[#0A1A2F]"
    >
      {/* Background with mode transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-white to-rose-50/20 dark:from-[#0A1A2F] dark:via-[#0F2744] dark:to-[#162B4D] -z-10" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-gold/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-rose-100/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-radial from-gold/5 to-transparent opacity-30 sm:opacity-50 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <DecorativeElements type="sparkles" count={8} />

      {/* Section Header */}
      <div className="container mx-auto text-center mb-8 sm:mb-12 md:mb-16 relative">
        <motion.div
          className="inline-block mb-2 sm:mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <FaHeart className="text-gold text-xl sm:text-2xl md:text-3xl mx-auto transform hover:scale-110 transition-transform" />
        </motion.div>
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl playfair text-navy-900 dark:text-white mb-2 sm:mb-4 font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.div
          className="flex justify-center items-center gap-2 sm:gap-4 my-2 sm:my-4"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-8 sm:w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold transform rotate-45" />
          <div className="w-8 sm:w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </motion.div>
        <motion.p
          className="text-navy-600 dark:text-navy-200 figtree max-w-xs sm:max-w-sm md:max-w-2xl mx-auto font-medium text-xs sm:text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Venues Information */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <VenueCard venue={ceremonyInfo} type="Ceremony" inView={inView} delay={0.2} />
        {receptionInfo && (
          <VenueCard venue={receptionInfo} type="Reception" inView={inView} delay={0.4} />
        )}
      </div>

      {/* Gallery Section */}
      {(ceremonyInfo.galleryImages || receptionInfo?.galleryImages) && (
        <div className="container mx-auto mt-8 sm:mt-12 md:mt-16">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl playfair text-navy-900 dark:text-white font-bold mb-2">
              Venue Gallery
            </h3>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto rounded-full" />
          </motion.div>
          <div className="h-[300px] sm:h-[400px] md:h-[500px] w-full">
            <CircularGallery
              items={[
                ...(ceremonyInfo.galleryImages || []),
                ...(receptionInfo?.galleryImages || [])
              ]}
              bend={2}
              borderRadius={0.1}
              font="bold 24px DM Sans"
            />
          </div>
        </div>
      )}
    </section>
  );
};

interface VenueCardProps {
  venue: VenueInfo;
  type: string;
  inView: boolean;
  delay: number;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, type, inView, delay }) => {
  return (
    <motion.div
      className="bg-white dark:bg-[#0A1A2F] rounded-2xl sm:rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] overflow-hidden transition-colors duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-white/20 dark:border-navy-800/30 group transform hover:scale-[1.02] hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      tabIndex={0}
    >
      {/* Venue Images Slider (if provided) */}
      {venue.venueImages ? (
        <ImageSlider images={venue.venueImages} />
      ) : (
        <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] relative rounded-t-2xl sm:rounded-t-3xl overflow-hidden border-b border-white/20 dark:border-navy-800/30">
          <iframe
            src={venue.googleMapsUrl}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${type} location map`}
            aria-label={`${type} location map`}
          />
        </div>
      )}

      {/* Venue Details */}
      <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-[#0A1A2F] transition-colors duration-300">
        <div className="flex items-center mb-4 sm:mb-6">
          <span className="text-gold text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] figtree font-bold bg-gold/5 dark:bg-gold/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gold/20 dark:border-gold/30 group-hover:bg-gold/10 dark:group-hover:bg-gold/20 transition-colors">
            {type}
          </span>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl playfair text-navy-900 dark:text-white mb-4 sm:mb-6 font-bold group-hover:text-gold transition-colors focus:text-gold">
          {venue.name}
        </h3>

        <div className="space-y-4 sm:space-y-6">
          {/* Address */}
          <div className="flex items-start group/item">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gold/5 dark:bg-gold/10 flex items-center justify-center mr-3 sm:mr-4 md:mr-5 group-hover/item:bg-gold/10 dark:group-hover/item:bg-gold/20 transition-colors">
              <FaMapMarkerAlt className="text-gold text-base sm:text-lg md:text-xl group-hover/item:scale-110 transition-transform" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-navy-900 dark:text-white mb-1 text-sm sm:text-base">Address</div>
              <p className="text-navy-600 dark:text-navy-200 text-xs sm:text-sm md:text-base">{venue.address}</p>
              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-gold hover:text-gold-dark dark:hover:text-gold-light inline-flex items-center mt-1 sm:mt-2 font-medium hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 dark:focus:ring-offset-navy-900 rounded group/link"
              >
                Open in Google Maps
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transform transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start group/item">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gold/5 dark:bg-gold/10 flex items-center justify-center mr-3 sm:mr-4 md:mr-5 group-hover/item:bg-gold/10 dark:group-hover/item:bg-gold/20 transition-colors">
              <FaClock className="text-gold text-base sm:text-lg md:text-xl group-hover/item:scale-110 transition-transform" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-navy-900 dark:text-white mb-1 text-sm sm:text-base">Time</div>
              <p className="text-navy-600 dark:text-navy-200 text-xs sm:text-sm md:text-base">{venue.time}</p>
            </div>
          </div>

          {/* Dress Code (if provided) */}
          {venue.dresscode && (
            <div className="flex items-start group/item">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gold/5 dark:bg-gold/10 flex items-center justify-center mr-3 sm:mr-4 md:mr-5 group-hover/item:bg-gold/10 dark:group-hover/item:bg-gold/20 transition-colors">
                <FaTshirt className="text-gold text-base sm:text-lg md:text-xl group-hover/item:scale-110 transition-transform" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-navy-900 dark:text-white mb-1 text-sm sm:text-base">Dress Code</div>
                <p className="text-navy-600 dark:text-navy-200 text-xs sm:text-sm md:text-base">{venue.dresscode}</p>
              </div>
            </div>
          )}

          {/* Parking Info (if provided) */}
          {venue.parkingInfo && (
            <div className="flex items-start group/item">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gold/5 dark:bg-gold/10 flex items-center justify-center mr-3 sm:mr-4 md:mr-5 group-hover/item:bg-gold/10 dark:group-hover/item:bg-gold/20 transition-colors">
                <FaCar className="text-gold text-base sm:text-lg md:text-xl group-hover/item:scale-110 transition-transform" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-navy-900 dark:text-white mb-1 text-sm sm:text-base">Parking</div>
                <p className="text-navy-600 dark:text-navy-200 text-xs sm:text-sm md:text-base">{venue.parkingInfo}</p>
              </div>
            </div>
          )}

          {/* Dining Info (if provided) */}
          {venue.diningInfo && (
            <div className="flex items-start group/item">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gold/5 dark:bg-gold/10 flex items-center justify-center mr-3 sm:mr-4 md:mr-5 group-hover/item:bg-gold/10 dark:group-hover/item:bg-gold/20 transition-colors">
                <FaUtensils className="text-gold text-base sm:text-lg md:text-xl group-hover/item:scale-110 transition-transform" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-navy-900 dark:text-white mb-1 text-sm sm:text-base">Dining</div>
                <p className="text-navy-600 dark:text-navy-200 text-xs sm:text-sm md:text-base">{venue.diningInfo}</p>
              </div>
            </div>
          )}

          {/* Additional Info (if provided) */}
          {venue.additionalInfo && (
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 dark:border-navy-800/30">
              <div className="font-semibold text-navy-900 dark:text-white mb-2 text-sm sm:text-base">Additional Information</div>
              <p className="text-navy-600 dark:text-navy-200 text-xs sm:text-sm md:text-base leading-relaxed">{venue.additionalInfo}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MapVenueInfo;
