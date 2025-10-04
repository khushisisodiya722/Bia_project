import React, { useState, useMemo, useContext } from 'react';
import { Screen, Expense, DailyEarning, SavingsGoal } from '../types';
import { LanguageContext } from '../App';
import { BackIcon, BikeIcon, PhoneIcon, ChartPieIcon, CloseIcon, CalendarIcon, GiftIcon, WrenchIcon, SareeIcon, CheckmarkIcon } from '../constants';

// --- Helper Functions ---
const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

// --- Pie Chart Component ---
const PieChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) {
        return <div className="w-40 h-40 rounded-full bg-slate-200 flex items-center justify-center"><p className="text-xs text-slate-500">No data</p></div>;
    }

    let cumulative = 0;
    const segments = data.map(item => {
        const percentage = (item.value / total) * 100;
        const startAngle = (cumulative / 100) * 360;
        cumulative += percentage;
        const endAngle = (cumulative / 100) * 360;
        const largeArcFlag = percentage > 50 ? 1 : 0;
        
        const startX = 50 + 45 * Math.cos((startAngle - 90) * Math.PI / 180);
        const startY = 50 + 45 * Math.sin((startAngle - 90) * Math.PI / 180);
        const endX = 50 + 45 * Math.cos((endAngle - 90) * Math.PI / 180);
        const endY = 50 + 45 * Math.sin((endAngle - 90) * Math.PI / 180);

        return `M 50,50 L ${startX},${startY} A 45,45 0 ${largeArcFlag},1 ${endX},${endY} Z`;
    });

    return (
        <svg viewBox="0 0 100 100" className="w-40 h-40">
            {segments.map((d, i) => <path key={i} d={d} fill={data[i].color} />)}
        </svg>
    );
};

// --- Goal Icons Map ---
const goalIcons: Record<SavingsGoal['icon'], React.ElementType> = {
    bike: BikeIcon,
    phone: PhoneIcon,
    gift: GiftIcon,
    wrench: WrenchIcon,
    saree: SareeIcon,
};

