"use client";

import { useEffect, useState } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Initialize the theme from localStorage on client-side only
  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('wedding-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply the appropriate theme class to document element
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
