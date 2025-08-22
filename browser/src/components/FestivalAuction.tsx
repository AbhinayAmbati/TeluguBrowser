'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuctionItem {
  id: string;
  name: string;
  teluguName: string;
  description: string;
  startingBid: number;
  currentBid: number;
  highestBidder: string;
  icon: string;
  timeLeft: number;
  category: 'theme' | 'feature' | 'bonus' | 'exclusive';
}

export default function FestivalAuction() {
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([
    {
      id: 'ugadi-theme',
      name: 'Ugadi Festival Theme',
      teluguName: 'ఉగాది పండుగ థీమ్',
      description: 'Beautiful Telugu New Year theme with traditional colors',
      startingBid: 50,
      currentBid: 75,
      highestBidder: 'TeluguFan123',
      icon: '🎊',
      timeLeft: 300, // 5 minutes
      category: 'theme'
    },
    {
      id: 'premium-storage',
      name: 'Premium Cloud Storage',
      teluguName: 'ప్రీమియం క్లౌడ్ స్టోరేజ్',
      description: 'Extra 10GB cloud storage for 1 month',
      startingBid: 30,
      currentBid: 45,
      highestBidder: 'TechGuru',
      icon: '☁️',
      timeLeft: 180, // 3 minutes
      category: 'feature'
    },
    {
      id: 'ad-free-week',
      name: 'Ad-Free Week',
      teluguName: 'విజ్ఞాపనలు లేని వారం',
      description: 'Complete ad-free browsing experience for 7 days',
      startingBid: 20,
      currentBid: 35,
      highestBidder: 'PrivacyLover',
      icon: '🚫',
      timeLeft: 120, // 2 minutes
      category: 'bonus'
    },
    {
      id: 'exclusive-wallpaper',
      name: 'Exclusive Telugu Wallpaper',
      teluguName: 'ప్రత్యేక తెలుగు వాల్‌పేపర్',
      description: 'Limited edition Telugu cultural wallpaper pack',
      startingBid: 15,
      currentBid: 25,
      highestBidder: 'ArtCollector',
      icon: '🖼️',
      timeLeft: 60, // 1 minute
      category: 'exclusive'
    }
  ]);

  const [userBid, setUserBid] = useState('');
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [userCoins, setUserCoins] = useState(200);
  const [showBidModal, setShowBidModal] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAuctionItems(prev => prev.map(item => ({
        ...item,
        timeLeft: Math.max(0, item.timeLeft - 1)
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const placeBid = (itemId: string, bidAmount: number) => {
    const currentItem = auctionItems.find(item => item.id === itemId);
    if (bidAmount <= userCoins && currentItem && bidAmount > currentItem.currentBid) {
      setAuctionItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, currentBid: bidAmount, highestBidder: 'You' }
          : item
      ));
      setUserCoins(prev => prev - bidAmount);
      setShowBidModal(false);
      setUserBid('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'theme': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'feature': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'bonus': return 'bg-green-100 text-green-700 border-green-300';
      case 'exclusive': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'theme': return '🎨';
      case 'feature': return '⚡';
      case 'bonus': return '🎁';
      case 'exclusive': return '👑';
      default: return '📦';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-8">
        <div className="mb-4">
          <img 
            src="/logo.png" 
            alt="Festival Auction Logo" 
            className="w-32 h-32 mx-auto object-contain"
          />
        </div>
        <h2 className="text-3xl font-bold text-orange-800 mb-2">ఉగాది పండుగ వేలం (Ugadi Festival Auction)</h2>
        <p className="text-orange-600">Bid your Thakatu Coins for exclusive festival features!</p>
        <div className="mt-4 text-2xl font-bold text-green-600">
          💰 Your Coins: {userCoins}
        </div>
      </div>

      {/* Festival Special Banner */}
      <motion.div 
        className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white rounded-xl p-6 mb-8 text-center"
        animate={{ 
          scale: [1, 1.02, 1],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-4xl mb-2">🎊</div>
        <h3 className="text-xl font-bold mb-2">పండుగ సందర్భంగా ప్రత్యేక ఆఫర్!</h3>
        <p className="text-sm opacity-90">Special Festival Offer! All items start with 20% discount!</p>
      </motion.div>

      {/* Auction Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auctionItems.map((item, index) => (
          <motion.div 
            key={item.id}
            className={`border-2 rounded-xl p-6 ${getCategoryColor(item.category)} ${
              item.timeLeft === 0 ? 'opacity-60' : ''
            }`}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{item.icon}</div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                {getCategoryIcon(item.category)} {item.category.toUpperCase()}
              </div>
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-2">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.teluguName}</p>
            <p className="text-gray-700 text-sm mb-4">{item.description}</p>

            {/* Bidding Info */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span>Starting Bid:</span>
                <span className="font-semibold">💰 {item.startingBid}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Current Bid:</span>
                <span className="font-bold text-green-600">💰 {item.currentBid}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Highest Bidder:</span>
                <span className="font-medium text-blue-600">{item.highestBidder}</span>
              </div>
            </div>

            {/* Time Left */}
            <div className="text-center mb-4">
              <div className={`text-lg font-bold ${
                item.timeLeft < 60 ? 'text-red-600' : 
                item.timeLeft < 120 ? 'text-orange-600' : 'text-green-600'
              }`}>
                ⏰ {formatTime(item.timeLeft)}
              </div>
              <div className="text-xs text-gray-500">
                {item.timeLeft === 0 ? 'Auction Ended' : 'Time Left'}
              </div>
            </div>

            {/* Bid Button */}
            {item.timeLeft > 0 ? (
              <motion.button
                onClick={() => {
                  setSelectedItem(item);
                  setShowBidModal(true);
                }}
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🎯 Place Bid
              </motion.button>
            ) : (
              <div className="text-center">
                <div className="text-red-600 font-bold">🏁 Auction Ended</div>
                <div className="text-sm text-gray-600">
                  Winner: {item.highestBidder}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bid Modal */}
      <AnimatePresence>
        {showBidModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              className="bg-white rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{selectedItem.icon}</div>
                <h3 className="text-xl font-bold text-gray-800">{selectedItem.name}</h3>
                <p className="text-sm text-gray-600">{selectedItem.teluguName}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    Current Bid: 💰 {selectedItem.currentBid}
                  </div>
                  <div className="text-sm text-gray-500">
                    Your Coins: 💰 {userCoins}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Bid Amount (must be higher than current bid)
                  </label>
                  <input
                    type="number"
                    value={userBid}
                    onChange={(e) => setUserBid(e.target.value)}
                    min={selectedItem.currentBid + 1}
                    max={userCoins}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={`Enter bid (min: ${selectedItem.currentBid + 1})`}
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  onClick={() => setShowBidModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => placeBid(selectedItem.id, parseInt(userBid))}
                  disabled={!userBid || parseInt(userBid) <= selectedItem.currentBid || parseInt(userBid) > userCoins}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Place Bid
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Festival Tips */}
      <motion.div 
        className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-orange-800 mb-4 text-center">🎭 పండుగ బేరమాట చిట్కాలు (Festival Bargaining Tips)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-700">
          <div>
            <div className="font-semibold mb-2">💡 Smart Bidding:</div>
            <ul className="space-y-1">
              <li>• Wait for the last minute to bid</li>
              <li>• Start with small increments</li>
              <li>• Watch other bidders&apos; patterns</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">🎊 Festival Bonuses:</div>
            <ul className="space-y-1">
              <li>• 20% starting discount on all items</li>
              <li>• Extra coins for daily login</li>
              <li>• Special Ugadi themes available</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 