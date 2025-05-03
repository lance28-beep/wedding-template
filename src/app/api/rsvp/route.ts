import { NextRequest, NextResponse } from 'next/server';

interface RSVPEntry {
  id: string;
  name: string;
  email: string;
  guestCount: number;
  message?: string;
  date: Date;
}

// Simple in-memory cache for last successful response
type CacheEntry = {
  data: RSVPEntry[];
  timestamp: number;
};

let responseCache: CacheEntry | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Helper function for fetch with timeout and better error handling
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const { signal } = controller;
  
  const timeoutPromise = new Promise<Response>((_, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error(`Fetch timeout after ${timeoutMs}ms for URL: ${url}`));
    }, timeoutMs);
  });

  try {
    const response = await Promise.race([
      fetch(url, { ...options, signal }),
      timeoutPromise
    ]);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for URL: ${url}`);
    }
    
    return response;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timed out after ${timeoutMs}ms for URL: ${url}`);
      }
      throw new Error(`Fetch failed for URL: ${url}. Error: ${error.message}`);
    }
    throw error;
  }
}

// Function to retry an operation with exponential backoff
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> {
  let currentRetry = 0;
  let delay = initialDelay;
  
  while (true) {
    try {
      return await operation();
    } catch (error) {
      currentRetry++;
      if (currentRetry >= maxRetries) {
        console.error(`Failed after ${maxRetries} retries:`, error);
        throw error;
      }
      
      const jitter = Math.random() * 0.1 * delay;
      delay = delay * 2 + jitter;
      console.log(`Retry ${currentRetry} after ${Math.round(delay)}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Function to fetch and parse Google Sheets data
async function fetchGoogleSheetsData(sheetId: string): Promise<RSVPEntry[]> {
  // Check if we have a valid cached response
  if (responseCache && Date.now() - responseCache.timestamp < CACHE_TTL) {
    console.log('Using cached response from', new Date(responseCache.timestamp).toISOString());
    return responseCache.data;
  }

  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
  
  try {
    const response = await retryWithBackoff(async () => {
      return await fetchWithTimeout(csvUrl, {
        cache: 'no-store',
        headers: {
          'pragma': 'no-cache',
          'cache-control': 'no-cache'
        }
      }, 15000);
    });

    const csvText = await response.text();
    const lines = csvText.split('\n');
    
    if (lines.length < 2) {
      throw new Error('CSV has less than 2 lines, cannot parse');
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const entries: RSVPEntry[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());
      const entry: RSVPEntry = {
        id: `entry-${i}`,
        name: values[headers.indexOf('Name')] || '',
        email: values[headers.indexOf('Email')] || '',
        guestCount: parseInt(values[headers.indexOf('Guest Count')] || '1', 10) || 1,
        message: values[headers.indexOf('Message')] || '',
        date: new Date(values[headers.indexOf('Timestamp')] || Date.now())
      };
      entries.push(entry);
    }

    // Update cache
    responseCache = {
      data: entries,
      timestamp: Date.now()
    };

    return entries;
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('RSVP API route handler started');
    
    // Get the Google Sheet ID from environment variable
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) {
      throw new Error('GOOGLE_SHEET_ID environment variable is not set');
    }

    // Force refresh if requested
    const forceRefresh = request.nextUrl.searchParams.get('refresh') === 'true';
    if (forceRefresh) {
      responseCache = null;
    }

    const entries = await fetchGoogleSheetsData(sheetId);
    const totalGuests = entries.reduce((sum, entry) => sum + entry.guestCount, 0);

    return NextResponse.json({
      entries,
      totalGuests,
      dataSource: 'google_sheets',
      error: null,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });
  } catch (error) {
    console.error('Error in RSVP API route handler:', error);
    
    return NextResponse.json({
      entries: [],
      totalGuests: 0,
      dataSource: 'error',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, {
      status: 500,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
} 