'use client';

import { authClient } from '@/lib/auth-clients';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useSignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          toast.success('Signed out successfully');
        },
        onError: (error: any) => {
          toast.error(error.error.message || 'Failed to sign out');
        },
      },
    });
  };

  return handleSignOut;
}
