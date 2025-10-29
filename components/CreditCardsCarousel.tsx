'use client';

import { motion } from 'framer-motion';
import { CreditCard, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const cards = [
  {
    name: 'Sapphire Premium',
    balance: 45230,
    limit: 100000,
    gradient: 'from-cyan-400 via-sapphire-500 to-mint-400',
    number: '•••• 4582',
  },
  {
    name: 'Platinum Rewards',
    balance: 28500,
    limit: 75000,
    gradient: 'from-purple-400 via-pink-500 to-orange-400',
    number: '•••• 7219',
  },
  {
    name: 'Gold Cashback',
    balance: 12800,
    limit: 50000,
    gradient: 'from-mint-400 via-green-500 to-cyan-400',
    number: '•••• 3947',
  },
];

export default function CreditCardsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <CreditCard className="w-7 h-7 text-cyan-400" />
        <h3 className="text-2xl font-bold text-white">Your Cards</h3>
      </div>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {cards.map((card, index) => {
            const usagePercent = (card.balance / card.limit) * 100;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: activeIndex === index ? 1 : 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveIndex(index)}
                className={`min-w-[350px] h-[220px] rounded-3xl p-6 cursor-pointer transition-all ${
                  activeIndex === index ? 'border-2 border-cyan-400' : 'border border-cyan-500/20'
                } bg-gradient-to-br ${card.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm mb-1">Card Name</p>
                      <h4 className="text-white text-xl font-bold">{card.name}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div>
                    <p className="text-white/80 text-sm mb-2">Card Number</p>
                    <p className="text-white text-2xl font-mono tracking-wider mb-4">{card.number}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">Balance: ₹{card.balance.toLocaleString()}</span>
                        <span className="text-white/80">Limit: ₹{card.limit.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${usagePercent}%` }}
                          className="h-full bg-gradient-to-r from-white to-mint-300 rounded-full"
                        />
                      </div>
                      <p className="text-white/80 text-xs">{usagePercent.toFixed(1)}% utilized</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === index ? 'bg-cyan-400 w-8' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
