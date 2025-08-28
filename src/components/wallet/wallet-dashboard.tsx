'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, ArrowUpRight, QrCode, X, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

const transactions = [
    { id: '1', type: 'Received', from: 'Alex Doe', date: '2024-07-28', amount: 50.00, category: 'Friends' },
    { id: '2', type: 'Paid', from: 'Starbucks', date: '2024-07-27', amount: -12.50, category: 'Food' },
    { id: '3', type: 'Added', from: 'Bank Transfer', date: '2024-07-26', amount: 200.00, category: 'Top-up' },
    { id: '4', type: 'Paid', from: 'Uber', date: '2024-07-25', amount: -25.50, category: 'Travel' },
];

export function WalletDashboard() {
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isQrScannerOpen) {
        const getCameraPermission = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setHasCameraPermission(true);
    
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings.',
            });
          }
        };
    
        getCameraPermission();
    } else {
        // Stop camera stream when dialog is closed
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }
  }, [isQrScannerOpen, toast]);

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>My Wallet</CardTitle>
                <CardDescription>Your digital wallet for seamless payments.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-sm text-muted-foreground">Total Balance</p>
                    <p className="text-4xl font-bold">$450.75</p>
                </div>
                <div className="flex gap-2">
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Money</Button>
                    <Button variant="outline"><ArrowUpRight className="mr-2 h-4 w-4" /> Send Money</Button>
                    <Button variant="outline" size="icon" onClick={() => setIsQrScannerOpen(true)}>
                        <QrCode className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Integrated with Loyalty Points: <span className="font-semibold text-primary">1,250 pts</span>
                </p>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Recent Wallet Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Details</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((t) => (
                        <TableRow key={t.id}>
                            <TableCell>
                                <div className="font-medium">{t.type} {t.type !== 'Added' ? 'from' : ''} {t.from}</div>
                                <div className="text-sm text-muted-foreground">{t.date}</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{t.category}</Badge>
                            </TableCell>
                            <TableCell className={`text-right font-semibold ${t.amount > 0 ? 'text-green-500' : ''}`}>
                                {t.amount < 0 ? `-$${Math.abs(t.amount).toFixed(2)}` : `+$${t.amount.toFixed(2)}`}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        {/* QR Scanner Dialog */}
        <Dialog open={isQrScannerOpen} onOpenChange={setIsQrScannerOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Scan QR to Pay</DialogTitle>
                    <DialogDescription>
                        Position the QR code within the frame to scan it.
                    </DialogDescription>
                </DialogHeader>
                <div className="relative aspect-square w-full bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    <div className="absolute inset-0 border-8 border-primary/50 rounded-lg" />
                    {hasCameraPermission === false && (
                         <Alert variant="destructive" className="m-4">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera access to use this feature.
                            </AlertDescription>
                         </Alert>
                    )}
                </div>
                 <DialogFooter>
                    <Button variant="outline" onClick={() => setIsQrScannerOpen(false)}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
