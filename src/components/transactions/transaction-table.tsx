'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { File, ListFilter } from 'lucide-react';

const allTransactions = [
    { id: '1', name: 'Starbucks', date: '2024-07-25', amount: -12.50, status: 'Completed', type: 'Food & Drink' },
    { id: '2', name: 'Salary Deposit', date: '2024-07-25', amount: 2500.00, status: 'Completed', type: 'Income' },
    { id: '3', name: 'Netflix Subscription', date: '2024-07-24', amount: -15.99, status: 'Completed', type: 'Entertainment' },
    { id: '4', name: 'ATM Withdrawal', date: '2024-07-23', amount: -100.00, status: 'Completed', type: 'Cash' },
    { id: '5', name: 'Amazon Purchase', date: '2024-07-22', amount: -78.45, status: 'Pending', type: 'Shopping' },
    { id: '6', name: 'Gas Station', date: '2024-07-21', amount: -45.30, status: 'Completed', type: 'Transport' },
    { id: '7', name: 'Rent Payment', date: '2024-07-20', amount: -1200.00, status: 'Completed', type: 'Bills' },
    { id: '8', 'name': 'Refund from H&M', date: '2024-07-19', amount: 45.99, status: 'Completed', type: 'Shopping'},
];

export function TransactionTable() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'All' | 'Completed' | 'Pending'>('All');

  const filteredTransactions = allTransactions
    .filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((t) => statusFilter === 'All' || t.status === statusFilter);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          A list of all your recent transactions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4 mb-4">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={statusFilter === 'All'} onCheckedChange={() => setStatusFilter('All')}>All</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={statusFilter === 'Completed'} onCheckedChange={() => setStatusFilter('Completed')}>Completed</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={statusFilter === 'Pending'} onCheckedChange={() => setStatusFilter('Pending')}>Pending</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.name}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  <Badge variant={transaction.status === 'Completed' ? 'default' : 'secondary'}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell className={`text-right font-semibold ${transaction.amount > 0 ? 'text-green-500' : ''}`}>
                  {transaction.amount < 0 ? `-$${Math.abs(transaction.amount).toFixed(2)}` : `$${transaction.amount.toFixed(2)}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{filteredTransactions.length}</strong> of <strong>{allTransactions.length}</strong> transactions
        </div>
      </CardFooter>
    </Card>
  );
}
