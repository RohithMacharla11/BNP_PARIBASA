import { CreditScore } from '@/components/credit/credit-score';
import { MotionDiv } from '@/components/shared/motion-div';

export default function CreditPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <CreditScore />
    </MotionDiv>
  );
}
