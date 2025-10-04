import React, { useState, useCallback, createContext, useContext, useRef, useEffect } from 'react';
import { Screen, User, Course, Job, Expense, DailyEarning, Lesson, Scheme, SavingsGoal } from './types';
// Fix: Removed unused and non-existent MailIcon and BriefcaseIcon imports.
import { MOCK_USER, MOCK_COURSES, MOCK_JOBS, MOCK_SAVINGS_GOALS, PlusIcon, BikeIcon, PhoneIcon, BackIcon, PlayIcon, CheckmarkIcon, CameraIcon, CloseIcon, ProfileIcon, DEFAULT_EXPENSES, MOCK_DAILY_EARNINGS, MOCK_SCHEMES, SchemesIcon } from './constants';
import BottomNavBar from './components/BottomNavBar';
import { AppColors } from './constants';
import { translations } from './localization';
import { FinancesDashboard, DailyIncomeTracker } from './components/Finances';

type Language = 'en' | 'hi' | 'gu';

// --- Language Context ---
export const LanguageContext = createContext({
  language: 'en' as Language,
  setLanguage: (lang: Language) => {},
  t: (key: string, vars?: Record<string, string|number>) => key,
});

// --- Onboarding Screens ---
const WelcomeScreen: React.FC<{ onNavigate: (screen: Screen) => void }> = ({ onNavigate }) => {
    const { setLanguage, t } = useContext(LanguageContext);

    const handleLanguageSelect = (lang: Language) => {
        setLanguage(lang);
        onNavigate(Screen.PhoneInput);
    };

    return (
        <div className="flex flex-col items-center justify-between h-full p-8 text-center bg-gradient-to-b from-blue-50 to-white">
            <div>
                <h1 className="text-5xl font-bold text-blue-600">{t('app_title')}</h1>
                <p className="mt-2 text-slate-600">{t('app_subtitle')}</p>
            </div>
            <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center text-6xl shadow-inner">🌱</div>
            <div>
                <p className="mb-4 font-semibold text-slate-700">{t('choose_language')}</p>
                <div className="space-y-3">
                    <button onClick={() => handleLanguageSelect('en')} className="w-full py-3 font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">{t('english')}</button>
                    <button onClick={() => handleLanguageSelect('hi')} className="w-full py-3 font-bold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-md hover:bg-slate-50 transition-transform hover:scale-105">{t('hindi')}</button>
                    <button onClick={() => handleLanguageSelect('gu')} className="w-full py-3 font-bold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-md hover:bg-slate-50 transition-transform hover:scale-105">{t('gujarati')}</button>
                </div>
            </div>
        </div>
    );
};

const PhoneInputScreen: React.FC<{ onNavigate: (screen: Screen) => void }> = ({ onNavigate }) => {
    const { t } = useContext(LanguageContext);
    const [phone, setPhone] = useState('');
    const isValid = phone.length === 10;
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{t('whats_your_number')}</h2>
            <p className="text-slate-500 mb-8">{t('enter_mobile_prompt')}</p>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">+91 |</span>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder={t('phone_placeholder')} className="w-full p-4 pl-16 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
            <p className="text-sm text-slate-500 mt-2">{t('otp_info')}</p>
            <button onClick={() => onNavigate(Screen.OTP)} disabled={!isValid} className="w-full py-4 mt-16 font-bold text-white bg-blue-600 rounded-lg shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-blue-700 transition">{t('continue')}</button>
        </div>
    );
};

const OTPScreen: React.FC<{ onNavigate: (screen: Screen) => void }> = ({ onNavigate }) => {
    const { t } = useContext(LanguageContext);
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [resendTimer, setResendTimer] = useState(30);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setResendTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }

        if (newOtp.join('').length === 4) {
             setTimeout(() => onNavigate(Screen.Home), 500); // Auto-verify
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{t('verify_your_number')}</h2>
            <p className="text-slate-500 mb-8">{t('enter_otp_prompt')}</p>
            <div className="flex justify-center space-x-3 my-4">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={el => { inputsRef.current[index] = el; }}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-14 h-16 text-center text-2xl border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                ))}
            </div>
            <div className="text-center mt-4">
                {resendTimer > 0 ? (
                    <p className="text-slate-500">{t('resend_otp_in')} {resendTimer}s</p>
                ) : (
                    <button onClick={() => setResendTimer(30)} className="font-semibold text-blue-600 hover:underline">{t('resend_otp')}</button>
                )}
            </div>
            <button onClick={() => onNavigate(Screen.Home)} className="w-full py-4 mt-8 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">{t('verify')}</button>
        </div>
    );
};

