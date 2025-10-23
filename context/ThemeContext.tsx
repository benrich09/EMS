import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';
type ThemeProviderProps = { children: ReactNode; defaultTheme?: Theme; storageKey?: string };

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'theme' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // Sync initial theme from storage/system
    const root = document.documentElement;
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const initialTheme = storedTheme || (defaultTheme === 'system' ? systemTheme : defaultTheme);
    setTheme(initialTheme);

    if (initialTheme === 'dark' || (initialTheme === 'system' && systemTheme === 'dark')) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    const root = document.documentElement;

    if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
      localStorage.setItem(storageKey, 'dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
      localStorage.setItem(storageKey, 'light');
    } else {
      root.classList.remove('dark');
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};