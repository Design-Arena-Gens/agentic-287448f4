'use client';

import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, PieChart } from 'lucide-react';

const insights = [
  {
    icon: Brain,
    title: 'AI Budget Tip',
    description: 'Consider reducing dining expenses by 15% to meet your savings goal.',
    gradient: 'from-cyan-400 to-sapphire-500',
    bgGradient: 'from-cyan-500/10 to-sapphire-500/10',
  },
  {
    icon: AlertTriangle,
    title: 'Overspending Alert',
    description: "You're overspending on Food this week by ₹1,250 compared to budget.",
    gradient: 'from-orange-400 to-red-500',
    bgGradient: 'from-orange-500/10 to-red-500/10',
  },
  {
    icon: PieChart,
    title: 'Top Category',
    description: 'Entertainment is your highest spending category at 28% this month.',
    gradient: 'from-mint-400 to-green-500',
    bgGradient: 'from-mint-500/10 to-green-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Smart Forecast',
    description: 'Based on trends, you\'ll save ₹8,500 extra this month. Great job!',
    gradient: 'from-purple-400 to-pink-500',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
  },
];

export default function AIInsights() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Brain className="w-8 h-8 text-cyan-400" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-mint-400 bg-clip-text text-transparent">
          AI Insights
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`glass-dark rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all cursor-pointer bg-gradient-to-br ${insight.bgGradient}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.gradient} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
              <p className="text-sm text-gray-300">{insight.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
