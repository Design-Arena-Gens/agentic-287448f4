'use client';

import { LayoutDashboard, TrendingUp, Receipt, CreditCard, Users, Settings, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'receipts', label: 'Receipts', icon: Receipt },
  { id: 'cards', label: 'Cards', icon: CreditCard },
  { id: 'splitwise', label: 'Splitwise', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 glass-dark border-r border-cyan-500/20 p-6 z-50"
    >
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-sapphire-500 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-mint-400 bg-clip-text text-transparent">
              FinanceAI
            </h1>
            <p className="text-xs text-gray-400">Smart Finance</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-sapphire-500/20 border border-cyan-400/50 text-cyan-300'
                  : 'text-gray-400 hover:text-cyan-300 hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-2xl p-4 border border-mint-400/30"
        >
          <p className="text-xs text-gray-400 mb-2">AI Assistant</p>
          <p className="text-sm text-mint-300 font-medium">Ready to help you manage finances!</p>
        </motion.div>
      </div>
    </motion.aside>
  );
}