// --- Main App Screens ---
const Header: React.FC<{ title: string; onBack?: () => void; }> = ({ title, onBack }) => (
    <div className="sticky top-0 z-10 flex items-center p-4 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        {onBack ? (
            <button onClick={onBack} className="mr-2 p-2 rounded-full hover:bg-slate-100">
                <BackIcon className="w-6 h-6 text-slate-600" />
            </button>
        ) : <div className="w-10"></div>}
        <h1 className="text-xl font-bold text-center flex-1">{title}</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
    </div>
);

const HomeScreen: React.FC<{ user: User, courses: Course[], onNavigate: (screen: Screen, context?: any) => void }> = ({ user, courses, onNavigate }) => {
    const { t } = useContext(LanguageContext);
    return (
        <div className="p-4 pb-20">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{t('hi_user', {name: user.name.split(' ')[0]})}</h1>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center mb-6 border border-slate-100">
                 <h3 className="font-semibold mb-4 text-slate-700">{t('your_daily_goal')}</h3>
                <div className="relative w-40 h-40 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path className="text-slate-200" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-green-500" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">1/1</span>
                        <span className="text-sm text-slate-500">{t('lesson_today')}</span>
                    </div>
                </div>
                 <p className="mt-4 text-green-600 font-semibold">{t('todays_lesson_done')}</p>
            </div>
            
            <h3 className="text-xl font-bold mb-4">{t('keep_learning')}</h3>
            <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
                {courses.slice(0,3).map(course => (
                    <div key={course.id} className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform">
                        <img className="w-full h-32 object-cover" src={course.thumbnail} alt={course.title} />
                        <div className="p-4">
                            <h4 className="font-bold">{course.title}</h4>
                            <p className="text-sm text-slate-500 mb-4">{course.modules} {t('modules')}</p>
                            <button onClick={() => onNavigate(Screen.CourseDetails, course.id)} className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">{t('start')}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CourseCard: React.FC<{ course: Course; onNavigate: (screen: Screen, context?: any) => void; }> = ({ course, onNavigate }) => {
    const { t } = useContext(LanguageContext);
    return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-200" onClick={() => onNavigate(Screen.CourseDetails, course.id)}>
        <img className="w-full h-32 object-cover" src={course.thumbnail} alt={course.title} />
        <div className="p-4">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-md leading-tight pr-2">{course.title}</h3>
                {course.certification ? (
                    <span className="flex-shrink-0 text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full">{t('certified')}</span>
                ) : (
                    <span className="flex-shrink-0 text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{t('practice')}</span>
                )}
            </div>
            <p className="text-sm text-slate-500 mb-4">{course.duration} {t('mins')} &middot; {course.modules} {t('modules')}</p>
            <button className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">{t('start')}</button>
        </div>
    </div>
)};

const CoursesScreen: React.FC<{ courses: Course[], onNavigate: (screen: Screen, context?: any) => void }> = ({ courses, onNavigate }) => {
    const { t } = useContext(LanguageContext);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [certifiedOnly, setCertifiedOnly] = useState<boolean>(false);

    const categories = ['All', 'Technical', 'Finance', 'Personal Growth'];
    const categoryKeys = { 'All': 'all', 'Technical': 'technical', 'Finance': 'finance', 'Personal Growth': 'personal_growth'};

    const filteredCourses = courses.filter(course => {
        const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
        const certificationMatch = !certifiedOnly || course.certification;
        return categoryMatch && certificationMatch;
    });

    return (
        <div className="pb-20">
            <Header title={t('course_catalog')} />
            <div className="p-4">
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-600 mb-2">{t('category')}</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                            >{t(categoryKeys[category])}</button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center mb-6">
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" className="sr-only" checked={certifiedOnly} onChange={() => setCertifiedOnly(!certifiedOnly)} />
                            <div className={`block w-10 h-6 rounded-full transition-colors ${certifiedOnly ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${certifiedOnly ? 'transform translate-x-full' : ''}`}></div>
                        </div>
                        <div className="ml-3 text-sm font-medium text-slate-700">{t('certified_courses_only')}</div>
                    </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} onNavigate={onNavigate} />
                    ))}
                </div>
                {filteredCourses.length === 0 && (
                    <div className="text-center py-10"><p className="text-slate-500">{t('no_courses_found')}</p></div>
                )}
            </div>
        </div>
    );
};

