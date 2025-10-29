'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, Eye, Calendar, Store, DollarSign, Tag } from 'lucide-react';
import { useState } from 'react';

interface Receipt {
  id: number;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  aiSummary: string;
  fileType: 'pdf' | 'image';
}

export default function ReceiptScanner() {
  const [receipts, setReceipts] = useState<Receipt[]>([
    {
      id: 1,
      date: '2024-06-28',
      merchant: 'Whole Foods Market',
      amount: 2845,
      category: 'Groceries',
      aiSummary: 'Weekly grocery shopping with fresh produce, dairy products, and pantry items.',
      fileType: 'image',
    },
    {
      id: 2,
      date: '2024-06-27',
      merchant: 'Shell Gas Station',
      amount: 1200,
      category: 'Transport',
      aiSummary: 'Fuel refill - 45 liters of petrol.',
      fileType: 'pdf',
    },
    {
      id: 3,
      date: '2024-06-25',
      merchant: 'Apple Store',
      amount: 8999,
      category: 'Electronics',
      aiSummary: 'Purchased AirPods Pro with AppleCare+ warranty.',
      fileType: 'pdf',
    },
  ]);

  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const newReceipt: Receipt = {
      id: receipts.length + 1,
      date: new Date().toISOString().split('T')[0],
      merchant: 'AI Processing...',
      amount: 0,
      category: 'Uncategorized',
      aiSummary: 'AI is analyzing your receipt...',
      fileType: 'image',
    };

    setReceipts([newReceipt, ...receipts]);

    setTimeout(() => {
      setReceipts(prev => prev.map(r =>
        r.id === newReceipt.id
          ? { ...r, merchant: 'Starbucks Coffee', amount: 450, category: 'Food', aiSummary: 'Coffee and pastry purchase.' }
          : r
      ));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-mint-400 bg-clip-text text-transparent">
          AI Receipt Scanner
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`glass-dark rounded-3xl p-12 border-2 border-dashed transition-all ${
          isDragging ? 'border-cyan-400 bg-cyan-500/10' : 'border-cyan-500/30'
        }`}
      >
        <div className="text-center">
          <motion.div
            animate={{ y: isDragging ? -10 : 0 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-400 to-sapphire-500 flex items-center justify-center"
          >
            <Upload className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">Upload Receipt</h3>
          <p className="text-gray-400 mb-6">Drag & drop your receipt (PDF or Image) or click to browse</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sapphire-500 text-white font-semibold"
          >
            Browse Files
          </motion.button>
        </div>
      </motion.div>

      <div className="glass-dark rounded-3xl p-6 border border-cyan-500/20">
        <h3 className="text-xl font-bold text-white mb-6">Scanned Receipts</h3>

        <div className="space-y-3">
          {receipts.map((receipt, index) => (
            <motion.div
              key={receipt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedReceipt(receipt)}
              className="glass rounded-2xl p-4 border border-cyan-500/20 hover:border-cyan-400/50 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-sapphire-500 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{receipt.merchant}</h4>
                    <p className="text-gray-400 text-sm">{receipt.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-mint-500/20 text-mint-300">
                    {receipt.category}
                  </span>
                  <span className="text-white font-bold text-lg">₹{receipt.amount}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg glass border border-cyan-500/30 hover:border-cyan-400"
                  >
                    <Eye className="w-5 h-5 text-cyan-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReceipt(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark rounded-3xl p-8 border border-cyan-500/30 max-w-2xl w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Receipt Details</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedReceipt(null)}
                  className="p-2 rounded-xl glass border border-cyan-500/30 hover:border-red-400"
                >
                  <X className="w-6 h-6 text-cyan-400" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-2xl p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-400 text-sm">Date</span>
                    </div>
                    <p className="text-white font-semibold">{selectedReceipt.date}</p>
                  </div>

                  <div className="glass rounded-2xl p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Store className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-400 text-sm">Merchant</span>
                    </div>
                    <p className="text-white font-semibold">{selectedReceipt.merchant}</p>
                  </div>

                  <div className="glass rounded-2xl p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-400 text-sm">Amount</span>
                    </div>
                    <p className="text-white font-semibold text-xl">₹{selectedReceipt.amount}</p>
                  </div>

                  <div className="glass rounded-2xl p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Tag className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-400 text-sm">Category</span>
                    </div>
                    <p className="text-mint-400 font-semibold">{selectedReceipt.category}</p>
                  </div>
                </div>

                <div className="glass rounded-2xl p-4 border border-cyan-500/20">
                  <h4 className="text-white font-semibold mb-2">AI Summary</h4>
                  <p className="text-gray-300">{selectedReceipt.aiSummary}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sapphire-500 text-white font-semibold"
                >
                  View {selectedReceipt.fileType === 'pdf' ? 'PDF' : 'Image'} File
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
