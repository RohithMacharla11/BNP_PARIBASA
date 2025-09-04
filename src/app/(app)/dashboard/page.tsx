"use client";
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { StatCards } from '@/components/dashboard/stat-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MotionDiv } from '@/components/shared/motion-div';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage() {
  const { user, loading } = useAuth({ protect: true });
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    setLogoutLoading(false);
    router.push('/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-end items-center gap-4">
        {user && <span className="text-sm text-gray-600">{user.email}</span>}
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors shadow"
        >
          {logoutLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
      <WelcomeHeader />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCards />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Spending Summary</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SpendingChart />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <QuickActions />
          <RecentTransactions />
        </div>
      </div>
    </MotionDiv>
  );
}
