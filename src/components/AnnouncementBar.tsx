import React, { useState, useEffect } from 'react';

const MESSAGES = [
  'FREE NATIONWIDE DELIVERY ON ORDERS ABOVE PKR 3,000',
  'CASH ON DELIVERY (COD) AVAILABLE ACROSS ALL MAJOR CITIES IN PAKISTAN',
  'HASSLE-FREE 7-DAY EXCHANGE & RETURN POLICY'
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#121212] text-[#F5F5F0] text-[11px] sm:text-xs tracking-[0.14em] font-medium py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <p className="transition-opacity duration-300">
          {MESSAGES[index]}
        </p>
      </div>
    </div>
  );
};
