'use client';

import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMoneyBillWave, FaExternalLinkAlt, FaQrcode, FaCopy, FaLink, FaWallet, FaPiggyBank, FaHeart, FaHandHoldingHeart, FaGift } from 'react-icons/fa';
import { RiRobot2Fill } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DecorativeElements from '../animation/DecorativeElements';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { RegistryDetailsDialog } from '@/components/ui/registry-details-dialog';
import { Loading } from '@/components/ui/loading';

interface Registry {
  id: number;
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  qrCode?: string;
  accountNumber?: string;
  isExternal?: boolean;
  bankName?: string;
  accountName?: string;
  additionalDetails?: string;
}

interface GiftRegistryProps {
  title?: string;
  subtitle?: string;
  message?: string;
  registries?: Registry[];
}

// Add particle effect component
const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold/30 rounded-full"
          initial={{ 
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0
          }}
          animate={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

const GiftRegistry: React.FC<GiftRegistryProps> = ({
  title = "Gift Registry",
  subtitle = "Your presence is our present, but if you wish to give...",
  message = "We are truly blessed to have you celebrate our special day with us. While your presence is our greatest gift, if you wish to give a monetary gift, we've provided several convenient options below:",
  registries: providedRegistries
}) => {
  const [mounted, setMounted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showQR, setShowQR] = useState<number | null>(null);
  const [selectedRegistry, setSelectedRegistry] = useState<Registry | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const defaultRegistries = useMemo(() => [
    {
      id: 1,
      name: "GCash",
      description: "Send your monetary gift through GCash",
      url: "",
      icon: <FaWallet className="text-3xl" />,
      accountNumber: "09123456789",
      accountName: "John & Jane Doe",
      qrCode: "/img/qr/gcash.png",
      additionalDetails: "Your presence at our wedding is the greatest gift of all. However, if you wish to give a monetary gift, we've provided our GCash details above. Thank you for your generosity! 💝"
    },
    {
      id: 2,
      name: "Bank Transfer",
      description: "Support our new journey together",
      url: "#bank-details",
      icon: <FaPiggyBank className="text-3xl" />,
      bankName: "BDO",
      accountName: "John Doe",
      accountNumber: "1234567890",
      additionalDetails: "We are grateful for your contribution to our new beginning. Your thoughtfulness means the world to us! ✨\n\nPlease include your name in the transfer reference so we can properly thank you."
    },
    {
      id: 3,
      name: "PayMaya",
      description: "Send your gift via PayMaya",
      url: "",
      icon: <FaMoneyBillWave className="text-3xl" />,
      accountNumber: "09876543210",
      accountName: "Jane Doe",
      qrCode: "/img/qr/maya.png",
      additionalDetails: "Thank you for being part of our special day and for your generous gift! 🙏"
    }
  ], []);

  const registries = providedRegistries || defaultRegistries;

  const copyToClipboard = (text: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text);
      toast.success('Account number copied to clipboard!');
    }
  };

  const handleRegistryClick = (registry: Registry) => {
    if (registry.url.startsWith('#')) {
      setSelectedRegistry(registry);
    } else if (registry.url.startsWith('http') && typeof window !== 'undefined') {
      window.open(registry.url, '_blank', 'noopener,noreferrer');
    } else if (registry.accountNumber) {
      setSelectedRegistry(registry);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  if (!mounted) {
    return <Loading />;
  }

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white via-white to-gold-50/10 dark:from-navy-900 dark:via-navy-900/95 dark:to-navy-800/90"
    >
      <ParticleEffect />
      {/* Enhanced Wedding decoration elements with subtle animation */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Image
            src="/img/10-105973_navy-blue-wedding-clipart-white-corner-design-png-removebg-preview.png"
            alt="Wedding decoration"
            width={256}
            height={256}
            className="opacity-50 dark:invert dark:opacity-30"
          />
        </motion.div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [90, 92, 90]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Image
            src="/img/10-105973_navy-blue-wedding-clipart-white-corner-design-png-removebg-preview.png"
            alt="Wedding decoration"
            width={256}
            height={256}
            className="opacity-50 dark:invert dark:opacity-30"
          />
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [-90, -88, -90]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Image
            src="/img/10-105973_navy-blue-wedding-clipart-white-corner-design-png-removebg-preview.png"
            alt="Wedding decoration"
            width={256}
            height={256}
            className="opacity-50 dark:invert dark:opacity-30"
          />
        </motion.div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [180, 182, 180]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Image
            src="/img/10-105973_navy-blue-wedding-clipart-white-corner-design-png-removebg-preview.png"
            alt="Wedding decoration"
            width={256}
            height={256}
            className="opacity-50 dark:invert dark:opacity-30"
          />
        </motion.div>
      </div>

      {/* Enhanced Section Header */}
      <div className="container mx-auto text-center mb-16 relative">
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl playfair text-navy-900 dark:text-white mb-4 relative">
            {title}
          </h2>
        </motion.div>

        <motion.div
          className="flex justify-center my-4"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-32 h-0.5 bg-gradient-to-r from-gold/30 via-gold to-gold/30 rounded-full" />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-navy-600 dark:text-navy-200 figtree max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Enhanced Gift Message with more encouraging content */}
      <div className="container mx-auto max-w-3xl mb-16">
        <motion.div
          className="relative bg-white/80 dark:bg-navy-800/80 backdrop-blur-lg rounded-2xl p-8 md:p-10 text-center shadow-lg border border-gold/10 hover:border-gold/20 transition-all duration-300 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className="relative z-10"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <FaHeart className="text-romantic/80 mx-auto mb-6 text-3xl" />
          </motion.div>
          
          <p className="figtree text-lg md:text-xl text-navy-600 dark:text-navy-200 italic relative z-10 mb-6">
            {message}
          </p>

          <motion.div
            className="mt-6 p-4 bg-gold-50/20 dark:bg-navy-700/20 rounded-lg border border-gold/10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="text-base md:text-lg text-navy-700 dark:text-navy-100">
              Your generous contribution will help us start our new life together and create beautiful memories. 
              Whether it's helping us furnish our new home, plan our honeymoon, or save for our future, 
              your gift will be cherished and appreciated beyond measure.
            </p>
          </motion.div>

          <motion.div
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <FaGift className="text-gold-400 text-xl" />
            <FaHandHoldingHeart className="text-romantic text-xl" />
            <FaGift className="text-gold-400 text-xl" />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Registry Cards */}
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {registries.map((registry: Registry, index: number) => (
            <motion.div
              key={registry.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover="hover"
              className="group"
            >
              <Card className="h-full flex flex-col bg-white/80 dark:bg-navy-800/80 backdrop-blur-lg border-gold/10 hover:border-gold/20 shadow-lg transition-all duration-500 relative overflow-hidden">
                <CardHeader className="relative">
                  <div className="mb-3 text-3xl text-gold-400 dark:text-gold-300 relative z-10">
                    {registry.icon}
                  </div>
                  
                  <CardTitle className="text-2xl playfair text-navy-900 dark:text-white relative z-10">
                    {registry.name}
                  </CardTitle>
                  
                  <CardDescription className="figtree text-base text-navy-600 dark:text-navy-200 relative z-10">
                    {registry.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow relative z-10">
                  {registry.qrCode && (
                    <div className="mt-4 space-y-4">
                      <Button
                        variant="outline"
                        className="w-full bg-white/80 dark:bg-navy-700/80 border-gold/10 hover:border-gold/20 hover:bg-gold-50/10 dark:hover:bg-navy-700/70 transition-all duration-300 relative overflow-hidden"
                        onClick={() => setShowQR(showQR === registry.id ? null : registry.id)}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <FaQrcode className="mr-2" />
                          {showQR === registry.id ? 'Hide QR Code' : 'Show QR Code'}
                        </span>
                      </Button>

                      <AnimatePresence>
                        {showQR === registry.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative rounded-lg overflow-hidden bg-white/90 dark:bg-navy-700/90 p-4"
                          >
                            <Image
                              src={registry.qrCode}
                              alt={`${registry.name} QR Code`}
                              width={200}
                              height={200}
                              className="mx-auto"
                              priority
                              onError={(e) => {
                                console.error(`Error loading QR code for ${registry.name}:`, e);
                                const img = e.target as HTMLImageElement;
                                img.style.display = 'none';
                              }}
                            />
                            {registry.accountNumber && (
                              <div className="mt-2 text-center">
                                <p className="text-sm text-navy-600 dark:text-navy-200">Account Number:</p>
                                <div className="flex items-center justify-center gap-2 mt-1">
                                  <code className="bg-navy-100/50 dark:bg-navy-700/50 px-2 py-1 rounded text-sm">
                                    {registry.accountNumber}
                                  </code>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(registry.accountNumber!)}
                                    className="text-gold hover:text-gold-600 dark:text-gold-400 dark:hover:text-gold-300"
                                  >
                                    <FaCopy size={14} />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="mt-auto relative z-10">
                  <Button 
                    onClick={() => handleRegistryClick(registry)}
                    className="w-full bg-navy-900/90 hover:bg-navy-800 dark:bg-white/10 dark:hover:bg-white/20 text-white dark:text-white transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {registry.url.startsWith('#') ? (
                        <>
                          View Details <FaLink className="text-xs" />
                        </>
                      ) : registry.url.startsWith('http') ? (
                        <>
                          View Registry <FaExternalLinkAlt className="text-xs" />
                        </>
                      ) : (
                        <>
                          View Details <FaCopy className="text-xs" />
                        </>
                      )}
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details Dialog */}
      {selectedRegistry && (
        <RegistryDetailsDialog
          isOpen={!!selectedRegistry}
          onClose={() => setSelectedRegistry(null)}
          registry={selectedRegistry}
        />
      )}
    </section>
  );
};

export default GiftRegistry;
