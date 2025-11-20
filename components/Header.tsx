import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.HOME, label: 'Home' },
    { id: AppView.SYLLABUS, label: 'Syllabus' },
    { id: AppView.VECTOR_LAB, label: 'Vectors' },
    { id: AppView.PROJECTILE_LAB, label: 'Projectile' },
    { id: AppView.FRICTION_LAB, label: 'Friction' },
    { id: AppView.CIRCULAR_LAB, label: 'Circular' },
    { id: AppView.SHM_LAB, label: 'SHM' },
    { id: AppView.OPTICS_LAB, label: 'Optics' },
    { id: AppView.QUIZ, label: 'Quiz' },
    { id: AppView.TUTOR, label: 'AI Tutor' },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setView(AppView.HOME)}
        >
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-lg">P</div>
          <h1 className="text-xl font-bold tracking-tight">Physic<span className="text-teal-400">PK</span></h1>
        </div>

        <nav className="hidden xl:flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === item.id 
                  ? 'bg-slate-800 text-teal-400' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        {/* Mobile Menu Button Placeholder */}
        <button className="xl:hidden p-2 text-slate-300">
          <span className="sr-only">Menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>
      
      {/* Mobile/Tablet Nav (Scrollable strip) */}
      <div className="xl:hidden flex overflow-x-auto bg-slate-950 p-2 gap-2 no-scrollbar">
         {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                currentView === item.id 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
      </div>
    </header>
  );
};

export default Header;