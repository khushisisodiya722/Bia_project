import React, { useContext } from 'react';
import { HomeIcon, CoursesIcon, WalletIcon, CareerIcon, ProfileIcon, SchemesIcon } from '../constants';
import { Screen } from '../types';
import { LanguageContext } from '../App';

interface BottomNavBarProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  screen: Screen;
  isActive: boolean;
  onClick: (screen: Screen) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, screen, isActive, onClick }) => (
  <button
    onClick={() => onClick(screen)}
    className={`flex flex-col items-center justify-center w-1/6 transition-colors duration-200 ${
      isActive ? 'text-blue-600' : 'text-gray-500'
    }`}
    aria-label={label}
    aria-current={isActive ? 'page' : undefined}
  >
    <Icon className="w-6 h-6 mb-1" />
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeScreen, setActiveScreen }) => {
  const { t } = useContext(LanguageContext);

  const navItems = [
    { icon: HomeIcon, label: t('home'), screen: Screen.Home },
    { icon: CoursesIcon, label: t('courses'), screen: Screen.Courses },
    { icon: SchemesIcon, label: t('schemes'), screen: Screen.GovernmentSchemes },
    { icon: WalletIcon, label: t('wallet'), screen: Screen.Wallet },
    { icon: CareerIcon, label: t('career'), screen: Screen.Jobs },
    { icon: ProfileIcon, label: t('profile'), screen: Screen.Profile },
  ];
  
  const isFinanceScreen = [Screen.Wallet, Screen.DailyIncomeTracker].includes(activeScreen);

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white border-t border-gray-200 flex justify-around items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          screen={item.screen}
          isActive={item.screen === Screen.Wallet ? isFinanceScreen : activeScreen === item.screen}
          onClick={setActiveScreen}
        />
      ))}
    </nav>
  );
};

export default BottomNavBar;