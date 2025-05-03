'use client';

import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { FaHeart, FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';
import DecorativeElements from '../animation/DecorativeElements';

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  location?: string;
  quote?: string;
}

interface LoveStoryTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
}

const TimelineItem = ({ event, index, totalEvents }: { event: TimelineEvent; index: number; totalEvents: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative mb-16 md:mb-24 last:mb-0"
    >
      {/* Content Container */}
      <motion.div
        className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        {/* Image Section */}
        {event.image && (
          <motion.div
            className={`w-full md:w-1/2 relative aspect-square rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl ${
              isEven ? 'md:order-2' : 'md:order-1'
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
          >
            <Image
              src={event.image}
              alt={event.imageAlt || event.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 375px) 100vw, (max-width: 768px) 100vw, 50vw"
              quality={85}
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        )}

        {/* Text Content */}
        <motion.div
          className={`w-full md:w-1/2 p-4 md:p-8 rounded-xl md:rounded-2xl backdrop-blur-sm bg-white/5 border border-gold/20 ${
            isEven ? 'md:order-1' : 'md:order-2'
          }`}
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
        >
          {/* Date and Location */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3 md:mb-4">
            <div className="text-gold figtree text-xs md:text-sm font-medium">{event.date}</div>
            {event.location && (
              <div className="flex items-center gap-1 text-gold/80 figtree text-[10px] md:text-xs">
                <FaMapMarkerAlt className="text-[10px] md:text-xs" />
                {event.location}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-3xl playfair mb-3 md:mb-4 text-gold">{event.title}</h3>

          {/* Quote (if provided) */}
          {event.quote && (
            <motion.div
              className="mb-4 md:mb-6 italic text-gold/90 border-l-2 border-gold/50 pl-3 md:pl-4 py-1 md:py-2 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
            >
              <FaQuoteLeft className="absolute -left-2 -top-2 text-gold/30 text-xl md:text-2xl" />
              <span className="text-sm md:text-base">"{event.quote}"</span>
            </motion.div>
          )}

          {/* Description */}
          <p className="figtree text-white/80 leading-relaxed text-sm md:text-base">{event.description}</p>
        </motion.div>
      </motion.div>

      {/* Timeline Connector */}
      {index < totalEvents - 1 && (
        <motion.div
          className="absolute left-1/2 top-full -translate-x-1/2 w-1 h-8 md:h-12 bg-gradient-to-b from-gold/30 to-gold/10 hidden md:block"
          initial={{ height: 0 }}
          animate={inView ? { height: 32 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
        />
      )}

      {/* Timeline Dot */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 md:w-8 md:h-8 rounded-full bg-navy border-2 border-gold flex items-center justify-center hidden md:flex"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <FaHeart className="text-gold text-[10px] md:text-xs animate-pulse" />
      </motion.div>
    </div>
  );
};

const LoveStoryTimeline: React.FC<LoveStoryTimelineProps> = ({
  events = [
    {
      id: 1,
      date: "June 2019",
      title: "First Meeting",
      location: "Central Park, New York",
      description: "Our story began on a sunny afternoon in Central Park. We were both attending the same photography workshop, and little did we know that this chance encounter would change our lives forever.",
      image: "/img/image.png",
      imageAlt: "First meeting in Central Park",
      quote: "Love at first sight is easy to understand; it's when two people have been looking at each other for a lifetime that it becomes a miracle."
    },
    {
      id: 2,
      date: "December 2019",
      title: "First Date",
      location: "The Little Owl, NYC",
      description: "After months of friendship and countless coffee dates, we finally had our first official date at The Little Owl. The conversation flowed effortlessly, and we both knew this was something special.",
      image: "/img/image.png",
      imageAlt: "First date at The Little Owl"
    },
    {
      id: 3,
      date: "March 2020",
      title: "First Trip Together",
      location: "Paris, France",
      description: "Our first international trip together to the City of Love. Walking along the Seine, visiting the Eiffel Tower, and sharing croissants in Montmartre - every moment was magical.",
      image: "/img/image.png",
      imageAlt: "First trip to Paris",
      quote: "Paris is always a good idea."
    },
    {
      id: 4,
      date: "July 2021",
      title: "Moving In Together",
      location: "Brooklyn, NY",
      description: "After two years of dating, we took the next big step and moved in together. Our first apartment in Brooklyn became our little love nest, filled with memories and dreams for the future.",
      image: "/img/image.png",
      imageAlt: "Moving in together"
    },
    {
      id: 5,
      date: "December 2022",
      title: "The Proposal",
      location: "Central Park, New York",
      description: "He proposed at the exact spot where we first met in Central Park. As the snow gently fell around us, he got down on one knee and asked the most important question of our lives.",
      image: "/img/image.png",
      imageAlt: "Proposal in Central Park",
      quote: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
    }
  ],
  title = "Our Love Story",
  subtitle = "A journey of love, laughter, and beautiful moments that brought us to this special day"
}) => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 navy-bg text-white relative overflow-hidden"
    >
      <DecorativeElements type="hearts" count={8} />

      {/* Section Header */}
      <div className="container mx-auto text-center mb-12 md:mb-16">
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl playfair mb-3 md:mb-4 text-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ scale: 0 }}
          animate={sectionInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center my-2 md:my-3"
        >
          <div className="w-16 md:w-20 h-0.5 md:h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50" />
        </motion.div>
        <motion.p
          className="text-white/80 figtree max-w-2xl mx-auto text-base md:text-lg lg:text-xl px-4"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="container mx-auto relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gold/30 via-gold/50 to-gold/30 hidden md:block" />

        {/* Timeline Items */}
        <div className="relative z-10">
          {events.map((event, index) => (
            <TimelineItem 
              key={event.id} 
              event={event} 
              index={index} 
              totalEvents={events.length} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStoryTimeline;
