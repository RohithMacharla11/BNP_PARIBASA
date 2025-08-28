'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../ui/button';

const chartData = [
    { date: 'Jan 24', value: 10000 },
    { date: 'Feb 24', value: 10500 },
    { date: 'Mar 24', value: 10200 },
    { date: 'Apr 24', value: 11000 },
    { date: 'May 24', value: 11500 },
    { date: 'Jun 24', value: 11800 },
    { date: 'Jul 24', value: 12500 },
];
  
const chartConfig = {
    value: {
        label: "Portfolio Value",
        color: "hsl(var(--chart-1))",
    },
};

const holdings = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, price: 195.50, value: 1955.00, change: '+1.25%' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 5, price: 150.75, value: 753.75, change: '-0.50%' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', shares: 15, price: 250.00, value: 3750.00, change: '+3.10%' },
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', shares: 5, price: 450.20, value: 2251.00, change: '+0.80%' },
    { symbol: 'BTC', name: 'Bitcoin', shares: 0.05, price: 65000, value: 3250.00, change: '-2.20%' },
];

export function PortfolioOverview() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$12,500.00</span>
            <span className="text-sm font-semibold text-green-500">+ $2,500.00 (25%) all time</span>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <defs>
                    <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="5%"
                        stopColor="var(--color-value)"
                        stopOpacity={0.8}
                    />
                    <stop
                        offset="95%"
                        stopColor="var(--color-value)"
                        stopOpacity={0.1}
                    />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="var(--color-value)" fill="url(#fillValue)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Current Holdings</CardTitle>
            <CardDescription>Your investment assets.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Shares</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="text-right">24h Change</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {holdings.map(h => (
                        <TableRow key={h.symbol}>
                            <TableCell>
                                <div className="font-bold">{h.symbol}</div>
                                <div className="text-xs text-muted-foreground">{h.name}</div>
                            </TableCell>
                            <TableCell>{h.shares}</TableCell>
                            <TableCell>${h.price.toFixed(2)}</TableCell>
                            <TableCell>${h.value.toFixed(2)}</TableCell>
                            <TableCell className={`text-right font-semibold ${h.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {h.change}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        <CardFooter className="justify-center">
            <Button>Trade Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
