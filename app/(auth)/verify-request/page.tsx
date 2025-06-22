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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { authClient } from '@/lib/auth-clients';
import { Loader2, Send } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function VerifyRequestPage() {
  const [otp, setOtp] = useState('');
  const [otpIsPending, startOtpTransition] = useTransition();
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get('email') as string;
  function verifyOtp() {
    startOtpTransition(async () => {
      try {
        await authClient.signIn.emailOtp({
          email,
          otp,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Email verified');
              router.push('/');
            },
            onError: () => {
              toast.error('Invalid OTP');
            },
          },
        });
      } catch (error) {
        toast.error('Invalid OTP');
      }
    });
  }
  return (
    <Card className="w-full max-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">
          Verify your email
        </CardTitle>
        <CardDescription>
          OTP has been sent to your email address. Please enter the code below
          to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            textAlign="center"
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>
        <Button
          className="w-full cursor-pointer"
          onClick={verifyOtp}
          disabled={otpIsPending || !otp || otp.length < 6}
        >
          {otpIsPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <span>Verify Account</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
