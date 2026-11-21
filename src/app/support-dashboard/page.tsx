'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat, getChannelKey } from '@/context/ChatContext';
import { MOCK_USERS, getUserById } from '@/data/mockData';
import {
  Headphones,
  Search,
  Send,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Shield,
  MessageSquare,
  Check,
  Globe,
  UserCheck,
  Clock3,
  Tag,
  Sparkles,
} from 'lucide-react';

const CANNED_RESPONSES = [
  'Hello! Thank you for reaching out to Nexxon Support. How can I assist you today?',
  'I have reviewed your inquiry and checked with our logistics team. Your shipment is on schedule.',
  'Your return request has been authorized. A prepaid return shipping label has been emailed to you.',
  'We have issued a full refund to your original payment method. Please allow 2-3 business days.',
  'Is there anything else I can help clarify for you today?',
];

interface TicketMeta {
  status: 'unassigned' | 'claimed' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string | null;
  slaMinutesRemaining: number;
}

export default function SupportDashboardPage() {
  const {
    currentUser,
    setCurrentUser,
    messagesByChannel,
    sendMessage,
    toggleMessageOriginal,
  } = useChat();

  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('user_buyer_1');
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [searchTicket, setSearchTicket] = useState('');
  const [ticketFilter, setTicketFilter] = useState<'all' | 'unassigned' | 'claimed' | 'resolved'>('all');

  // Multi-agent Queue-based ticket state
  const [tickets, setTickets] = useState<Record<string, TicketMeta>>({
    user_buyer_1: {
      status: 'claimed',
      priority: 'high',
      assignedTo: 'user_support_agent',
      slaMinutesRemaining: 14,
    },
    user_seller_1: {
      status: 'unassigned',
      priority: 'urgent',
      assignedTo: null,
      slaMinutesRemaining: 6,
    },
    user_seller_2: {
      status: 'resolved',
      priority: 'medium',
      assignedTo: 'user_support_agent',
      slaMinutesRemaining: 0,
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSupportAgent = currentUser.role === 'support';
  const selectedCustomer = getUserById(selectedCustomerId);
  const selectedTicket = tickets[selectedCustomerId] || {
    status: 'unassigned',
    priority: 'medium',
    assignedTo: null,
    slaMinutesRemaining: 30,
  };

  const channelKey = selectedCustomerId ? getChannelKey(currentUser.id, selectedCustomerId) : '';
  const currentMessages = channelKey ? messagesByChannel[channelKey] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, selectedCustomerId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendReply = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedCustomerId) return;
    if (!inputText.trim() && !selectedImage) return;

    // Automatically claim if replying while unassigned
    if (selectedTicket.status === 'unassigned') {
      claimTicket(selectedCustomerId);
    }

    const textToSend = inputText.trim();
    const imageToSend = selectedImage;

    setInputText('');
    removeSelectedImage();

    await sendMessage(selectedCustomerId, textToSend, imageToSend || undefined);
  };

  const handleCannedResponse = (text: string) => {
    setInputText(text);
  };

  const claimTicket = (customerId: string) => {
    setTickets((prev) => ({
      ...prev,
      [customerId]: {
        ...(prev[customerId] || {
          priority: 'medium',
          slaMinutesRemaining: 25,
        }),
        status: 'claimed',
        assignedTo: currentUser.id,
      },
    }));
  };

  const toggleResolved = (customerId: string) => {
    setTickets((prev) => {
      const current = prev[customerId];
      const isResolved = current?.status === 'resolved';
      return {
        ...prev,
        [customerId]: {
          ...(current || {
            priority: 'medium',
            assignedTo: currentUser.id,
            slaMinutesRemaining: 0,
          }),
          status: isResolved ? 'claimed' : 'resolved',
        },
      };
    });
  };

  const customerList = MOCK_USERS.filter((u) => u.id !== 'user_support_agent');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-[#0f1117] flex flex-col transition-colors">
      {/* Role Check Warning if not Support Agent */}
      {!isSupportAgent && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div className="text-xs sm:text-sm">
              <strong>Support Agent Authorization:</strong> You are currently signed in as{' '}
              <span className="font-bold underline">{currentUser.name}</span> ({currentUser.role}).
              Switch to Support Agent Emma to view the agent dispatch interface.
            </div>
          </div>
          <button
            onClick={() => {
              const agent = getUserById('user_support_agent');
              if (agent) setCurrentUser(agent);
            }}
            className="bg-white text-amber-900 font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-xs hover:bg-amber-50 transition shrink-0 ml-4 cursor-pointer"
          >
            Switch to Support Agent Emma
          </button>
        </div>
      )}

      {/* Agent Metrics & Status Header */}
      <div className="bg-white dark:bg-[#1a1d27] border-b border-gray-200 dark:border-[#2d3148] px-6 py-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shadow-md">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Support Agent Dispatch Center</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Queue-based customer dispatching, SLA tracking & multi-language translated resolution via Nexconn Chat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div className="text-center sm:text-right">
              <span className="text-gray-400 dark:text-gray-500 block text-[10px] uppercase font-semibold">
                SLA Compliance
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">98.8% on target</span>
            </div>
            <div className="text-center sm:text-right">
              <span className="text-gray-400 dark:text-gray-500 block text-[10px] uppercase font-semibold">
                Unassigned Queue
              </span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {Object.values(tickets).filter((t) => t.status === 'unassigned').length} Pending
              </span>
            </div>
            <div className="text-center sm:text-right">
              <span className="text-gray-400 dark:text-gray-500 block text-[10px] uppercase font-semibold">
                Active Queue
              </span>
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {customerList.length} Customer Threads
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Support Hub */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Customer Queue / Thread List (3.8 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-200 dark:border-[#2d3148] shadow-xs flex flex-col overflow-hidden min-h-[500px] lg:h-[720px] transition-colors">
          {/* Thread list search & tabs */}
          <div className="p-4 border-b border-gray-100 dark:border-[#2d3148]">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ticket, customer or problem..."
                value={searchTicket}
                onChange={(e) => setSearchTicket(e.target.value)}
                className="w-full text-xs pl-9 pr-3.5 py-2 bg-gray-50 dark:bg-[#22263a] border border-gray-200 dark:border-[#2d3148] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-xl focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div className="flex items-center gap-1.5 mt-3 text-xs overflow-x-auto no-scrollbar">
              {(['all', 'unassigned', 'claimed', 'resolved'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTicketFilter(tab)}
                  className={`px-2.5 py-1 rounded-lg capitalize font-medium text-[11px] transition shrink-0 cursor-pointer ${
                    ticketFilter === tab
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-semibold'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#22263a]'
                  }`}
                >
                  {tab === 'unassigned' ? 'Unassigned Queue' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Threads list */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-[#2d3148]">
            {customerList.map((customer) => {
              const isSelected = customer.id === selectedCustomerId;
              const chKey = getChannelKey(currentUser.id, customer.id);
              const msgs = messagesByChannel[chKey] || [];
              const lastMsg = msgs[msgs.length - 1];
              const tMeta = tickets[customer.id] || {
                status: 'unassigned',
                priority: 'medium',
                assignedTo: null,
                slaMinutesRemaining: 20,
              };

              if (ticketFilter !== 'all' && tMeta.status !== ticketFilter) {
                return null;
              }

              return (
                <div
                  key={customer.id}
                  onClick={() => setSelectedCustomerId(customer.id)}
                  className={`p-4 cursor-pointer transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-l-4 border-indigo-600'
                      : 'hover:bg-gray-50 dark:hover:bg-[#22263a]/50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-xs text-gray-900 dark:text-gray-100 truncate">
                        {customer.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {lastMsg
                          ? new Date(lastMsg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Just now'}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {lastMsg ? lastMsg.text || 'Photo attachment' : 'No recent messages'}
                    </p>

                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          tMeta.status === 'unassigned'
                            ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
                            : tMeta.status === 'claimed'
                            ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300'
                            : 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                        }`}
                      >
                        {tMeta.status}
                      </span>

                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-medium uppercase ${
                          tMeta.priority === 'urgent'
                            ? 'bg-red-100 dark:bg-red-950/70 text-red-800 dark:text-red-300 font-bold'
                            : tMeta.priority === 'high'
                            ? 'bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {tMeta.priority}
                      </span>

                      {tMeta.status !== 'resolved' && (
                        <span className="text-[9px] text-gray-400 dark:text-gray-500 flex items-center gap-0.5">
                          <Clock3 className="w-2.5 h-2.5" />
                          <span>{tMeta.slaMinutesRemaining}m SLA</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Live Conversation Viewer & Reply Bar (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-200 dark:border-[#2d3148] shadow-xs flex flex-col overflow-hidden min-h-[500px] lg:h-[720px] transition-colors">
          {selectedCustomer ? (
            <>
              {/* Conversation Top Header */}
              <div className="p-3.5 sm:p-4 border-b border-gray-100 dark:border-[#2d3148] flex items-center justify-between bg-white dark:bg-[#1a1d27]">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedCustomer.avatar}
                    alt={selectedCustomer.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white">{selectedCustomer.name}</h3>
                      <span className="text-[10px] bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-semibold px-1.5 py-0.5 rounded">
                        Ticket #NX-{selectedCustomer.id.slice(-4)}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{selectedCustomer.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Claim Button for unassigned tickets */}
                  {selectedTicket.status === 'unassigned' ? (
                    <button
                      onClick={() => claimTicket(selectedCustomerId)}
                      className="text-xs px-3 py-1.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Claim Ticket</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleResolved(selectedCustomerId)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1 cursor-pointer ${
                        selectedTicket.status === 'resolved'
                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900'
                          : 'bg-gray-100 dark:bg-[#22263a] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {selectedTicket.status === 'resolved' ? 'Resolved' : 'Mark Resolved'}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 dark:bg-[#12141f]/40">
                {currentMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-8">
                    <MessageSquare className="w-10 h-10 mb-2 text-gray-300 dark:text-gray-600" />
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">No messages in this thread yet</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Select a canned reply or type a message below to begin assisting.
                    </p>
                  </div>
                ) : (
                  currentMessages.map((msg) => {
                    const isAgentMsg = msg.senderId === 'user_support_agent' || msg.isMe;
                    const displayText = msg.isShowingOriginal ? msg.originalText || msg.text : msg.text;
                    const hasTranslation = !!msg.originalText && !!msg.translatedText;

                    return (
                      <div
                        key={msg.id}
                        className={`flex items-end gap-2 ${
                          isAgentMsg ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {!isAgentMsg && (
                          <img
                            src={selectedCustomer.avatar}
                            alt={selectedCustomer.name}
                            className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-gray-200 dark:ring-gray-700"
                          />
                        )}

                        <div className={`max-w-[80%] flex flex-col ${isAgentMsg ? 'items-end' : 'items-start'}`}>
                          {/* Antseed Seller AI Model Badge */}
                          {msg.isAntseedModel && (
                            <div className="flex items-center gap-1.5 mb-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 dark:from-purple-950/50 dark:to-blue-950/50 border border-purple-200 dark:border-purple-800 text-[10px] font-semibold text-purple-700 dark:text-purple-300 shadow-2xs">
                              <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400 animate-pulse" />
                              <span>Antseed Seller AI Assistant</span>
                            </div>
                          )}

                          {msg.imageUrl && (
                            <img
                              src={msg.imageUrl}
                              alt="Customer Attachment"
                              className="max-h-48 rounded-xl object-cover mb-1 border border-gray-200 dark:border-[#2d3148] shadow-xs"
                            />
                          )}

                          {displayText && (
                            <div
                              className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                                isAgentMsg
                                  ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                                  : 'bg-white dark:bg-[#22263a] text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-[#2d3148] rounded-bl-xs shadow-xs'
                              }`}
                            >
                              {displayText}

                              {hasTranslation && (
                                <div className="mt-1.5 pt-1 border-t border-gray-200 dark:border-gray-600/40 flex items-center justify-between gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Globe className="w-3 h-3 text-indigo-500" />
                                    {msg.isShowingOriginal ? 'Original query' : 'Translated to English'}
                                  </span>
                                  <button
                                    onClick={() => toggleMessageOriginal(channelKey, msg.id)}
                                    className="underline font-semibold cursor-pointer"
                                  >
                                    {msg.isShowingOriginal ? 'Show translation' : 'Show original'}
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-1 mt-0.5 px-1 text-[10px] text-gray-400 dark:text-gray-500">
                            <span>
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            {isAgentMsg && <Check className="w-3 h-3 text-indigo-400 inline" />}
                          </div>
                        </div>

                        {isAgentMsg && (
                          <img
                            src={
                              getUserById('user_support_agent')?.avatar ||
                              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
                            }
                            alt="Agent Emma"
                            className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-gray-200 dark:ring-gray-700"
                          />
                        )}
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Canned Response Chips */}
              <div className="p-3 bg-white dark:bg-[#1a1d27] border-t border-gray-100 dark:border-[#2d3148]">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
                  Agent Quick Canned Replies
                </span>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px]">
                  {CANNED_RESPONSES.map((resp, i) => (
                    <button
                      key={i}
                      onClick={() => handleCannedResponse(resp)}
                      className="px-2.5 py-1 bg-gray-100 dark:bg-[#22263a] hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-700 dark:hover:text-indigo-300 text-gray-700 dark:text-gray-300 rounded-lg shrink-0 transition cursor-pointer"
                    >
                      {resp.slice(0, 32)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Image attachment preview */}
              {imagePreviewUrl && (
                <div className="px-4 py-2 bg-gray-100 dark:bg-[#22263a] flex items-center justify-between border-t border-gray-200 dark:border-[#2d3148]">
                  <div className="flex items-center gap-2">
                    <img src={imagePreviewUrl} alt="Preview" className="w-10 h-10 object-cover rounded" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">{selectedImage?.name}</span>
                  </div>
                  <button onClick={removeSelectedImage} className="text-gray-400 hover:text-red-600">
                    ✕
                  </button>
                </div>
              )}

              {/* Agent Reply Bar */}
              <form
                onSubmit={handleSendReply}
                className="p-3 bg-white dark:bg-[#1a1d27] border-t border-gray-200 dark:border-[#2d3148] flex items-center gap-2"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-indigo-50 dark:hover:bg-[#22263a] transition cursor-pointer"
                  title="Attach screenshot or receipt"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Reply to ${selectedCustomer.name} in real time...`}
                  className="flex-1 text-xs bg-gray-50 dark:bg-[#22263a] focus:bg-white dark:focus:bg-[#22263a] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-[#2d3148] focus:border-indigo-500 rounded-xl px-3.5 py-2.5 outline-none transition"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() && !selectedImage}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-gray-800 text-white disabled:text-gray-400 dark:disabled:text-gray-600 rounded-xl transition shadow-xs flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a customer thread to view details
            </div>
          )}
        </div>

        {/* Right Column: Customer Profile & Order Context (3.2 cols) */}
        <div className="lg:col-span-3 bg-white dark:bg-[#1a1d27] rounded-2xl border border-gray-200 dark:border-[#2d3148] shadow-xs p-5 flex flex-col justify-between min-h-[500px] lg:h-[720px] overflow-y-auto transition-colors">
          {selectedCustomer ? (
            <div className="space-y-6">
              {/* Customer Avatar & Bio */}
              <div className="text-center pb-5 border-b border-gray-100 dark:border-[#2d3148]">
                <img
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-indigo-50 dark:ring-indigo-950 mb-3"
                />
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">{selectedCustomer.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedCustomer.email}</p>
                <div className="mt-2.5 flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full uppercase">
                    {selectedCustomer.role}
                  </span>
                  <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 font-semibold px-2 py-0.5 rounded-full">
                    {selectedTicket.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Order Context Details */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">
                  Recent Marketplace Activity
                </h4>
                <div className="bg-gray-50 dark:bg-[#22263a] p-3 rounded-xl border border-gray-200/80 dark:border-[#2d3148] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Order ID:</span>
                    <span className="font-mono font-medium text-gray-900 dark:text-gray-100">#NX-88219</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Item:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Keychron Q1 Pro</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Total:</span>
                    <span className="font-bold text-gray-900 dark:text-white">$199.00 USD</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">Shipped (In Transit)</span>
                  </div>
                </div>
              </div>

              {/* Technical Session Details */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5">
                  Nexconn Chat Session
                </h4>
                <div className="text-[11px] space-y-1.5 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-[#22263a] p-3 rounded-xl border border-gray-200/80 dark:border-[#2d3148]">
                  <p>
                    <strong>Target User ID:</strong>{' '}
                    <code className="text-indigo-600 dark:text-indigo-400 font-mono">{selectedCustomer.id}</code>
                  </p>
                  <p>
                    <strong>Channel Type:</strong> Direct Channel (1:1)
                  </p>
                  <p>
                    <strong>Transport:</strong> WebSocket Engine
                  </p>
                  <p>
                    <strong>Queue Routing:</strong> Active (SLA {selectedTicket.slaMinutesRemaining}m)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">No customer selected</div>
          )}

          {/* Bottom Security Note */}
          <div className="pt-4 border-t border-gray-100 dark:border-[#2d3148] text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>End-to-end encrypted through Nexconn SDK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
