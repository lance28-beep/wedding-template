'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useMount } from 'react-use';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAttemptedAutoplay = useRef(false);

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize audio only on client side
  useEffect(() => {
    if (!isClient) return;

    const audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      if (!hasAttemptedAutoplay.current) {
        hasAttemptedAutoplay.current = true;
        attemptPlay();
      }
    };

    const handleError = (e: ErrorEvent) => {
      console.error('Audio error:', e);
      setError('Failed to load audio. Please try again.');
      setIsPlaying(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError as EventListener);
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('play', () => setIsPlaying(true));

    audio.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.remove();
      }
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError as EventListener);
      audio.removeEventListener('ended', () => setIsPlaying(false));
      audio.removeEventListener('pause', () => setIsPlaying(false));
      audio.removeEventListener('play', () => setIsPlaying(true));
    };
  }, [src, isClient, volume]);

  // Handle scroll-based autoplay
  useEffect(() => {
    if (!isClient || !isLoaded || isPlaying) return;

    const handleScroll = () => {
      if (!isPlaying && audioRef.current) {
        attemptPlay();
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying, isLoaded, isClient]);

  // Handle video interactions
  useEffect(() => {
    if (!isClient) return;

    const handleVideoPlay = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
      }
    };

    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.addEventListener('play', handleVideoPlay));

    return () => {
      videos.forEach(video => video.removeEventListener('play', handleVideoPlay));
    };
  }, [isPlaying, isClient]);

  const attemptPlay = async () => {
    if (!audioRef.current || !isLoaded || !isClient) return;

    try {
      audioRef.current.volume = volume;
      await audioRef.current.play();
      setIsPlaying(true);
      setError(null);
    } catch (error) {
      console.log('Autoplay prevented, waiting for user interaction');
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current || !isLoaded || !isClient) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setError(null);
    } catch (error) {
      setError('Failed to play audio. Please try again.');
      console.error('Error toggling play:', error);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isClient) return;
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (!isClient || !audioRef.current) return;
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  // Server-side or initial render
  if (!isClient) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gold/80 font-medium">Background Music:</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center gap-3 min-w-[120px]">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10" />
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10" />
            <div className="w-20 h-1 bg-gold/20 rounded-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/80 truncate">
              Nothing's Gonna Change My Love for You
              <span className="text-white/40 ml-1">• George Benson (Saxophone Cover)</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gold/80 font-medium">Background Music:</p>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
      
      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-all duration-300">
        <div className="flex items-center gap-3 min-w-[120px]">
          <button
            onClick={togglePlay}
            disabled={!isLoaded}
            className={`w-8 h-8 flex items-center justify-center rounded-full
              ${isLoaded ? 'bg-gold/20 hover:bg-gold/30' : 'bg-white/10 cursor-not-allowed'}
              transition-all duration-300`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause size={12} className="text-gold" /> : <FaPlay size={12} className="text-gold" />}
          </button>
          
          <button
            onClick={toggleMute}
            disabled={!isLoaded}
            className={`w-8 h-8 flex items-center justify-center rounded-full
              ${isLoaded ? 'bg-gold/20 hover:bg-gold/30' : 'bg-white/10 cursor-not-allowed'}
              transition-all duration-300`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? 
              <FaVolumeMute size={12} className="text-gold" /> : 
              <FaVolumeUp size={12} className="text-gold" />
            }
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            disabled={!isLoaded}
            className="w-20 h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold
              disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Volume control"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-white/80 truncate">
            Nothing's Gonna Change My Love for You
            <span className="text-white/40 ml-1">• George Benson (Saxophone Cover)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
