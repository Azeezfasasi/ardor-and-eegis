'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MessageSlider() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading || messages.length === 0) {
    return null;
  }

  // Combine all messages into one continuous string
  const marqueeText = messages
    .map((msg) => `📢 ${msg.content}${msg.description ? ` • ${msg.description}` : ''}`)
    .join('     ❖     ❖     ❖     ');

  return (
    <div className="w-full bg-gradient-to-r from-purple-900 to-purple-700 py-3 md:py-4 overflow-hidden">
      <div className="relative flex items-center h-full">
      {/* Marquee */}
        <div className="animate-marquee-scroll hover:pause-animation">
          <span className="text-white text-sm md:text-base font-medium inline-block px-4 whitespace-nowrap">
            {marqueeText}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(30%);
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
