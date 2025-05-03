'use client';

import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaGoogle,
  FaApple,
  FaMicrosoft,
  FaCalendarDay,
  FaChevronDown,
  FaDownload
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './button';

interface SaveTheDateProps {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  className?: string;
}

const SaveTheDate: React.FC<SaveTheDateProps> = ({
  title,
  description,
  location,
  startDate,
  endDate,
  className = ''
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [copied, setCopied] = useState(false);

  // Format dates for the ICS file (iCal format)
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  // Generate Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const startIso = startDate.toISOString().replace(/-|:|\.\d+/g, '');
    const endIso = endDate.toISOString().replace(/-|:|\.\d+/g, '');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&sprop=&sprop=name:`;
  };

  // Generate Microsoft Outlook URL
  const getOutlookUrl = () => {
    const startIso = startDate.toISOString().slice(0, 19).replace(/[-:]/g, '');
    const endIso = endDate.toISOString().slice(0, 19).replace(/[-:]/g, '');

    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&startdt=${startIso}&enddt=${endIso}`;
  };

  // Generate ICS file (works with Apple Calendar, Outlook, etc.)
  const generateICS = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'PRODID:-//Wedding Invitation//EN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding-invitation.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open the calendar URL in a new tab/window
  const openCalendarUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div ref={ref} className={`${className}`}>
      <DropdownMenu>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <DropdownMenuTrigger asChild>
            <Button className="w-full bg-navy hover:bg-navy/90">
              <FaCalendarAlt className="mr-2" />
              Save the Date
              <FaChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
        </motion.div>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => openCalendarUrl(getGoogleCalendarUrl())}>
            <FaGoogle className="mr-2" /> Google Calendar
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => openCalendarUrl(getOutlookUrl())}>
            <FaMicrosoft className="mr-2" /> Outlook Calendar
          </DropdownMenuItem>

          <DropdownMenuItem onClick={generateICS}>
            <FaApple className="mr-2" /> Apple Calendar
          </DropdownMenuItem>

          <DropdownMenuItem onClick={generateICS}>
            <FaDownload className="mr-2" /> Download ICS File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center text-xs text-navy-light/70 mt-2"
      >
        <FaCalendarDay className="inline-block mr-1" />
        Add this event to your calendar
      </motion.div>
    </div>
  );
};

export default SaveTheDate;
