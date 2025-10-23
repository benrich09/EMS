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
      className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      style={{
        borderColor: theme === 'dark' ? '#f3f4f6' : '#374151',  // gray-200 / gray-700
        color: theme === 'dark' ? '#111827' : '#6b7280',        // gray-900 / gray-500
        backgroundColor: theme === 'dark' ? '#f9fafb' : '#1f2937', // gray-50 / gray-800
      }}
    >
      {theme === 'dark' ? <FiSun/> : <FiMoon/>} 
    </button>
  );
}