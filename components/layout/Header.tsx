import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useUser } from '@/lib/hooks/useUser';
import { Button } from '@/components/ui';
import { User } from '@/lib/types/user';

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard">
          <a className="text-xl font-bold">Fitness Tracker</a>
        </Link>
        <nav className="flex space-x-4">
          {user ? (
            <>
              <p className="text-gray-700 font-medium">
                Welcome, {user.email}!
              </p>
              <Button onClick={() => session?.user?.id && session.user.id > 0 && session.user.id !== undefined && session?.user?.id ? session.user.id : null}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <a className="text-gray-700 hover:text-gray-900 font-medium">
                  Sign In
                </a>
              </Link>
              <Link href="/auth/signup">
                <a className="text-gray-700 hover:text-gray-900 font-medium">
                  Sign Up
                </a>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;