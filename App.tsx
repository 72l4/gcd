
import React, { useState } from 'react';
import { ProjectDashboard } from './components/ProjectDashboard';
import { VideoGenerator } from './components/VideoGenerator';
import { ApiKeyManager } from './components/ApiKeyManager';
import { ReportButton } from './components/ReportButton';
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from './utils/data';
import { LayoutDashboard, FileVideo, HeartPulse } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'video'>('dashboard');
  const [apiKey, setApiKey] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-50 pb-12 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white p-2 rounded-lg shadow-sm">
              <HeartPulse size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-800 leading-none flex items-center gap-2">
                {PROJECT_TITLE}
                <span className="text-sm font-normal text-slate-500">( عمل الفريق الثاني )</span>
              </h1>
              <span className="text-xs text-slate-500">إدارة المشاريع المدرسية</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard size={18} />
                لوحة التحكم
              </button>
              <button
                onClick={() => setActiveView('video')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeView === 'video'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileVideo size={18} />
                إنشاء فيديو
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2">
             <ReportButton />
             <ApiKeyManager onKeyProvided={setApiKey} />
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="md:hidden bg-white border-b border-slate-200 p-2 sticky top-16 z-40">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            <LayoutDashboard size={18} />
            البيانات
          </button>
          <button
            onClick={() => setActiveView('video')}
            className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'video' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'
            }`}
          >
            <FileVideo size={18} />
            الفيديو
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {activeView === 'dashboard' ? 'تفاصيل المشروع' : 'ستوديو الفيديو'}
                </h2>
                <p className="text-slate-600 max-w-2xl">
                  {activeView === 'dashboard' 
                    ? PROJECT_DESCRIPTION 
                    : 'قم بإنشاء محتوى مرئي عالي الجودة لتوضيح فكرة المشروع باستخدام أحدث تقنيات Google Gemini Veo.'}
                </p>
             </div>
             {/* Mobile Report Button */}
             <div className="md:hidden self-start">
                <ReportButton />
             </div>
          </div>
        </div>

        {activeView === 'dashboard' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProjectDashboard />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {apiKey ? (
               <VideoGenerator apiKey={apiKey} />
            ) : (
              <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <FileVideo size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">مفتاح API مطلوب</h3>
                <p className="text-slate-600 mb-6">
                  يرجى اختيار مفتاح API الخاص بك أو إدخاله من الشريط العلوي للوصول إلى ميزات توليد الفيديو.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600 font-medium">
            إعداد: لؤي بن سعيد الهنائي / محمد بن سعيد الشكيلي / الخليل بن سيف الهنائي
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;