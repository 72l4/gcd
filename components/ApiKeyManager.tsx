import React, { useState, useEffect } from 'react';
import { Key, CheckCircle, ExternalLink } from 'lucide-react';

interface ApiKeyManagerProps {
  onKeySelected: () => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onKeySelected }) => {
  const [hasKey, setHasKey] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
      if (selected) {
        onKeySelected();
      }
    }
    setLoading(false);
  };

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      try {
        await window.aistudio.openSelectKey();
        // Assume success or re-check
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
        if(selected) onKeySelected();
      } catch (error) {
        console.error("Error selecting key:", error);
      }
    } else {
        alert("Google AI Studio environment not detected.");
    }
  };

  if (loading) return null;

  if (hasKey) {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm border border-green-200">
        <CheckCircle size={14} />
        <span>تم ربط مفتاح API</span>
      </div>
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
      <a 
        href="https://ai.google.dev/gemini-api/docs/billing" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs text-blue-500 flex items-center gap-1 hover:underline"
      >
        معلومات عن الفوترة <ExternalLink size={10}/>
      </a>
    </div>
  );
};