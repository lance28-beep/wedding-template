'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { FaHeart, FaRing, FaDove, FaQuoteLeft, FaInstagram, FaLinkedin, FaEnvelope, FaInfoCircle } from 'react-icons/fa';
import DecorativeElements from '../animation/DecorativeElements';
import { FloralDecoration, LeafDecoration, WeddingRings, HeartLace } from '../decorative/FloralElements';
import { GoldFlourish } from '../decorative/GoldFlourish';

interface Person {
  name: string;
  role: string;
  image?: string;
  relation?: string;
  description?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
}

interface WeddingPartyProps {
  groom: Person;
  bride: Person;
  groomParents: Person[];
  brideParents: Person[];
  bridalEntourage: {
    bestMan?: Person;
    maidOfHonor?: Person;
    groomsmen: Person[];
    bridesmaids: Person[];
    ringBearer?: Person;
    coinBearer?: Person;
    bibleBearer?: Person;
    flowerGirls: Person[];
    viel: Person[];
    cord: Person[];
    candle: Person[];
  };
  principalSponsors: Person[];
}

const WeddingParty: React.FC<WeddingPartyProps> = ({
  groom,
  bride,
  groomParents,
  brideParents,
  bridalEntourage,
  principalSponsors
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const floatingHearts = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 7,
    size: 0.5 + Math.random() * 1.5,
    opacity: 0.1 + Math.random() * 0.2
  }));

  const PersonCard: React.FC<{ person: Person; className?: string; featured?: boolean; isFirst?: boolean }> = ({ person, className = '', featured = false, isFirst = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className={`relative group ${featured ? 'col-span-1 md:col-span-2 lg:col-span-1' : ''} ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: featured ? 1.03 : 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => {
          setSelectedPerson(person);
          setIsModalOpen(true);
        }}
      >
        <div className={`bg-white/95 dark:bg-navy-900/95 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gold-200/30 hover:border-gold-200/40 relative overflow-hidden cursor-pointer ${featured ? 'ring-2 ring-gold-200/20 hover:ring-gold-200/30' : ''}`}>
          {/* Corner decorations - Simplified for mobile */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-gold-200/30 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-gold-200/30 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-gold-200/30 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-gold-200/30 rounded-br-xl" />
          </div>

          <div className="relative z-10">
            {/* Avatar container with responsive sizing */}
            <div className="relative mx-auto mb-4 sm:mb-6">
              {person.image ? (
                <div className="relative">
                  <div className={`relative mx-auto rounded-full overflow-hidden transition-all duration-300 ${
                    featured ? 'w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56' : 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40'
                  }`}>
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 375px) 100vw, (max-width: 768px) 50vw, 33vw"
                      quality={85}
                      priority={isFirst}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 dark:from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Hexagonal decoration frame - Simplified for mobile */}
                  <div className={`absolute inset-[-15%] sm:inset-[-25%] flex items-center justify-center z-10 pointer-events-none transition-transform duration-300 group-hover:scale-105`}>
                    <Image
                      src="/img/avatarDecoration.png"
                      alt="Avatar frame"
                      fill
                      className="object-contain opacity-90 dark:opacity-70"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className={`mx-auto rounded-full bg-gradient-to-br from-gold-50/5 dark:from-gold-200/5 to-gold-100/20 dark:to-gold-300/20 flex items-center justify-center transition-all duration-300 ${
                    featured ? 'w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56' : 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40'
                  }`}>
                    <FaHeart className="text-2xl sm:text-4xl text-gold-200 opacity-50" />
                  </div>
                  
                  {/* Hexagonal decoration frame for placeholder */}
                  <div className={`absolute inset-[-15%] sm:inset-[-25%] flex items-center justify-center z-10 pointer-events-none transition-transform duration-300 group-hover:scale-105`}>
                    <Image
                      src="/img/avatarDecoration.png"
                      alt="Avatar frame"
                      fill
                      className="object-contain opacity-90 dark:opacity-70"
                    />
                  </div>
                </div>
              )}
            </div>

            <motion.div
              animate={isHovered ? { y: -5 } : { y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center relative z-20"
            >
              <h3 className={`playfair text-navy-900 dark:text-white mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors duration-300 ${
                featured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl md:text-2xl'
              }`}>{person.name}</h3>
              <p className={`text-navy-600/80 dark:text-gold-200/80 font-medium tracking-wide uppercase ${
                featured ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'
              }`}>{person.role}</p>
              {person.relation && (
                <p className="text-gold-600/80 dark:text-gold-300/80 text-xs sm:text-sm mt-1 sm:mt-2 italic">{person.relation}</p>
              )}
            </motion.div>

            {person.description && (
              <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gold-200/20">
                <motion.p 
                  className="text-xs sm:text-sm text-navy-600/70 dark:text-white/70 text-center italic"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: isHovered ? 1 : 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {person.description}
                </motion.p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Elegant section header component
  const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative inline-block">
        <h2 className="text-4xl md:text-5xl playfair text-navy-900 dark:text-white mb-4 relative z-10">
          {title}
        </h2>
        {/* Decorative underline */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gold-200/50 to-transparent" />
        {/* Decorative flourishes */}
        <div className="absolute -left-24 top-1/2 transform -translate-y-1/2">
          <GoldFlourish className="w-16 h-8 opacity-80" variant="primary" />
        </div>
        <div className="absolute -right-24 top-1/2 transform -translate-y-1/2">
          <GoldFlourish className="w-16 h-8 opacity-80 scale-x-[-1]" variant="primary" />
        </div>
      </div>
      {subtitle && (
        <div className="relative">
          <p className="text-lg text-navy-600 dark:text-navy-200 max-w-2xl mx-auto italic mt-4">
            {subtitle}
          </p>
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
            <GoldFlourish className="w-12 h-6 opacity-50" variant="secondary" rotate={-30} />
          </div>
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
            <GoldFlourish className="w-12 h-6 opacity-50 scale-x-[-1]" variant="secondary" rotate={30} />
          </div>
        </div>
      )}
    </motion.div>
  );

  // Enhanced couple section with special styling
  const CoupleSection = () => (
    <div className="relative mb-32">
      <SectionTitle 
        title="The Happy Couple" 
        subtitle="Together in love, forever in harmony"
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
        <PersonCard person={groom} featured isFirst={true} />
        <div className="relative">
          {/* Decorative heart container */}
          <div className="w-24 h-24 rounded-full bg-gold-50/10 dark:bg-gold-900/10 flex items-center justify-center relative transition-colors duration-300">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHeart className="text-4xl text-gold-400 dark:text-gold-300 transition-colors duration-300" />
            </motion.div>
            {/* Circular floral frame */}
            <div className="absolute inset-0 rounded-full border-2 border-gold-200/20 dark:border-gold-300/20 transition-colors duration-300" />
            <FloralDecoration className="absolute -top-4 -left-4 w-8 h-8 opacity-50" variant="primary" />
            <FloralDecoration className="absolute -top-4 -right-4 w-8 h-8 opacity-50" variant="primary" />
            <FloralDecoration className="absolute -bottom-4 -left-4 w-8 h-8 opacity-50" variant="primary" />
            <FloralDecoration className="absolute -bottom-4 -right-4 w-8 h-8 opacity-50" variant="primary" />
          </div>
        </div>
        <PersonCard person={bride} featured />
      </div>
    </div>
  );

  // Enhanced parents section
  const ParentsSection = () => (
    <div className="mb-16">
      <SectionTitle 
        title="Our Beloved Parents" 
        subtitle="With deepest gratitude and love"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl playfair text-center text-navy-900 dark:text-white mb-4">
            Groom's Parents
          </h3>
          <div className="grid gap-6">
            {groomParents.map((parent, index) => (
              <PersonCard key={index} person={parent} />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl playfair text-center text-navy-900 dark:text-white mb-4">
            Bride's Parents
          </h3>
          <div className="grid gap-6">
            {brideParents.map((parent, index) => (
              <PersonCard key={index} person={parent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced entourage section with better organization
  const EntourageSection = () => (
    <div className="mb-16">
      <SectionTitle 
        title="The Bridal Entourage" 
        subtitle="Our cherished friends and family who make our day special"
      />
      <div className="space-y-12">
        {/* Best Man & Maid of Honor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bridalEntourage.bestMan && (
            <div className="space-y-4">
              <h3 className="text-2xl playfair text-center text-navy-900 dark:text-white">Best Man</h3>
              <PersonCard person={bridalEntourage.bestMan} featured />
            </div>
          )}
          {bridalEntourage.maidOfHonor && (
            <div className="space-y-4">
              <h3 className="text-2xl playfair text-center text-navy-900 dark:text-white">Maid of Honor</h3>
              <PersonCard person={bridalEntourage.maidOfHonor} featured />
            </div>
          )}
        </div>

        {/* Groomsmen & Bridesmaids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl playfair text-center text-navy-900 dark:text-white">Groomsmen</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bridalEntourage.groomsmen.map((groomsman, index) => (
                <PersonCard key={index} person={groomsman} />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl playfair text-center text-navy-900 dark:text-white">Bridesmaids</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bridalEntourage.bridesmaids.map((bridesmaid, index) => (
                <PersonCard key={index} person={bridesmaid} />
              ))}
            </div>
          </div>
        </div>

        {/* Other entourage members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Ring Bearer", person: bridalEntourage.ringBearer },
            { title: "Coin Bearer", person: bridalEntourage.coinBearer },
            { title: "Bible Bearer", person: bridalEntourage.bibleBearer }
          ].map(({ title, person }) => person && (
            <div key={title} className="space-y-4">
              <h3 className="text-xl playfair text-center text-navy-900 dark:text-white">{title}</h3>
              <PersonCard person={person} />
            </div>
          ))}
        </div>

        {/* Secondary entourage */}
        <div className="space-y-16">
          {[
            { 
              title: "Flower Girls", 
              members: bridalEntourage.flowerGirls,
              description: "Our precious little angels spreading joy and flowers",
              borderColor: "via-romantic/50"
            },
            { 
              title: "Veil Sponsors", 
              members: bridalEntourage.viel,
              description: "Symbolizing purity and new beginnings",
              borderColor: "via-gold-200/50"
            },
            { 
              title: "Cord Sponsors", 
              members: bridalEntourage.cord,
              description: "Representing the infinite bond of marriage",
              borderColor: "via-navy-200/50"
            },
            { 
              title: "Candle Sponsors", 
              members: bridalEntourage.candle,
              description: "Illuminating the path of eternal love",
              borderColor: "via-gold-300/50"
            }
          ].map(({ title, members, description, borderColor }) => members.length > 0 && (
            <div key={title} className="relative py-12">
              {/* Section Header */}
              <div className="text-center space-y-3 mb-12">
                <h3 className="text-3xl playfair text-navy-900 dark:text-white relative inline-block">
                  {title}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-[1px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent ${borderColor} to-transparent" />
                  </div>
                </h3>
                <p className="text-sm text-navy-600/80 dark:text-navy-200/80 italic max-w-md mx-auto font-light">
                  {description}
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {members.map((person, index) => (
                  <div key={index} className="relative group">
                    {/* Single decorative frame */}
                    <div className="absolute inset-[-15%] flex items-center justify-center pointer-events-none">
                      <Image
                        src="/img/avatarDecoration.png"
                        alt="Avatar frame"
                        width={240}
                        height={240}
                        className="opacity-90 dark:opacity-70 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Corner decorations */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-gold-200/30 rounded-tl-xl" />
                    <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-gold-200/30 rounded-tr-xl" />
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-gold-200/30 rounded-bl-xl" />
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-gold-200/30 rounded-br-xl" />
                    
                    <PersonCard person={person} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Enhanced principal sponsors section
  const SponsorsSection = () => (
    <div className="mb-32">
      <SectionTitle 
        title="Principal Sponsors" 
        subtitle="Our mentors and guides, whose wisdom lights our path"
      />
      <div className="bg-white/50 dark:bg-navy-800/50 backdrop-blur-sm p-8 rounded-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {principalSponsors.map((sponsor, index) => (
            <PersonCard key={index} person={sponsor} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-white to-gold-50/10 dark:from-navy-900 dark:via-navy-900 dark:to-navy-800 relative overflow-hidden">
      {/* Background pattern - Simplified for mobile */}
      <div className="absolute inset-0 bg-[url('/img/pattern.png')] opacity-5 dark:opacity-10 mix-blend-overlay" />
      
      {/* Floating decorations - Reduced count for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingHearts.slice(0, 10).map(heart => (
          <motion.div
            key={heart.id}
            className="absolute text-gold-200/10 dark:text-gold-300/10 pointer-events-none"
            initial={{ 
              top: '100%', 
              left: heart.left,
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              top: '-20%',
              left: `${parseFloat(heart.left) + (Math.random() * 20 - 10)}%`,
              rotate: [0, 360],
              scale: [heart.size, heart.size * 1.2, heart.size],
              opacity: [0, heart.opacity, 0]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          >
            <FaHeart className="text-xl sm:text-2xl" />
          </motion.div>
        ))}
      </div>

      {/* Content container with simplified border for mobile */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/30 dark:bg-navy-900/30 backdrop-blur-sm border border-gold-200/20 dark:border-gold-200/10">
          {/* Corner decorations - Simplified for mobile */}
          <div className="absolute -top-2 sm:-top-4 left-1/2 transform -translate-x-1/2">
            <GoldFlourish className="w-24 sm:w-48 h-6 sm:h-12 opacity-60" variant="primary" />
          </div>
          <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2">
            <GoldFlourish className="w-24 sm:w-48 h-6 sm:h-12 opacity-60 rotate-180" variant="primary" />
          </div>

          <CoupleSection />
          <ParentsSection />
          <EntourageSection />
          <SponsorsSection />
        </div>
      </div>

      {/* Modal - Enhanced for mobile */}
      <AnimatePresence>
        {isModalOpen && selectedPerson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-navy-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-white via-gold-50 to-gold-100 dark:from-navy-900 dark:via-navy-900 dark:to-navy-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 max-w-lg w-full max-h-[90vh] overflow-y-auto relative border-2 border-gold-200 shadow-2xl flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button - Enhanced for mobile */}
              <button
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-navy-900 dark:text-white hover:text-gold-400 bg-white/70 dark:bg-navy-800/70 rounded-full p-1.5 sm:p-2 shadow-md border border-gold-100 z-20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-200"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col items-center w-full">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 mb-4 sm:mb-6 flex items-center justify-center">
                  {/* Large hexagonal avatar decoration */}
                  <Image
                    src="/img/avatarDecoration.png"
                    alt="Avatar frame"
                    fill
                    className="object-contain opacity-90 dark:opacity-70 z-0"
                    style={{ pointerEvents: 'none' }}
                  />
                  {selectedPerson.image ? (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Image
                        src={selectedPerson.image}
                        alt={selectedPerson.name}
                        fill
                        className="object-cover rounded-full shadow-lg border-4 border-white dark:border-navy-900"
                        sizes="(max-width: 375px) 100vw, (max-width: 768px) 50vw, 33vw"
                        quality={85}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-gold-200/5 to-gold-200/20 flex items-center justify-center">
                        <FaHeart className="text-5xl sm:text-7xl md:text-8xl text-gold-200 opacity-50" />
                      </div>
                    </div>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl playfair text-navy-900 dark:text-white mb-1 sm:mb-2 text-center font-bold tracking-wide">{selectedPerson.name}</h2>
                <p className="text-sm sm:text-base md:text-lg text-gold-600 dark:text-gold-200 mb-1 sm:mb-2 text-center font-medium tracking-wide">{selectedPerson.role}</p>
                {selectedPerson.relation && (
                  <p className="text-navy-600 dark:text-white/80 italic mb-2 sm:mb-4 text-center text-xs sm:text-sm md:text-base">{selectedPerson.relation}</p>
                )}

                {selectedPerson.description && (
                  <div className="text-center mb-4 sm:mb-8">
                    <FaQuoteLeft className="text-gold-200/40 text-lg sm:text-xl md:text-2xl mx-auto mb-2 sm:mb-4" />
                    <p className="text-navy-600 dark:text-white/70 italic text-xs sm:text-sm md:text-base">
                      {selectedPerson.description}
                    </p>
                  </div>
                )}

                {selectedPerson.socialLinks && (
                  <div className="flex gap-3 sm:gap-4 mt-2 sm:mt-4 justify-center">
                    {selectedPerson.socialLinks.instagram && (
                      <a
                        href={selectedPerson.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-navy-900 dark:text-white hover:text-gold-400 dark:hover:text-gold-200 transition-colors duration-300"
                      >
                        <FaInstagram className="text-xl sm:text-2xl" />
                      </a>
                    )}
                    {selectedPerson.socialLinks.linkedin && (
                      <a
                        href={selectedPerson.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-navy-900 dark:text-white hover:text-gold-400 dark:hover:text-gold-200 transition-colors duration-300"
                      >
                        <FaLinkedin className="text-xl sm:text-2xl" />
                      </a>
                    )}
                    {selectedPerson.socialLinks.email && (
                      <a
                        href={`mailto:${selectedPerson.socialLinks.email}`}
                        className="text-navy-900 dark:text-white hover:text-gold-400 dark:hover:text-gold-200 transition-colors duration-300"
                      >
                        <FaEnvelope className="text-xl sm:text-2xl" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WeddingParty; 