// --- Modals ---
const AddGoalModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void; }> = ({ isOpen, onClose, onSave }) => {
    const { t } = useContext(LanguageContext);
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState<number | ''>('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState<SavingsGoal['icon']>('gift');

    const handleSave = () => {
        // Fix: Ensure targetAmount is treated as a number for comparison.
        if (name && Number(targetAmount) > 0) {
            // Fix: Pass targetAmount as a number to the onSave callback.
            onSave({ name, targetAmount: Number(targetAmount), description, icon });
            onClose();
            setName(''); setTargetAmount(''); setDescription(''); setIcon('gift');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{t('create_new_goal')}</h2>
                    <button onClick={onClose}><CloseIcon className="w-6 h-6 text-slate-500" /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-slate-600">{t('goal_name')}</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('goal_name_placeholder')} className="w-full mt-1 p-2 border border-slate-300 rounded-md" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-600">{t('goal_amount')}</label>
                        <input type="number" value={targetAmount} onChange={e => setTargetAmount(Number(e.target.value))} placeholder={t('goal_amount_placeholder')} className="w-full mt-1 p-2 border border-slate-300 rounded-md" />
                    </div>
                     <div>
                        <label className="text-sm font-semibold text-slate-600">{t('optional_description')}</label>
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-md" />
                    </div>
                     <div>
                        <label className="text-sm font-semibold text-slate-600">Icon</label>
                        <div className="flex justify-around mt-2">
                           {Object.keys(goalIcons).map(iconKey => {
                                const Icon = goalIcons[iconKey as SavingsGoal['icon']];
                                return <button key={iconKey} onClick={() => setIcon(iconKey as SavingsGoal['icon'])} className={`p-2 rounded-full ${icon === iconKey ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}><Icon className="w-6 h-6"/></button>
                           })}
                        </div>
                    </div>
                </div>
                <button onClick={handleSave} className="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-lg">{t('save_goal')}</button>
            </div>
        </div>
    );
};

const TransactionModal: React.FC<{ state: { isOpen: boolean; goal: SavingsGoal | null; type: 'add' | 'withdraw' }; onClose: () => void; onConfirm: (goalId: string, amount: number) => void; }> = ({ state, onClose, onConfirm }) => {
    const { t } = useContext(LanguageContext);
    const [amount, setAmount] = useState<number | ''>('');
    const [step, setStep] = useState(0); // 0: input, 1: confirmation

    const handleConfirm = () => {
        // Fix: Ensure amount is treated as a number for comparison.
        if (state.goal && Number(amount) > 0) {
            const finalAmount = state.type === 'add' ? Number(amount) : -Number(amount);
            if(state.type === 'add') {
                setStep(1); // Mock UPI screen
                setTimeout(() => {
                    onConfirm(state.goal.id, finalAmount);
                    handleClose();
                }, 1500);
            } else {
                onConfirm(state.goal.id, finalAmount);
                handleClose();
            }
        }
    };
    
    const handleClose = () => {
        setStep(0);
        setAmount('');
        onClose();
    }

    if (!state.isOpen || !state.goal) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{t('manage_funds_for', { goalName: state.goal.name })}</h2>
                    <button onClick={handleClose}><CloseIcon className="w-6 h-6 text-slate-500" /></button>
                </div>
                {step === 0 && (
                    <>
                        <div>
                            <label className="text-sm font-semibold text-slate-600">{state.type === 'add' ? t('amount_to_add') : t('amount_to_withdraw')}</label>
                            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="₹0" className="w-full mt-1 p-3 text-2xl font-bold border-2 border-slate-300 rounded-md text-center" />
                        </div>
                        <div className="flex gap-2 mt-6">
                            <button onClick={handleClose} className="flex-1 py-3 bg-slate-200 text-slate-800 font-bold rounded-lg">{t('cancel')}</button>
                            <button onClick={handleConfirm} className={`flex-1 py-3 text-white font-bold rounded-lg ${state.type === 'add' ? 'bg-green-500' : 'bg-orange-500'}`}>{state.type === 'add' ? t('confirm_payment') : t('confirm_withdrawal')}</button>
                        </div>
                    </>
                )}
                {step === 1 && (
                     <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto animate-bounce">
                           <CheckmarkIcon className="w-10 h-10"/>
                        </div>
                        <p className="font-bold text-lg mt-4">{t('payment_successful')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Savings Goal Card Component ---
const SavingsGoalCard: React.FC<{ goal: SavingsGoal; onAddMoney: (goal: SavingsGoal) => void; onWithdraw: (goal: SavingsGoal) => void; }> = ({ goal, onAddMoney, onWithdraw }) => {
    const { t } = useContext(LanguageContext);
    const percentage = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
    const Icon = goalIcons[goal.icon] || goalIcons.gift;

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex flex-col space-y-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-full"><Icon className="w-6 h-6 text-blue-600" /></div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">{goal.name}</h3>
                        <p className="text-sm text-slate-500">{t('goal_colon')} {formatCurrency(goal.targetAmount)} | {t('saved_colon')} {formatCurrency(goal.currentAmount)}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(percentage)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
            <div className="flex gap-2 pt-2">
                <button onClick={() => onAddMoney(goal)} className="flex-1 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">{t('add_money')}</button>
                <button onClick={() => onWithdraw(goal)} className="flex-1 py-2 text-sm font-bold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition">{t('withdraw')}</button>
            </div>
        </div>
    );
};


// --- Finances Dashboard Screen ---
interface FinancesDashboardProps {
    monthlyIncome: number;
    setMonthlyIncome: (value: number) => void;
    expenses: Expense[];
    setExpenses: (expenses: Expense[]) => void;
    onNavigate: (screen: Screen) => void;
    savingsGoals: SavingsGoal[];
    onAddGoal: (newGoal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
    onUpdateGoal: (goalId: string, amount: number) => void;
}

export const FinancesDashboard: React.FC<FinancesDashboardProps> = ({ monthlyIncome, setMonthlyIncome, expenses, setExpenses, onNavigate, savingsGoals, onAddGoal, onUpdateGoal }) => {
    const { t } = useContext(LanguageContext);
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
    const [transactionModalState, setTransactionModalState] = useState<{ isOpen: boolean; goal: SavingsGoal | null; type: 'add' | 'withdraw' }>({ isOpen: false, goal: null, type: 'add' });


    const totalExpenses = useMemo(() => expenses.reduce((sum, exp) => sum + exp.amount, 0), [expenses]);
    const savings = monthlyIncome - totalExpenses;
    const suggestedInvestment = savings > 0 ? savings * 0.3 : 0;
    const dailySavingGoal = savings > 0 ? (savings - suggestedInvestment) / 30 : 0;
    const totalSavedInGoals = useMemo(() => savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0), [savingsGoals]);

    const handleExpenseChange = (id: string, newAmount: number) => {
        setExpenses(expenses.map(exp => exp.id === id ? { ...exp, amount: Math.max(0, newAmount) } : exp));
    };

    const pieChartData = [
        { label: t('expenses'), value: totalExpenses, color: '#ef4444' }, // red-500
        { label: t('savings'), value: Math.max(0, savings), color: '#22c55e' }, // green-500
    ];
    
    const handleOpenTransactionModal = (goal: SavingsGoal, type: 'add' | 'withdraw') => {
        setTransactionModalState({ isOpen: true, goal, type });
    };

    return (
        <div className="pb-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="sticky top-0 z-10 p-4 bg-white/80 backdrop-blur-sm border-b border-slate-200">
                <h1 className="text-xl font-bold text-center">{t('my_finances')}</h1>
            </div>

            <AddGoalModal isOpen={isAddGoalModalOpen} onClose={() => setIsAddGoalModalOpen(false)} onSave={onAddGoal} />
            <TransactionModal state={transactionModalState} onClose={() => setTransactionModalState({ isOpen: false, goal: null, type: 'add' })} onConfirm={onUpdateGoal} />
            
            {showBreakdown && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
                        <h2 className="text-lg font-bold mb-4">{t('view_breakdown')}</h2>
                        <div className="flex justify-center mb-4">
                            <PieChart data={pieChartData} />
                        </div>
                        <div className="space-y-2 text-left">
                           <div className="flex justify-between items-center font-semibold">
                               <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>{t('income')}</span>
                               <span>{formatCurrency(monthlyIncome)}</span>
                           </div>
                           <div className="flex justify-between items-center font-semibold">
                               <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>{t('expenses')}</span>
                               <span>{formatCurrency(totalExpenses)}</span>
                           </div>
                           <div className="flex justify-between items-center font-semibold">
                               <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>{t('savings')}</span>
                               <span>{formatCurrency(savings)}</span>
                           </div>
                        </div>
                        <button onClick={() => setShowBreakdown(false)} className="w-full mt-6 py-2 bg-slate-200 text-slate-800 font-bold rounded-lg">{t('close')}</button>
                    </div>
                </div>
            )}
            
            <div className="p-4 space-y-4">
                 <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
                    <h3 className="font-bold text-slate-700">{t('total_saved_in_goals')}</h3>
                    <p className="text-3xl font-bold text-green-600 mt-1">{formatCurrency(totalSavedInGoals)}</p>
                </div>
                {/* Income Card */}
                <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl shadow-md">
                    <label htmlFor="income" className="font-bold text-blue-800">{t('monthly_income')}</label>
                    <div className="flex items-center mt-2">
                         <span className="text-xl font-bold text-blue-800 mr-2">₹</span>
                         <input
                            type="number"
                            id="income"
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                            className="text-2xl font-bold bg-transparent w-full outline-none text-blue-800"
                            placeholder="0"
                         />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer mt-2"
                    />
                </div>

                {/* Expenses Card */}
                <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl shadow-md">
                    <h3 className="font-bold text-red-800 mb-3">{t('monthly_expenses')}</h3>
                    <div className="space-y-4">
                        {expenses.map(exp => (
                            <div key={exp.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <exp.icon className="w-6 h-6 text-red-600 mr-3" />
                                    <label htmlFor={exp.id} className="text-sm font-medium text-slate-700">{t(exp.category)}</label>
                                </div>
                                <div className="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden">
                                     <button onClick={() => handleExpenseChange(exp.id, exp.amount - 100)} className="px-3 py-1 text-xl font-bold text-red-500 hover:bg-red-50 transition-colors">-</button>
                                     <span className="text-sm px-1 text-slate-500">₹</span>
                                    <input
                                        type="number"
                                        id={exp.id}
                                        value={exp.amount === 0 ? '' : exp.amount}
                                        onChange={e => handleExpenseChange(exp.id, Number(e.target.value))}
                                        className="w-20 p-1 text-center font-semibold outline-none bg-transparent"
                                        placeholder="0"
                                    />
                                     <button onClick={() => handleExpenseChange(exp.id, exp.amount + 100)} className="px-3 py-1 text-xl font-bold text-green-500 hover:bg-green-50 transition-colors">+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Card */}
                <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl shadow-md text-green-800">
                    <h3 className="font-bold mb-3">{t('financial_summary')}</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <p>{t('monthly_savings')}</p>
                            <p className="font-bold text-xl">{formatCurrency(savings)}</p>
                        </div>
                         <div className="flex justify-between items-center text-sm">
                            <p>{t('suggested_investment')}</p>
                            <p className="font-semibold">{formatCurrency(suggestedInvestment)}</p>
                        </div>
                         <div className="flex justify-between items-center text-sm">
                            <p>{t('daily_saving_goal')}</p>
                            <p className="font-semibold">{formatCurrency(Math.round(dailySavingGoal))}/day</p>
                        </div>
                    </div>
                     <button onClick={() => setShowBreakdown(true)} className="w-full flex items-center justify-center mt-4 py-2 bg-green-200 text-green-800 font-bold rounded-lg">
                        <ChartPieIcon className="w-5 h-5 mr-2" /> {t('view_breakdown')}
                    </button>
                </div>

                {/* Daily Income Tracker Button */}
                <button onClick={() => onNavigate(Screen.DailyIncomeTracker)} className="w-full py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg shadow-md flex items-center justify-center">
                     <CalendarIcon className="w-5 h-5 mr-2" /> {t('track_daily_income')}
                </button>

                 {/* --- SAVINGS GOALS SECTION --- */}
                <div className="pt-4 mt-4 border-t-2 border-dashed border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800 mb-3">{t('my_savings_goals')}</h2>
                    <button onClick={() => setIsAddGoalModalOpen(true)} className="w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition mb-4">{t('add_new_goal')}</button>
                    <div className="space-y-3">
                        {savingsGoals.map(goal => (
                           <SavingsGoalCard 
                                key={goal.id} 
                                goal={goal} 
                                onAddMoney={() => handleOpenTransactionModal(goal, 'add')}
                                onWithdraw={() => handleOpenTransactionModal(goal, 'withdraw')}
                           />
                        ))}
                        <p className="text-xs text-slate-500 text-center pt-2">{t('securely_save_info')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Daily Income Tracker Screen ---
interface DailyIncomeTrackerProps {
    dailyEarnings: DailyEarning[];
    setDailyEarnings: (earnings: DailyEarning[]) => void;
    onBack: () => void;
}

export const DailyIncomeTracker: React.FC<DailyIncomeTrackerProps> = ({ dailyEarnings, setDailyEarnings, onBack }) => {
    const { t } = useContext(LanguageContext);
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [amount, setAmount] = useState<number | ''>('');
    const [expandedMonth, setExpandedMonth] = useState('September 2025');
    
    const handleAddEarning = () => {
        if (amount) {
            const newEarning: DailyEarning = { id: `de${Date.now()}`, date, amount: Number(amount) };
            setDailyEarnings([newEarning, ...dailyEarnings]);
            setAmount('');
        }
    };
    
    const earningsByMonth = useMemo(() => {
        return dailyEarnings.reduce((acc, earning) => {
            const monthYear = new Date(earning.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!acc[monthYear]) {
                acc[monthYear] = { earnings: [], total: 0 };
            }
            acc[monthYear].earnings.push(earning);
            acc[monthYear].total += earning.amount;
            return acc;
        }, {} as Record<string, { earnings: DailyEarning[], total: number }>);
    }, [dailyEarnings]);

    // Fix: Corrected the sorting logic to properly compare dates and cast the year from string to number.
    const sortedMonths = Object.keys(earningsByMonth).sort((a, b) => new Date(Number(b.split(' ')[1]), new Date(Date.parse(b.split(' ')[0] +" 1, 2012")).getMonth(), 1).getTime() - new Date(Number(a.split(' ')[1]), new Date(Date.parse(a.split(' ')[0] +" 1, 2012")).getMonth(), 1).getTime());
    const maxMonthlyIncome = Math.max(...Object.values(earningsByMonth).map(m => m.total), 0);

    return (
        <div className="pb-20">
            <div className="sticky top-0 z-10 flex items-center p-4 bg-white/80 backdrop-blur-sm border-b border-slate-200">
                <button onClick={onBack} className="mr-2 p-2 rounded-full hover:bg-slate-100"><BackIcon className="w-6 h-6 text-slate-600" /></button>
                <h1 className="text-xl font-bold text-center flex-1">{t('daily_income_tracker')}</h1>
                <div className="w-10"></div>
            </div>

            <div className="p-4 space-y-6">
                {/* Add Earning Form */}
                <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-3">{t('log_your_earnings')}</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium text-slate-600" htmlFor="date">{t('date')}</label>
                            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-md" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-600" htmlFor="amount">{t('income_today')}</label>
                            <input type="number" id="amount" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full mt-1 p-2 border border-slate-300 rounded-md" placeholder="0" />
                        </div>
                    </div>
                    <button onClick={handleAddEarning} disabled={!amount} className="w-full py-3 mt-4 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-slate-400">{t('add_earning')}</button>
                </div>
                
                {/* Monthly Summaries */}
                <div className="space-y-3">
                    {sortedMonths.map(month => {
                        const monthData = earningsByMonth[month];
                        const isExpanded = expandedMonth === month;
                        const barWidth = maxMonthlyIncome > 0 ? (monthData.total / maxMonthlyIncome) * 100 : 0;
                        return (
                            <div key={month} className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
                                <div onClick={() => setExpandedMonth(isExpanded ? '' : month)} className="cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold">{month}</p>
                                        <p className="font-bold text-lg text-blue-600">{formatCurrency(monthData.total)}</p>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-3 mt-2"><div className="bg-blue-500 h-3 rounded-full" style={{ width: `${barWidth}%` }}></div></div>
                                </div>
                                {isExpanded && (
                                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-1">
                                        {monthData.earnings.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(earning => (
                                             <div key={earning.id} className="flex justify-between text-sm">
                                                 <span>{new Date(earning.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                                                 <span className="font-semibold">{formatCurrency(earning.amount)}</span>
                                             </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};