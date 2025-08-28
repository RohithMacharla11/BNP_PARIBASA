import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { StatCards } from '@/components/dashboard/stat-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MotionDiv } from '@/components/shared/motion-div';

export default function DashboardPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
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
