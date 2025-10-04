import { Course, Job, User, Lesson, SavingsGoal, Transaction, TransactionType, Badge, Certificate, Expense, DailyEarning, Scheme } from './types';

export const AppColors = {
  primary: 'bg-blue-600',
  secondary: 'bg-green-500',
  accent: 'bg-yellow-400',
  lightBg: 'bg-slate-100',
  textPrimary: 'text-slate-800',
  textSecondary: 'text-slate-500',
};

export const MOCK_USER: User = {
  name: "Rajesh Kumar",
  role: "Delivery Partner",
  experience: "1-3 Years",
  goal: "EV Servicing Pro",
  points: 1250,
  badges: [
    { id: 'b1', name: 'Beginner Badge', earned: true },
    { id: 'b2', name: 'Consistent Learner', earned: true },
    { id: 'b3', name: 'EV Technician', earned: false },
  ],
  certificates: [
    { id: 'c1', courseName: 'EV Battery Care Specialist' }
  ],
  photo: null,
  email: 'rajesh.k@example.com',
  company: 'Swiggy',
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Intro to EV Battery Types',
    thumbnail: 'https://picsum.photos/seed/ev-types/300/200',
    description: 'Learn about the various types of batteries used in electric vehicles and their working principles.',
    lessons: [
      { id: 'l1', title: 'Watch Full Lesson', completed: true },
    ],
    duration: 15,
    modules: 1,
    level: 'Beginner',
    certification: true,
    category: 'Technical',
    youtubeLink: 'https://www.youtube.com/watch?v=3RDOQ5-gGsI',
  },
  {
    id: 'c2',
    title: 'Battery Repairing',
    thumbnail: 'https://picsum.photos/seed/battery-repairing/300/200',
    description: 'A step-by-step guide on repairing EV batteries and understanding how to handle battery cells safely.',
    lessons: [
      { id: 'l2', title: 'Watch Full Lesson', completed: false },
    ],
    duration: 25,
    modules: 1,
    level: 'Intermediate',
    certification: true,
    category: 'Technical',
    youtubeLink: 'https://www.youtube.com/watch?v=e_kv_s-4_v4',
  },
  {
    id: 'c3',
    title: 'Safety Protocols for Gig Workers',
    thumbnail: 'https://picsum.photos/seed/safety/300/200',
    description: 'Learn essential EV and delivery safety measures to protect yourself and others during your daily work.',
    lessons: [
      { id: 'l3', title: 'Watch Full Lesson', completed: false },
    ],
    duration: 20,
    modules: 1,
    level: 'Beginner',
    certification: true,
    category: 'Personal Growth',
    youtubeLink: 'https://www.youtube.com/watch?v=SAaI8y_h-f0',
  },
  {
    id: 'c4',
    title: 'Common Issues & Diagnostics',
    thumbnail: 'https://picsum.photos/seed/diagnostics/300/200',
    description: 'Understand how to identify and fix common issues with your EV or delivery equipment to minimize downtime.',
    lessons: [
      { id: 'l4', title: 'Watch Full Lesson', completed: false },
    ],
    duration: 30,
    modules: 1,
    level: 'Intermediate',
    certification: false,
    category: 'Technical',
    youtubeLink: 'https://www.youtube.com/watch?v=5dfgc2j229A',
  },
  {
    id: 'c5',
    title: 'Managing Finances Effectively',
    thumbnail: 'https://picsum.photos/seed/gig-finance/300/200',
    description: 'Learn how to plan, save, and invest your income effectively to build a secure financial future.',
    lessons: [
      { id: 'l5', title: 'Watch Full Lesson', completed: false },
    ],
    duration: 35,
    modules: 1,
    level: 'Beginner',
    certification: true,
    category: 'Finance',
    youtubeLink: 'https://www.youtube.com/watch?v=8AhNagp_w_A',
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'EV Service Technician',
    company: 'E-Wheels Logistics',
    location: 'Mumbai',
    salary: '₹25,000 - ₹30,000/month',
    requiredCertificate: 'EV Servicing Pro Certificate'
  },
  {
    id: 'j2',
    title: 'Last-Mile Delivery Partner',
    company: 'QuickShip Express',
    location: 'Delhi NCR',
    salary: '₹20,000 - ₹25,000/month',
    requiredCertificate: 'Driving Safety Certificate'
  }
];

