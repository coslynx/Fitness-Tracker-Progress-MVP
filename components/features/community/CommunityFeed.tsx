import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUser } from '@/lib/hooks/useUser';
import { CommunityPost, CommunityPostForm } from '@/components/features/community';
import { Spinner } from '@/components/ui';
import { User } from '@/lib/types/user';
import { CommunityPostType } from '@/lib/types/communityPost';
import { useCommunityPosts } from '@/lib/hooks/useCommunityPosts';
import { createCommunityPost } from '@/services/communityPostService';

interface CommunityFeedProps {
  user: User | null;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({ user }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: communityPosts, isLoading, error } = useCommunityPosts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [formData, setFormData] = useState<CommunityPostType>({
    content: '',
    userId: 0, // User ID for the post
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, content: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateError(null);

    try {
      await createCommunityPost(formData);
      setFormData({ content: '' });
      setIsModalOpen(false);
    } catch (error) {
      setCreateError((error as Error).message);
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
        <p className="text-red-500">Error fetching community posts.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Community Feed</h2>
      {session?.user?.id && (
        <Button onClick={() => setIsModalOpen(true)}>Create Post</Button>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="content" className="block mb-2">
              Content:
            </label>
            <Input
              id="content"
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit">Create Post</Button>
          {createError && <p className="text-red-500">{createError}</p>}
        </form>
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communityPosts.map((post) => (
          <CommunityPost key={post.id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;