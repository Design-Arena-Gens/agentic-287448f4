'use client';

import { motion } from 'framer-motion';
import { Wallet, TrendingDown, TrendingUp, Plus } from 'lucide-react';

const cards = [
  {
    title: 'Total Balance',
    amount: '₹1,24,580',
    change: '+12.5%',
    isPositive: true,
    icon: Wallet,
    gradient: 'from-cyan-400 to-sapphire-500',
  },
  {
    title: 'Monthly Spending',
    amount: '₹45,230',
    change: '-8.2%',
    isPositive: true,
    icon: TrendingDown,
    gradient: 'from-mint-400 to-green-500',
  },
  {
    title: 'AI Predicted Next Month',
    amount: '₹48,900',
    change: '+8.1%',
    isPositive: false,
    icon: TrendingUp,
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    title: 'Wallet',
    amount: '₹12,450',
    change: 'Add Money',
    isPositive: true,
    icon: Plus,
    gradient: 'from-orange-400 to-red-500',
    isAction: true,
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="glass-dark rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all cursor-pointer relative overflow-hidden group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                card.isAction
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : card.isPositive
                    ? 'bg-mint-500/20 text-mint-300'
                    : 'bg-orange-500/20 text-orange-300'
              }`}>
                {card.change}
              </div>
            </div>

            <h3 className="text-gray-400 text-sm mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-white">{card.amount}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
