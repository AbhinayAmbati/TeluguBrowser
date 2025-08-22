'use client';

import { motion } from 'framer-motion';
import { Languages, Search, BookOpen, Settings } from 'lucide-react';
import TranslationService from '../../components/TranslationService';
import Link from 'next/link';

export default function TranslatePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/logo.png" 
              alt="Telugu Browser Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-medium text-black">Thakatu Browser</span>
          </Link>
        </div>
        
        <nav className="flex space-x-6">
          <Link 
            href="/"
            className="text-gray-600 hover:text-blue-600 text-sm transition-colors flex items-center space-x-1"
          >
            <Search size={16} />
            <span>Search</span>
          </Link>
          <Link 
            href="/translate"
            className="text-black font-medium text-sm flex items-center space-x-1"
          >
            <Languages size={16} />
            <span>Translate</span>
          </Link>
          <Link 
            href="/dictionary"
            className="text-gray-600 hover:text-blue-600 text-sm transition-colors flex items-center space-x-1"
          >
            <BookOpen size={16} />
            <span>Dictionary</span>
          </Link>
          <Link 
            href="/settings"
            className="text-gray-600 hover:text-blue-600 text-sm transition-colors flex items-center space-x-1"
          >
            <Settings size={16} />
            <span>Settings</span>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-light text-black mb-2">Translation Service</h1>
            <p className="text-black">Translate between English and Telugu seamlessly</p>
          </motion.div>
          
          <TranslationService />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-100 mt-16">
        <div className="flex justify-center space-x-8 mb-4">
          <Link href="/" className="text-black hover:text-gray-700">Telugu Browser</Link>
          <a href="#" className="text-black hover:text-gray-700">Privacy</a>
          <a href="#" className="text-black hover:text-gray-700">Terms</a>
          <a href="#" className="text-black hover:text-gray-700">About</a>
        </div>
        <p className="text-black">Built for the Telugu community with ❤️</p>
      </footer>
    </div>
  );
} 