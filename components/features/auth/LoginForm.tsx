import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Spinner, Modal } from '@/components/ui';
import { useUser } from '@/lib/hooks/useUser';
import { User } from '@/lib/types/user';
import { login } from '@/services/userService';

interface LoginFormProps {
  className?: string;
}

const LoginForm = ({ className }: LoginFormProps) => {
  const router = useRouter();
  const { data: user, isLoading: userLoading, error: userError } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      await login(formData);
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      setLoginError((error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className="text-xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password:
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner size="small" color="white" />
          ) : (
            'Log In'
          )}
        </Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {loginError ? (
          <p className="text-red-500">{loginError}</p>
        ) : (
          <p className="text-green-500">
            Login successful! Redirecting to dashboard...
          </p>
        )}
      </Modal>
    </div>
  );
};

export default LoginForm;