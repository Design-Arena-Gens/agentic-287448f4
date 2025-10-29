'use client';

import { motion } from 'framer-motion';
import { Users, Plus, ArrowRight, ArrowDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Group {
  id: number;
  name: string;
  members: number;
  totalSpent: number;
  youOwe: number;
  youAreOwed: number;
}

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export default function Splitwise() {
  const [groups] = useState<Group[]>([
    {
      id: 1,
      name: 'Goa Trip 2024',
      members: 5,
      totalSpent: 45000,
      youOwe: 2500,
      youAreOwed: 1800,
    },
    {
      id: 2,
      name: 'Roommates',
      members: 3,
      totalSpent: 12000,
      youOwe: 0,
      youAreOwed: 3200,
    },
    {
      id: 3,
      name: 'Office Lunch',
      members: 8,
      totalSpent: 8500,
      youOwe: 450,
      youAreOwed: 0,
    },
  ]);

  const [settlements] = useState<Settlement[]>([
    { from: 'You', to: 'Rahul', amount: 1500 },
    { from: 'You', to: 'Priya', amount: 1000 },
    { from: 'Amit', to: 'You', amount: 2200 },
    { from: 'Sarah', to: 'You', amount: 1000 },
  ]);

  const totalOwed = groups.reduce((sum, g) => sum + g.youAreOwed, 0);
  const totalOwe = groups.reduce((sum, g) => sum + g.youOwe, 0);
  const netBalance = totalOwed - totalOwe;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-mint-400 bg-clip-text text-transparent">
            Splitwise AI
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sapphire-500 text-white font-semibold"
        >
          <Plus className="w-5 h-5" />
          New Group
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-2xl p-6 border border-mint-500/30"
        >
          <p className="text-gray-400 text-sm mb-2">You Are Owed</p>
          <p className="text-3xl font-bold text-mint-400">₹{totalOwed.toLocaleString()}</p>
          <div className="mt-3 flex items-center gap-2 text-mint-400 text-sm">
            <ArrowDown className="w-4 h-4" />
            <span>From {settlements.filter(s => s.to === 'You').length} people</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-dark rounded-2xl p-6 border border-orange-500/30"
        >
          <p className="text-gray-400 text-sm mb-2">You Owe</p>
          <p className="text-3xl font-bold text-orange-400">₹{totalOwe.toLocaleString()}</p>
          <div className="mt-3 flex items-center gap-2 text-orange-400 text-sm">
            <ArrowRight className="w-4 h-4" />
            <span>To {settlements.filter(s => s.from === 'You').length} people</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass-dark rounded-2xl p-6 border ${
            netBalance >= 0 ? 'border-cyan-500/30' : 'border-red-500/30'
          }`}
        >
          <p className="text-gray-400 text-sm mb-2">Net Balance</p>
          <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
            {netBalance >= 0 ? '+' : ''}₹{netBalance.toLocaleString()}
          </p>
          <div className="mt-3 flex items-center gap-2 text-cyan-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Overall Status</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-dark rounded-3xl p-6 border border-cyan-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6">Your Groups</h3>

          <div className="space-y-3">
            {groups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl p-4 border border-cyan-500/20 hover:border-cyan-400/50 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold text-lg">{group.name}</h4>
                    <p className="text-gray-400 text-sm">{group.members} members</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-sapphire-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-400">Total Spent</p>
                    <p className="text-white font-semibold">₹{group.totalSpent.toLocaleString()}</p>
                  </div>
                  {group.youOwe > 0 && (
                    <div className="text-right">
                      <p className="text-gray-400">You Owe</p>
                      <p className="text-orange-400 font-semibold">₹{group.youOwe.toLocaleString()}</p>
                    </div>
                  )}
                  {group.youAreOwed > 0 && (
                    <div className="text-right">
                      <p className="text-gray-400">You're Owed</p>
                      <p className="text-mint-400 font-semibold">₹{group.youAreOwed.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-dark rounded-3xl p-6 border border-cyan-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6">AI Smart Settlements</h3>

          <div className="space-y-3">
            {settlements.map((settlement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl p-4 border border-cyan-500/20 hover:border-cyan-400/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${
                      settlement.from === 'You'
                        ? 'bg-gradient-to-br from-orange-400 to-red-500'
                        : 'bg-gradient-to-br from-mint-400 to-green-500'
                    } flex items-center justify-center`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {settlement.from} → {settlement.to}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {settlement.from === 'You' ? 'You owe' : 'Owes you'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      settlement.from === 'You' ? 'text-orange-400' : 'text-mint-400'
                    }`}>
                      ₹{settlement.amount.toLocaleString()}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-2 px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-sapphire-500 text-white"
                    >
                      Settle
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 glass rounded-2xl p-4 border border-mint-500/30 bg-gradient-to-r from-mint-500/10 to-cyan-500/10"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">AI Tip</h4>
                <p className="text-gray-300 text-sm">
                  Settle with Rahul first to minimize transactions. This will reduce your settlements from 4 to 2!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
