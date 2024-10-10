import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Modal, Spinner, Select } from '@/components/ui';
import { Goal } from '@/lib/types/goal';
import { createGoal } from '@/services/goalService';

interface GoalFormProps {
  onClose: () => void;
  className?: string;
}

const GoalForm = ({ onClose, className }: GoalFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [formData, setFormData] = useState<Goal>({
    name: '',
    targetDate: new Date(),
    category: 'weight_loss',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'targetDate') {
      setFormData((prev) => ({ ...prev, [name]: new Date(value as string) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value as string }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setCreateError(null);

    try {
      await createGoal(formData);
      setIsModalOpen(true);
      setIsLoading(false);
      setFormData({ name: '', targetDate: new Date(), category: 'weight_loss' });
    } catch (error) {
      setCreateError((error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className="text-xl font-bold mb-4">Create New Goal</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="targetDate" className="block mb-2">
            Target Date:
          </label>
          <Input
            id="targetDate"
            type="date"
            name="targetDate"
            value={formData.targetDate.toISOString().slice(0, 10)}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2">
            Category:
          </label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            options={['weight_loss', 'muscle_gain', 'distance_running']}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner size="small" color="white" />
          ) : (
            'Create Goal'
          )}
        </Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {createError ? (
          <p className="text-red-500">{createError}</p>
        ) : (
          <p className="text-green-500">Goal created successfully!</p>
        )}
      </Modal>
    </div>
  );
};

export default GoalForm;