'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaLink, FaQrcode } from 'react-icons/fa';
import { Button } from './button';

interface QRCodeGeneratorProps {
  url?: string;
  size?: number;
  className?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  url,
  size = 200,
  className = ''
}) => {
  const [qrUrl, setQrUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate the QR code using an API
  useEffect(() => {
    // Use the provided URL or the current page URL
    const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    setCurrentUrl(targetUrl);

    // Construct the QR code API URL
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(targetUrl)}&margin=10`;
    setQrUrl(apiUrl);
  }, [url, size]);

  // Handle the copy to clipboard action
  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          setCopied(true);
          // Reset the copied state after 2 seconds
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  // Handle QR code download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'wedding-invitation-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        className="bg-white p-4 rounded-lg shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {qrUrl && (
          <div className="relative group">
            <img
              src={qrUrl}
              alt="QR Code for the wedding invitation"
              className="rounded-md"
              width={size}
              height={size}
            />
            <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="text-white border-white hover:bg-white/20"
              >
                <FaDownload className="mr-2" /> Download
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-4 flex flex-col items-center">
        <p className="text-center text-sm mb-2 flex items-center">
          <FaQrcode className="mr-1" /> Scan to visit our wedding website
        </p>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="text-xs"
        >
          <FaLink className="mr-1" />
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
