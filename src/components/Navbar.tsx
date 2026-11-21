'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useChat } from '@/context/ChatContext';
import { useTheme } from '@/context/ThemeContext';
import { MOCK_USERS } from '@/data/mockData';
import { SUPPORTED_LANGUAGES } from '@/utils/translator';
import {
  ShoppingBag,
  Headphones,
  Key,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  Check,
  BookOpen,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const {
    currentUser,
    setCurrentUser,
    connectionStatus,
    statusMessage,
    setIsCredentialsModalOpen,
    preferredLanguage,
    setPreferredLanguage,
  } = useChat();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === preferredLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#12141f]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#2d3148] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-600 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                NEXXON
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block -mt-1 tracking-wider uppercase">
                Market & Chat
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1d27]'
              }`}
            >
              Marketplace
            </Link>
            <Link
              href="/messages"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/messages'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1d27]'
              }`}
            >
              Messages
            </Link>
            <Link
              href="/support-dashboard"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === '/support-dashboard'
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1d27]'
              }`}
            >
              <Headphones className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span>Support Dashboard</span>
              {currentUser.role === 'support' && (
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              )}
            </Link>
            <Link
              href="/about"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === '/about'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1d27]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span>About & Guide</span>
            </Link>
          </nav>
        </div>

        {/* Right Tools: Language Selector, Theme Toggle, Connection Status, Credentials Button, Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Multi-Language Selector Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-[#2d3148] bg-gray-50 dark:bg-[#1a1d27] hover:bg-gray-100 dark:hover:bg-[#22263a] text-xs text-gray-700 dark:text-gray-200 transition"
              title="Chat Translation Language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-[11px] hidden sm:inline">{currentLangObj.name}</span>
              <span className="text-xs">{currentLangObj.flag}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1d27] rounded-2xl shadow-xl border border-gray-200 dark:border-[#2d3148] py-1.5 z-50">
                <div className="px-3 py-1.5 border-b border-gray-100 dark:border-[#2d3148]">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Translate Chat To
                  </p>
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setPreferredLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#22263a] transition ${
                      preferredLanguage === lang.code
                        ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-950/40'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                      <span className="text-[10px] text-gray-400">({lang.nativeName})</span>
                    </div>
                    {preferredLanguage === lang.code && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-[#1a1d27] rounded-xl transition border border-gray-200 dark:border-[#2d3148]"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Connection status pill */}
          <div
            onClick={() => setIsCredentialsModalOpen(true)}
            title={statusMessage}
            className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border cursor-pointer transition-colors ${
              connectionStatus === 'CONNECTED'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : connectionStatus === 'CONNECTING'
                ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 animate-pulse'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                connectionStatus === 'CONNECTED'
                  ? 'bg-emerald-500'
                  : connectionStatus === 'CONNECTING'
                  ? 'bg-blue-500'
                  : 'bg-amber-500'
              }`}
            />
            <span className="font-medium text-[11px]">
              {connectionStatus === 'CONNECTED'
                ? 'Nexconn Online'
                : connectionStatus === 'CONNECTING'
                ? 'Connecting...'
                : 'Setup Required'}
            </span>
          </div>

          {/* Credentials modal trigger button */}
          <button
            onClick={() => setIsCredentialsModalOpen(true)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-[#1a1d27] rounded-xl transition border border-gray-200 dark:border-[#2d3148]"
            title="Configure Nexconn Credentials"
          >
            <Key className="w-4 h-4" />
          </button>

          {/* Mock User Role Switcher */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1.5 pl-2 pr-2.5 sm:pr-3 bg-gray-50 dark:bg-[#1a1d27] hover:bg-gray-100 dark:hover:bg-[#22263a] border border-gray-200 dark:border-[#2d3148] rounded-xl transition"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-300 dark:ring-gray-600"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">Role: {currentUser.role}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1a1d27] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2d3148] py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-gray-100 dark:border-[#2d3148]">
                  <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    Switch Test User Role
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Test live chat from different perspectives
                  </p>
                </div>

                <div className="py-1">
                  {MOCK_USERS.map((user) => {
                    const isSelected = user.id === currentUser.id;
                    return (
                      <button
                        key={user.id}
                        onClick={() => setCurrentUser(user)}
                        className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#22263a] transition ${
                          isSelected ? 'bg-blue-50/70 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold truncate">{user.name}</span>
                            <span
                              className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                                user.role === 'buyer'
                                  ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                                  : user.role === 'seller'
                                  ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300'
                                  : 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300'
                              }`}
                            >
                              {user.role}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400 block truncate">
                            {user.email}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="px-4 py-2 border-t border-gray-100 dark:border-[#2d3148] bg-gray-50/50 dark:bg-[#12141f]/50">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Switching roles reconnects the Nexconn Chat engine with that user&apos;s access token.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
