import { useTheme } from '../context/ThemeContext.tsx';
import { FiSun, FiMoon } from 'react-icons/fi';  // Feather Icons: Sun and Moon

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      style={{
        backgroundColor: theme === 'dark' ? '#f9fafb' : '#1f2937', // gray-50 / gray-800
      }}
    >
      {theme === 'dark' ? <FiSun className="w-6 h-6"/> : <FiMoon className="w-6 h-6"/>} 
    </button>
  );
}