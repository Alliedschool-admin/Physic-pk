import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import SyllabusExplorer from './components/SyllabusExplorer';
import VectorLab from './components/VectorLab';
import ProjectileLab from './components/ProjectileLab';
import FrictionLab from './components/FrictionLab';
import CircularMotionLab from './components/CircularMotionLab';
import ShmLab from './components/ShmLab';
import OpticsLab from './components/OpticsLab';
import AiTutor from './components/AiTutor';
import QuizMode from './components/QuizMode';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.HOME);
  const [quizTopic, setQuizTopic] = useState<string | undefined>(undefined);
  const [tutorQuery, setTutorQuery] = useState<string | undefined>(undefined);

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Home setView={setView} />;
      case AppView.SYLLABUS:
        return <SyllabusExplorer setView={setView} setQuizTopic={setQuizTopic} setTutorQuery={setTutorQuery} />;
      case AppView.VECTOR_LAB:
        return <VectorLab />;
      case AppView.PROJECTILE_LAB:
        return <ProjectileLab />;
      case AppView.FRICTION_LAB:
        return <FrictionLab />;
      case AppView.CIRCULAR_LAB:
        return <CircularMotionLab />;
      case AppView.SHM_LAB:
        return <ShmLab />;
      case AppView.OPTICS_LAB:
        return <OpticsLab />;
      case AppView.TUTOR:
        return <AiTutor initialQuery={tutorQuery} />;
      case AppView.QUIZ:
        return <QuizMode initialTopic={quizTopic} />;
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header currentView={currentView} setView={setView} />
      <main className="flex-1 w-full">
        {renderContent()}
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 PhysicPK. Built for FSc Students.</p>
          <p className="mt-1 text-xs">Powered by Google Gemini</p>
        </div>
      </footer>
    </div>
  );
};

export default App;