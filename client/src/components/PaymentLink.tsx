/*
Design: Kinetic Energy Interface
- Prominent payment link with copy button
- Visual feedback on copy
*/

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentLinkProps {
  url: string;
}

export default function PaymentLink({ url }: PaymentLinkProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Payment link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };
  
  return (
    <motion.div
      className="my-6 p-6 rounded-xl border-2 border-accent/50 bg-accent/10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <h4 className="text-sm font-semibold text-accent uppercase tracking-wide">
          Payment Link Ready
        </h4>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1 bg-background/50 rounded-lg px-4 py-3 border border-border/50">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-foreground/90 hover:text-primary transition-colors break-all flex items-center gap-2"
          >
            {url}
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
        </div>
        
        <Button
          onClick={handleCopy}
          variant={copied ? 'default' : 'outline'}
          className={`gap-2 ${copied ? 'bg-accent text-accent-foreground' : ''}`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Link
            </>
          )}
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground mt-3">
        Click to open in new tab or copy to send via your preferred channel
      </p>
    </motion.div>
  );
}
