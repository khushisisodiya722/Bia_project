export enum Screen {
  // Onboarding
  Welcome,
  PhoneInput,
  OTP,
  ProfileSetup,
  GoalSelection,
  // Main App
  Home,
  Courses,
  CourseDetails,
  Lesson,
  Quiz,
  QuizResults,
  Certificate,
  Wallet,
  AddTransaction,
  SavingsGoal,
  AddSavingsGoal,
  Jobs,
  Profile,
  Rewards,
  Forum,
  Help,
  // New Finance Screens
  FinancesDashboard,
  DailyIncomeTracker,
  // New Schemes Screen
  GovernmentSchemes,
}

export interface User {
  name: string;
  role: string;
  experience: string;
  goal: string;
  points: number;
  badges: Badge[];
  certificates: Certificate[];
  // New fields
  photo: string | null;
  email: string;
  company: 'Swiggy' | 'Zomato' | 'Zepto' | '';
}

export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  lessons: Lesson[];
  duration: number; // in minutes
  modules: number;
  level: string;
  certification: boolean;
  category: 'Technical' | 'Finance' | 'Personal Growth';
  // New field
  youtubeLink: string;
}


export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredCertificate: string;
}

export enum TransactionType {
  Earning = 'Earning',
  Expense = 'Expense'
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  notes?: string;
  date: string;
}

export interface SavingsGoal {
  id:string;
  name: string;
  icon: 'bike' | 'phone' | 'gift' | 'wrench' | 'saree';
  currentAmount: number;
  targetAmount: number;
  description?: string;
}

export interface Badge {
  id: string;
  name: string;
  earned: boolean;
}

export interface Certificate {
  id: string;
  courseName: string;
}

// New Types for Financial Features
export type ExpenseCategory = 'school' | 'rent' | 'household' | 'transport' | 'other';

export interface Expense {
  id: string;
  category: ExpenseCategory;
  name: string; // Doubles as custom name for 'other'
  amount: number;
  icon: React.ElementType;
}

export interface DailyEarning {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number;
}

// New Type for Government Schemes
export interface Scheme {
  id: string;
  titleKey: string;
  icon: string; // emoji
  descriptionKey: string;
  detailsKey: string;
  link: string;
}