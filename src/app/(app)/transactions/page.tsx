import { TransactionTable } from '@/components/transactions/transaction-table';
import { MotionDiv } from '@/components/shared/motion-div';

export default function TransactionsPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TransactionTable />
    </MotionDiv>
  );
}
