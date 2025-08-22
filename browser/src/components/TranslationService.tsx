'use client';

import { useState } from 'react';
import { Languages, Volume2, Copy, Check } from 'lucide-react';

interface TranslationResult {
  original: string;
  translated: string;
  language: string;
}

export default function TranslationService() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock translation function - in a real app, this would call a translation API
  const translateText = async (text: string, targetLang: 'en' | 'te') => {
    setIsTranslating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock translations for demonstration
    const mockTranslations: Record<string, Record<string, string>> = {
      'hello': { te: 'నమస్కారం', en: 'Hello' },
      'how are you': { te: 'మీరు ఎలా ఉన్నారు?', en: 'How are you?' },
      'thank you': { te: 'ధన్యవాదాలు', en: 'Thank you' },
      'good morning': { te: 'శుభోదయం', en: 'Good morning' },
      'good night': { te: 'శుభరాత్రి', en: 'Good night' },
      'welcome': { te: 'స్వాగతం', en: 'Welcome' },
      'please': { te: 'దయచేసి', en: 'Please' },
      'sorry': { te: 'క్షమించండి', en: 'Sorry' },
      'yes': { te: 'అవును', en: 'Yes' },
      'no': { te: 'లేదు', en: 'No' }
    };

    const lowerText = text.toLowerCase();
    let translatedText = text;

    if (mockTranslations[lowerText]) {
      translatedText = mockTranslations[lowerText][targetLang];
    } else {
      // For unknown words, provide a mock translation
      translatedText = targetLang === 'te' 
        ? `[తెలుగు అనువాదం: ${text}]` 
        : `[English translation: ${text}]`;
    }

    setTranslation({
      original: text,
      translated: translatedText,
      language: targetLang === 'te' ? 'Telugu' : 'English'
    });
    
    setIsTranslating(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'te' ? 'te-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Languages className="mr-3 text-orange-600" size={28} />
        అనువాద సేవ (Translation Service)
      </h2>

      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            టెక్స్ట్ నమోదు చేయండి (Enter Text)
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="ఇక్కడ టెక్స్ట్ టైప్ చేయండి... (Type text here...)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        {/* Translation Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => translateText(inputText, 'te')}
            disabled={!inputText.trim() || isTranslating}
            className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <Languages size={20} />
            <span>ఆంగ్లం → తెలుగు (English → Telugu)</span>
          </button>
          
          <button
            onClick={() => translateText(inputText, 'en')}
            disabled={!inputText.trim() || isTranslating}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <Languages size={20} />
            <span>తెలుగు → ఆంగ్లం (Telugu → English)</span>
          </button>
        </div>

        {/* Translation Result */}
        {isTranslating && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">అనువాదం జరుగుతోంది... (Translating...)</p>
          </div>
        )}

        {translation && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">అనువాద ఫలితం (Translation Result)</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  అసలు టెక్స్ట్ (Original Text)
                </label>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <span className="text-gray-800">{translation.original}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => speakText(translation.original, translation.language === 'Telugu' ? 'en' : 'te')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Listen"
                    >
                      <Volume2 size={16} />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translation.original)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy"
                    >
                      {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  {translation.language} అనువాదం ({translation.language} Translation)
                </label>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <span className="text-gray-800">{translation.translated}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => speakText(translation.translated, translation.language === 'Telugu' ? 'te' : 'en')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Listen"
                    >
                      <Volume2 size={16} />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translation.translated)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy"
                    >
                      {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Translation Examples */}
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 mb-3">త్వరిత అనువాద ఉదాహరణలు (Quick Translation Examples)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['hello', 'thank you', 'good morning', 'welcome'].map((word) => (
              <button
                key={word}
                onClick={() => setInputText(word)}
                className="px-3 py-2 bg-white border border-orange-200 rounded-lg text-sm hover:bg-orange-100 transition-colors"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 