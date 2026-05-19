import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserByEmail, registerUser, LocalUser } from '../data/mockStore';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'user' | 'admin';
};

type AuthContextType = {
  session: { user: Profile } | null;
  user: Profile | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (data: { email: string; password: string; full_name: string; phone: string }) => Promise<{ error?: string }>;
  signOut: () => void;
  refreshProfile: () => void;
};

const CURRENT_USER_KEY = 'pizzacraft_current_user';

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: () => {},
  refreshProfile: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (raw) {
        const saved: Profile = JSON.parse(raw);
        setProfile(saved);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  function toProfile(u: LocalUser): Profile {
    return { id: u.id, email: u.email, full_name: u.full_name, phone: u.phone, role: u.role };
  }

  async function signIn(email: string, password: string): Promise<{ error?: string }> {
    const user = getUserByEmail(email);
    if (!user) return { error: 'No account found with that email.' };
    if (user.password !== password) return { error: 'Incorrect password.' };
    const p = toProfile(user);
    setProfile(p);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(p));
    return {};
  }

  async function signUp(data: { email: string; password: string; full_name: string; phone: string }): Promise<{ error?: string }> {
    if (getUserByEmail(data.email)) return { error: 'An account with this email already exists.' };
    const newUser = registerUser({ ...data, role: 'user' });
    const p = toProfile(newUser);
    setProfile(p);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(p));
    return {};
  }

  function signOut() {
    setProfile(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  function refreshProfile() {
    if (!profile) return;
    const u = getUserByEmail(profile.email);
    if (u) setProfile(toProfile(u));
  }

  const session = profile ? { user: profile } : null;

  return (
    <AuthContext.Provider value={{ session, user: profile, profile, loading, signIn, signUp, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
