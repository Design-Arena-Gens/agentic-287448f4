'use client';

import { motion } from 'framer-motion';
import { Filter, Download } from 'lucide-react';
import { format } from 'date-fns';

const transactions = [
  { date: new Date(2024, 5, 28), description: 'Starbucks Coffee', category: 'Food', amount: -450, method: 'Credit Card' },
  { date: new Date(2024, 5, 27), description: 'Netflix Subscription', category: 'Entertainment', amount: -799, method: 'UPI' },
  { date: new Date(2024, 5, 26), description: 'Salary Credit', category: 'Income', amount: 85000, method: 'Bank Transfer' },
  { date: new Date(2024, 5, 25), description: 'Uber Ride', category: 'Transport', amount: -280, method: 'Wallet' },
  { date: new Date(2024, 5, 24), description: 'Amazon Shopping', category: 'Shopping', amount: -2499, method: 'Credit Card' },
  { date: new Date(2024, 5, 23), description: 'Electricity Bill', category: 'Bills', amount: -1850, method: 'UPI' },
  { date: new Date(2024, 5, 22), description: 'Restaurant Dinner', category: 'Food', amount: -1250, method: 'Credit Card' },
  { date: new Date(2024, 5, 21), description: 'Freelance Payment', category: 'Income', amount: 15000, method: 'Bank Transfer' },
];

export default function TransactionsTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark rounded-3xl p-6 border border-cyan-500/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Recent Transactions</h3>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 transition-all"
          >
            <Filter className="w-4 h-4" />
            Filter
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sapphire-500 text-white transition-all"
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20">
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">Date</th>
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">Description</th>
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">Category</th>
              <th className="text-left py-4 px-4 text-gray-400 font-semibold">Method</th>
              <th className="text-right py-4 px-4 text-gray-400 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.05)' }}
                className="border-b border-cyan-500/10 cursor-pointer transition-colors"
              >
                <td className="py-4 px-4 text-gray-300">{format(transaction.date, 'MMM dd, yyyy')}</td>
                <td className="py-4 px-4 text-white font-medium">{transaction.description}</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300">
                    {transaction.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-400">{transaction.method}</td>
                <td className={`py-4 px-4 text-right font-bold ${
                  transaction.amount > 0 ? 'text-mint-400' : 'text-white'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
