import React, { useState } from 'react';
import { PHASES, STAKEHOLDERS, RISKS, BUDGET } from '../utils/data';
import { Calendar, Users, AlertTriangle, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

export const ProjectDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'stakeholders' | 'risks' | 'budget'>('timeline');
  const [expandedPhase, setExpandedPhase] = useState<string | null>('execution');

  const togglePhase = (id: string) => {
    setExpandedPhase(expandedPhase === id ? null : id);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200">
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'timeline' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar size={16} />
          الجدول الزمني
        </button>
        <button
          onClick={() => setActiveTab('stakeholders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'stakeholders' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users size={16} />
          أصحاب المصلحة
        </button>
        <button
          onClick={() => setActiveTab('risks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'risks' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle size={16} />
          المخاطر
        </button>
        <button
          onClick={() => setActiveTab('budget')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'budget' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <DollarSign size={16} />
          الميزانية
        </button>
      </div>

      <div className="p-6 min-h-[400px]">
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 mb-4">مراحل المشروع</h3>
            {PHASES.map((phase) => (
              <div key={phase.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-blue-800">{phase.title}</span>
                    <span className="text-xs text-slate-500">{phase.description}</span>
                  </div>
                  {expandedPhase === phase.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedPhase === phase.id && (
                  <div className="p-4 bg-white border-t">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-right">
                        <thead>
                          <tr className="text-slate-500 border-b">
                            <th className="pb-2">المهمة</th>
                            <th className="pb-2">تاريخ البدء</th>
                            <th className="pb-2">المدة (أيام)</th>
                            <th className="pb-2">المسؤول</th>
                          </tr>
                        </thead>
                        <tbody>
                          {phase.tasks.map((task, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 font-medium text-slate-800">{task.name}</td>
                              <td className="py-3 text-slate-600">{task.startDate}</td>
                              <td className="py-3 text-slate-600">{task.duration}</td>
                              <td className="py-3 text-blue-600 bg-blue-50 px-2 rounded inline-block mt-1">{task.owner}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stakeholders' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STAKEHOLDERS.map((s, idx) => (
              <div key={idx} className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Users size={16} />
                  </div>
                  <h4 className="font-bold text-slate-800">{s.role}</h4>
                </div>
                <p className="text-slate-600 text-sm">{s.responsibility}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-4">
            {RISKS.map((r, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-bold text-red-800 mb-1 flex items-center gap-2">
                    <AlertTriangle size={16} />
                    {r.risk}
                  </h4>
                  <p className="text-sm text-red-600">الأثر: {r.impact}</p>
                </div>
                <div className="flex-1 border-t md:border-t-0 md:border-r border-red-200 pt-4 md:pt-0 md:pr-4 mt-4 md:mt-0">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">إجراءات الوقاية</span>
                  <p className="text-sm text-slate-700">{r.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'budget' && (
          <div>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm text-right bg-white">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 font-semibold text-slate-600">البند</th>
                    <th className="p-4 font-semibold text-slate-600">المصدر</th>
                    <th className="p-4 font-semibold text-slate-600">التكلفة (ر.ع)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BUDGET.map((b, idx) => (
                    <tr key={idx}>
                      <td className="p-4 text-slate-800">{b.item}</td>
                      <td className="p-4 text-slate-600">{b.source}</td>
                      <td className="p-4 text-slate-800 font-mono font-bold">{b.cost}</td>
                    </tr>
                  ))}
                  <tr className="bg-yellow-50">
                    <td className="p-4 font-bold text-slate-800">الإجمالي التقديري</td>
                    <td></td>
                    <td className="p-4 font-bold text-slate-800 font-mono">30 ر.ع</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};