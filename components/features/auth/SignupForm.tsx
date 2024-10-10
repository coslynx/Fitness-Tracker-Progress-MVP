import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Spinner, Modal } from '@/components/ui';
import { User } from '@/lib/types/user';
import { signup } from '@/services/userService';

interface SignupFormProps {
  className?: string;
}

const SignupForm = ({ className }: SignupFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signupError, setSignupError] = useState(null);
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
    setSignupError(null);

    try {
      await signup(formData);
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      setSignupError((error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
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
            'Sign Up'
          )}
        </Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {signupError ? (
          <p className="text-red-500">{signupError}</p>
        ) : (
          <p className="text-green-500">
            Account created successfully! You can now log in.
          </p>
        )}
      </Modal>
    </div>
  );
};

export default SignupForm;