export const MOCK_SAVINGS_GOALS: SavingsGoal[] = [
    {id: 'sg1', name: 'Bike Service', icon: 'wrench', currentAmount: 2000, targetAmount: 3000, description: 'Annual servicing for my bike.'},
    {id: 'sg2', name: 'New Phone', icon: 'phone', currentAmount: 5000, targetAmount: 15000, description: 'Save up for the latest smartphone.'},
    {id: 'sg3', name: 'New Saree for Maa', icon: 'saree', currentAmount: 800, targetAmount: 2500, description: 'A special gift for her birthday.'},
    {id: 'sg4', name: 'Diwali Gifts', icon: 'gift', currentAmount: 1200, targetAmount: 4000, description: 'For family and friends.'},
]

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: 's1',
    titleKey: 'pmjjby_title',
    icon: '🛡️',
    descriptionKey: 'pmjjby_desc',
    detailsKey: 'pmjjby_details',
    link: 'https://www.jansuraksha.gov.in/Default.aspx'
  },
  {
    id: 's2',
    titleKey: 'pmsby_title',
    icon: '💰',
    descriptionKey: 'pmsby_desc',
    detailsKey: 'pmsby_details',
    link: 'https://www.jansuraksha.gov.in/Default.aspx'
  },
  {
    id: 's3',
    titleKey: 'apy_title',
    icon: '👵',
    descriptionKey: 'apy_desc',
    detailsKey: 'apy_details',
    link: 'https://www.jansuraksha.gov.in/Default.aspx'
  },
];

// SVG Icons
export const HomeIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
export const CoursesIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>;
export const WalletIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
export const CareerIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
export const ProfileIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
export const BackIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
export const PlayIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const CheckmarkIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const PlusIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
export const BikeIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const PhoneIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
export const CameraIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2-2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
export const CloseIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
export const ChartPieIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>;
export const CalendarIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" /></svg>;
export const SchemesIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>;

// Goal Icons
export const GiftIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const WrenchIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l2.472-2.472a3.75 3.75 0 00-5.303-5.303L2.25 15.586a2.652 2.652 0 000 3.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 11.42l5.83 5.83" /></svg>;
export const SareeIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" /></svg>;


// Finance Icons
export const SchoolIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>;
export const RentIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
export const HouseholdIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.117 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.117 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>;
export const TransportIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>;
export const OtherIcon = (props: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>;

export const DEFAULT_EXPENSES: Expense[] = [
    { id: 'exp1', category: 'school', name: 'Children’s School Fees', amount: 0, icon: SchoolIcon },
    { id: 'exp2', category: 'rent', name: 'House Rent', amount: 0, icon: RentIcon },
    { id: 'exp3', category: 'household', name: 'Household Expenses', amount: 0, icon: HouseholdIcon },
    { id: 'exp4', category: 'transport', name: 'Transportation or Fuel', amount: 0, icon: TransportIcon },
    { id: 'exp5', category: 'other', name: 'Other', amount: 0, icon: OtherIcon },
];

export const MOCK_DAILY_EARNINGS: DailyEarning[] = [
    { id: 'de1', date: '2025-09-01', amount: 1200 },
    { id: 'de2', date: '2025-09-02', amount: 1450 },
    { id: 'de3', date: '2025-09-03', amount: 980 },
    { id: 'de4', date: '2025-08-15', amount: 1150 },
    { id: 'de5', date: '2025-08-16', amount: 1300 },
    { id: 'de6', date: '2025-07-20', amount: 1050 },
];