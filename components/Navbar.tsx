'use client';

import { Search, Bell, User, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 right-0 left-64 z-50 glass-dark border-b border-cyan-500/20 px-8 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
            <input
              type="text"
              placeholder="Search transactions, categories, insights..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl glass border border-cyan-500/30 focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-xl glass border border-cyan-500/30 hover:border-cyan-400 transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5 text-cyan-400" /> : <Moon className="w-5 h-5 text-sapphire-400" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-3 rounded-xl glass border border-cyan-500/30 hover:border-cyan-400 transition-all"
          >
            <Bell className="w-5 h-5 text-cyan-400" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-mint-400 rounded-full border-2 border-[#0a0e27]"></span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl glass border border-cyan-500/30 hover:border-cyan-400 transition-all"
          >
            <User className="w-5 h-5 text-cyan-400" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
