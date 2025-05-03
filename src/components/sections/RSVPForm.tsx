'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaCheck, FaTimes, FaSpinner, FaHeart, FaList } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DecorativeElements from "../animation/DecorativeElements";
import { DialogClose } from '@radix-ui/react-dialog';

// Add keyframes animation style using the createGlobalStyle approach
// This will be inserted once when the component is first rendered
const MarqueeStyle = () => {
  useEffect(() => {
    // Only add the style once
    if (!document.getElementById('rsvp-marquee-style')) {
      const style = document.createElement('style');
      style.id = 'rsvp-marquee-style';
      style.innerHTML = `
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `;
      document.head.appendChild(style);
      
      // Clean up on unmount
      return () => {
        const styleElement = document.getElementById('rsvp-marquee-style');
        if (styleElement) {
          styleElement.remove();
        }
      };
    }
  }, []);
  
  return null;
};

// Form validation schema
const formSchema = z.object({
  name: z.string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must be less than 50 characters.",
    })
    .regex(/^[a-zA-Z\s'-]*$/, {
      message: "Name can only contain letters, spaces, hyphens, and apostrophes.",
    }),
  email: z.string()
    .min(1, {
      message: "Email is required.",
    })
    .email({
      message: "Please enter a valid email address.",
    })
    .max(100, {
      message: "Email must be less than 100 characters.",
    }),
  guestCount: z.string()
    .min(1, {
      message: "Number of guests is required.",
    })
    .regex(/^[1-9]\d*$/, {
      message: "Please enter a valid number of guests (minimum 1).",
    }),
  message: z.string()
    .min(1, {
      message: "Message is required.",
    })
    .max(500, {
      message: "Message must be less than 500 characters.",
    }),
});

// Local storage key for RSVP entries
const RSVP_STORAGE_KEY = 'wedding_rsvp_entries';
const LAST_UPDATED_KEY = 'wedding_rsvp_last_updated';

interface RSVPEntry {
  id: string;
  name: string;
  email: string;
  guestCount: number;
  message?: string;
  date: Date;
}

// Embedded current data from SheetDB as fallback - this ensures data always displays
const EMBEDDED_DATA: RSVPEntry[] = [
  {
    id: 'entry-1',
    name: 'Rolando S Valle',
    email: 'thisIsEmail@gmail.com',
    guestCount: 5,
    message: 'this is just a test',
    date: new Date('5/2/2025 18:40:26')
  },
  {
    id: 'entry-2',
    name: 'Rolando Valle',
    email: 'rolandovalle0428@gmail.com',
    guestCount: 1,
    message: 'this is awesome',
    date: new Date('5/2/2025 18:56:52')
  },
  {
    id: 'entry-3',
    name: 'Rolando Valle',
    email: 'rolandovalle0428@gmail.com',
    guestCount: 5,
    message: 'fdfd',
    date: new Date('5/2/2025 19:03:07')
  },
  {
    id: 'entry-4',
    name: 'lance',
    email: 'rolandovalle0428@gmail.com',
    guestCount: 1,
    message: 'this is a test',
    date: new Date('5/2/2025 19:07:13')
  },
  {
    id: 'entry-5',
    name: 'Rolando Valle',
    email: 'rolandovalle0428@gmail.com',
    guestCount: 5,
    message: 'this is a test',
    date: new Date('5/2/2025 19:21:19')
  },
  {
    id: 'entry-6',
    name: 'rosa may pano',
    email: 'rolandovalle0428@gmail.com',
    guestCount: 5,
    message: 'this is a test',
    date: new Date('5/2/2025 19:21:43')
  },
  {
    id: 'entry-7',
    name: 'lance valle',
    email: 'rolandovalle0428@gmail.com',
    guestCount: 5,
    message: 'this is a tesst',
    date: new Date('5/2/2025 19:31:29')
  },
  {
    id: 'entry-8',
    name: 'Israel Fernandex',
    email: 'rolandovalle0428@gmail.com',
    guestCount: 1,
    message: 'asdfdsafas',
    date: new Date('5/2/2025 19:31:51')
  },
  {
    id: 'entry-9',
    name: 'Rolando Valle',
    email: 'rolandovalle0428@gmail.com',
    guestCount: 3,
    message: 'sdffsdfsdfsdf',
    date: new Date('5/2/2025 19:33:23')
  }
];

