import React, { useState } from 'react';
import { SYLLABUS_DATA, Chapter } from './SyllabusData';
import { AppView } from '../types';

interface SyllabusExplorerProps {
  setView: (view: AppView) => void;
  setQuizTopic: (topic: string) => void;
  setTutorQuery: (query: string) => void;
}

const SyllabusExplorer: React.FC<SyllabusExplorerProps> = ({ setView, setQuizTopic, setTutorQuery }) => {
  const [activeGrade, setActiveGrade] = useState<11 | 12>(11);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const chapters = SYLLABUS_DATA.filter(c => c.grade === activeGrade);

  const handleQuizStart = (topic: string) => {
    setQuizTopic(topic);
    setView(AppView.QUIZ);
  };

  const handleTutorAsk = (topic: string) => {
    setTutorQuery(`Explain ${topic} to me simply, as found in the FSc Physics syllabus.`);
    setView(AppView.TUTOR);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Physics Syllabus Explorer</h2>
        <p className="text-slate-600 mt-2">Navigate through the complete FSc Part I & II curriculum.</p>
      </div>

      {/* Grade Toggles */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveGrade(11)}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
            activeGrade === 11 
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Part I (Grade 11)
        </button>
        <button
          onClick={() => setActiveGrade(12)}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
            activeGrade === 12 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Part II (Grade 12)
        </button>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter) => (
          <div 
            key={chapter.id} 
            className={`bg-white rounded-xl border transition-all overflow-hidden ${
              expandedChapter === chapter.id ? 'border-teal-500 shadow-md ring-1 ring-teal-500' : 'border-slate-200 hover:border-teal-300'
            }`}
          >
            <button 
              onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                  activeGrade === 11 ? 'bg-teal-50 text-teal-700' : 'bg-indigo-50 text-indigo-700'
                }`}>
                  {chapter.id}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{chapter.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-1 md:line-clamp-none">{chapter.description}</p>
                </div>
              </div>
              <div className="ml-4">
                 <svg 
                  className={`w-6 h-6 text-slate-400 transition-transform ${expandedChapter === chapter.id ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {expandedChapter === chapter.id && (
              <div className="p-5 pt-0 bg-slate-50/50 border-t border-slate-100">
                <div className="mt-4 grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Topics</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {chapter.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                          <span className="text-teal-500 mt-1">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col gap-3 justify-start">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Actions</h4>
                    
                    {chapter.labId && (
                      <button 
                        onClick={() => setView(chapter.labId!)}
                        className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        {chapter.labLabel || "Open Simulation"}
                      </button>
                    )}

                    <button 
                      onClick={() => handleQuizStart(chapter.title)}
                      className="w-full py-2 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      Take Quiz
                    </button>
                    
                    <button 
                      onClick={() => handleTutorAsk(chapter.title)}
                      className="w-full py-2 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                      Ask AI Tutor
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyllabusExplorer;