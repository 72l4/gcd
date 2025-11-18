
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Video, Download, RefreshCw, Play, Clock, AlertCircle, Sparkles, Wand2 } from 'lucide-react';
import { VIDEO_PROMPT_TEMPLATE, PROJECT_TITLE, PROJECT_DESCRIPTION, PHASES } from '../utils/data';

interface VideoGeneratorProps {
    apiKey: string;
}

export const VideoGenerator: React.FC<VideoGeneratorProps> = ({ apiKey }) => {
  const [prompt, setPrompt] = useState(VIDEO_PROMPT_TEMPLATE.trim());
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [generating, setGenerating] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const generateSmartPrompt = async () => {
    setOptimizing(true);
    setError(null);
    try {
      if (!apiKey) {
        throw new Error("يرجى إدخال مفتاح API أولاً.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const projectContext = `
      Project Title: ${PROJECT_TITLE}
      Description: ${PROJECT_DESCRIPTION}
      Phases: ${PHASES.map(p => p.title).join(', ')}
      Activities: ${PHASES.flatMap(p => p.tasks.map(t => t.name)).slice(0, 5).join(', ')}...
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a professional video director. Create a detailed prompt for an AI video generation model (Veo) based on this project data:
        ${projectContext}
        
        The video prompt should describe a cinematic scene in an Omani school setting (Omani white dishdasha for boys, traditional school uniform for girls).
        Scenario: Show the consequence of unhealthy food vs healthy food.
        Visuals: A student feeling sick/dizzy holding junk food vs happy students eating fruits/dates. Hospital setting background faded in to show risk.
        Style: 4k, Photorealistic, highly detailed, slow cinematic motion, Omani architecture.
        Output ONLY the English prompt text, around 80 words. Do not include markdown.`
      });

      if (response.text) {
        setPrompt(response.text.trim());
      }
    } catch (err: any) {
      console.error(err);
      setError("فشل في توليد الوصف الذكي: " + (err.message || "خطأ غير معروف"));
    } finally {
      setOptimizing(false);
    }
  };

  const generateVideo = async () => {
    setGenerating(true);
    setVideoUrl(null);
    setError(null);
    setStatusMessage('جاري تهيئة نموذج Veo...');

    try {
      if (!apiKey) {
        throw new Error("API Key missing.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      setStatusMessage('جاري إرسال طلب إنشاء الفيديو... (قد يستغرق بضع دقائق)');

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: aspectRatio
        }
      });

      setStatusMessage('جاري المعالجة... يرجى الانتظار.');
      
      // Polling loop
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5 seconds
        operation = await ai.operations.getVideosOperation({ operation });
        setStatusMessage('جاري إنشاء المشاهد... ' + (operation.metadata?.completedPercent || '0') + '%');
      }

      if (operation.error) {
        throw new Error(`${(operation.error as any).message}`);
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        // Append API key to fetch the actual video bytes
        const authenticatedUrl = `${downloadLink}&key=${apiKey}`;
        setVideoUrl(authenticatedUrl);
      } else {
        throw new Error("لم يتم استلام رابط الفيديو من الخادم.");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "حدث خطأ أثناء إنشاء الفيديو");
    } finally {
      setGenerating(false);
      setStatusMessage('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
      <div className="bg-indigo-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Video size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">منشئ الفيديو الذكي (Veo)</h2>
            <p className="text-indigo-100 text-sm opacity-90">قم بإنشاء فيديو احترافي يوثق فعاليات المشروع بناءً على البيانات المدخلة</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-medium text-slate-700">وصف الفيديو (Prompt)</label>
              <button 
                onClick={generateSmartPrompt}
                disabled={optimizing || generating}
                className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-1 rounded transition-colors"
              >
                {optimizing ? <RefreshCw className="animate-spin" size={12}/> : <Sparkles size={12} />}
                توليد وصف من بيانات الملف
              </button>
            </div>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 text-left"
                dir="ltr"
                placeholder="Enter a description for the video..."
              />
              {optimizing && (
                 <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2 text-indigo-600">
                      <Wand2 className="animate-pulse" size={24} />
                      <span className="text-sm font-bold">جاري استخراج البيانات وتوليد الوصف...</span>
                    </div>
                 </div>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              يمكنك تعديل الوصف يدوياً أو استخدام الزر أعلاه لاستخراجه من محتوى المشروع.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">أبعاد الفيديو</label>
            <div className="flex gap-4">
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
                  aspectRatio === '16:9' 
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500' 
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                عرضي (16:9) - مناسب لليوتيوب والعروض
              </button>
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
                  aspectRatio === '9:16' 
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500' 
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                طولي (9:16) - مناسب للهواتف والتيك توك
              </button>
            </div>
          </div>

          <button
            onClick={generateVideo}
            disabled={generating || optimizing}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold text-white transition-all ${
              generating || optimizing
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
            }`}
          >
            {generating ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                جاري المعالجة...
              </>
            ) : (
              <>
                <Play size={20} fill="currentColor" />
                إنشاء الفيديو
              </>
            )}
          </button>
        </div>

        {/* Status & Error */}
        {statusMessage && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-700 rounded-lg animate-pulse border border-blue-100">
            <Clock size={20} />
            <span className="text-sm font-medium">{statusMessage}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Result Section */}
        {videoUrl && (
          <div className="mt-8 border-t pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Video className="text-indigo-600" />
              الفيديو الذي تم إنشاؤه
            </h3>
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg relative group border border-slate-200">
              <video 
                src={videoUrl} 
                controls 
                className="w-full h-full object-contain"
                autoPlay
                loop
              />
            </div>
            <div className="mt-4 flex justify-end">
              <a
                href={videoUrl}
                download="project-video-veo.mp4"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
              >
                <Download size={16} />
                تحميل الفيديو
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};