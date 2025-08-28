import { PaymentOptions } from '@/components/payments/payment-options';
import { MotionDiv } from '@/components/shared/motion-div';

export default function PaymentsPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <PaymentOptions />
    </MotionDiv>
  );
}
