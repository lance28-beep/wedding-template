'use client';

import React, { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowUp, FaEnvelope, FaShareAlt, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaGift, FaCamera, FaInstagram, FaFacebook, FaTwitter, FaPinterest, FaTiktok, FaMoon, FaSun, FaLink } from 'react-icons/fa';
import QRCodeGenerator from '../ui/QRCodeGenerator';
import ThemeToggle from '../ui/ThemeToggle';
import { useInView } from 'react-intersection-observer';
import AudioPlayer from '../ui/AudioPlayer';
import InvitationPDFButton from '../ui/InvitationPDF';

interface SocialMedia {
  platform: string;
  url: string;
}

interface FooterProps {
  coupleNames: string;
  shareUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  venueAddress?: string;
  receiverName?: string;
  weddingDate?: string;
  hashtag?: string;
  groomSocial?: SocialMedia[];
  brideSocial?: SocialMedia[];
}

const Footer: React.FC<FooterProps> = ({
  coupleNames,
  shareUrl,
  contactEmail,
  contactPhone,
  venueAddress,
  receiverName = "Dear Guest",
  weddingDate,
  hashtag,
  groomSocial = [],
  brideSocial = []
}) => {
  const currentYear = new Date().getFullYear();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <FaInstagram />;
      case 'facebook':
        return <FaFacebook />;
      case 'twitter':
        return <FaTwitter />;
      case 'pinterest':
        return <FaPinterest />;
      case 'tiktok':
        return <FaTiktok />;
      default:
        return null;
    }
  };

  const marqueeMessages = [
    "Love is not about how many days, months, or years you have been together",
    "Love is about how much you love each other every single day",
    "Thank you for being part of our journey",
    "Every love story is beautiful, but ours is my favorite",
    "Together is a beautiful place to be",
    "And so the adventure begins",
    "Two hearts, one love, one beautiful journey",
    "Forever begins today"
  ];

  return (
    <footer className="py-12 md:py-16 navy-bg text-white/90 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--gold)_0%,_transparent_25%)] opacity-5" />
        <div className="absolute inset-0 bg-[url('/img/pattern.png')] opacity-5" />
      </div>

      {/* Marquee */}
      <div className="w-full overflow-hidden mb-12 md:mb-16">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="marquee-item">
                {marqueeMessages.map((message, index) => (
                  <Fragment key={index}>
                    <span className="text-gold/60">♥</span>
                    <span className="text-sm md:text-base playfair text-white/80">{message}</span>
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Personal Message */}
        {isMounted && (
          <motion.div
            ref={ref}
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl playfair mb-4 md:mb-6 text-gold">
              {receiverName}
            </h3>
            <p className="text-base md:text-lg figtree mb-4 md:mb-6 leading-relaxed text-white/80 max-w-2xl mx-auto px-4">
              We are thrilled to share this special day with you. Your presence would mean the world to us as we begin our journey together.
            </p>
            <p className="text-base md:text-lg figtree italic text-white/70">
              With love and gratitude,
            </p>
            <p className="text-xl md:text-2xl playfair text-gold mt-2 md:mt-3">
              {coupleNames}
            </p>
          </motion.div>
        )}

        {/* RSVP Call to Action */}
        <motion.div
          className="text-center mb-12 md:mb-20 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
            <h4 className="text-xl md:text-2xl playfair text-gold mb-3 md:mb-4">
              Will You Join Us?
            </h4>
            <p className="text-sm md:text-base figtree text-white/80 mb-6">
              We would be honored to have you celebrate this special moment with us. Please let us know if you can make it!
            </p>
            <a
              href="#rsvp"
              className="inline-flex items-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold px-6 md:px-8 py-3 rounded-full transition-all duration-300 group transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                const rsvpSection = document.getElementById('rsvp');
                if (rsvpSection) {
                  rsvpSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="text-sm md:text-base figtree font-medium">RSVP Now</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="transform group-hover:translate-x-1 transition-transform"
              >
                →
              </motion.span>
            </a>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Share Section */}
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-base md:text-lg playfair mb-4 md:mb-6 text-gold flex items-center gap-2">
              <FaShareAlt className="text-sm" />
              Share Our Wedding
            </h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 w-full flex flex-col items-center transform hover:scale-[1.02] transition-transform duration-300">
              <QRCodeGenerator url={shareUrl} size={120} />
              {shareUrl && (
                <button
                  onClick={() => copyToClipboard(shareUrl)}
                  className="mt-3 text-xs md:text-sm figtree text-white/60 hover:text-gold transition-all duration-300 flex items-center gap-2 group"
                >
    
                </button>
              )}
            </div>
          </motion.div>

          {/* Couple Names */}
          <motion.div 
            className="flex flex-col items-center py-4 md:py-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-lg md:text-xl font-bold playfair mb-4 md:mb-6 flex items-center gap-2 md:gap-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
            >
              <span className="text-gold">{coupleNames.split(' & ')[0]}</span>
              <motion.div
                className="text-romantic transform hover:scale-110 transition-transform duration-300"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaHeart />
              </motion.div>
              <span className="text-gold">{coupleNames.split(' & ')[1]}</span>
            </motion.div>

            <div className="flex flex-col items-center gap-3 md:gap-4">
              <ThemeToggle />
              <button
                onClick={scrollToTop}
                className="bg-white/5 hover:bg-white/10 transition-all duration-300 p-2 md:p-2.5 rounded-full hover:scale-110"
                aria-label="Scroll to top"
              >
                <FaArrowUp className="text-gold text-xs md:text-sm" />
              </button>

              <div className="mt-2 flex flex-col items-center">
                <InvitationPDFButton 
                  coupleNames={coupleNames}
                  weddingDate={weddingDate}
                  venueAddress={venueAddress}
                  rsvpUrl={shareUrl}
                  websiteUrl={shareUrl?.replace('https://', '')}
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-base md:text-lg playfair mb-4 md:mb-6 text-gold flex items-center gap-2">
              <FaEnvelope className="text-sm" />
              Contact Us
            </h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 w-full flex flex-col gap-4 transform hover:scale-[1.02] transition-transform duration-300">
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-xs md:text-sm figtree text-white/80 hover:text-gold transition-all duration-300"
                >
                  {contactEmail}
                </a>
              )}

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3">
                <h4 className="text-xs figtree uppercase tracking-wider text-gold/80 mb-3">Background Music:</h4>
                <AudioPlayer src="/prenup/Nothing's Gonna Change My Love for You  George Benson - saxophone cover.mp3" />
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-xs figtree uppercase tracking-wider text-gold/80">Follow Our Journey</h4>
                <div className="flex gap-3 md:gap-4 justify-center">
                  {[
                    { icon: FaFacebook, label: 'Facebook', url: 'https://facebook.com' },
                    { icon: FaInstagram, label: 'Instagram', url: 'https://instagram.com' },
                    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com' },
                    { icon: FaTiktok, label: 'TikTok', url: 'https://tiktok.com' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/20 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="text-gold text-xs md:text-sm group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs md:text-sm figtree text-white/60 mb-3 md:mb-4">
            We look forward to celebrating with you!
          </p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3 md:mb-4" />
          <p className="text-xs text-white/50 figtree">
            &copy; {currentYear} {coupleNames}. All rights reserved.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        .marquee-content {
          display: flex;
          white-space: nowrap;
          animation: marquee 60s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .marquee-content {
            animation-duration: 40s;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
