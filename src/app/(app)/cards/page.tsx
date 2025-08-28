import { CardsDashboard } from '@/components/cards/cards-dashboard';
import { MotionDiv } from '@/components/shared/motion-div';

export default function CardsPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <CardsDashboard />
    </MotionDiv>
  );
}
