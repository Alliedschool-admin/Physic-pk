export enum AppView {
  HOME = 'HOME',
  SYLLABUS = 'SYLLABUS',
  VECTOR_LAB = 'VECTOR_LAB',
  PROJECTILE_LAB = 'PROJECTILE_LAB',
  FRICTION_LAB = 'FRICTION_LAB',
  CIRCULAR_LAB = 'CIRCULAR_LAB',
  SHM_LAB = 'SHM_LAB',
  OPTICS_LAB = 'OPTICS_LAB',
  TUTOR = 'TUTOR',
  QUIZ = 'QUIZ'
}

export interface Vector2D {
  x: number;
  y: number;
  label?: string;
  color?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index
  explanation: string;
}

export interface ProjectileParams {
  velocity: number;
  angle: number;
  gravity: number;
  height: number;
}