'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Search, X, Clock, Cloud, BookOpen, Newspaper, Film, ChefHat, Languages, Settings } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source: string;
}

export default function TeluguBrowser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const suggestions = [
    'తెలుగు వార్తలు',
    'తెలుగు సినిమాలు', 
    'తెలుగు సాహిత్యం',
    'తెలుగు వంటలు',
    'Telugu movies',
    'Telugu news today'
  ];

  // Mock search function
  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setShowSuggestions(false);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock search results
    const mockResults: SearchResult[] = [
      {
        title: `${query} - Telugu Wikipedia`,
        link: `https://te.wikipedia.org/wiki/${encodeURIComponent(query)}`,
        snippet: `${query} గురించి తెలుగు వికీపీడియాలో వివరణ. ఈ విషయం గురించి పూర్తి సమాచారం ఇక్కడ లభిస్తుంది.`,
        source: 'te.wikipedia.org'
      },
      {
        title: `${query} - Google Search Results`,
        link: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        snippet: `${query} గురించి Google లో వెతుకుతున్న ఫలితాలు. మీకు కావలసిన సమాచారం ఇక్కడ దొరుకుతుంది.`,
        source: 'google.com'
      },
      {
        title: `${query} - Telugu News & Media`,
        link: `https://www.bbc.com/telugu/search?q=${encodeURIComponent(query)}`,
        snippet: `${query} గురించి తెలుగు మీడియాలో ఉన్న వార్తలు మరియు వ్యాసాలు. తాజా సమాచారం కోసం చూడండి.`,
        source: 'bbc.com/telugu'
      }
    ];
    
    setSearchResults(mockResults);
    setIsSearching(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'te-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsSearching(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        performSearch(transcript);
      };
      
      recognition.onerror = () => {
        setIsSearching(false);
      };
      
      recognition.start();
    } else {
      alert('వాయిస్ రికగ్నిషన్ మద్దతు లేదు');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="p-4 flex justify-between items-center">
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
            href="/translate"
            className="text-black hover:text-blue-600 text-sm transition-colors flex items-center space-x-1"
          >
            <Languages size={16} />
            <span>Translate</span>
          </Link>
          <Link 
            href="/dictionary"
            className="text-black hover:text-blue-600 text-sm transition-colors flex items-center space-x-1"
          >
            <BookOpen size={16} />
            <span>Dictionary</span>
          </Link>
          <Link 
            href="/settings"
            className="text-black hover:text-blue-600 text-sm transition-colors flex items-center space-x-1"
          >
            <Settings size={16} />
            <span>Settings</span>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4">
          {/* Logo and Title - Side by Side */}
          <div className="mt-20 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center space-x-8"
            >
              <img 
                src="/logo.png" 
                alt="Telugu Browser" 
                className="w-32 h-32 object-contain"
              />
              <div className="text-left">
                <h1 className="text-5xl font-light text-gray-700 mb-3">Thakatu Browser</h1>
                <p className="text-xl text-gray-500">Search in Telugu and English</p>
              </div>
            </motion.div>
          </div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-8"
          >
            <form onSubmit={handleSearchSubmit}>
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                  placeholder="తెలుగులో లేదా ఇంగ్లీషులో వెతుకండి..."
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow text-black"
                />
                
                {/* Search Icons */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X size={18} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className="text-gray-400 hover:text-blue-600 p-1 cursor-pointer"
                    title="Thakatu Voice Search"
                  >
                    <Mic size={18} />
                  </button>
                  <button
                    type="submit"
                    className="text-gray-400 hover:text-blue-600 p-1 cursor-pointer"
                    title="Thakatu Search"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>
            </form>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10"
                >
                                  {suggestions
                  .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                  .slice(0, 6)
                  .map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          performSearch(suggestion);
                        }}
                                              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                    >
                      <Search size={16} className="text-gray-400" />
                      <span className="text-gray-700">{suggestion}</span>
                    </button>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center space-x-4 mb-8"
          >
            <button
              onClick={() => performSearch(searchQuery)}
              disabled={!searchQuery.trim()}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Thakatu Search
            </button>
            <Link
              href="/translate"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Translate
            </Link>
            <Link
              href="/dictionary"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Dictionary
            </Link>
          </motion.div>

          {/* Quick Shortcuts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <Link
                href="https://te.wikipedia.org"
                target="_blank"
                className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Telugu Wiki</span>
              </Link>
              
              <Link
                href="https://www.bbc.com/telugu"
                target="_blank"
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Newspaper size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Telugu News</span>
              </Link>
              
              <Link
                href="https://www.youtube.com/results?search_query=telugu+movies"
                target="_blank"
                className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Film size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Telugu Movies</span>
              </Link>
              
              <Link
                href="https://www.google.com/search?q=telugu+recipes"
                target="_blank"
                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <ChefHat size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Telugu Recipes</span>
              </Link>
            </div>
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Trending in Telugu</h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {['తెలుగు సినిమాలు', 'తెలుగు వార్తలు', 'తెలుగు వంటలు', 'తెలుగు సాహిత్యం', 'Telugu Movies', 'Telugu News', 'Telugu Recipes', 'Telugu Literature'].map((topic, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(topic);
                    performSearch(topic);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm"
                >
                  {topic}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Weather & Time Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-12"
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <Clock size={28} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {currentTime.toLocaleTimeString('en-US', { 
                          hour12: true, 
                          hour: 'numeric', 
                          minute: '2-digit' 
                        })}
                      </p>
                      <p className="text-gray-600">Hyderabad, India</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-2 mb-2">
                      <Cloud size={24} className="text-gray-600" />
                      <p className="text-3xl font-bold text-gray-800">28°C</p>
                    </div>
                    <p className="text-gray-600">Partly Cloudy</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-500">Searching...</p>
            </motion.div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && !isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {searchResults.map((result, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:bg-gray-50 p-3 rounded-lg -mx-3 transition-colors"
                  >
                    <div className="flex items-center space-x-0 mb-1">
                      <span className="text-sm text-green-600 font-medium">{result.source}</span>
                    </div>
                    <h3 className="text-xl text-blue-600 hover:underline mb-2 font-normal">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{result.snippet}</p>
                  </a>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-100 mt-16">
        <div className="flex justify-center space-x-8 mb-4">
          <Link href="/" className="hover:text-gray-700">
            Telugu Browser
          </Link>
          <a href="#" className="hover:text-gray-700">Privacy</a>
          <a href="#" className="hover:text-gray-700">Terms</a>
          <a href="#" className="hover:text-gray-700">About</a>
        </div>
        <p>Built for the Telugu community with ❤️</p>
      </footer>
    </div>
  );
}
