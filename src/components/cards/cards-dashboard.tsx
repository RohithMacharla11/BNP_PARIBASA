'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, Unlock, Globe, Settings2, PlusCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

const cardData = [
    {
      id: 1,
      type: 'debit',
      bank: 'ApexBank',
      number: '**** **** **** 1234',
      expiry: '12/26',
      balance: 4890.50,
      limit: 10000,
      theme: 'bg-blue-600',
    },
    {
      id: 2,
      type: 'credit',
      bank: 'ApexBank Rewards',
      number: '**** **** **** 5678',
      expiry: '08/25',
      balance: 1250.75,
      dueDate: '2024-08-15',
      limit: 5000,
      theme: 'bg-gray-800',
    }
];

const transactions = [
    { id: '1', name: 'Apple Store', date: '2024-07-28', amount: -999.00 },
    { id: '2', name: 'Amazon.com', date: '2024-07-27', amount: -42.50 },
    { id: '3', name: 'Whole Foods', date: '2024-07-26', amount: -112.30 },
];

export function CardsDashboard() {
  const [selectedCard, setSelectedCard] = useState(cardData[0]);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold">My Cards</h1>
            <p className="text-muted-foreground">Manage your physical and virtual cards.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Card
        </Button>
      </div>

      {/* Cards Carousel */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {cardData.map(card => (
            <motion.div 
                key={card.id} 
                onClick={() => setSelectedCard(card)}
                className={cn(
                    "relative w-72 h-44 rounded-xl text-white p-4 flex flex-col justify-between shrink-0 cursor-pointer transition-all duration-300",
                    card.theme,
                    selectedCard.id === card.id ? 'ring-4 ring-primary ring-offset-2 scale-105' : 'opacity-70'
                )}
                layoutId={`card-${card.id}`}
            >
                <div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">{card.bank}</span>
                        <Image src="/img/visa-logo.png" data-ai-hint="visa logo" alt="Visa" width={40} height={25} />
                    </div>
                    <span className="text-xs capitalize">{card.type} Card</span>
                </div>
                <div>
                    <div className="text-lg font-mono tracking-widest flex items-center gap-2">
                        <span>{showDetails ? card.number.replace(/\*/g, '•') : card.number}</span>
                    </div>
                     <div className="flex justify-between text-sm">
                        <span>Expires: {card.expiry}</span>
                        <span>CVV: {showDetails ? '123' : '***'}</span>
                    </div>
                </div>
            </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
            key={selectedCard.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            className="grid lg:grid-cols-3 gap-6"
         >
          {/* Card Details & Info */}
          <div className="lg:col-span-1 space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>{selectedCard.bank} {selectedCard.type === 'credit' ? 'Credit' : 'Debit'} Card</CardTitle>
                </CardHeader>
                 <CardContent>
                    {selectedCard.type === 'credit' ? (
                        <>
                            <div className="text-sm text-muted-foreground">Current Balance</div>
                            <div className="text-2xl font-bold">${selectedCard.balance.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">Due Date: {selectedCard.dueDate}</div>
                        </>
                    ) : (
                         <>
                            <div className="text-sm text-muted-foreground">Available Balance</div>
                            <div className="text-2xl font-bold">${selectedCard.balance.toFixed(2)}</div>
                        </>
                    )}
                    <div className="mt-4">
                        <Label>Spending Limit</Label>
                        <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(selectedCard.balance / selectedCard.limit) * 100}%` }}></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 text-right">${selectedCard.limit.toFixed(2)}</div>
                    </div>
                </CardContent>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Card Controls</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="lock-card" className="flex items-center gap-2"><Lock /> Lock Card</Label>
                        <Switch id="lock-card" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <Label htmlFor="international" className="flex items-center gap-2"><Globe /> International Usage</Label>
                        <Switch id="international" defaultChecked />
                    </div>
                     <Separator />
                     <Button variant="outline" className="w-full">
                        <Settings2 className="mr-2 h-4 w-4" /> Set Spending Limits
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setShowDetails(!showDetails)}>
                        {showDetails ? <EyeOff className="mr-2 h-4 w-4"/> : <Eye className="mr-2 h-4 w-4"/>}
                        {showDetails ? 'Hide Card Details' : 'Show Card Details'}
                    </Button>
                </CardContent>
             </Card>
          </div>
          {/* Transaction History */}
          <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Recent transactions made with this card.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map(t => (
                                <TableRow key={t.id}>
                                    <TableCell className="font-medium">{t.name}</TableCell>
                                    <TableCell>{t.date}</TableCell>
                                    <TableCell className="text-right font-semibold text-red-500">
                                       ${t.amount.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
