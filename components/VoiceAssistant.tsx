'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi! I\'m your AI Finance Assistant. Ask me about your spending, record expenses, or get financial insights!',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('spending') || lowerQuery.includes('spent')) {
      return 'Your top spending category this month is Entertainment at ₹15,000 (28% of total). Food follows at ₹12,500 (23%).';
    } else if (lowerQuery.includes('budget')) {
      return 'You\'re currently 12% under your monthly budget of ₹50,000. Great job! You have ₹6,000 remaining this month.';
    } else if (lowerQuery.includes('save')) {
      return 'Based on your spending patterns, I recommend saving ₹5,000 more by reducing entertainment expenses by 15%.';
    } else if (lowerQuery.includes('burger') || lowerQuery.includes('spent')) {
      return 'I\'ve recorded your ₹100 expense for Food category. Your daily food budget is now at 45% utilization.';
    } else {
      return 'I can help you track expenses, analyze spending, create budgets, and provide personalized financial insights. What would you like to know?';
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);

    if (!isListening) {
      setTimeout(() => {
        const voiceMessage: Message = {
          id: messages.length + 1,
          text: 'I spent ₹100 on burger',
          isUser: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, voiceMessage]);

        setTimeout(() => {
          const aiResponse: Message = {
            id: messages.length + 2,
            text: 'Got it! I\'ve added ₹100 to your Food expenses. Your daily food budget is now at 45% utilization.',
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsListening(false);
        }, 1500);
      }, 2000);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-sapphire-500 shadow-2xl flex items-center justify-center z-50"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-28 right-8 w-96 h-[600px] glass-dark rounded-3xl border border-cyan-500/30 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-sapphire-500/10">
              <div>
                <h3 className="text-xl font-bold text-white">AI Assistant</h3>
                <p className="text-sm text-gray-400">Always here to help</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl glass border border-cyan-500/30 hover:border-red-400"
              >
                <X className="w-5 h-5 text-cyan-400" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-cyan-500 to-sapphire-500 text-white'
                        : 'glass border border-cyan-500/20 text-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isListening && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center"
                >
                  <div className="glass border border-cyan-500/30 rounded-2xl px-6 py-4 flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-3 h-3 rounded-full bg-red-500"
                    />
                    <span className="text-cyan-300 text-sm font-medium">Listening...</span>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-sapphire-500/5">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleListening}
                  className={`p-3 rounded-xl transition-all ${
                    isListening
                      ? 'bg-red-500 border-red-400'
                      : 'glass border border-cyan-500/30 hover:border-cyan-400'
                  }`}
                >
                  <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-cyan-400'}`} />
                </motion.button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type or use voice..."
                  className="flex-1 px-4 py-3 rounded-xl glass border border-cyan-500/30 focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400"
                />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sapphire-500"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
