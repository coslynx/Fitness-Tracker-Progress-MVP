import { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/lib/types/user';
import { useSession } from 'next-auth/react';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUserSession: () => {},
  clearUserSession: () => {},
});

interface AuthContextType {
  user: User | null;
  setUserSession: (user: User) => void;
  clearUserSession: () => void;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();

  const setUserSession = (user: User) => {
    setUser(user);
  };

  const clearUserSession = () => {
    setUser(null);
  };

  useEffect(() => {
    if (session) {
      setUserSession(session.user as User);
    } else {
      clearUserSession();
    }
  }, [session]);

  return { user, setUserSession, clearUserSession };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, setUserSession, clearUserSession } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUserSession, clearUserSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;