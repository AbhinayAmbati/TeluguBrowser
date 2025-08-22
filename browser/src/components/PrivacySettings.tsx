'use client';

import { useState } from 'react';

interface PrivacySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'privacy' | 'security' | 'ad-blocking';
}

export default function PrivacySettings() {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: 'ad-blocking',
      name: 'విజ్ఞాపన నిరోధకం (Ad Blocker)',
      description: 'వెబ్‌సైట్‌లలో విజ్ఞాపనాలను నిరోధించండి',
      enabled: true,
      category: 'ad-blocking'
    },
    {
      id: 'tracker-blocking',
      name: 'ట్రాకర్ నిరోధకం (Tracker Blocker)',
      description: 'అనుసరణ కుకీలు మరియు ట్రాకర్లను నిరోధించండి',
      enabled: true,
      category: 'privacy'
    },
    {
      id: 'fingerprint-protection',
      name: 'ఫింగర్‌ప్రింట్ రక్షణ (Fingerprint Protection)',
      description: 'బ్రౌజర్ ఫింగర్‌ప్రింటింగ్ నుండి రక్షించండి',
      enabled: true,
      category: 'privacy'
    },
    {
      id: 'https-everywhere',
      name: 'HTTPS ప్రతిచోటా (HTTPS Everywhere)',
      description: 'సురక్షిత కనెక్షన్లను ఎప్పుడూ ఉపయోగించండి',
      enabled: true,
      category: 'security'
    },
    {
      id: 'social-media-blocking',
      name: 'సామాజిక మాధ్యమ నిరోధకం (Social Media Blocker)',
      description: 'సామాజిక మాధ్యమ ట్రాకర్లను నిరోధించండి',
      enabled: false,
      category: 'privacy'
    },
    {
      id: 'cryptomining-protection',
      name: 'క్రిప్టోమైనింగ్ రక్షణ (Cryptomining Protection)',
      description: 'క్రిప్టోకరెన్సీ మైనింగ్ స్క్రిప్ట్లను నిరోధించండి',
      enabled: true,
      category: 'security'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'whitelist'>('overview');

  const toggleSetting = (settingId: string) => {
    setSettings(settings.map(setting => 
      setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const getCategoryStats = (category: string) => {
    const categorySettings = settings.filter(s => s.category === category);
    const enabledCount = categorySettings.filter(s => s.enabled).length;
    return { total: categorySettings.length, enabled: enabledCount };
  };

  const getPrivacyScore = () => {
    const totalSettings = settings.length;
    const enabledSettings = settings.filter(s => s.enabled).length;
    return Math.round((enabledSettings / totalSettings) * 100);
  };

  const getBlockedItemsCount = () => {
    // Mock data for demonstration
    return {
      ads: 127,
      trackers: 89,
      cookies: 156,
      scripts: 23
    };
  };

  const blockedItems = getBlockedItemsCount();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ప్రైవసీ & భద్రత (Privacy & Security)</h2>

      {/* Privacy Score */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">{getPrivacyScore()}%</div>
          <div className="text-lg font-semibold text-gray-800 mb-2">ప్రైవసీ స్కోర్ (Privacy Score)</div>
          <div className="text-sm text-gray-600">
            {getPrivacyScore() >= 80 ? 'మీరు బాగా రక్షించబడ్డారు (You are well protected)' :
             getPrivacyScore() >= 60 ? 'మీరు మధ్యస్థంగా రక్షించబడ్డారు (You are moderately protected)' :
             'మీరు తక్కువగా రక్షించబడ్డారు (You need more protection)'}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6">
        {([
          { id: 'overview' as const, name: 'అవలోకనం (Overview)', icon: '📊' },
          { id: 'detailed' as const, name: 'వివరాలు (Detailed)', icon: '⚙️' },
          { id: 'whitelist' as const, name: 'వైట్‌లిస్ట్ (Whitelist)', icon: '✅' }
        ] as const).map((tab) => (
          <button
            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              activeTab === tab.id 
                ? 'bg-orange-100 text-orange-700' 
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Category Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['privacy', 'security', 'ad-blocking'] as const).map((category) => {
              const stats = getCategoryStats(category);
              const categoryName = {
                privacy: 'ప్రైవసీ (Privacy)',
                security: 'భద్రత (Security)',
                'ad-blocking': 'విజ్ఞాపన నిరోధకం (Ad Blocking)'
              }[category];
              
              return (
                <div key={category} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{categoryName}</h3>
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {stats.enabled}/{stats.total}
                  </div>
                  <div className="text-sm text-gray-600">సెట్టింగ్‌లు (Settings)</div>
                </div>
              );
            })}
          </div>

          {/* Blocked Items */}
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-3">నిరోధించబడిన వస్తువులు (Blocked Items)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">{blockedItems.ads}</div>
                <div className="text-sm text-red-700">విజ్ఞాపనాలు (Ads)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{blockedItems.trackers}</div>
                <div className="text-sm text-red-700">ట్రాకర్లు (Trackers)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{blockedItems.cookies}</div>
                <div className="text-sm text-red-700">కుకీలు (Cookies)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{blockedItems.scripts}</div>
                <div className="text-sm text-red-700">స్క్రిప్ట్లు (Scripts)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Tab */}
      {activeTab === 'detailed' && (
        <div className="space-y-4">
          {(['privacy', 'security', 'ad-blocking'] as const).map((category) => {
            const categorySettings = settings.filter(s => s.category === category);
            const categoryName = {
              privacy: 'ప్రైవసీ (Privacy)',
              security: 'భద్రత (Security)',
              'ad-blocking': 'విజ్ఞాపన నిరోధకం (Ad Blocking)'
            }[category];

            return (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">{categoryName}</h3>
                <div className="space-y-3">
                  {categorySettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{setting.name}</div>
                        <div className="text-sm text-gray-600">{setting.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={setting.enabled}
                          onChange={() => toggleSetting(setting.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Whitelist Tab */}
      {activeTab === 'whitelist' && (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-3">వైట్‌లిస్ట్ సెట్టింగ్‌లు (Whitelist Settings)</h3>
            <p className="text-blue-700 text-sm mb-4">
              ఈ వెబ్‌సైట్‌లు మీ ప్రైవసీ సెట్టింగ్‌ల నుండి మినహాయించబడతాయి
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <div className="font-medium text-gray-800">Google.com</div>
                  <div className="text-sm text-gray-600">Search engine - essential functionality</div>
                </div>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200">
                  తొలగించు (Remove)
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <div className="font-medium text-gray-800">YouTube.com</div>
                  <div className="text-sm text-gray-600">Video platform - content delivery</div>
                </div>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200">
                  తొలగించు (Remove)
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                + వెబ్‌సైట్ జోడించండి (Add Website)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">త్వరిత చర్యలు (Quick Actions)</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            అన్నీ ఎనేబుల్ చేయండి (Enable All)
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            అన్నీ డిసేబుల్ చేయండి (Disable All)
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            డేటా క్లియర్ చేయండి (Clear Data)
          </button>
        </div>
      </div>
    </div>
  );
} 