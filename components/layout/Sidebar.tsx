import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/lib/types/user';

interface SidebarProps {
  user: User | null;
}

const Sidebar = ({ user }: SidebarProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Handle closing the sidebar on route changes
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <aside className="bg-gray-100 w-64 shadow-md fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out transform">
      <div className="flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-bold">Fitness Tracker</h1>
        <button onClick={handleToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav
        className={`flex flex-col px-4 py-2 space-y-4 ${
          isOpen ? 'translate-x-0' : 'translate-x-[-64px]'
        } transition-transform duration-300 ease-in-out transform`}
      >
        <Link href="/dashboard">
          <a className="text-gray-700 hover:text-gray-900 font-medium">
            Dashboard
          </a>
        </Link>
        <Link href="/goals">
          <a className="text-gray-700 hover:text-gray-900 font-medium">
            Goals
          </a>
        </Link>
        <Link href="/progress">
          <a className="text-gray-700 hover:text-gray-900 font-medium">
            Progress
          </a>
        </Link>
        {user && (
          <Link href="/community">
            <a className="text-gray-700 hover:text-gray-900 font-medium">
              Community
            </a>
          </Link>
        )}
        {user && (
          <Link href="/settings">
            <a className="text-gray-700 hover:text-gray-900 font-medium">
              Settings
            </a>
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;