'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, getUserById, Product } from '@/data/mockData';
import { useChat } from '@/context/ChatContext';
import {
  MessageSquare,
  Search,
  Star,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  Lock,
  ZoomIn,
  SlidersHorizontal,
  CheckCircle2,
  Clock3,
  BadgeCheck,
  Eye,
  Heart,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Electronics',
  'Audio',
  'Vintage Fashion',
  'Workwear',
  'Photography',
  'Furniture',
  'Workspace',
];

const CONDITION_FILTERS = [
  { label: 'All Grades', value: 'all' },
  { label: 'Mint (9.8+)', value: 'mint' },
  { label: 'Archival (9.0+)', value: 'archival' },
  { label: 'Patina (8.0+)', value: 'patina' },
  { label: 'Distressed (6.0+)', value: 'distressed' },
];

export default function MarketplacePage() {
  const { openDirectChat, currentUser } = useChat();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'score'>('featured');
  const [wishlist, setWishlist] = useState<string[]>(['prod_1', 'prod_7']);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.era && product.era.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesCondition = true;
      if (selectedCondition === 'mint') {
        matchesCondition = (product.conditionScore || 9.5) >= 9.8;
      } else if (selectedCondition === 'archival') {
        matchesCondition = (product.conditionScore || 9.0) >= 9.0;
      } else if (selectedCondition === 'patina') {
        matchesCondition = (product.conditionScore || 8.0) >= 8.0 && (product.conditionScore || 8.0) < 9.0;
      } else if (selectedCondition === 'distressed') {
        matchesCondition = (product.conditionScore || 7.0) < 8.0;
      }

      return matchesCategory && matchesSearch && matchesCondition;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'score') return (b.conditionScore || 8) - (a.conditionScore || 8);
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedCondition, sortBy]);

  const spotlightItem = MOCK_PRODUCTS.find((p) => p.id === 'prod_7') || MOCK_PRODUCTS[0];

  return (
    <div className="min-h-screen bg-[#fcfbf9] dark:bg-[#111215] text-[#111215] dark:text-[#f9f8f6] font-grotesk transition-colors pb-24">
      {/* Top Editorial Telemetry Ticker */}
      <div className="w-full bg-[#18191e] text-[#e7e2da] border-b border-[#27282f] px-4 sm:px-8 py-2 font-mono-tag text-[11px] uppercase tracking-wider flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c86d51] animate-pulse"></span>
          <span>AUTHENTICATED SECOND LIFE • 48-HR PHYSICAL ESCROW PROTOCOL • ZERO HIDDEN BUYER FEES</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[#a39e94]">
          <span>NODES: TOKYO / DETROIT / BERLIN / ANTWERP</span>
          <span className="text-[#c86d51]">NEXCONN CHAT ENGINE ACTIVE</span>
        </div>
      </div>

      {/* 1. ASYMMETRIC EDITORIAL SPLIT HERO */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-8 pt-10 pb-16 border-b border-[#e3dfd7] dark:border-[#27282f]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (58% -> 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-8">
            <div>
              {/* Monospace Kicker */}
              <div className="flex items-center gap-2 mb-4 font-mono-tag text-xs uppercase tracking-widest text-[#c86d51]">
                <span className="inline-block w-2 h-2 bg-[#c86d51]"></span>
                <span>ISSUE NO. 05 // CURATED SECOND LIFE & ARCHIVAL TECH</span>
              </div>

              {/* Monumental Editorial Headline */}
              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal uppercase tracking-tight leading-[1.05] mb-6">
                Archive &amp; <br />
                <span className="italic text-[#c86d51]">Artifacts</span> <br />
                Curated Second Life
              </h1>

              {/* Manifesto Copy */}
              <p className="text-base sm:text-lg text-[#6f6a62] dark:text-[#a39e94] max-w-2xl leading-relaxed mb-8">
                The circular marketplace without the noise. Hand-inspected mechanical keyboards, studio audio,
                ergonomics, and authenticated vintage garments. Every item backed by physical inspection, transparent
                condition scoring, and our guaranteed 48-hour buyer escrow protocol.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#explore-catalog"
                  className="px-7 py-3.5 bg-[#c86d51] hover:bg-[#b35c42] text-white font-mono-tag text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition shadow-sm"
                >
                  <span>Explore Curated Archive</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => openDirectChat('user_seller_1')}
                  className="px-6 py-3.5 bg-transparent border border-[#c8c2b7] dark:border-[#27282f] hover:border-[#c86d51] hover:text-[#c86d51] text-[#111215] dark:text-[#f9f8f6] font-mono-tag text-xs uppercase tracking-widest transition flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#c86d51]" />
                  <span>Chat With Curators</span>
                </button>
              </div>
            </div>

            {/* Credibility Ticker Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 mt-10 border-t border-[#e3dfd7] dark:border-[#27282f]">
              <div>
                <span className="font-mono-tag text-xs text-[#c86d51] uppercase block font-semibold">14,200+ Pieces</span>
                <span className="text-xs text-[#6f6a62] dark:text-[#a39e94]">Authenticated & recirculated worldwide</span>
              </div>
              <div>
                <span className="font-mono-tag text-xs text-[#c86d51] uppercase block font-semibold">100% In-Hand Checks</span>
                <span className="text-xs text-[#6f6a62] dark:text-[#a39e94]">Macro hardware & weave inspection</span>
              </div>
              <div>
                <span className="font-mono-tag text-xs text-[#c86d51] uppercase block font-semibold">48h Escrow Protection</span>
                <span className="text-xs text-[#6f6a62] dark:text-[#a39e94]">Funds held until physical verification</span>
              </div>
            </div>
          </div>

          {/* Right Column (42% -> 5 Cols): Editorial Interactive Showcase Card */}
          <div className="lg:col-span-5 relative bg-[#18191e] text-[#f9f8f6] border border-[#27282f] p-6 flex flex-col justify-between overflow-hidden shadow-2xl min-h-[500px]">
            <div className="relative aspect-4/3 w-full bg-[#111215] overflow-hidden mb-6 border border-[#27282f]">
              <img
                src={spotlightItem.image}
                alt={spotlightItem.title}
                className="w-full h-full object-cover grayscale contrast-115 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#111215]/90 backdrop-blur px-3 py-1 border border-[#27282f]">
                <span className="font-mono-tag text-[10px] text-[#c86d51] uppercase tracking-widest font-bold">
                  LOT #HL-94 • ARTIFACT OF THE WEEK
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-[#c86d51] text-white px-2.5 py-1 font-mono-tag text-[10px] uppercase font-bold tracking-wider">
                GRADE {spotlightItem.conditionScore || 9.2} / ARCHIVAL
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between font-mono-tag text-xs text-[#a39e94] mb-2 uppercase">
                <span>Category: {spotlightItem.category}</span>
                <span className="text-[#c86d51] font-bold">${spotlightItem.price.toFixed(2)} USD</span>
              </div>

              <h2 className="font-editorial text-2xl font-normal uppercase tracking-tight text-[#f9f8f6] mb-2">
                {spotlightItem.title}
              </h2>

              <p className="text-xs text-[#a39e94] line-clamp-2 leading-relaxed mb-4">
                {spotlightItem.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#27282f]">
                <button
                  onClick={() => openDirectChat(spotlightItem.sellerId, spotlightItem)}
                  className="w-full py-2.5 px-3 bg-[#c86d51] hover:bg-[#b35c42] text-white font-mono-tag text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire / Negotiate</span>
                </button>
                <button
                  onClick={() => alert(`Escrow checkout reserved for ${spotlightItem.title}. $0 buyer fee.`)}
                  className="w-full py-2.5 px-3 bg-[#1f2026] hover:bg-[#27282f] text-[#f9f8f6] border border-[#27282f] font-mono-tag text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#c86d51]" />
                  <span>Acquire ($1,278)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED DROPS & CAPSULES */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-8 py-14 border-b border-[#e3dfd7] dark:border-[#27282f]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-mono-tag text-xs text-[#c86d51] uppercase tracking-widest mb-1">
              DISPATCH REGISTRY // CYCLE 48.2
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl uppercase tracking-tight">
              Curated Drops / Limited Access Capsules
            </h2>
          </div>
          <span className="font-mono-tag text-xs text-[#6f6a62] dark:text-[#a39e94] uppercase tracking-wider">
            Sourced weekly from Tokyo, Detroit &amp; Berlin Ateliers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Capsule 1: Studio Sound & Custom Keebs */}
          <div className="bg-white dark:bg-[#18191e] border border-[#e3dfd7] dark:border-[#27282f] p-6 flex flex-col justify-between group hover:border-[#c86d51] transition-colors">
            <div>
              <div className="relative aspect-16/10 overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
                  alt="Mechanical Keyboards & Studio Audio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-[#111215] text-[#c86d51] px-2 py-0.5 font-mono-tag text-[10px] uppercase font-bold tracking-wider">
                  Drop 01 • Studio Hardware
                </span>
              </div>
              <span className="font-mono-tag text-[10px] uppercase text-[#6f6a62] dark:text-[#a39e94] block mb-1">
                Curated by Sara Studio
              </span>
              <h3 className="font-editorial text-xl uppercase tracking-tight mb-2">
                Mechanical Keyboards &amp; Studio Audio
              </h3>
              <p className="text-xs text-[#6f6a62] dark:text-[#a39e94] leading-relaxed mb-4">
                Full aluminum CNC Keychron custom keyboards and active noise-canceling Sony WH-1000XM5 studio hardware.
              </p>
            </div>
            <div className="flex items-center justify-between font-mono-tag text-xs pt-3 border-t border-[#e3dfd7] dark:border-[#27282f]">
              <span className="text-[#c86d51] font-semibold">$199 — $350 USD</span>
              <button
                onClick={() => setSelectedCategory('Electronics')}
                className="text-[#111215] dark:text-[#f9f8f6] hover:text-[#c86d51] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                Browse Drop →
              </button>
            </div>
          </div>

          {/* Capsule 2: Vintage Outerwear & Heavy Canvas */}
          <div className="bg-white dark:bg-[#18191e] border border-[#e3dfd7] dark:border-[#27282f] p-6 flex flex-col justify-between group hover:border-[#c86d51] transition-colors">
            <div>
              <div className="relative aspect-16/10 overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
                  alt="Heavyweight Workwear & Japanese Selvedge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-[#111215] text-[#c86d51] px-2 py-0.5 font-mono-tag text-[10px] uppercase font-bold tracking-wider">
                  Drop 02 • Workwear Archive
                </span>
              </div>
              <span className="font-mono-tag text-[10px] uppercase text-[#6f6a62] dark:text-[#a39e94] block mb-1">
                Curated by Rust &amp; Relic
              </span>
              <h3 className="font-editorial text-xl uppercase tracking-tight mb-2">
                Heavyweight Duck Canvas &amp; Japanese Denim
              </h3>
              <p className="text-xs text-[#6f6a62] dark:text-[#a39e94] leading-relaxed mb-4">
                1980s Detroit blanket-lined work jackets, Kuroki shuttle-loomed selvedge denim, and authentic faded patina.
              </p>
            </div>
            <div className="flex items-center justify-between font-mono-tag text-xs pt-3 border-t border-[#e3dfd7] dark:border-[#27282f]">
              <span className="text-[#c86d51] font-semibold">$290 — $380 USD</span>
              <button
                onClick={() => setSelectedCategory('Workwear')}
                className="text-[#111215] dark:text-[#f9f8f6] hover:text-[#c86d51] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                Browse Drop →
              </button>
            </div>
          </div>

          {/* Capsule 3: Minimalist Workspace & Ergonomics */}
          <div className="bg-white dark:bg-[#18191e] border border-[#e3dfd7] dark:border-[#27282f] p-6 flex flex-col justify-between group hover:border-[#c86d51] transition-colors">
            <div>
              <div className="relative aspect-16/10 overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1580481077195-c3a821a5060f?auto=format&fit=crop&w=800&q=80"
                  alt="Ergonomic Furniture & Workspace Design"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-[#111215] text-[#c86d51] px-2 py-0.5 font-mono-tag text-[10px] uppercase font-bold tracking-wider">
                  Drop 03 • Workspace Design
                </span>
              </div>
              <span className="font-mono-tag text-[10px] uppercase text-[#6f6a62] dark:text-[#a39e94] block mb-1">
                Curated by TechCraft Workspace
              </span>
              <h3 className="font-editorial text-xl uppercase tracking-tight mb-2">
                Herman Miller Embody &amp; Walnut Storage
              </h3>
              <p className="text-xs text-[#6f6a62] dark:text-[#a39e94] leading-relaxed mb-4">
                Certified refurbished ergonomic chairs, UltraSharp 4K color monitors, and solid American walnut organizers.
              </p>
            </div>
            <div className="flex items-center justify-between font-mono-tag text-xs pt-3 border-t border-[#e3dfd7] dark:border-[#27282f]">
              <span className="text-[#c86d51] font-semibold">$89 — $1,245 USD</span>
              <button
                onClick={() => setSelectedCategory('Furniture')}
                className="text-[#111215] dark:text-[#f9f8f6] hover:text-[#c86d51] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                Browse Drop →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN EXPLORE & DISCOVERY CATALOG */}
      <section id="explore-catalog" className="max-w-[1720px] mx-auto px-4 sm:px-8 pt-14">
        {/* Header Telemetry Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#e3dfd7] dark:border-[#27282f] mb-8">
          <div>
            <span className="font-mono-tag text-xs text-[#c86d51] uppercase tracking-widest font-semibold block mb-1">
              ARCHIVE REGISTRY // {filteredProducts.length} ACTIVE LOTS IN ESCROW
            </span>
            <h2 className="font-editorial text-3xl uppercase tracking-tight">
              Explore Curated Second Life
            </h2>
          </div>

          {/* Search Input & Sort Options */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[260px] sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search archive, hardware, era, seller..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-white dark:bg-[#18191e] border border-[#e3dfd7] dark:border-[#27282f] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-none focus:border-[#c86d51] outline-none shadow-xs transition"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white dark:bg-[#18191e] border border-[#e3dfd7] dark:border-[#27282f] rounded-none px-3 py-2.5 outline-none shadow-xs text-gray-700 dark:text-gray-200 cursor-pointer font-mono-tag uppercase"
            >
              <option value="featured">Featured Curation</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="score">Highest Condition Score</option>
              <option value="rating">Top Rated Sellers</option>
            </select>
          </div>
        </div>

        {/* Category Tabs & Condition Matrix Filters */}
        <div className="flex flex-col gap-4 mb-8 pb-6 border-b border-[#e3dfd7] dark:border-[#27282f]">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-mono-tag text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#c86d51] text-white font-semibold'
                    : 'bg-white dark:bg-[#18191e] text-[#6f6a62] dark:text-[#a39e94] hover:text-[#111215] dark:hover:text-[#f9f8f6] border border-[#e3dfd7] dark:border-[#27282f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Condition Grading Matrix Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="font-mono-tag text-[11px] text-[#6f6a62] dark:text-[#a39e94] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c86d51]" />
              Condition Grade:
            </span>
            {CONDITION_FILTERS.map((cond) => (
              <button
                key={cond.value}
                onClick={() => setSelectedCondition(cond.value)}
                className={`px-3 py-1 font-mono-tag text-[10px] uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                  selectedCondition === cond.value
                    ? 'bg-[#111215] dark:bg-[#f9f8f6] text-white dark:text-[#111215] font-bold'
                    : 'bg-[#f4f2ee] dark:bg-[#1f2026] text-[#6f6a62] dark:text-[#a39e94] hover:text-[#c86d51]'
                }`}
              >
                {cond.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid (4:5 Archival Proportion) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const seller = getUserById(product.sellerId);
            const isWishlisted = wishlist.includes(product.id);

            return (
              <article
                key={product.id}
                className="group bg-white dark:bg-[#18191e] border border-[#e3dfd7] dark:border-[#27282f] hover:border-[#c86d51] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl"
              >
                {/* 4:5 Aspect Ratio Image Container */}
                <div className="relative aspect-4/5 w-full bg-[#111215] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <span className="font-mono-tag text-[9px] font-bold uppercase tracking-wider bg-[#111215]/90 text-[#c86d51] px-2 py-0.5 border border-[#27282f]">
                      {product.conditionScore ? `GRADE ${product.conditionScore.toFixed(1)}` : product.condition}
                    </span>
                    <span className="font-mono-tag text-[9px] font-medium bg-[#18191e]/90 text-[#a39e94] px-2 py-0.5 border border-[#27282f] uppercase">
                      {product.category}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-3 right-3 p-1.5 bg-[#111215]/80 hover:bg-[#c86d51] text-white border border-[#27282f] transition cursor-pointer"
                    title="Save to Vault"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#c86d51] text-[#c86d51]' : 'text-white'}`} />
                  </button>

                  {/* Pricing Badge Bar */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#111215]/95 backdrop-blur px-3 py-1.5 border border-[#27282f] flex items-center justify-between">
                    <span className="font-mono-tag text-xs font-bold text-[#c86d51]">
                      ${product.price.toFixed(2)} USD
                    </span>
                    {product.originalRetailPrice && (
                      <span className="font-mono-tag text-[10px] text-[#6f6a62] line-through">
                        Orig ${product.originalRetailPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {product.era && (
                      <span className="font-mono-tag text-[10px] uppercase text-[#c86d51] block mb-1 tracking-wider">
                        {product.era}
                      </span>
                    )}

                    <h3 className="font-editorial text-lg uppercase tracking-tight text-[#111215] dark:text-[#f9f8f6] group-hover:text-[#c86d51] transition-colors line-clamp-2 mb-2">
                      {product.title}
                    </h3>

                    <p className="text-xs text-[#6f6a62] dark:text-[#a39e94] line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Flaw Disclosure Pill */}
                    {product.flawDisclosure && (
                      <div className="p-2 bg-[#f4f2ee] dark:bg-[#111215] border border-[#e3dfd7] dark:border-[#27282f] mb-4">
                        <span className="font-mono-tag text-[9px] uppercase text-[#c86d51] font-bold block">
                          Inspection Flaw Check:
                        </span>
                        <p className="text-[11px] text-[#6f6a62] dark:text-[#a39e94] line-clamp-1">
                          {product.flawDisclosure}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Seller & Action Footer */}
                  <div className="pt-3 border-t border-[#e3dfd7] dark:border-[#27282f]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={seller?.avatar}
                          alt={seller?.name}
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-[#c86d51]"
                        />
                        <div className="min-w-0">
                          <p className="font-mono-tag text-[11px] text-[#111215] dark:text-[#f9f8f6] truncate font-medium">
                            {seller?.name}
                          </p>
                          <span className="font-mono-tag text-[9px] text-[#6f6a62] dark:text-[#a39e94] flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3 text-[#c86d51]" /> {seller?.badge}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono-tag text-[11px] text-[#c86d51] font-bold">★ {product.rating}</span>
                      </div>
                    </div>

                    {/* Action: 1-on-1 Chat Inquiry */}
                    <button
                      onClick={() => openDirectChat(product.sellerId, product)}
                      className="w-full py-2.5 px-3 bg-[#111215] dark:bg-[#1f2026] hover:bg-[#c86d51] dark:hover:bg-[#c86d51] text-white font-mono-tag text-[11px] uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat with Seller</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-[#18191e] border border-[#e3dfd7] dark:border-[#27282f] p-8">
            <ShoppingBag className="w-12 h-12 text-[#a39e94] mx-auto mb-3" />
            <h3 className="font-editorial text-2xl uppercase text-[#111215] dark:text-[#f9f8f6]">
              No Curated Lots Found
            </h3>
            <p className="text-xs text-[#6f6a62] dark:text-[#a39e94] mt-2">
              Try adjusting your category filter, condition score, or search query.
            </p>
          </div>
        )}
      </section>

      {/* 4. CIRCULAR ECONOMY & TRUST TELEMETRY SECTION */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-8 mt-20 pt-16 border-t border-[#e3dfd7] dark:border-[#27282f]">
        <div className="bg-[#18191e] text-[#f9f8f6] p-8 sm:p-12 border border-[#27282f]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center sm:text-left">
            <div>
              <span className="font-editorial text-4xl sm:text-5xl text-[#c86d51] font-normal block mb-1">14,892</span>
              <span className="font-mono-tag text-xs uppercase text-[#a39e94] tracking-wider">
                Pieces &amp; Hardware Recirculated
              </span>
            </div>
            <div>
              <span className="font-editorial text-4xl sm:text-5xl text-[#c86d51] font-normal block mb-1">38.4 T</span>
              <span className="font-mono-tag text-xs uppercase text-[#a39e94] tracking-wider">
                CO2 Emissions Offset
              </span>
            </div>
            <div>
              <span className="font-editorial text-4xl sm:text-5xl text-[#c86d51] font-normal block mb-1">100%</span>
              <span className="font-mono-tag text-xs uppercase text-[#a39e94] tracking-wider">
                Physical Escrow Guarantee
              </span>
            </div>
            <div>
              <span className="font-editorial text-4xl sm:text-5xl text-[#c86d51] font-normal block mb-1">4.98 / 5.0</span>
              <span className="font-mono-tag text-xs uppercase text-[#a39e94] tracking-wider">
                Verified Curator Satisfaction
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
