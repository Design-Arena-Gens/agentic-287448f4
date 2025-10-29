'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AIInsights from '@/components/AIInsights';
import OverviewCards from '@/components/OverviewCards';
import Charts from '@/components/Charts';
import TransactionsTable from '@/components/TransactionsTable';
import CreditCardsCarousel from '@/components/CreditCardsCarousel';
import ReceiptScanner from '@/components/ReceiptScanner';
import VoiceAssistant from '@/components/VoiceAssistant';
import Splitwise from '@/components/Splitwise';

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1854] to-[#0a0e27] dark:from-[#0a0e27] dark:via-[#0f1854] dark:to-[#0a0e27]">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="flex">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />

          <main className="flex-1 p-6 ml-64 mt-16 overflow-y-auto h-[calc(100vh-4rem)]">
            {activeView === 'dashboard' && (
              <div className="space-y-6">
                <AIInsights />
                <OverviewCards />
                <Charts />
                <TransactionsTable />
                <CreditCardsCarousel />
              </div>
            )}

            {activeView === 'receipts' && <ReceiptScanner />}
            {activeView === 'splitwise' && <Splitwise />}
            {activeView === 'analytics' && <Charts />}
            {activeView === 'cards' && <CreditCardsCarousel />}
            {activeView === 'settings' && (
              <div className="glass-dark rounded-3xl p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-mint-400 bg-clip-text text-transparent mb-4">
                  Settings
                </h2>
                <p className="text-gray-300">Settings panel coming soon...</p>
              </div>
            )}
          </main>
        </div>

        <VoiceAssistant />
      </div>
    </div>
  );
}
