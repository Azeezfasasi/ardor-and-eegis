'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Megaphone } from 'lucide-react';

export default function MessageSlider() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/message?limit=100');
        if (response.data.success && response.data.messages.length > 0) {
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Only show slider if scroll position is near the top (within 100px)
      if (window.scrollY > 100) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading || messages.length === 0 || isScrolling) {
    return null;
  }

  // Combine all messages into one continuous string
  const marqueeText = messages
    .map((msg) => `${msg.content}${msg.description ? ` • ${msg.description}` : ''}`)
    .join('     ❖     ❖     ❖      ');

  return (
    <div className="w-full bg-[#B59C5B] py-3 md:py-4 overflow-hidden shadow-lg border-b border-[#B59C5B]">
      <div className="relative flex items-center h-full">
        <div className="absolute left-[-1.5px] z-40 m-0 bg-[#7B542F] text-white font-semibold flex items-center px-3 py-5 shadow-md border-2 border-[#B59C5B] rounded-r-lg">
          <Megaphone className="w-6 h-6 inline-block mr-1" /> 
        </div>
      {/* Marquee */}
        <div className="animate-marquee-scroll hover:pause-animation">
          <span className="text-white text-sm md:text-base font-medium inline-block px-4 whitespace-nowrap">
            {marqueeText}
            {/* <span className="mx-4">❖</span> */}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee-scroll {
          animation: marqueeScroll 40s linear infinite;
          display: inline-block;
        }

        .hover\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
