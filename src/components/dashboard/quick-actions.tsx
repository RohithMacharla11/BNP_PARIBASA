import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Plus, CreditCard } from 'lucide-react';

export function QuickActions() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="flex flex-col h-auto">
            <ArrowUpRight className="h-5 w-5 mb-1" />
            <span className="text-xs">Send</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto">
            <Plus className="h-5 w-5 mb-1" />
            <span className="text-xs">Deposit</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto">
            <CreditCard className="h-5 w-5 mb-1" />
            <span className="text-xs">Pay Bill</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
