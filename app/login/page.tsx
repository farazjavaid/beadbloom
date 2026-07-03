import Link from 'next/link';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { AuthCard } from '@/components/AuthCard';
import { AuthForm } from '@/components/AuthForm';

export const metadata = {
  title: 'Sign in — BeadBloom',
};

export default function LoginPage() {
  return (
    <>
      <AnimatedBackground />
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to your BeadBloom account"
        footer={
          <>
            New here?{' '}
            <Link href="/signup" className="font-semibold text-accent hover:underline">
              Create an account
            </Link>
          </>
        }
      >
        <AuthForm mode="login" />
      </AuthCard>
    </>
  );
}