// RSVPMarquee: Add modal for viewing RSVP details
const RSVPMarquee: React.FC<{ entries: RSVPEntry[] }> = ({ entries }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [selectedEntry, setSelectedEntry] = useState<RSVPEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Only play marquee if there are 6 or more entries
  const shouldMarquee = entries.length >= 6;

  // Ensure enough entries for smooth scroll
  const getDisplayEntries = () => {
    let displayEntries = [...entries];
    if (shouldMarquee) {
      while (displayEntries.length < 10) {
        displayEntries = [...displayEntries, ...entries];
      }
    }
    return displayEntries;
  };

  // Calculate scroll duration
  const getScrollDuration = () => {
    const baseDuration = 18;
    const entriesCount = Math.max(getDisplayEntries().length, 10);
    return baseDuration + (entriesCount * 1.5);
  };

  const displayEntries = getDisplayEntries();
  const duration = getScrollDuration();

  return (
    <>
      <div
        className="relative overflow-hidden h-full min-h-0 flex-1 rounded-2xl bg-navy-950/10 backdrop-blur-sm"
        ref={marqueeRef}
        style={{ minHeight: '18rem', maxHeight: '100%' }}
      >
        {shouldMarquee ? (
          <div
            className="absolute left-0 right-0"
            style={{
              animation: `scrollUp ${duration}s linear infinite`,
              willChange: 'transform',
            }}
          >
            {displayEntries.map((entry, index) => (
              <div
                key={`${entry.id}-${index}`}
                className="p-3 mb-2 mx-1 bg-navy-900/10 rounded-lg flex flex-col gap-1 transition-all duration-200"
                style={{ minHeight: 56 }}
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium text-navy-900 dark:text-gold text-base truncate" style={{maxWidth: '60%'}}>{entry.name}</div>
                  <button
                    className="text-xs text-navy-400 dark:text-gold/70 font-semibold px-2 py-0.5 rounded bg-navy-100/30 dark:bg-navy-950/30 hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
                    onClick={() => { setSelectedEntry(entry); setIsModalOpen(true); }}
                    aria-label={`View details for ${entry.name}`}
                    type="button"
                  >
                    VIEW
                  </button>
                </div>
                <div className="flex items-center text-xs text-navy-500 dark:text-white/70 gap-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-gold/80 text-navy-900 dark:bg-gold/90 dark:text-navy-900 shadow-sm">
                    {entry.guestCount} {entry.guestCount === 1 ? 'guest' : 'guests'}
                  </span>
                  <span>•</span>
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-2">
            {entries.map((entry, index) => (
              <div
                key={`${entry.id}-${index}`}
                className="p-3 mx-1 mb-2 bg-navy-900/10 rounded-lg flex flex-col gap-1 transition-all duration-200"
                style={{ minHeight: 56 }}
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium text-navy-900 dark:text-gold text-base truncate" style={{maxWidth: '60%'}}>{entry.name}</div>
                  <button
                    className="text-xs text-navy-400 dark:text-gold/70 font-semibold px-2 py-0.5 rounded bg-navy-100/30 dark:bg-navy-950/30 hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
                    onClick={() => { setSelectedEntry(entry); setIsModalOpen(true); }}
                    aria-label={`View details for ${entry.name}`}
                    type="button"
                  >
                    VIEW
                  </button>
                </div>
                <div className="flex items-center text-xs text-navy-500 dark:text-white/70 gap-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-gold/80 text-navy-900 dark:bg-gold/90 dark:text-navy-900 shadow-sm">
                    {entry.guestCount} {entry.guestCount === 1 ? 'guest' : 'guests'}
                  </span>
                  <span>•</span>
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Fade gradients for smooth appearance */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/90 to-transparent dark:from-[#0A1A2F] z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent dark:from-[#0A1A2F] z-10 pointer-events-none"></div>
      </div>
      {/* RSVP Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-navy-900 border border-gold/20 rounded-2xl shadow-2xl p-0 overflow-hidden transition-all duration-300">
          <div className="flex justify-between items-center px-6 pt-6 pb-2">
            <DialogTitle className="text-xl text-navy-900 dark:text-gold font-bold playfair">RSVP Details</DialogTitle>
          </div>
          {selectedEntry && (
            <div className="px-6 pb-6 flex flex-col gap-2">
              <div className="font-medium text-navy-900 dark:text-gold text-lg truncate">{selectedEntry.name}</div>
              <div className="text-xs text-navy-500 dark:text-gold/80">{selectedEntry.email}</div>
              <div className="flex items-center text-sm text-navy-700 dark:text-gold/80 gap-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-gold/80 text-navy-900 dark:bg-gold/90 dark:text-navy-900 shadow-sm">
                  {selectedEntry.guestCount} {selectedEntry.guestCount === 1 ? 'guest' : 'guests'}
                </span>
                <span>•</span>
                <span>{new Date(selectedEntry.date).toLocaleDateString()}</span>
              </div>
              {selectedEntry.message && (
                <div className="mt-2 bg-navy-100/80 dark:bg-navy-800/80 p-3 rounded italic border-l-2 border-gold/40 text-navy-900 dark:text-gold">
                  "{selectedEntry.message}"
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const GuestListEntry: React.FC<{ entry: RSVPEntry; isNew: boolean }> = ({ entry, isNew }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.li
      className={`bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 ${isNew ? 'ring-2 ring-gold/30' : ''} overflow-hidden`}
      initial={isNew ? { opacity: 0, x: -10 } : { opacity: 1 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-gold font-medium mb-1 flex items-center">
              {entry.name}
              {isNew && (
                <span className="ml-2 text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  New
                </span>
              )}
            </p>
            <div className="flex items-center text-xs text-white/70 space-x-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-gold/80 text-navy-900 dark:bg-gold/90 dark:text-navy-900 shadow-sm">
                {entry.guestCount} {entry.guestCount === 1 ? 'guest' : 'guests'}
              </span>
              <span>•</span>
              <span>{new Date(entry.date).toLocaleDateString()}</span>
            </div>
          </div>
          {entry.message && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-4 text-xs text-gold/80 hover:text-gold flex items-center group focus:outline-none"
            >
              <span className="mr-1">{isExpanded ? 'Hide' : 'View'} message</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''} group-hover:scale-110`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {entry.message && isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 pb-4"
        >
          <div className="bg-navy-900/40 rounded-lg p-3 text-sm text-white/80 italic border-l-2 border-gold/30">
            "{entry.message}"
          </div>
        </motion.div>
      )}
    </motion.li>
  );
};

// GuestListModal: Only a single X close button in the top right
const GuestListModal = ({ entries, dataSource, totalGuests }: { entries: RSVPEntry[], dataSource: string, totalGuests: number }) => {
  const getDataSourceLabel = () => {
    switch (dataSource) {
      case 'google_sheets': return 'Live data from Google Sheets';
      case 'sheetdb': return 'Live data from SheetDB';
      case 'sheetdb_direct': return 'Live data from SheetDB (direct)';
      case 'sheetdb_proxy': return 'Live data from SheetDB (proxy)';
      case 'localStorage': return 'Cached data (offline)';
      case 'embedded': return 'Built-in data (offline)';
      case 'sample': return 'Sample data (offline)';
      case 'error': return 'Error loading data';
      default: return '';
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-gold bg-gold/90 text-navy-900 dark:bg-transparent dark:text-gold dark:border-gold hover:bg-gold/80 dark:hover:bg-gold/20 font-semibold shadow-sm rounded-xl h-12 flex items-center justify-center gap-2 transition-all duration-200"
        >
          <span className="flex items-center gap-2">
            <FaList className="h-4 w-4" />
            View All Guests ({totalGuests})
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-navy-900 border border-gold/20 rounded-2xl shadow-2xl p-0 overflow-hidden transition-all duration-300">
        <div className="flex justify-between items-center px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl text-navy-900 dark:text-gold font-bold playfair">Guest List</DialogTitle>
        </div>
        <div className="px-6 pb-2 flex justify-between items-center text-sm">
          <span className="text-navy-700 dark:text-gold/80 font-medium bg-navy-100/80 dark:bg-navy-800/80 px-3 py-1.5 rounded-full">{totalGuests} {totalGuests === 1 ? 'guest' : 'guests'} confirmed</span>
          <span className="text-xs text-navy-400 dark:text-gold/60">{getDataSourceLabel()}</span>
        </div>
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar px-6 pb-6 pt-2">
          <div className="space-y-2">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="p-3 rounded-lg bg-cream-100 text-navy-900 dark:bg-navy-800/80 dark:text-gold shadow-sm flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium text-navy-900 dark:text-gold text-base truncate" style={{maxWidth: '60%'}}>{entry.name}</div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-gold/80 text-navy-900 dark:bg-gold/90 dark:text-navy-900 shadow-sm">
                    {entry.guestCount} {entry.guestCount === 1 ? 'guest' : 'guests'}
                  </span>
                </div>
                <div className="flex items-center text-xs text-navy-500 dark:text-gold/80 gap-3">
                  <span>{entry.email}</span>
                  <span>•</span>
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                </div>
                {entry.message && (
                  <div className="text-navy-700 dark:text-gold text-sm mt-1 bg-cream-200 dark:bg-navy-800/80 p-2 rounded italic border-l-2 border-gold/40">
                    "{entry.message}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RSVPForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Add state for RSVP entries and total guests
  const [rsvpEntries, setRsvpEntries] = useState<RSVPEntry[]>([]);
  const [totalGuests, setTotalGuests] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<string>(''); // Track data source

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      guestCount: "",
      message: "",
    },
  });

  // Add a function to fetch RSVP data with retry logic
  const fetchRSVPData = async () => {
    setIsLoading(true);
    setError(null);
    
    // STEP 1: Start with embedded data as baseline (will ALWAYS work)
    let currentEntries = [...EMBEDDED_DATA];
    let dataSource = 'embedded';
    
    // STEP 2: Try to get data from localStorage (if available)
    try {
      const storedEntries = localStorage.getItem(RSVP_STORAGE_KEY);
      if (storedEntries) {
        const parsedEntries = JSON.parse(storedEntries);
        const entriesWithDates = parsedEntries.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        
        // Use local data if it exists
        currentEntries = entriesWithDates;
        dataSource = 'localStorage';
        console.log('Using localStorage data');
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    
    // STEP 3: Display what we have so far (embedded or localStorage)
    setRsvpEntries(currentEntries);
    setTotalGuests(currentEntries.reduce((sum, entry) => sum + entry.guestCount, 0));
    setDataSource(dataSource);
    
    // Check if we should attempt a fresh fetch (limit to once per hour)
    const lastUpdated = localStorage.getItem(LAST_UPDATED_KEY);
    const shouldFetch = !lastUpdated || (Date.now() - parseInt(lastUpdated)) > 60 * 60 * 1000;
    
    if (shouldFetch) {
      // STEP 4: Try fetching from SheetDB directly (client-side, no server)
      try {
        // Try multiple proxy services - one might work if others fail
        const sheetdbUrl = 'https://sheetdb.io/api/v1/th9sc7kawss4e';
        console.log('Attempting to fetch fresh data using multiple proxies...');
        
        // First try direct fetch (might work in some browsers)
        try {
          console.log('Trying direct fetch first...');
          const directResponse = await fetch(sheetdbUrl, { 
            headers: { 'Accept': 'application/json' },
            mode: 'cors' // Explicit CORS mode
          });
          
          if (directResponse.ok) {
            const directData = await directResponse.json();
            processAndUpdateData(directData, 'sheetdb_direct');
            setIsLoading(false);
            return;
          }
        } catch (directError) {
          console.log('Direct fetch failed, trying proxies...');
        }
        
        // Define proxy types
        type ProxyInfo = {
          url: string;
          name: string;
        };
        
        // Function to try a specific proxy
        const tryProxy = async (proxyUrl: string, proxyName: string): Promise<any[] | null> => {
          try {
            console.log(`Trying ${proxyName}...`);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            // Ensure URL is always a string
            let fetchUrl = '';
            if (proxyName === 'allorigins') {
              fetchUrl = `${proxyUrl}${encodeURIComponent(sheetdbUrl)}`;
            } else if (proxyName === 'corsproxy') {
              fetchUrl = `${proxyUrl}${encodeURIComponent(sheetdbUrl)}`;
            } else if (proxyName === 'cors-anywhere') {
              fetchUrl = `${proxyUrl}${sheetdbUrl}`;
            }
            
            const response = await fetch(fetchUrl, {
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              throw new Error(`${proxyName} failed: ${response.status}`);
            }
            
            let data: any;
            if (proxyName === 'allorigins') {
              // Extract from response.contents for allorigins
              const responseData = await response.json();
              data = JSON.parse(responseData.contents);
            } else {
              data = await response.json();
            }
            
            return data;
          } catch (error) {
            console.error(`${proxyName} proxy failed:`, error);
            return null;
          }
        };
        
        // Try multiple proxies in sequence
        const proxies: ProxyInfo[] = [
          { url: 'https://api.allorigins.win/raw?url=', name: 'allorigins' },
          { url: 'https://corsproxy.io/?', name: 'corsproxy' },
          { url: 'https://cors-anywhere.herokuapp.com/', name: 'cors-anywhere' }
        ];
        
        for (const proxy of proxies) {
          const data = await tryProxy(proxy.url, proxy.name);
          if (data) {
            processAndUpdateData(data, `sheetdb_${proxy.name}`);
            setIsLoading(false);
            return;
          }
        }
        
        throw new Error('All proxies failed');
      } catch (error) {
        console.error('Fresh data fetch failed:', error);
        // No error state - we already have data showing
      }
    }
    
    setIsLoading(false);
  };

  // Helper function to process and update data
  const processAndUpdateData = (data: any[], source: string): void => {
    if (Array.isArray(data) && data.length > 0) {
      // Format the data properly
      const freshEntries = data.map((row, i) => ({
        id: `entry-${i + 1}`,
        name: row['Full Name'] || '',
        email: row['Email'] || '',
        guestCount: parseInt(row['Number Of Guests'] || '1', 10) || 1,
        message: row['Message'] || '',
        date: new Date(row['Timestamp'] || Date.now()),
      }));
      
      // Sort by newest first
      freshEntries.sort((a, b) => b.date.getTime() - a.date.getTime());
      
      // Update state with fresh data
      setRsvpEntries(freshEntries);
      setTotalGuests(freshEntries.reduce((sum, entry) => sum + entry.guestCount, 0));
      setDataSource(source);
      console.log(`Updated with fresh data from ${source}`);
      
      // Save to localStorage for future use
      try {
        localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(freshEntries));
        localStorage.setItem(LAST_UPDATED_KEY, Date.now().toString());
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
    }
  };

  // Fetch RSVP data on component mount and at regular intervals
  useEffect(() => {
    // Load data immediately
    fetchRSVPData();
    
    // Set up interval to refresh data every 15 minutes (900,000ms)
    const intervalId = setInterval(() => {
      fetchRSVPData();
    }, 900000);
    
    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);  // Empty dependency array ensures this runs once on mount
  
  // Also refresh immediately after submission
  useEffect(() => {
    if (isSubmitted) {
      // Wait a bit for SheetDB to update and then fetch new data
      const timerId = setTimeout(() => {
        fetchRSVPData();
      }, 5000);
      
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isSubmitted]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError(null);
    try {
      console.log('Submitting RSVP form...', values);
      const googleFormData = new FormData();
      googleFormData.append('entry.405401269', values.name);
      googleFormData.append('entry.1755234596', values.email);
      googleFormData.append('entry.1335956832', values.guestCount);
      googleFormData.append('entry.893740636', values.message || '');

      // Submit to Google Form
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSejSnwGH9gZJm_JuXrVq0yd8ncHKu5ZqyMKG-4bcw2zOtWKJw/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData,
      });
      
      console.log('Form submitted successfully');
      
      // Create a new entry from the submitted data
      const newEntry: RSVPEntry = {
        id: uuidv4(), // Generate a unique ID
        name: values.name,
        email: values.email,
        guestCount: parseInt(values.guestCount) || 1,
        message: values.message,
        date: new Date() // Current time
      };
      
      // Update the entries list and total guest count immediately for better UX
      setRsvpEntries(prevEntries => {
        // Add the new entry at the beginning (newest first)
        const updatedEntries = [newEntry, ...prevEntries];
        
        // Save to localStorage as a backup
        try {
          localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(updatedEntries));
          console.log('Saved updated entries to localStorage');
        } catch (error) {
          console.error('Failed to save to localStorage:', error);
        }
        
        return updatedEntries;
      });
      
      // Update the total guest count
      setTotalGuests(prevTotal => prevTotal + (parseInt(values.guestCount) || 1));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      form.reset();
      
      // Reset submitted state after showing thank you message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
      // Fetch updated data after a delay to allow Google Sheets to update
      setTimeout(() => {
        fetchRSVPData();
      }, 10000); // Try after 10 seconds to get the updated list
    } catch (err) {
      console.error('Error submitting form:', err);
      setIsSubmitting(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-white to-cream-50 dark:from-[#0A1A2F] dark:to-[#162B4D]">
      <MarqueeStyle />
      <DecorativeElements type="hearts" count={12} />
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl playfair mb-4 text-navy-900 dark:text-white font-bold tracking-tight">RSVP</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-4" />
          <p className="figtree text-navy-600 dark:text-navy-200 max-w-xl mx-auto text-sm sm:text-base">
            We would be delighted to have you join us on our special day.
            Please let us know if you'll be attending by filling out the form below.
          </p>
          {totalGuests > 0 && (
            <div className="mt-4 inline-block bg-gold/10 border border-gold/20 text-gold px-4 py-2 rounded-full text-sm shadow-sm">
              <span className="font-medium">{totalGuests}</span> {totalGuests === 1 ? 'guest' : 'guests'} have confirmed so far
              {isLoading && <span className="ml-2 inline-block animate-pulse">•</span>}
              {dataSource === 'localStorage' && (
                <span className="ml-2 text-xs text-gold/60">(using cached data)</span>
              )}
              {dataSource === 'error' && (
                <span className="ml-2 text-xs text-red-500">(error loading data)</span>
              )}
            </div>
          )}
          {error && (
            <div className="mt-4 text-red-500 text-sm bg-red-500/10 rounded-lg py-2 px-4 inline-block">
              {error}
            </div>
          )}
          <div className="mt-2">
            <button 
              onClick={() => fetchRSVPData()} 
              className="text-xs text-gold/60 hover:text-gold/80 flex items-center gap-1 mx-auto hover:bg-gold/5 py-1 px-2 rounded-full transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block h-3 w-3 border-t-2 border-r-2 border-gold/40 rounded-full"></span>
                  <span>Refreshing...</span>
                </>
              ) : (
                <>
                  <span>↻</span>
                  <span>Refresh guest list</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch h-full">
          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-[#0A1A2F] p-8 rounded-3xl shadow-lg border border-white/30 dark:border-navy-800/30 backdrop-blur-lg overflow-hidden flex flex-col gap-6 h-full"
          >
            <h3 className="text-2xl playfair mb-2 text-navy-900 dark:text-white font-bold tracking-tight">Kindly Respond</h3>
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-900/10">
                    <FaCheck className="text-2xl" />
                  </div>
                  <h4 className="text-xl playfair mb-2 text-navy-900 dark:text-white">Thank You!</h4>
                  <p className="figtree text-navy-600 dark:text-navy-200 mb-4">Your RSVP has been recorded. We look forward to celebrating with you!</p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 border-gold/20 text-gold hover:bg-gold/10 dark:border-gold/30 dark:text-gold dark:hover:bg-gold/10"
                  >
                    Send Another Response
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[80vh] overflow-y-auto"
                >
                  <Form {...form}>
                    <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" autoComplete="off">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-navy-900 dark:text-white font-medium flex items-center">
                              Full Name 
                              <span className="text-gold ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="Your name" 
                                className="bg-white/5 dark:bg-navy-950/30 border-navy-100 dark:border-navy-700/50 focus:border-gold dark:focus:border-gold text-navy-900 dark:text-white placeholder:text-navy-400/70 dark:placeholder:text-navy-300/50 rounded-xl px-4 py-2 h-12 focus:ring-2 focus:ring-gold/20 dark:focus:ring-gold/20"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                  }
                                  if (e.key === 'F11') {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-navy-900 dark:text-white font-medium flex items-center">
                              Email
                              <span className="text-gold ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                type="email"
                                placeholder="your.email@example.com" 
                                className="bg-white/5 dark:bg-navy-950/30 border-navy-100 dark:border-navy-700/50 focus:border-gold dark:focus:border-gold text-navy-900 dark:text-white placeholder:text-navy-400/70 dark:placeholder:text-navy-300/50 rounded-xl px-4 py-2 h-12 focus:ring-2 focus:ring-gold/20 dark:focus:ring-gold/20"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                  }
                                  if (e.key === 'F11') {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="guestCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-navy-900 dark:text-white font-medium flex items-center">
                              Number of Guests (including yourself)
                              <span className="text-gold ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                type="number"
                                min="1"
                                placeholder="Guest Count" 
                                className="bg-white/5 dark:bg-navy-950/30 border-navy-100 dark:border-navy-700/50 focus:border-gold dark:focus:border-gold text-navy-900 dark:text-white placeholder:text-navy-400/70 dark:placeholder:text-navy-300/50 rounded-xl px-4 py-2 h-12 focus:ring-2 focus:ring-gold/20 dark:focus:ring-gold/20"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                  }
                                  if (e.key === 'F11') {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-navy-900 dark:text-white font-medium flex items-center">
                              Message
                              <span className="text-gold ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <textarea
                                {...field}
                                className="w-full min-h-[100px] p-4 rounded-xl bg-white/5 dark:bg-navy-950/30 border border-navy-100 dark:border-navy-700/50 focus:border-gold dark:focus:border-gold text-navy-900 dark:text-white placeholder:text-navy-400/70 dark:placeholder:text-navy-300/50 focus:outline-none focus:ring-2 focus:ring-gold/20 dark:focus:ring-gold/20 resize-none"
                                placeholder="Please share any dietary restrictions or special messages for the couple..."
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && e.ctrlKey) {
                                    e.preventDefault();
                                    form.handleSubmit(onSubmit)();
                                  }
                                  if (e.key === 'F11') {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className={`
                          relative w-full h-12 text-sm uppercase font-semibold tracking-wide
                          bg-gradient-to-r from-navy-900 to-navy-800
                          text-gold
                          rounded-xl transition-all duration-300
                          overflow-hidden group
                          disabled:opacity-70 disabled:cursor-not-allowed
                          border border-gold/20 hover:border-gold/40
                          hover:shadow-lg hover:shadow-gold/5
                          active:scale-[0.98] transform
                          backdrop-blur-sm
                        `}
                        disabled={isSubmitting}
                      >
                        <motion.div
                          className="relative flex items-center justify-center py-3"
                          initial={false}
                          animate={isSubmitting ? { scale: 0.95 } : { scale: 1 }}
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin mr-2 text-gold" />
                              <span className="relative">
                                <span className="opacity-0">Send RSVP</span>
                                <span className="absolute inset-0 flex items-center justify-center">
                                  Submitting...
                                </span>
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="relative inline-flex items-center group-hover:translate-x-1 transition-transform duration-300">
                                SEND RSVP
                                <motion.span
                                  className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                  →
                                </motion.span>
                              </span>
                            </>
                          )}
                        </motion.div>
                      </Button>
                      {error && <div className="text-red-500 text-center mt-2 bg-red-500/10 p-2 rounded-lg">{error}</div>}
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Guest List Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-[#0A1A2F] p-8 rounded-3xl shadow-lg border border-white/30 dark:border-navy-800/30 backdrop-blur-lg relative overflow-hidden flex flex-col h-full min-h-[500px]"
          >
            <h3 className="text-2xl playfair mb-2 text-navy-900 dark:text-white font-bold tracking-tight">Latest RSVPs</h3>
            {rsvpEntries.length > 0 ? (
              <>
                <div className="flex-1 min-h-0">
                  <RSVPMarquee entries={rsvpEntries} />
                </div>
                <div className="mt-6 flex justify-center">
                  <GuestListModal entries={rsvpEntries} dataSource={dataSource} totalGuests={totalGuests} />
                </div>
              </>
            ) : (
              <div className="text-center py-10 text-navy-400 dark:text-navy-300 bg-navy-950/10 rounded-xl backdrop-blur-sm flex-1 flex flex-col justify-center">
                {isLoading ? (
                  <FaSpinner className="animate-spin mx-auto text-2xl text-gold mb-2" />
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto bg-navy-950/20 rounded-full flex items-center justify-center mb-4 border border-navy-800/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="mb-2 text-gold/70">No RSVPs received yet.</p>
                    <p className="text-sm text-gold/50">Be the first to RSVP!</p>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;

