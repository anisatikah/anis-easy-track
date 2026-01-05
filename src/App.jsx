import React, { useState } from 'react';
import { Settings, Search, Mail, ShoppingBag, Coffee, Car, Utensils, Home, BarChart3, Receipt, Camera, FolderOpen, FileText, Plus } from 'lucide-react';

// Mock data with Malaysian Ringgit context
const mockTransactions = [
  {
    id: 1,
    date: 'December 13, 2025',
    merchant: 'Farley',
    category: 'Supplies & Materials',
    amount: 9.20,
    icon: ShoppingBag,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    report: 'Report #1'
  },
  {
    id: 2,
    date: 'December 13, 2025',
    merchant: 'Eco Shop',
    category: 'Office Supplies',
    amount: 24.50,
    icon: ShoppingBag,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    report: 'Report #1'
  },
  {
    id: 3,
    date: 'December 12, 2025',
    merchant: 'Shell Station',
    category: 'Fuel & Transportation',
    amount: 85.00,
    icon: Car,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    report: 'Report #2'
  },
  {
    id: 4,
    date: 'December 12, 2025',
    merchant: 'KFC Damansara',
    category: 'Meals & Entertainment',
    amount: 32.90,
    icon: Utensils,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    report: 'Report #2'
  },
  {
    id: 5,
    date: 'December 11, 2025',
    merchant: 'Starbucks KLCC',
    category: 'Meals & Entertainment',
    amount: 18.50,
    icon: Coffee,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    report: 'Report #3'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('transactions');

  // Group transactions by date
  const groupedTransactions = mockTransactions.reduce((acc, transaction) => {
    if (!acc[transaction.date]) {
      acc[transaction.date] = [];
    }
    acc[transaction.date].push(transaction);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-xl relative flex flex-col">
        
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Settings className="w-6 h-6 text-gray-700" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2.5">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="bg-transparent flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
            <button className="text-blue-600 font-medium text-sm px-3 py-2.5 hover:bg-blue-50 rounded-lg transition">
              Filter
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pb-32">
          {/* Promotional Banner */}
          <div className="mx-4 mt-4 mb-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-0.5">Import Email Receipts</h3>
                <p className="text-sm text-gray-500">Forward to: upload@easy-expense.com</p>
              </div>
            </div>
          </div>

          {/* Transaction List */}
          <div className="px-4">
            {Object.entries(groupedTransactions).map(([date, transactions]) => (
              <div key={date} className="mb-6">
                {/* Date Header */}
                <h2 className="font-bold text-gray-900 mb-3 text-sm">{date}</h2>
                
                {/* Transactions for this date */}
                <div className="space-y-3">
                  {transactions.map((transaction) => {
                    const IconComponent = transaction.icon;
                    return (
                      <div 
                        key={transaction.id}
                        className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition cursor-pointer"
                      >
                        {/* Icon */}
                        <div className={`w-12 h-12 ${transaction.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-6 h-6 ${transaction.iconColor}`} />
                        </div>

                        {/* Transaction Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm mb-0.5">{transaction.merchant}</h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-xs text-gray-500">{transaction.category}</p>
                            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                              {transaction.report}
                            </span>
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-gray-900">RM {transaction.amount.toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium transition-all hover:shadow-xl z-20">
          <Plus className="w-5 h-5" />
          Add Transaction
        </button>

        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2 z-30">
          <div className="flex items-center justify-between relative">
            {/* Dashboard */}
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
                activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs font-medium">Dashboard</span>
            </button>

            {/* Transactions */}
            <button 
              onClick={() => setActiveTab('transactions')}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
                activeTab === 'transactions' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Receipt className="w-6 h-6" />
              <span className="text-xs font-medium">Transactions</span>
            </button>

            {/* Scan (Center - Prominent) */}
            <button 
              onClick={() => setActiveTab('scan')}
              className="absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all hover:shadow-xl"
            >
              <Camera className="w-7 h-7 text-white" />
            </button>

            {/* Drives */}
            <button 
              onClick={() => setActiveTab('drives')}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
                activeTab === 'drives' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <FolderOpen className="w-6 h-6" />
              <span className="text-xs font-medium">Drives</span>
            </button>

            {/* Reports */}
            <button 
              onClick={() => setActiveTab('reports')}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
                activeTab === 'reports' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-xs font-medium">Reports</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;