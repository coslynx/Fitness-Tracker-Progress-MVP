import { useState, useEffect } from 'react';
import { ProgressEntry } from '@/lib/types/progress';
import { Input, Button, Modal, Spinner } from '@/components/ui';
import { useProgress } from '@/lib/hooks/useProgress';
import { createProgressEntry } from '@/services/progressService';

interface ProgressLogProps {
  progress: ProgressEntry[];
}

const ProgressLog: React.FC<ProgressLogProps> = ({ progress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [formData, setFormData] = useState({
    goalId: '',
    value: '',
    date: new Date(),
  });
  const { addProgressEntry, isLoading, error } = useProgress();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
    setCreateError(null);

    try {
      await createProgressEntry(formData);
      setFormData({ goalId: '', value: '', date: new Date() });
      addProgressEntry(formData); // Update local state
      setIsModalOpen(false);
    } catch (error) {
      setCreateError((error as Error).message);
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
        <p className="text-red-500">Error fetching progress data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Progress Log</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {progress.map((entry) => (
          <div key={entry.id} className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600">Date: {entry.date.toLocaleDateString()}</p>
            <p className="text-gray-600">Value: {entry.value}</p>
            <p className="text-gray-600">Goal: {entry.goalId}</p>
          </div>
        ))}
      </div>
      <Button onClick={() => setIsModalOpen(true)}>Add New Progress Entry</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="goalId" className="block mb-2">
              Goal ID:
            </label>
            <Input
              id="goalId"
              type="text"
              name="goalId"
              value={formData.goalId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="value" className="block mb-2">
              Value:
            </label>
            <Input
              id="value"
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-2">
              Date:
            </label>
            <Input
              id="date"
              type="date"
              name="date"
              value={formData.date.toISOString().slice(0, 10)}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Add Entry</Button>
          {createError && <p className="text-red-500">{createError}</p>}
        </form>
      </Modal>
    </div>
  );
};

export default ProgressLog;