import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaQrcode, FaCopy, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface RegistryDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  registry: {
    name: string;
    description: string;
    accountNumber?: string;
    qrCode?: string;
    url: string;
    additionalDetails?: string;
    bankName?: string;
    accountName?: string;
  };
}

export function RegistryDetailsDialog({
  isOpen,
  onClose,
  registry
}: RegistryDetailsDialogProps) {
  const [showQR, setShowQR] = React.useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-navy-800 text-navy-900 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl playfair">{registry.name}</DialogTitle>
          <DialogDescription className="text-navy-600 dark:text-navy-200">
            {registry.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          {registry.accountNumber && (
            <div className="space-y-2">
              {registry.bankName && (
                <div className="text-sm text-navy-600 dark:text-navy-200">
                  <span className="font-semibold">Bank:</span> {registry.bankName}
                </div>
              )}
              {registry.accountName && (
                <div className="text-sm text-navy-600 dark:text-navy-200">
                  <span className="font-semibold">Account Name:</span> {registry.accountName}
                </div>
              )}
              <div className="flex items-center justify-between gap-2 p-3 bg-navy-50/50 dark:bg-navy-700/50 rounded-lg">
                <span className="text-sm font-mono">{registry.accountNumber}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(registry.accountNumber!, 'Account number')}
                  className="hover:bg-navy-100 dark:hover:bg-navy-600"
                >
                  <FaCopy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {registry.qrCode && (
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowQR(!showQR)}
              >
                <FaQrcode className="mr-2" />
                {showQR ? 'Hide QR Code' : 'Show QR Code'}
              </Button>

              <AnimatePresence>
                {showQR && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white dark:bg-navy-700 rounded-lg border border-gold-200/20">
                      <Image
                        src={registry.qrCode}
                        alt={`${registry.name} QR Code`}
                        width={300}
                        height={300}
                        className="mx-auto"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {registry.additionalDetails && (
            <div className="text-sm text-navy-600 dark:text-navy-200">
              <p className="whitespace-pre-line">{registry.additionalDetails}</p>
            </div>
          )}

          {registry.url && registry.url.startsWith('http') && (
            <Button
              className="w-full bg-navy-900 hover:bg-navy-800 dark:bg-white/10 dark:hover:bg-white/20"
              onClick={() => window.open(registry.url, '_blank', 'noopener,noreferrer')}
            >
              <span className="flex items-center gap-2">
                Visit Registry <FaExternalLinkAlt className="w-3 h-3" />
              </span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 