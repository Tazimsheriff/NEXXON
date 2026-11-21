'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat, getChannelKey } from '@/context/ChatContext';
import { getUserById } from '@/data/mockData';
import {
  X,
  Send,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  ShoppingBag,
  Check,
  Clock,
  Globe,
  Languages,
} from 'lucide-react';
import dynamic from 'next/dynamic';

const NexconnChatUIProvider = dynamic(
  () => import('./NexconnChatUIProvider').then((mod) => mod.NexconnChatUIProvider),
  { ssr: false }
);

export const ChatDrawer: React.FC = () => {
  const {
    currentUser,
    activeChatUser,
    activeProductContext,
    isChatDrawerOpen,
    closeDirectChat,
    messagesByChannel,
    sendMessage,
    configStatus,
    setIsCredentialsModalOpen,
    viewMode,
    setViewMode,
    autoTranslate,
    toggleMessageOriginal,
  } = useChat();

  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute channel messages
  const channelKey = activeChatUser ? getChannelKey(currentUser.id, activeChatUser.id) : '';
  const currentMessages = channelKey ? messagesByChannel[channelKey] || [] : [];

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isChatDrawerOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentMessages, isChatDrawerOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isChatDrawerOpen) {
        closeDirectChat();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChatDrawerOpen, closeDirectChat]);

  // Handle image file selection
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

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeChatUser) return;
    if (!inputText.trim() && !selectedImage) return;

    setIsSending(true);
    const textToSend = inputText.trim();
    const imageToSend = selectedImage;

    setInputText('');
    removeSelectedImage();

    await sendMessage(
      activeChatUser.id,
      textToSend,
      imageToSend || undefined,
      activeProductContext || undefined
    );

    setIsSending(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isChatDrawerOpen || !activeChatUser) return null;

  return (
    <div
      onClick={closeDirectChat}
      className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/50 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full bg-white dark:bg-[#1a1d27] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 transition-colors"
      >
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-gray-100 dark:border-[#2d3148] flex items-center justify-between bg-white/95 dark:bg-[#1a1d27]/95 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeChatUser.avatar}
                alt={activeChatUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-50 dark:ring-blue-900"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{activeChatUser.name}</h3>
                {activeChatUser.badge && (
                  <span className="text-[10px] bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-medium">
                    {activeChatUser.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <span className="capitalize">{activeChatUser.role}</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Online via Nexconn</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle custom view / official ChatUI */}
            <div className="flex bg-gray-100 dark:bg-[#22263a] p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => setViewMode('custom')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'custom'
                    ? 'bg-white dark:bg-[#1a1d27] shadow-xs text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Custom UI
              </button>
              <button
                onClick={() => setViewMode('chatui')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'chatui'
                    ? 'bg-white dark:bg-[#1a1d27] shadow-xs text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Nexconn ChatUI
              </button>
            </div>

            <button
              onClick={closeDirectChat}
              className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#22263a] rounded-lg transition cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Credentials Warning Banner if not configured */}
        {!configStatus.isConfigured && (
          <div className="bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200/80 dark:border-amber-800/60 px-4 py-2.5 text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                <strong>Nexconn Demo Mode:</strong> Add your App Key & Secret to enable live WebSocket messaging.
              </span>
            </div>
            <button
              onClick={() => setIsCredentialsModalOpen(true)}
              className="underline font-semibold hover:text-amber-950 dark:hover:text-amber-100 ml-2 shrink-0 cursor-pointer"
            >
              Configure
            </button>
          </div>
        )}

        {/* Content Body: Either Custom UI or Official ChatUI */}
        {viewMode === 'chatui' ? (
          <div className="flex-1 relative">
            <NexconnChatUIProvider targetUserId={activeChatUser.id} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/50 dark:bg-[#12141f]/40">
            {/* Active Product Context Banner */}
            {activeProductContext && (
              <div className="mx-4 mt-3 p-3 bg-white dark:bg-[#22263a] border border-blue-100 dark:border-[#2d3148] rounded-xl shadow-xs flex items-center gap-3">
                <img
                  src={activeProductContext.image}
                  alt={activeProductContext.title}
                  className="w-12 h-12 object-cover rounded-lg border border-gray-100 dark:border-gray-700"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                    <ShoppingBag className="w-3 h-3" />
                    <span>Inquiring about this item</span>
                  </div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {activeProductContext.title}
                  </h4>
                  <p className="text-xs font-bold text-gray-900 dark:text-white mt-0.5">
                    ${activeProductContext.price.toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {/* Message History List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-500 dark:text-blue-400 flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Start the conversation</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mt-1">
                    Send a message to {activeChatUser.name} to discuss product specs, shipping, or pricing.
                  </p>
                </div>
              ) : (
                currentMessages.map((msg) => {
                  const isMe = msg.isMe || msg.senderId === currentUser.id;
                  const sender = isMe ? currentUser : getUserById(msg.senderId) || activeChatUser;
                  const displayText = msg.isShowingOriginal ? msg.originalText || msg.text : msg.text;
                  const hasTranslation = !!msg.originalText && !!msg.translatedText;

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMe && (
                        <img
                          src={sender.avatar}
                          alt={sender.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-gray-200 dark:ring-gray-700"
                        />
                      )}

                      <div className={`max-w-[78%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        {/* Attached product card if present */}
                        {msg.productContext && (
                          <div className="mb-1.5 p-2 bg-white dark:bg-[#22263a] rounded-lg border border-gray-200 dark:border-[#2d3148] shadow-xs flex items-center gap-2 max-w-xs">
                            <img
                              src={msg.productContext.image}
                              alt={msg.productContext.title}
                              className="w-9 h-9 object-cover rounded"
                            />
                            <div className="min-w-0">
                              <p className="text-[11px] font-medium text-gray-900 dark:text-gray-100 truncate">
                                {msg.productContext.title}
                              </p>
                              <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                                ${msg.productContext.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Image message attachment */}
                        {msg.imageUrl && (
                          <div
                            onClick={() => setPreviewModalImage(msg.imageUrl || null)}
                            className="mb-1 rounded-xl overflow-hidden cursor-pointer border border-gray-200 dark:border-[#2d3148] max-w-xs shadow-xs hover:opacity-95 transition"
                          >
                            <img
                              src={msg.imageUrl}
                              alt="Attachment"
                              className="max-h-52 w-auto object-cover rounded-xl"
                            />
                          </div>
                        )}

                        {/* Antseed Seller AI Model Badge */}
                        {msg.isAntseedModel && (
                          <div className="flex items-center gap-1.5 mb-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 dark:from-purple-950/50 dark:to-blue-950/50 border border-purple-200 dark:border-purple-800 text-[10px] font-semibold text-purple-700 dark:text-purple-300 shadow-2xs">
                            <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400 animate-pulse" />
                            <span>Antseed Seller AI Assistant</span>
                          </div>
                        )}

                        {/* Text message bubble */}
                        {displayText && (
                          <div
                            className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                              isMe
                                ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                                : 'bg-white dark:bg-[#22263a] text-gray-800 dark:text-gray-100 border border-gray-200/80 dark:border-[#2d3148] rounded-bl-xs shadow-xs'
                            }`}
                          >
                            {displayText}

                            {/* Multi-language live translated indicator */}
                            {hasTranslation && (
                              <div className="mt-1.5 pt-1 border-t border-blue-400/30 dark:border-gray-600/40 flex items-center justify-between gap-2 text-[10px] opacity-90">
                                <span className="flex items-center gap-1 font-mono">
                                  <Languages className="w-3 h-3" />
                                  {msg.isShowingOriginal
                                    ? `Original (${msg.language?.toUpperCase() || 'SRC'})`
                                    : `Translated from ${msg.language?.toUpperCase() || 'SRC'}`}
                                </span>
                                <button
                                  onClick={() => toggleMessageOriginal(channelKey, msg.id)}
                                  className="underline hover:opacity-100 font-semibold cursor-pointer"
                                >
                                  {msg.isShowingOriginal ? 'Show translation' : 'Show original'}
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Message status and timestamp */}
                        <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-gray-400 dark:text-gray-500">
                          <span>
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {isMe && (
                            <span>
                              {msg.status === 'sending' ? (
                                <Clock className="w-2.5 h-2.5 inline text-gray-400" />
                              ) : (
                                <Check className="w-3 h-3 inline text-blue-500" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      {isMe && (
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-gray-200 dark:ring-gray-700"
                        />
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Selected Image Preview before sending */}
            {imagePreviewUrl && (
              <div className="px-4 py-2 bg-gray-100/80 dark:bg-[#22263a] border-t border-gray-200 dark:border-[#2d3148] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                  />
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[200px]">
                      {selectedImage?.name}
                    </p>
                    <p className="text-[10px]">
                      {selectedImage ? (selectedImage.size / 1024).toFixed(1) : 0} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Quick Action Suggestion Chips */}
            <div className="px-4 py-1.5 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
              <button
                onClick={() => setInputText('Is this item still available?')}
                className="px-2.5 py-1 bg-white dark:bg-[#22263a] hover:bg-gray-100 dark:hover:bg-[#2c314a] border border-gray-200 dark:border-[#2d3148] rounded-full text-gray-600 dark:text-gray-300 transition shrink-0 cursor-pointer"
              >
                👋 Still available?
              </button>
              <button
                onClick={() => setInputText('What is the estimated delivery time?')}
                className="px-2.5 py-1 bg-white dark:bg-[#22263a] hover:bg-gray-100 dark:hover:bg-[#2c314a] border border-gray-200 dark:border-[#2d3148] rounded-full text-gray-600 dark:text-gray-300 transition shrink-0 cursor-pointer"
              >
                🚚 Delivery time?
              </button>
              <button
                onClick={() => setInputText('Can you do $')}
                className="px-2.5 py-1 bg-white dark:bg-[#22263a] hover:bg-gray-100 dark:hover:bg-[#2c314a] border border-gray-200 dark:border-[#2d3148] rounded-full text-gray-600 dark:text-gray-300 transition shrink-0 cursor-pointer"
              >
                💰 Best price offer?
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
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
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-[#22263a] rounded-xl transition cursor-pointer"
                title="Attach image"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder={`Message ${activeChatUser.name}...`}
                className="flex-1 bg-gray-50 dark:bg-[#22263a] hover:bg-gray-100/70 focus:bg-white dark:focus:bg-[#22263a] text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-[#2d3148] focus:border-blue-500 rounded-xl px-3.5 py-2.5 outline-none transition"
              />

              <button
                type="submit"
                disabled={(!inputText.trim() && !selectedImage) || isSending}
                className={`p-2.5 rounded-xl font-medium text-white transition flex items-center justify-center cursor-pointer ${
                  (!inputText.trim() && !selectedImage) || isSending
                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-xs'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Full-size Image Preview Modal */}
      {previewModalImage && (
        <div
          onClick={() => setPreviewModalImage(null)}
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
        >
          <img
            src={previewModalImage}
            alt="Full Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
