'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const spendingData = [
  { month: 'Jan', amount: 42000 },
  { month: 'Feb', amount: 38000 },
  { month: 'Mar', amount: 45000 },
  { month: 'Apr', amount: 48000 },
  { month: 'May', amount: 43000 },
  { month: 'Jun', amount: 45230 },
];

const categoryData = [
  { name: 'Food', value: 12500, color: '#00D9FF' },
  { name: 'Entertainment', value: 15000, color: '#0F52BA' },
  { name: 'Shopping', value: 8200, color: '#98FF98' },
  { name: 'Transport', value: 5300, color: '#FF6B9D' },
  { name: 'Bills', value: 4230, color: '#FFA500' },
];

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-dark rounded-3xl p-6 border border-cyan-500/20"
      >
        <h3 className="text-xl font-bold text-white mb-6">Monthly Spending Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={spendingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="#00D9FF" />
            <YAxis stroke="#00D9FF" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 82, 186, 0.9)',
                border: '1px solid #00D9FF',
                borderRadius: '12px',
                color: '#fff',
              }}
            />
            <Bar dataKey="amount" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="100%" stopColor="#0F52BA" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-dark rounded-3xl p-6 border border-cyan-500/20"
      >
        <h3 className="text-xl font-bold text-white mb-6">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 82, 186, 0.9)',
                border: '1px solid #00D9FF',
                borderRadius: '12px',
                color: '#fff',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
