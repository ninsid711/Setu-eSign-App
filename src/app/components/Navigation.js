'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [hasCredentials, setHasCredentials] = useState(false);

  useEffect(() => {
    const savedCredentials = localStorage.getItem('setuCredentials');
    setHasCredentials(!!savedCredentials);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/settings', label: 'Settings' },
    { href: '/upload', label: 'Upload' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Setu eSign Utility</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              hasCredentials 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {hasCredentials ? 'API Configured' : 'No API Keys'}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}