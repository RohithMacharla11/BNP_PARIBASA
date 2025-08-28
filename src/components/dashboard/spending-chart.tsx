'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const chartData = [
  { month: 'January', groceries: 400, transport: 150, entertainment: 200, bills: 300 },
  { month: 'February', groceries: 350, transport: 120, entertainment: 250, bills: 280 },
  { month: 'March', groceries: 420, transport: 180, entertainment: 180, bills: 320 },
  { month: 'April', groceries: 380, transport: 160, entertainment: 220, bills: 300 },
  { month: 'May', groceries: 450, transport: 140, entertainment: 210, bills: 310 },
  { month: 'June', groceries: 410, transport: 170, entertainment: 230, bills: 290 },
];

const chartConfig = {
  groceries: {
    label: 'Groceries',
    color: 'hsl(var(--chart-1))',
  },
  transport: {
    label: 'Transport',
    color: 'hsl(var(--chart-2))',
  },
  entertainment: {
    label: 'Entertainment',
    color: 'hsl(var(--chart-3))',
  },
  bills: {
    label: 'Bills',
    color: 'hsl(var(--chart-4))',
  },
};

export function SpendingChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="groceries" stackId="a" fill="var(--color-groceries)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="transport" stackId="a" fill="var(--color-transport)" radius={[4, 4, 0, 0]}/>
          <Bar dataKey="entertainment" stackId="a" fill="var(--color-entertainment)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="bills" stackId="a" fill="var(--color-bills)" radius={[4, 4, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
