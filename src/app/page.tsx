'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FaAmazon, FaCreditCard, FaGift, FaHome, FaWallet, FaPiggyBank, FaMoneyBillWave } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animation components
import EnvelopeLoader from '@/components/animation/EnvelopeLoader';

// UI components
const ThemeToggle = dynamic(() => import('@/components/ui/ThemeToggle'), { ssr: false });
const NavBar = dynamic(() => import('@/components/ui/NavBar'), { ssr: false });

// Section components
import HeroSection from '@/components/sections/HeroSection';
import CountdownTimer from '@/components/ui/CountdownTimer';
import LoveStoryTimeline, { type TimelineEvent } from '@/components/sections/LoveStoryTimeline';
import CircularGallery from '@/components/sections/CircularGallery';
import MapVenueInfo from '@/components/sections/MapVenueInfo';
import RSVPForm from '@/components/sections/RSVPForm';
import GiftRegistry from '@/components/sections/GiftRegistry';
import PrenupGallery from '@/components/sections/PrenupGallery';
import WeddingParty from '@/components/sections/WeddingParty';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import SaveTheDate from '@/components/ui/SaveTheDate';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Wedding details
  const weddingDate = new Date('2025-10-10T15:00:00');
  const coupleNames = "Daniel & Kathryn";

  // Simulate loading duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000); // Match the duration in EnvelopeLoader.tsx

    return () => clearTimeout(timer);
  }, []);

  // Sample timeline events
  const loveStoryEvents: TimelineEvent[] = [
    {
      id: 1,
      date: "2011",
      title: "First Meeting",
      location: "ABS-CBN, Philippines",
      description: "Kathryn and Daniel first met when they were cast together in the youth-oriented show 'Growing Up'. Their on-screen chemistry was undeniable, and this marked the beginning of their journey together.",
      image: "/img/TimelIneEvent/First_Meeting.png",
      imageAlt: "Kathryn and Daniel's first meeting",
      quote: "Sometimes the best things in life happen unexpectedly."
    },
    {
      id: 2,
      date: "2012",
      title: "First Project Together",
      location: "Philippines",
      description: "Their first major project together was the hit teen drama 'Princess and I', where they played lead roles. This series further strengthened their bond and showcased their undeniable chemistry.",
      image: "/img/TimelIneEvent/Princess_and_I.png",
      imageAlt: "Princess and I promotional photo"
    },
    {
      id: 3,
      date: "2013",
      title: "First Movie Together",
      location: "Philippines",
      description: "They starred in their first movie together, 'Must Be... Love', which became a box office success. This marked the beginning of their successful movie partnership that would span over a decade.",
      image: "/img/TimelIneEvent/must_be_love.png",
      imageAlt: "Must Be... Love movie poster",
      quote: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."
    },
    {
      id: 4,
      date: "2015",
      title: "Pangako Sa'yo",
      location: "Philippines",
      description: "Their breakthrough role came in the remake of the iconic teleserye 'Pangako Sa'yo'. This project solidified their status as the country's most beloved love team, KathNiel.",
      image: "/img/TimelIneEvent/Pangako_sayu.png",
      imageAlt: "Pangako Sa'yo promotional photo"
    },
    {
      id: 5,
      date: "2018",
      title: "The La Luna Sangre Era",
      location: "Philippines",
      description: "Their supernatural drama 'La Luna Sangre' became a massive hit, showcasing their growth as actors and their enduring chemistry. This period marked their maturity both as artists and as a couple.",
      image: "/img/TimelIneEvent/laluna.png",
      imageAlt: "La Luna Sangre promotional photo",
      quote: "True love stories never have endings."
    }
  ];

  // Sample photos for gallery
  const photos = [
    {
      image: "/img/Photogallery/image_1.png",
      text: "Where our hearts first met"
    },
    {
      image: "/img/Photogallery/image_2.png",
      text: "Every moment with you"
    },
    {
      image: "/img/Photogallery/image_3.png",
      text: "Found my home in you"
    },
    {
      image: "/img/Photogallery/image_4.png",
      text: "Two souls, one journey"
    },
    {
      image: "/img/Photogallery/image_5.png",
      text: "Love beyond time"
    },
    {
      image: "/img/Photogallery/image_6.png",
      text: "Living our dream"
    },
    {
      image: "/img/Photogallery/image_7.png",
      text: "Our perfect story"
    },
    {
      image: "/img/Photogallery/image_8.png",
      text: "Forever with you"
    },
    {
      image: "/img/Photogallery/image_9.png",
      text: "Together is perfect"
    },
    {
      image: "/img/Photogallery/image_10.png",
      text: "Our favorite story"
    },
    {
      image: "/img/Photogallery/image_11.png",
      text: "All my tomorrows"
    }
  ];

  // Registry links
  const registries = [
    {
      id: 1,
      name: "GCash",
      description: "Send your monetary gift through GCash",
      url: "",
      icon: <FaWallet />,
      accountNumber: "09123456789",
      accountName: "John & Jane Doe",
      qrCode: "/img/qr/gcash.png",
      bankName: "GCash",
      additionalDetails: "Your presence at our wedding is the greatest gift of all. However, if you wish to give a monetary gift, we've provided our GCash details above. Thank you for your generosity! 💝"
    },
    {
      id: 2,
      name: "Bank Transfer",
      description: "Support our new journey together",
      url: "#bank-details",
      icon: <FaPiggyBank />,
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
      icon: <FaMoneyBillWave />,
      accountNumber: "09876543210",
      accountName: "Jane Doe",
      qrCode: "/img/qr/maya.png",
      additionalDetails: "Thank you for being part of our special day and for your generous gift! 🙏"
    }
  ];

  // Wedding Party data
  const weddingParty = {
    groom: {
      name: "Daniel Padilla ",
      role: "Groom",
      image: "/img/weddingParty/couple/Daniel.png",
      description: "Daniel John Elago Ford, known professionally as Daniel Padilla, is a Filipino actor and singer. He is a recipient of multiple accolades across television, film, and music, including the FAMAS Award for Best Actor and PMPC Star Award for Movie Actor of the Year, as well as three World Music Awards nominations."
    },
    bride: {
      name: "Kathryn Bernardo",
      role: "Bride",
      image: "/img/weddingParty/couple/Kat.png",
      description: "She is the youngest of four siblings and was raised by her parents, Luzviminda and Teodore Bernardo. Initially, Bernardo was raised as a member of Iglesia ni Cristo. However, it is believed that she converted to born again around 2016"
    },
    groomParents: [
      {
        name: "Rommel Padilla",
        role: "Father of the Groom",
        relation: "Father",
        image: "/img/weddingParty/couple/parents/rommel.png"
      },
      {
        name: "Karla Estrada",
        role: "Mother of the Groom",
        relation: "Mother",
        image: "/img/weddingParty/couple/parents/Karla_Estrada .png"
      }
    ],
    brideParents: [
      {
        name: "James Doe",
        role: "Father of the Bride",
        relation: "Father",
        image: "/img/weddingParty/avatar.png"
      },
      {
        name: "Elizabeth Doe",
        role: "Mother of the Bride",
        relation: "Mother",
        image: "/img/weddingParty/image.png"
      }
    ],
    bridalEntourage: {
      bestMan: {
        name: "Michael Brown",
        role: "Best Man",
        image: "/img/weddingParty/avatar.png",
        description: "John's best friend since college"
      },
      maidOfHonor: {
        name: "Sarah Johnson",
        role: "Maid of Honor",
        image: "/img/weddingParty/image.png",
        description: "Jane's sister and closest confidante"
      },
      groomsmen: [
        {
          name: "David Lee",
          role: "Groomsman",
          image: "/img/weddingParty/avatar.png",
          description: "College roommate"
        },
        {
          name: "Richard Wilson",
          role: "Groomsman",
          image: "/img/weddingParty/avatar.png",
          description: "Childhood friend"
        }
      ],
      bridesmaids: [
        {
          name: "Emily Wilson",
          role: "Bridesmaid",
          image: "/img/weddingParty/image.png",
          description: "Best friend from art school"
        },
        {
          name: "Jessica Taylor",
          role: "Bridesmaid",
          image: "/img/weddingParty/image.png",
          description: "Cousin and childhood friend"
        }
      ],
      ringBearer: {
        name: "Tommy Wilson",
        role: "Ring Bearer",
        image: "/img/weddingParty/avatar.png",
        description: "The groom's nephew"
      },
      coinBearer: {
        name: "Jimmy Parker",
        role: "Coin Bearer",
        image: "/img/weddingParty/avatar.png",
        description: "The bride's nephew"
      },
      bibleBearer: {
        name: "Billy Thompson",
        role: "Bible Bearer",
        image: "/img/weddingParty/image.png",
        description: "The groom's cousin"
      },
      flowerGirls: [
        {
          name: "Lily Anderson",
          role: "Flower Girl",
          image: "/img/weddingParty/image.png",
          description: "The bride's niece"
        },
        {
          name: "Rose Martinez",
          role: "Flower Girl",
          image: "/img/weddingParty/image.png",
          description: "The groom's niece"
        }
      ],
      viel: [
        {
          name: "Thomas Anderson",
          role: "Veil Sponsor",
          image: "/img/weddingParty/avatar.png",
          description: "Family friend"
        },
        {
          name: "Margaret Anderson",
          role: "Veil Sponsor",
          image: "/img/weddingParty/image.png",
          description: "Family friend"
        }
      ],
      cord: [
        {
          name: "Robert Wilson",
          role: "Cord Sponsor",
          image: "/img/weddingParty/avatar.png",
          description: "Uncle of the groom"
        },
        {
          name: "Patricia Wilson",
          role: "Cord Sponsor",
          image: "/img/weddingParty/image.png",
          description: "Aunt of the groom"
        }
      ],
      candle: [
        {
          name: "William Taylor",
          role: "Candle Sponsor",
          image: "/img/weddingParty/avatar.png",
          description: "Uncle of the bride"
        },
        {
          name: "Catherine Taylor",
          role: "Candle Sponsor",
          image: "/img/weddingParty/image.png",
          description: "Aunt of the bride"
        }
      ]
    },
    principalSponsors: [
      {
        name: "Thomas Anderson",
        role: "Principal Sponsor",
        relation: "Godfather",
        image: "/img/weddingParty/avatar.png",
        description: "Mentor and family friend"
      },
      {
        name: "Margaret Anderson",
        role: "Principal Sponsor",
        relation: "Godmother",
        image: "/img/weddingParty/image.png",
        description: "Family friend and spiritual guide"
      },
      {
        name: "William Taylor",
        role: "Principal Sponsor",
        relation: "Godfather",
        image: "/img/weddingParty/avatar.png",
        description: "Business mentor"
      },
      {
        name: "Patricia Taylor",
        role: "Principal Sponsor",
        relation: "Godmother",
        image: "/img/weddingParty/image.png",
        description: "Life mentor"
      }
    ]
  };

  // FAQ data
  const faqs = [
    {
      question: "What is the dress code?",
      answer: "The dress code is formal/black tie optional. For men, this means a suit and tie or tuxedo. For women, this means a formal dress or evening gown."
    },
    {
      question: "What time should I arrive?",
      answer: "Please arrive at least 30 minutes before the ceremony start time. The ceremony will begin promptly at 3:00 PM."
    },
    {
      question: "Is there parking available at the venue?",
      answer: "Yes, there is ample parking available at the venue. Valet service will be provided for your convenience."
    },
    {
      question: "Can I bring a plus one?",
      answer: "Please check your invitation for the number of guests included in your RSVP. If you have any questions, feel free to contact us."
    },
    {
      question: "What are the food options?",
      answer: "We will be serving a full dinner with options for chicken, beef, and vegetarian meals. Please indicate any dietary restrictions in your RSVP."
    },
    {
      question: "Will there be transportation provided?",
      answer: "Transportation will be provided between the ceremony and reception venues for all guests. Please check the schedule for departure times."
    }
  ];

  // Navigation items
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Photos', href: '#photos' },
    { label: 'Details', href: '#details' },
    { label: 'Wedding Party', href: '#wedding-party' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Registry', href: '#registry' },
    { label: 'FAQ', href: '#faq' }
  ];

  const Gallery = () => {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey Together</h2>
            <p className="text-xl text-gray-600">Capturing moments that tell our story</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={photo.image}
                    alt={photo.text}
                    width={500}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {photo.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen">
      {/* Envelope Loading Animation */}
      {loading && <EnvelopeLoader />}

      {/* Navigation */}
      <NavBar
        navItems={navItems}
        coupleNameShort="D & K"
      />

      {/* Hero Section */}
      <section id="home">
        <HeroSection
          coupleName={coupleNames}
          date="THURSDAY"
          time="3:00 PM"
          month="October"
          day={10}
          year={2025}
        />

        {/* Countdown Timer */}
        <div className="py-12 px-6 bg-gradient-to-b from-navy to-navy-light text-white">
          <div className="container mx-auto">
            <CountdownTimer targetDate={weddingDate} />
          </div>
        </div>
      </section>

      {/* Love Story Timeline */}
      <section id="story">
        <LoveStoryTimeline 
          events={loveStoryEvents}
          title="Our Love Story"
          subtitle="A journey of love, laughter, and beautiful moments that brought us to this special day"
        />
      </section>

      {/* Photo Gallery */}
      <section id="photos" className="py-32 px-6 bg-gradient-to-b from-cream to-white dark:from-navy dark:to-navy-light relative overflow-hidden min-h-[100vh] flex items-center justify-center transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute heart-float text-romantic/30 dark:text-romantic/20"
              initial={{ 
                left: "50%",
                top: "50%",
                opacity: 0,
                scale: 0
              }}
              animate={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
        <div className="w-full max-w-[1800px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-navy dark:text-cream mb-4 transition-colors duration-300">
              Photo Gallery
            </h2>
            <div className="flex justify-center my-3">
              <div className="w-20 h-1 bg-romantic/50 dark:bg-romantic/30 rounded-full transition-colors duration-300" />
            </div>
            <p className="text-lg text-navy-light dark:text-cream/80 transition-colors duration-300">
              A collection of our most cherished moments together
            </p>
          </div>
          <div className="w-full h-[80vh] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/20 dark:to-navy/20 pointer-events-none z-10 transition-colors duration-300" />
            <CircularGallery 
              items={photos}
              bend={2}
              borderRadius={0.1}
              font="bold 36px DM Sans"
            />
          </div>
        </div>
      </section>

      {/* Location & Details */}
      <section id="details">
        <MapVenueInfo
          ceremonyInfo={{
            name: "St. Mary's Cathedral",
            address: "123 Wedding Venue Way, Celebration City, WA 98765",
            googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.2891632224296!2d-122.33976388438686!3d47.60506597918407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906ab5090f3cc7%3A0xa636cd513bba22dc!2sSeattle%2C%20WA!5e0!3m2!1sen!2sus!4v1650393877219!5m2!1sen!2sus",
            time: "Thursday, October 10, 2025 at 3:00 PM",
            dresscode: "Formal / Black Tie Optional",
            parkingInfo: "Ample parking available at the venue. Valet service provided."
          }}
          receptionInfo={{
            name: "Grand Ballroom at The Majestic",
            address: "456 Celebration Avenue, Celebration City, WA 98765",
            googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.2891632224296!2d-122.33976388438686!3d47.60506597918407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906ab5090f3cc7%3A0xa636cd513bba22dc!2sSeattle%2C%20WA!5e0!3m2!1sen!2sus!4v1650393877219!5m2!1sen!2sus",
            time: "Thursday, October 10, 2025 at 5:00 PM",
            diningInfo: "Full dinner service with choice of chicken, beef, or vegetarian option. Please specify dietary restrictions in your RSVP.",
            additionalInfo: "Cocktail hour begins at 5:00 PM. Dinner will be served at 6:30 PM. Dancing to follow until 11:00 PM."
          }}
        />
      </section>

      {/* RSVP Form */}
      <section id="rsvp">
        <RSVPForm />
      </section>

      {/* Wedding Party */}
      <section id="wedding-party">
        <WeddingParty {...weddingParty} />
      </section>

      {/* Gift Registry */}
      <section id="registry">
        <GiftRegistry registries={registries} />
      </section>

      {/* Prenup Gallery */}
      <section id="prenup-gallery">
        <PrenupGallery 
          videoUrl="/prenup/prenupvideo.mp4"
          images={[
            {
              url: "/img/Photogallery/image_1.png",
              alt: "Prenup photo 1"
            },
            {
              url: "/img/Photogallery/image_2.png",
              alt: "Prenup photo 2"
            },
            {
              url: "/img/Photogallery/image_3.png",
              alt: "Prenup photo 3"
            },
            {
              url: "/img/Photogallery/image_4.png",
              alt: "Prenup photo 4"
            },
            {
              url: "/img/Photogallery/image_5.png",
              alt: "Prenup photo 5"
            }
          ]}
        />
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <FAQ faqs={faqs} />
      </section>

      {/* Footer */}
      <Footer
        coupleNames={coupleNames}
        shareUrl="https://bronandjamiewed.com"
        contactEmail="hello@bronandjamiewed.com"
      />
    </main>
  );
}