const CourseDetailsScreen: React.FC<{ course: Course, onNavigate: (screen: Screen, context?: any) => void, onUpdateLesson: (lessonId: string, completed: boolean) => void }> = ({ course, onNavigate, onUpdateLesson }) => {
    const { t } = useContext(LanguageContext);
    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    
    const handlePlay = (e: React.MouseEvent, lesson: Lesson) => {
        e.stopPropagation();
        setPlayingVideoId(getYouTubeId(course.youtubeLink));
    }

    const handleToggleComplete = (e: React.MouseEvent, lesson: Lesson) => {
        e.stopPropagation();
        onUpdateLesson(lesson.id, !lesson.completed);
    }
    
    return (
        <div className="pb-20">
            {playingVideoId && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="w-full max-w-md bg-white rounded-lg overflow-hidden">
                        <div className="relative aspect-video">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                         <button onClick={() => setPlayingVideoId(null)} className="absolute top-2 right-2 p-2 bg-white/50 rounded-full hover:bg-white transition">
                            <CloseIcon className="w-6 h-6 text-slate-800" />
                        </button>
                    </div>
                </div>
            )}
            <div className="relative">
                <img className="w-full h-48 object-cover" src={course.thumbnail} alt={course.title} />
                <button onClick={() => onNavigate(Screen.Courses)} className="absolute top-4 left-4 p-2 bg-white/80 rounded-full hover:bg-white transition">
                    <BackIcon className="w-6 h-6 text-slate-700" />
                </button>
            </div>
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                 <div className="flex justify-around items-center bg-slate-100 p-3 rounded-xl mb-4 text-center">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-semibold">{t('duration')}</p>
                        <p className="font-bold text-slate-800">{course.duration} {t('mins')}</p>
                    </div>
                     <div>
                        <p className="text-xs text-slate-500 uppercase font-semibold">{t('level')}</p>
                        <p className="font-bold text-slate-800">{course.level}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-semibold">{t('certificate')}</p>
                        <p className={`font-bold ${course.certification ? 'text-green-600' : 'text-slate-800'}`}>{course.certification ? t('yes') : t('no')}</p>
                    </div>
                </div>
                <p className="text-slate-600 mb-6">{course.description}</p>
                <h3 className="text-xl font-bold mb-4">{t('lessons_count', { count: course.modules })}</h3>
                <div className="space-y-2">
                    {course.lessons.map(lesson => (
                         <div key={lesson.id} className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition">
                            <button onClick={(e) => handleToggleComplete(e, lesson)} className="flex items-center space-x-3 flex-grow">
                                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${lesson.completed ? 'bg-green-500 border-green-500' : 'border-slate-300'}`}>
                                    {lesson.completed && <CheckmarkIcon className="w-5 h-5 text-white" />}
                                </div>
                                <p className={`font-medium ${lesson.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{lesson.title}</p>
                            </button>
                            <button onClick={(e) => handlePlay(e, lesson)} className="p-2 rounded-full hover:bg-blue-100">
                                <PlayIcon className="w-6 h-6 text-blue-500" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const JobsScreen: React.FC<{ onNavigate: (screen: Screen) => void }> = ({ onNavigate }) => {
    const { t } = useContext(LanguageContext);
    return (
        <div className="pb-20">
            <Header title={t('career_hub')} />
            <div className="p-4 space-y-4">
                {MOCK_JOBS.map(job => (
                    <div key={job.id} className="bg-white p-4 rounded-lg shadow-md border border-slate-100">
                        <h2 className="font-bold text-lg">{job.title}</h2>
                        <p className="text-slate-600">{job.company}</p>
                        <p className="text-sm text-slate-500">{job.location}</p>
                        <p className="font-semibold my-2">{job.salary}</p>
                        <button onClick={() => alert(`Applying for ${job.title}`)} className="w-full py-2 mt-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">{t('apply_now')}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProfileScreen: React.FC<{ user: User, setUser: (user: User) => void }> = ({ user, setUser }) => {
    const { t } = useContext(LanguageContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [company, setCompany] = useState(user.company);
    const [photo, setPhoto] = useState<string | null>(user.photo);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        setUser({ ...user, name, email, company, photo });
        setIsEditing(false);
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="pb-20">
            <Header title={t('my_profile')} />
            <div className="p-4">
                <div className="relative w-28 h-28 mx-auto mb-4">
                    {photo ? (
                        <img src={photo} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg" />
                    ) : (
                        <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center border-4 border-white shadow-lg">
                            <ProfileIcon className="w-16 h-16 text-slate-400" />
                        </div>
                    )}
                     {isEditing && (
                        <>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
                            <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition shadow">
                                <CameraIcon className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-slate-500">{user.role}</p>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-md border border-slate-100 space-y-4">
                     <div>
                        <label className="text-sm font-semibold text-slate-500">{t('full_name')}</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} disabled={!isEditing} className="w-full p-2 mt-1 bg-transparent border-b-2 border-slate-200 focus:border-blue-500 outline-none disabled:border-transparent transition" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-500">{t('email_address')}</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={!isEditing} className="w-full p-2 mt-1 bg-transparent border-b-2 border-slate-200 focus:border-blue-500 outline-none disabled:border-transparent transition" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-500">{t('currently_working_with')}</label>
                         <select value={company} onChange={e => setCompany(e.target.value as User['company'])} disabled={!isEditing} className="w-full p-2 mt-1 bg-transparent border-b-2 border-slate-200 focus:border-blue-500 outline-none disabled:border-transparent transition appearance-none">
                            <option value="">{t('select_company')}</option>
                            <option value="Swiggy">Swiggy</option>
                            <option value="Zomato">Zomato</option>
                            <option value="Zepto">Zepto</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8">
                    {isEditing ? (
                         <button onClick={handleSave} className="w-full py-3 font-bold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition">{t('save_changes')}</button>
                    ) : (
                         <button onClick={() => setIsEditing(true)} className="w-full py-3 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">{t('edit_profile')}</button>
                    )}
                </div>
            </div>
        </div>
    );
};

const GovernmentSchemesScreen: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

    return (
        <div className="pb-20">
            <Header title={t('government_schemes_title')} />
             {selectedScheme && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative">
                        <button onClick={() => setSelectedScheme(null)} className="absolute top-2 right-2 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition">
                            <CloseIcon className="w-5 h-5 text-slate-600" />
                        </button>
                        <div className="text-center mb-4">
                            <span className="text-4xl">{selectedScheme.icon}</span>
                            <h3 className="text-lg font-bold mt-2">{t(selectedScheme.titleKey)}</h3>
                        </div>
                        <p className="text-sm text-slate-600 mb-6 text-center">{t(selectedScheme.detailsKey)}</p>
                        <a 
                          href={selectedScheme.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full block text-center py-3 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
                        >
                          {t('visit_official_site')}
                        </a>
                    </div>
                </div>
            )}
            <div className="p-4 space-y-4">
                {MOCK_SCHEMES.map(scheme => (
                    <div key={scheme.id} onClick={() => setSelectedScheme(scheme)} className="bg-white p-4 rounded-xl shadow-md border border-slate-100 flex items-center space-x-4 cursor-pointer hover:shadow-lg hover:border-blue-200 transition">
                        <div className="text-4xl bg-slate-100 p-3 rounded-full">{scheme.icon}</div>
                        <div className="flex-grow">
                            <h2 className="font-bold text-md">{t(scheme.titleKey)}</h2>
                            <p className="text-sm text-slate-500">{t(scheme.descriptionKey)}</p>
                        </div>
                        <div className="text-blue-500 font-semibold">&gt;</div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- App Component ---
const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Welcome);
  const [user, setUser] = useState<User | null>(null);
  const [screenContext, setScreenContext] = useState<any>(null);
  const [language, setLanguage] = useState<Language>('en');

  // State for new features
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [monthlyIncome, setMonthlyIncome] = useState(35000);
  const [expenses, setExpenses] = useState<Expense[]>(DEFAULT_EXPENSES);
  const [dailyEarnings, setDailyEarnings] = useState<DailyEarning[]>(MOCK_DAILY_EARNINGS);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(MOCK_SAVINGS_GOALS);

  const t = useCallback((key: string, vars: Record<string, string|number> = {}) => {
      let translation = translations[language][key] || key;
      Object.keys(vars).forEach(varKey => {
          translation = translation.replace(`{${varKey}}`, String(vars[varKey]));
      });
      return translation;
  }, [language]);
  
  const handleNavigation = useCallback((screen: Screen, context: any = null) => {
    if (screen === Screen.Home && !user) {
        setUser(MOCK_USER);
    }
    setScreenContext(context);
    setCurrentScreen(screen);
  }, [user]);

  const handleUpdateLessonCompletion = useCallback((courseId: string, lessonId: string, completed: boolean) => {
    setCourses(prevCourses => prevCourses.map(course => {
        if (course.id === courseId) {
            return {
                ...course,
                lessons: course.lessons.map(lesson => 
                    lesson.id === lessonId ? { ...lesson, completed } : lesson
                ),
            };
        }
        return course;
    }));
  }, []);

  const handleAddSavingsGoal = (newGoal: Omit<SavingsGoal, 'id' | 'currentAmount' | 'icon'> & { icon: SavingsGoal['icon'] }) => {
    const goalToAdd: SavingsGoal = {
        ...newGoal,
        id: `sg${Date.now()}`,
        currentAmount: 0,
    };
    setSavingsGoals(prev => [goalToAdd, ...prev]);
  };

  const handleUpdateSavingsGoalAmount = (goalId: string, amount: number) => {
      setSavingsGoals(prev => prev.map(goal => {
          if (goal.id === goalId) {
              const newAmount = Math.max(0, Math.min(goal.targetAmount, goal.currentAmount + amount));
              return { ...goal, currentAmount: newAmount };
          }
          return goal;
      }));
  };

  const renderScreen = () => {
    if (user) { // User is logged in
      const MainScreenLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
          <div className="flex flex-col h-full">
            <main className="flex-grow">{children}</main>
            <BottomNavBar activeScreen={currentScreen} setActiveScreen={(s) => handleNavigation(s)} />
          </div>
      );
        
      switch (currentScreen) {
        case Screen.Home: return <MainScreenLayout><HomeScreen user={user} courses={courses} onNavigate={handleNavigation} /></MainScreenLayout>;
        case Screen.Courses: return <MainScreenLayout><CoursesScreen courses={courses} onNavigate={handleNavigation} /></MainScreenLayout>;
        case Screen.CourseDetails:
            const course = courses.find(c => c.id === screenContext);
            if (!course) return <MainScreenLayout><CoursesScreen courses={courses} onNavigate={handleNavigation} /></MainScreenLayout>;
            return <CourseDetailsScreen course={course} onNavigate={handleNavigation} onUpdateLesson={(lessonId, completed) => handleUpdateLessonCompletion(course.id, lessonId, completed)} />;
        case Screen.Jobs: return <MainScreenLayout><JobsScreen onNavigate={handleNavigation} /></MainScreenLayout>;
        case Screen.Wallet: return <MainScreenLayout><FinancesDashboard monthlyIncome={monthlyIncome} setMonthlyIncome={setMonthlyIncome} expenses={expenses} setExpenses={setExpenses} onNavigate={handleNavigation} savingsGoals={savingsGoals} onAddGoal={handleAddSavingsGoal} onUpdateGoal={handleUpdateSavingsGoalAmount} /></MainScreenLayout>;
        case Screen.DailyIncomeTracker: return <DailyIncomeTracker dailyEarnings={dailyEarnings} setDailyEarnings={setDailyEarnings} onBack={() => handleNavigation(Screen.Wallet)} />;
        case Screen.Profile: return <MainScreenLayout><ProfileScreen user={user} setUser={setUser} /></MainScreenLayout>;
        case Screen.GovernmentSchemes: return <MainScreenLayout><GovernmentSchemesScreen /></MainScreenLayout>;
        default: return <MainScreenLayout><HomeScreen user={user} courses={courses} onNavigate={handleNavigation} /></MainScreenLayout>;
      }
    }

    // Onboarding flow
    switch (currentScreen) {
      case Screen.Welcome: return <WelcomeScreen onNavigate={handleNavigation} />;
      case Screen.PhoneInput: return <PhoneInputScreen onNavigate={handleNavigation} />;
      case Screen.OTP: return <OTPScreen onNavigate={handleNavigation} />;
      default: return <WelcomeScreen onNavigate={handleNavigation} />;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={`w-full min-h-screen font-sans ${AppColors.lightBg} ${AppColors.textPrimary}`}>
        <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col shadow-2xl">
          {renderScreen()}
        </div>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;