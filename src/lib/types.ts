export interface RegisterUserData {
  username: string;
  name: string;
  email: string;
  password: string;
  re_password: string;
}

export interface LoginUserData {
  username: string;
  password: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  description_html: string;
  completion_date: string;
  created_at: string;
  updated_at: string;
  is_completed: boolean;
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
  tasks: Task[];
}

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export type Categories = Category[];
export type Tasks = Task[];
