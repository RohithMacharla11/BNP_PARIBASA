import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const transactions = [
    { id: '1', name: 'Starbucks', date: '2024-07-25', amount: -12.50, status: 'Completed' },
    { id: '2', name: 'Salary Deposit', date: '2024-07-25', amount: 2500.00, status: 'Completed' },
    { id: '3', name: 'Netflix Subscription', date: '2024-07-24', amount: -15.99, status: 'Completed' },
    { id: '4', name: 'ATM Withdrawal', date: '2024-07-23', amount: -100.00, status: 'Completed' },
  ];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your last few transactions.</CardDescription>
      </CardHeader>
      <CardContent>
      <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium">{transaction.name}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${transaction.amount > 0 ? 'text-green-500' : ''}`}>
                    {transaction.amount < 0 ? `-$${Math.abs(transaction.amount).toFixed(2)}` : `$${transaction.amount.toFixed(2)}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </CardContent>
    </Card>
  );
}
