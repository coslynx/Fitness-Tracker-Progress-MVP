import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { Input, Button, Modal, Spinner } from '@/components/ui';
import { User } from '@/lib/types/user';
import { updateUserProfile } from '@/services/userService';

export default function Settings() {
  const { data: session } = useSession();
  const { data: user, isLoading, error } = useUser();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User>(user ?? {
    id: 0,
    email: '',
    password: '',
    goals: [],
  });

  const [updateError, setUpdateError] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
    setUpdateError(null);

    try {
      await updateUserProfile(updatedUser);
      router.refresh();
    } catch (error) {
      setUpdateError((error as Error).message);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error fetching user data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            value={updatedUser.email}
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
            value={updatedUser.password}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {updateError ? (
          <p className="text-red-500">{updateError}</p>
        ) : (
          <p className="text-green-500">Profile updated successfully!</p>
        )}
      </Modal>
    </div>
  );
}