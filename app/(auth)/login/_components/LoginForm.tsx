'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-clients';
import { Chrome, GithubIcon, Loader, Loader2, Send } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  // for loading state of github login
  // useTransition is a hook that returns a tuple of [isPending, startTransition]
  // isPending is a boolean that indicates if the transition is pending
  // startGithubTransition is a function that starts the transition

  const [githubIsPending, startGithubTransition] = useTransition();
  const [googleIsPending, startGoogleTransition] = useTransition();
  const [emailIsPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState('');
  const router = useRouter();
  async function signInWithGithub() {
    startGithubTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: 'github',
          callbackURL: '/',
          fetchOptions: {
            onSuccess: () => {
              toast.success(
                'Signed in with GitHub, redirecting to home page...'
              );
            },
            onError: (error: any) => {
              toast.error(
                error.error.message || 'Failed to sign in with GitHub'
              );
            },
          },
        });
      } catch (error: any) {
        toast.error('Failed to initiate GitHub sign in');
      }
    });
  }
  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: 'google',
          callbackURL: '/',
          fetchOptions: {
            onSuccess: () => {
              toast.success(
                'Signed in with Google, redirecting to home page...'
              );
            },
            onError: (error: any) => {
              toast.error(
                error.error.message || 'Failed to sign in with Google'
              );
            },
          },
        });
      } catch (error: any) {
        toast.error('Failed to initiate Google sign in');
      }
    });
  }
  function signInWithEmail() {
    startEmailTransition(async () => {
      try {
        await authClient.emailOtp.sendVerificationOtp({
          email,
          type: 'sign-in',
          fetchOptions: {
            onSuccess: () => {
              toast.success('Verification email sent');
              router.push(`/verify-request?email=${email}`);
            },
            onError: (error: any) => {
              toast.error(
                error.error.message || 'Failed to send verification email'
              );
            },
          },
        });
      } catch (error: any) {
        toast.error(error.error.message || 'Failed to send verification email');
      }
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>
          Login with your GitHub or Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={githubIsPending}
          onClick={signInWithGithub}
          className="w-full cursor-pointer"
          variant="outline"
        >
          {githubIsPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4 mr-2" />
              Login with GitHub
            </>
          )}
        </Button>
        <Button
          disabled={googleIsPending}
          onClick={signInWithGoogle}
          className="w-full cursor-pointer"
          variant="outline"
        >
          {googleIsPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Chrome className="size-4 mr-2" />
              Login with Google
            </>
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div>
          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              onClick={signInWithEmail}
              disabled={emailIsPending}
              className="w-full cursor-pointer"
            >
              {emailIsPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Send className="size-4 mr-2" />
                  <span>Continue with email</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
