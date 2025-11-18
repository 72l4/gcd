
import React, { useState, useEffect } from 'react';
import { Key, CheckCircle, ExternalLink, Settings } from 'lucide-react';

interface ApiKeyManagerProps {
  onKeyProvided: (key: string) => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeyProvided }) => {
  const [hasKey, setHasKey] = useState(false);
  const [loading, setLoading] = useState(true);
  const [manualMode, setManualMode] = useState(false);
  const [manualKey, setManualKey] = useState('');

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    // Check if we are in AI Studio environment
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      const selected = await window.aistudio.hasSelectedApiKey();
      if (selected) {
        // In AI Studio, the key is injected into process.env automatically
        if (process.env.API_KEY) {
            onKeyProvided(process.env.API_KEY);
            setHasKey(true);
        }
      }
    } else {
      // Not in AI Studio (e.g. GitHub Pages), check local storage or wait for manual input
      const storedKey = localStorage.getItem('gemini_api_key');
      if (storedKey) {
        onKeyProvided(storedKey);
        setHasKey(true);
      } else {
        // Enable manual mode by default if environment is missing
        setManualMode(true);
      }
    }
    setLoading(false);
  };

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      try {
        await window.aistudio.openSelectKey();
        const selected = await window.aistudio.hasSelectedApiKey();
        if(selected && process.env.API_KEY) {
             onKeyProvided(process.env.API_KEY);
             setHasKey(true);
        }
      } catch (error) {
        console.error("Error selecting key:", error);
      }
    } else {
        setManualMode(true);
    }
  };

  const saveManualKey = () => {
    if (manualKey.trim()) {
        localStorage.setItem('gemini_api_key', manualKey.trim());
        onKeyProvided(manualKey.trim());
        setHasKey(true);
        setManualMode(false);
    }
  };

  if (loading) return null;

  if (manualMode && !hasKey) {
      return (
        <div className="flex items-center gap-2">
            <input 
                type="password" 
                placeholder="أدخل مفتاح API..." 
                className="border border-slate-300 rounded px-2 py-1 text-sm w-32 sm:w-48"
                value={manualKey}
                onChange={(e) => setManualKey(e.target.value)}
            />
            <button 
                onClick={saveManualKey}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
                حفظ
            </button>
             <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
                title="الحصول على مفتاح"
              >
                <ExternalLink size={14} />
              </a>
        </div>
      )
  }

  if (hasKey) {
    return (
      <button 
        onClick={() => setManualMode(true)}
        title="تغيير المفتاح"
        className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm border border-green-200 hover:bg-green-100 transition-colors"
      >
        <CheckCircle size={14} />
        <span>تم الربط</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
      <p className="text-sm text-blue-800 text-center">
        لاستخدام ميزة توليد الفيديو، يرجى اختيار مفتاح API الخاص بك.
      </p>
      <button
        onClick={handleSelectKey}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm text-sm font-medium"
      >
        <Key size={16} />
        اختيار مفتاح API
      </button>
    </div>
  );
};