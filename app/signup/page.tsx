import Link from 'next/link';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { AuthCard } from '@/components/AuthCard';
import { AuthForm } from '@/components/AuthForm';

export const metadata = {
  title: 'Create account — BeadBloom',
};

export default function SignupPage() {
  return (
    <>
      <AnimatedBackground />
      <AuthCard
        title="Join BeadBloom"
        subtitle="Create an account to leave reviews & save favorites"
        footer={
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Sign in
            </Link>
          </>
        }
      >
        <AuthForm mode="signup" />
      </AuthCard>
    </>
  );
}