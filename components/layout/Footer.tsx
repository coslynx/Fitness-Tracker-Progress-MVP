import Link from 'next/link';

interface FooterProps {
  user: User | null;
}

const Footer = ({ user }: FooterProps) => {
  return (
    <footer className="bg-gray-100 py-4 text-center text-gray-700">
      <div className="container mx-auto">
        <p>&copy; 2024 Fitness Tracker</p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <Link href="/privacy-policy">
              <a className="hover:text-gray-900">Privacy Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/terms-of-service">
              <a className="hover:text-gray-900">Terms of Service</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className="hover:text-gray-900">Contact Us</a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;