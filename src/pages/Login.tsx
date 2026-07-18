import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock, ArrowRight, Sparkles as SparklesIcon } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { label: 'Administrator', email: 'admin@example.com', password: 'admin', route: '/admin', icon: ShieldCheck, hint: 'Full access — employees, payroll, departments, leaves' },
  { label: 'Employee', email: 'user@example.com', password: 'user', route: '/dashboard', icon: User, hint: 'Personal dashboard — tasks, pay info, leaves, team' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signIn = (em: string, pw: string) => {
    const account = DEMO_ACCOUNTS.find((a) => a.email === em && a.password === pw);
    if (account) {
      navigate(account.route);
    } else {
      setError('Invalid email or password. Use one of the demo accounts on the left.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    signIn(email, password);
  };

  const inputClass =
    'w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-shadow';

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-100 [background:radial-gradient(70rem_40rem_at_80%_-10%,rgba(99,102,241,0.15),transparent_60%),radial-gradient(60rem_40rem_at_-10%_110%,rgba(59,130,246,0.15),transparent_60%),#f1f5f9]">
      <div className="w-full max-w-4xl grid grid-cols-[1fr_1.1fr] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-white bg-white">

        {/* Demo credentials panel */}
        <div className="bg-slate-900 text-white p-10 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
              <SparklesIcon className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-bold text-lg leading-tight">Employee Portal</h2>
              <p className="text-xs text-slate-400">Employee Management System</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 mb-5">
            This is a demo build. Sign in with either account — click a card to fill the form.
          </p>

          <div className="space-y-4">
            {DEMO_ACCOUNTS.map(({ label, email: em, password: pw, icon: Icon, hint }) => (
              <button
                key={em}
                type="button"
                onClick={() => { setEmail(em); setPassword(pw); setError(null); }}
                className="w-full text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-400/40 p-4 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold text-sm">{label}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <p className="text-xs font-mono text-slate-300">{em} · {pw}</p>
                <p className="text-[11px] text-slate-500 mt-1.5">{hint}</p>
              </button>
            ))}
          </div>

          <p className="mt-auto pt-8 text-[11px] text-slate-500">
            © {new Date().getFullYear()} Employee Management System
          </p>
        </div>

        {/* Sign-in form */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500 mt-1 mb-8">Sign in to continue to your dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" size={18} />
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className={inputClass} />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-slate-900/15"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
