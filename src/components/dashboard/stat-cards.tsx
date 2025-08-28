import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Wallet, PiggyBank, CreditCard } from 'lucide-react';

const stats = [
  { title: 'Total Balance', value: '$12,450.00', icon: Wallet, change: '+2.5%' },
  { title: 'Monthly Spending', value: '$1,850.75', icon: CreditCard, change: '-10.1%' },
  { title: 'Savings', value: '$5,200.00', icon: PiggyBank, change: '+5.0%' },
  { title: 'Income', value: '$4,500.00', icon: DollarSign, change: '+0.0%' },
];

export function StatCards() {
  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
