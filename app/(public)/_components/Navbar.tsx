'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.png';
import { ThemeToggle } from '@/components/ui/themeToggle';
import { authClient } from '@/lib/auth-clients';
import { buttonVariants } from '@/components/ui/button';
import { UserDropdown } from './UserDropdown';

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Courses',
    href: '/courses',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = !!session;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60 py-4">
      <div className="container flex items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-x-2 mr-4">
          <Image src={Logo} alt="Logo" className="rounded-lg size-9" />
          <span className="font-bold">IQ LMS</span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : isAuthenticated ? (
              <UserDropdown />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: 'secondary' })}
                >
                  Login
                </Link>
                <Link href="/register" className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
