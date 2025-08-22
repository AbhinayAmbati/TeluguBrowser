'use client';

import { motion } from 'framer-motion';
import TeluguDictionary from '../../components/TeluguDictionary';
import Link from 'next/link';

export default function DictionaryPage() {
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
            <span className="text-lg font-medium text-gray-800">Thakatu Browser</span>
          </Link>
        </div>
        
        <nav className="flex space-x-6">
          <Link 
            href="/"
            className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
          >
            Search
          </Link>
          <Link 
            href="/translate"
            className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
          >
            Translate
          </Link>
          <Link 
            href="/dictionary"
            className="text-black font-medium text-sm"
          >
            Dictionary
          </Link>
          <Link 
            href="/settings"
            className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
          >
            Settings
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
            <h1 className="text-3xl font-light text-gray-800 mb-2">Telugu Dictionary</h1>
            <p className="text-gray-500">Explore Telugu words, meanings, and pronunciations</p>
          </motion.div>
          
          <TeluguDictionary />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-100 mt-16">
        <div className="flex justify-center space-x-8 mb-4">
          <Link href="/" className="hover:text-gray-700">Telugu Browser</Link>
          <a href="#" className="hover:text-gray-700">Privacy</a>
          <a href="#" className="hover:text-gray-700">Terms</a>
          <a href="#" className="hover:text-gray-700">About</a>
        </div>
        <p>Built for the Telugu community with ❤️</p>
      </footer>
    </div>
  );
} 