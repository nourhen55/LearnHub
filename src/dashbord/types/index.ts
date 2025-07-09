export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'development' | 'design' | 'exercises';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  progress: number;
  instructor: string;
  thumbnail: string;
  tags: string[];
  isFavorite: boolean;
  isNew: boolean;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  notifications: boolean;
  autoPlay: boolean;
  sidebarCollapsed: boolean;
}

export interface UserStats {
  coursesCompleted: number;
  totalHours: number;
  currentStreak: number;
  favoriteCategory: string;
}
export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  hireDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'admin';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Admin | null;
  loading: boolean;
}