import React, { useState, useEffect } from 'react';
import { generateQuiz } from '../services/geminiService';
import { QuizQuestion } from '../types';

const defaultTopics = [
  "Measurements",
  "Vectors and Equilibrium",
  "Motion and Force",
  "Work and Energy",
  "Circular Motion",
  "Fluid Dynamics"
];

interface QuizModeProps {
  initialTopic?: string;
}

const QuizMode: React.FC<QuizModeProps> = ({ initialTopic }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic || defaultTopics[1]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // If initialTopic changes, reset selection (mostly for when coming from Syllabus view)
  useEffect(() => {
    if (initialTopic) setSelectedTopic(initialTopic);
  }, [initialTopic]);

  const startQuiz = async () => {
    setLoading(true);
    setShowResults(false);
    setScore(0);
    setCurrentQIndex(0);
    setQuestions([]);
    
    const generated = await generateQuiz(selectedTopic);
    setQuestions(generated);
    setLoading(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswerChecked(true);
    if (selectedOption === questions[currentQIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-medium text-slate-600">Generating Conceptual Questions...</h3>
        <p className="text-sm text-slate-400">Consulting Gemini AI Physics Database</p>
      </div>
    );
  }

  if (questions.length === 0 && !showResults) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-slate-200 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Physics Quiz Zone</h2>
        <p className="text-slate-600 mb-6">Test your knowledge with AI-generated MCQs tailored for the Pakistani Syllabus.</p>
        
        {!initialTopic && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {defaultTopics.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  selectedTopic === t 
                    ? 'bg-teal-100 text-teal-800 border-2 border-teal-500' 
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {initialTopic && (
            <div className="mb-6 p-4 bg-teal-50 border border-teal-100 rounded-lg">
                <p className="text-teal-800 font-medium">Topic Selected: {initialTopic}</p>
            </div>
        )}

        <button 
          onClick={startQuiz}
          className="w-full py-3 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 shadow-lg shadow-teal-500/20 transition-all"
        >
          Start Quiz on {selectedTopic}
        </button>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-xl border border-slate-200 text-center animate-fade-in">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
          {score > questions.length / 2 ? '🏆' : '📚'}
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Completed!</h2>
        <p className="text-slate-600 mb-6">You scored <span className="font-bold text-teal-600 text-xl">{score}</span> out of {questions.length}</p>
        
        <div className="w-full bg-slate-200 rounded-full h-3 mb-8 overflow-hidden">
          <div 
            className="bg-teal-500 h-full rounded-full transition-all duration-1000" 
            style={{ width: `${(score / questions.length) * 100}%` }}
          ></div>
        </div>

        <button 
          onClick={() => { setShowResults(false); setQuestions([]); }}
          className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          Try Another Topic
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
          <div 
            className="h-full bg-teal-500 transition-all duration-300" 
            style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold tracking-wider text-teal-600 uppercase">Question {currentQIndex + 1}/{questions.length}</span>
            <span className="text-xs font-medium text-slate-400">{selectedTopic}</span>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-3 mb-8">
            {currentQ.options.map((opt, idx) => {
              let btnClass = "border-slate-200 hover:bg-slate-50";
              // Logic for colors after checking
              if (isAnswerChecked) {
                 if (idx === currentQ.correctAnswer) btnClass = "bg-green-100 border-green-500 text-green-800";
                 else if (idx === selectedOption) btnClass = "bg-red-100 border-red-500 text-red-800";
                 else btnClass = "border-slate-200 opacity-50";
              } else if (selectedOption === idx) {
                btnClass = "border-teal-500 bg-teal-50 text-teal-900 ring-1 ring-teal-500";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswerChecked}
                  className={`w-full text-left p-4 rounded-lg border-2 font-medium transition-all flex justify-between items-center group ${btnClass}`}
                >
                  <span><span className="mr-3 opacity-60 uppercase text-sm">{String.fromCharCode(65 + idx)}.</span> {opt}</span>
                  {isAnswerChecked && idx === currentQ.correctAnswer && (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswerChecked && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
              <span className="font-bold block mb-1">Explanation:</span>
              {currentQ.explanation}
            </div>
          )}

          <div className="flex justify-end">
            {!isAnswerChecked ? (
              <button
                onClick={checkAnswer}
                disabled={selectedOption === null}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                {currentQIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizMode;