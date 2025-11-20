import React from 'react';
import { AppView } from '../types';

interface HomeProps {
  setView: (view: AppView) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  const features = [
    {
      id: AppView.SYLLABUS,
      title: 'Complete Syllabus',
      desc: 'Browse Part I & II topics, check content, and launch specific tools.',
      icon: (
        <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
      ),
      bg: 'bg-slate-200'
    },
    {
      id: AppView.VECTOR_LAB,
      title: 'Vector Analysis',
      desc: 'Head-to-Tail rule visualizer. Understand resultant vectors and components.',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      ),
      bg: 'bg-blue-100'
    },
    {
      id: AppView.PROJECTILE_LAB,
      title: 'Projectile Motion',
      desc: 'Launch projectiles. Visualize trajectory, max height, and range.',
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
      ),
      bg: 'bg-orange-100'
    },
    {
      id: AppView.FRICTION_LAB,
      title: 'Forces & Friction',
      desc: 'Compare static vs kinetic friction on different surfaces.',
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
      ),
      bg: 'bg-red-100'
    },
    {
      id: AppView.CIRCULAR_LAB,
      title: 'Circular Motion',
      desc: 'Explore centripetal force, velocity and radius relationships.',
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
      ),
      bg: 'bg-emerald-100'
    },
    {
      id: AppView.SHM_LAB,
      title: 'Simple Harmonic Motion',
      desc: 'Mass-spring systems, oscillations, and phase relationships.',
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      ),
      bg: 'bg-indigo-100'
    },
    {
      id: AppView.OPTICS_LAB,
      title: 'Ray Optics',
      desc: 'Lens simulations, image formation, and focal length concepts.',
      icon: (
        <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      ),
      bg: 'bg-cyan-100'
    },
    {
      id: AppView.TUTOR,
      title: 'AI Physics Tutor',
      desc: 'Ask our Gemini-powered AI tutor for simple, localized explanations.',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
      ),
      bg: 'bg-purple-100'
    },
    {
      id: AppView.QUIZ,
      title: 'Quiz Zone',
      desc: 'Challenge yourself with AI-generated MCQs.',
      icon: (
        <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
      ),
      bg: 'bg-pink-100'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Master Physics with <span className="text-teal-600">Interactive Tools</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Designed for Pakistani FSc students. Visual simulations, AI tutoring, and quizzes to boost your conceptual understanding.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 pb-12">
        {features.map((f) => (
          <div 
            key={f.id}
            onClick={() => setView(f.id)}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className={`w-14 h-14 ${f.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{f.title}</h3>
            <p className="text-slate-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;