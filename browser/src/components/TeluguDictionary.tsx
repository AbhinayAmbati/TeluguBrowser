'use client';

import { useState } from 'react';
import { BookOpen, Search, Volume2, Heart, Share2 } from 'lucide-react';

interface DictionaryEntry {
  word: string;
  meaning: string;
  etymology: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  category: string;
  pronunciation: string;
}

export default function TeluguDictionary() {
  const [searchWord, setSearchWord] = useState('');
  const [searchResult, setSearchResult] = useState<DictionaryEntry | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock dictionary data - in a real app, this would come from an API
  const mockDictionary: Record<string, DictionaryEntry> = {
    'నమస్కారం': {
      word: 'నమస్కారం',
      meaning: 'A respectful greeting or salutation, equivalent to "hello" or "namaste"',
      etymology: 'From Sanskrit "namaskāra" meaning "bowing, salutation"',
      examples: [
        'నమస్కారం, మీరు ఎలా ఉన్నారు? (Hello, how are you?)',
        'అతను నన్ను నమస్కారం చేశాడు (He greeted me)'
      ],
      synonyms: ['స్వాగతం', 'అభివాదనం'],
      antonyms: ['వీడ్కోలు'],
      category: 'Greeting',
      pronunciation: 'namaskāram'
    },
    'ధన్యవాదాలు': {
      word: 'ధన్యవాదాలు',
      meaning: 'An expression of gratitude, meaning "thank you"',
      etymology: 'From "dhanya" (blessed) + "vādālu" (words)',
      examples: [
        'మీ సహాయానికి ధన్యవాదాలు (Thank you for your help)',
        'ధన్యవదాలు, మీరు చాలా మంచివారు (Thank you, you are very kind)'
      ],
      synonyms: ['ధన్యోస్మి', 'కృతజ్ఞతలు'],
      antonyms: ['అపరాధం'],
      category: 'Expression',
      pronunciation: 'dhanyavādālu'
    },
    'స్వాగతం': {
      word: 'స్వాగతం',
      meaning: 'A word of welcome, meaning "welcome"',
      etymology: 'From Sanskrit "svāgata" meaning "well come"',
      examples: [
        'మా ఇంటికి స్వాగతం (Welcome to our home)',
        'స్వాగతం, దయచేసి లోపలికి రండి (Welcome, please come in)'
      ],
      synonyms: ['నమస్కారం', 'అభివాదనం'],
      antonyms: ['వీడ్కోలు'],
      category: 'Greeting',
      pronunciation: 'svāgatam'
    },
    'శుభోదయం': {
      word: 'శుభోదయం',
      meaning: 'A morning greeting, meaning "good morning"',
      etymology: 'From "śubha" (auspicious) + "udayam" (dawn)',
      examples: [
        'శుభోదయం, ఈ రోజు ఎలా ఉన్నారు? (Good morning, how are you today?)',
        'శుభోదయం, కాఫీ తాగాలా? (Good morning, shall we have coffee?)'
      ],
      synonyms: ['శుభ ప్రభాతం', 'సుప్రభాతం'],
      antonyms: ['శుభరాత్రి'],
      category: 'Greeting',
      pronunciation: 'śubhōdayam'
    }
  };

  const searchWordInDictionary = async (word: string) => {
    if (!word.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = mockDictionary[word.trim()];
    setSearchResult(result || null);
    setIsSearching(false);
  };

  const toggleFavorite = (word: string) => {
    setFavorites(prev => 
      prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  };

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'te-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const shareWord = async (entry: DictionaryEntry) => {
    const text = `${entry.word} - ${entry.meaning}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Telugu Word: ${entry.word}`,
          text: text
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(text);
        alert('Word copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <BookOpen className="mr-3 text-orange-600" size={28} />
        తెలుగు నిఘంటువు (Telugu Dictionary)
      </h2>

      <div className="space-y-6">
        {/* Search Section */}
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="తెలుగు పదం వెతకండి... (Search for a Telugu word...)"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && searchWordInDictionary(searchWord)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button
            onClick={() => searchWordInDictionary(searchWord)}
            disabled={!searchWord.trim() || isSearching}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? 'వెతుకుతోంది...' : 'వెతుకు'}
          </button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 mb-3">త్వరిత శోధన (Quick Search)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.keys(mockDictionary).map((word) => (
              <button
                key={word}
                onClick={() => {
                  setSearchWord(word);
                  searchWordInDictionary(word);
                }}
                className="px-3 py-2 bg-white border border-orange-200 rounded-lg text-sm hover:bg-orange-100 transition-colors"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">వెతుకుతోంది... (Searching...)</p>
          </div>
        )}

        {searchResult && (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{searchResult.word}</h3>
                <p className="text-gray-600 text-sm mb-1">Pronunciation: {searchResult.pronunciation}</p>
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  {searchResult.category}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => speakWord(searchResult.word)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Listen"
                >
                  <Volume2 size={20} />
                </button>
                <button
                  onClick={() => toggleFavorite(searchResult.word)}
                  className={`p-2 rounded-lg transition-colors ${
                    favorites.includes(searchResult.word)
                      ? 'text-red-500 hover:bg-red-50'
                      : 'text-gray-400 hover:bg-gray-200'
                  }`}
                  title="Add to Favorites"
                >
                  <Heart size={20} fill={favorites.includes(searchResult.word) ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => shareWord(searchResult)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">అర్థం (Meaning)</h4>
                <p className="text-gray-700 leading-relaxed">{searchResult.meaning}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">వ్యుత్పత్తి (Etymology)</h4>
                <p className="text-gray-700 leading-relaxed">{searchResult.etymology}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">ఉదాహరణలు (Examples)</h4>
                <ul className="space-y-2">
                  {searchResult.examples.map((example, index) => (
                    <li key={index} className="text-gray-700 bg-white p-3 rounded-lg border-l-4 border-orange-500">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">పర్యాయపదాలు (Synonyms)</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.synonyms.map((synonym, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {synonym}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">వ్యతిరేక పదాలు (Antonyms)</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.antonyms.map((antonym, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                        {antonym}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-3">ఇష్టమైన పదాలు (Favorite Words)</h4>
            <div className="flex flex-wrap gap-2">
              {favorites.map((word) => (
                <button
                  key={word}
                  onClick={() => {
                    setSearchWord(word);
                    searchWordInDictionary(word);
                  }}
                  className="px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm hover:bg-blue-100 transition-colors flex items-center space-x-2"
                >
                  <span>{word}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(word);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 