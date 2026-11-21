'use client';

import React from 'react';
import Link from 'next/link';
import { useChat } from '@/context/ChatContext';
import {
  MessageSquare,
  Globe,
  Headphones,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  Key,
  Database,
  Server,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function AboutPage() {
  const { openSupportChat, setIsCredentialsModalOpen } = useChat();

  return (
    <div className="min-h-screen bg-gray-50/70 dark:bg-[#0f1117] text-gray-900 dark:text-gray-100 pb-20 transition-colors">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50/90 via-white to-gray-50/70 dark:from-[#161a29] dark:via-[#12141f] dark:to-[#0f1117] pt-12 pb-14 border-b border-gray-200 dark:border-[#2d3148] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4 border border-blue-200/60 dark:border-blue-800/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEXXON Platform Documentation & User Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            How to Use{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              NEXXON
            </span>{' '}
            Marketplace & Support
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            NEXXON is a real-time e-commerce and customer service platform built with Next.js 16,
            Tailwind CSS 4, Nexconn Web SDK, multi-language live translation, and Antseed Seller AI models.
            Here is everything you need to know to test and use each feature.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Browse Marketplace</span>
            </Link>
            <Link
              href="/support-dashboard"
              className="px-5 py-2.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
            >
              <Headphones className="w-4 h-4" />
              <span>Support Dispatch Center</span>
            </Link>
            <button
              onClick={() => setIsCredentialsModalOpen(true)}
              className="px-5 py-2.5 bg-white dark:bg-[#1a1d27] hover:bg-gray-100 dark:hover:bg-[#22263a] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-[#2d3148] rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <Key className="w-4 h-4 text-amber-500" />
              <span>Configure SDK Credentials</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Guide Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Step-by-Step Interactive Guide */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Interactive Feature Walkthrough
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
            Follow these steps to experience all major subsystems of NEXXON.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guide Card 1 */}
            <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-2xl border border-gray-200 dark:border-[#2d3148] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                  Buyer-Seller 1-on-1 Direct Chat
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Click <strong>&quot;Chat with Seller&quot;</strong> on any product card in the Marketplace. A sliding inquiry drawer will open with the product&apos;s photo, specs, and price attached directly to the thread.
                </p>
                <div className="bg-gray-50 dark:bg-[#22263a] p-3 rounded-xl border border-gray-100 dark:border-[#2d3148] text-xs space-y-1 text-gray-500 dark:text-gray-400">
                  <p>• Try sending a question like <em>&quot;Can you do $180?&quot;</em> or <em>&quot;Is this still in stock?&quot;</em></p>
                  <p>• The seller automatically responds via the <strong>Antseed Seller AI Model</strong> with contextual pricing, warranty, and availability info.</p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-[#2d3148]">
                <Link
                  href="/"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Go to Marketplace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-2xl border border-gray-200 dark:border-[#2d3148] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                  Live Multi-Language Translation
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Click the <strong>Globe icon in the top Navbar</strong> and choose any language (e.g., Español, Français, Deutsch, 日本語, 中文, हिन्दी, العربية).
                </p>
                <div className="bg-gray-50 dark:bg-[#22263a] p-3 rounded-xl border border-gray-100 dark:border-[#2d3148] text-xs space-y-1 text-gray-500 dark:text-gray-400">
                  <p>• All incoming messages and seller replies <strong>re-translate in real-time</strong>.</p>
                  <p>• Click <em>&quot;View original&quot;</em> / <em>&quot;View translation&quot;</em> on any message bubble to toggle between languages.</p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-[#2d3148]">
                <Link
                  href="/messages"
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Messages Center</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-2xl border border-gray-200 dark:border-[#2d3148] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                  Support Agent Dispatch Center
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Switch to <strong>Support Agent Emma</strong> via the user menu in the top right, then visit the <strong>Support Dashboard</strong>.
                </p>
                <div className="bg-gray-50 dark:bg-[#22263a] p-3 rounded-xl border border-gray-100 dark:border-[#2d3148] text-xs space-y-1 text-gray-500 dark:text-gray-400">
                  <p>• <strong>Unassigned Queue:</strong> View incoming inquiries waiting for assignment.</p>
                  <p>• <strong>Claim Ticket:</strong> Click <em>&quot;Claim Ticket&quot;</em> to take ownership of a customer inquiry.</p>
                  <p>• <strong>SLA Timers & Priorities:</strong> Monitor Urgent, High, and Medium ticket deadlines.</p>
                  <p>• <strong>Canned Replies:</strong> Use quick chips for instant logistics and refund status.</p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-[#2d3148]">
                <Link
                  href="/support-dashboard"
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Support Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Guide Card 4 */}
            <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-2xl border border-gray-200 dark:border-[#2d3148] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-4">
                  4
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                  Test Role Switching & Antseed AI
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Test the complete lifecycle by switching between roles in the top-right profile dropdown:
                </p>
                <div className="bg-gray-50 dark:bg-[#22263a] p-3 rounded-xl border border-gray-100 dark:border-[#2d3148] text-xs space-y-1 text-gray-500 dark:text-gray-400">
                  <p>• <strong>Alex Rivera (Buyer):</strong> Browses, inquires about items, and asks support.</p>
                  <p>• <strong>Sara Studio / TechCraft (Sellers):</strong> Manages listings and auto-responds via Antseed AI.</p>
                  <p>• <strong>Emma (Support):</strong> Handles customer tickets and resolves inquiries.</p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-[#2d3148]">
                <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                  Use the role switcher in the Navbar anytime
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture Overview */}
        <div className="bg-white dark:bg-[#1a1d27] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-[#2d3148] shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Technical Architecture & Stack</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Next.js 16 + Railway PostgreSQL + Nexconn Chat Web SDK</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-gray-50 dark:bg-[#22263a] p-4 rounded-2xl border border-gray-200/80 dark:border-[#2d3148]">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-indigo-500" />
                <span>Railway PostgreSQL + Prisma</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Relational schema modeling Users (RBAC), Products, Orders, Support Tickets (Queue-based), and SHA-256 Cached Translations.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-[#22263a] p-4 rounded-2xl border border-gray-200/80 dark:border-[#2d3148]">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Nexconn Chat Web SDK</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Sub-second WebSocket messaging protocol for 1:1 direct channels and media transfers, backed by HMAC SHA-1 signed token issuing.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-[#22263a] p-4 rounded-2xl border border-gray-200/80 dark:border-[#2d3148]">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-500" />
                <span>Hybrid Translation Engine</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Client dictionary for zero-latency shopping queries + real-time server translation route (<code className="text-blue-600 dark:text-blue-400">/api/translate</code>) across 8 global languages.
              </p>
            </div>
          </div>

          {/* Deployment info */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-[#2d3148] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Ready for Deployment:</span> Packaged with multi-stage <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">Dockerfile</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">railway.json</code>, and automatic Prisma migrations.
            </div>
            <a
              href="https://github.com/Madhav-does/NEXXON/pull/1"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 transition shrink-0"
            >
              <span>View Pull Request #1</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
