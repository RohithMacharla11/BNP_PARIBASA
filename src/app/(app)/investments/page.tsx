import { PortfolioOverview } from '@/components/investments/portfolio-overview';
import { MotionDiv } from '@/components/shared/motion-div';

export default function InvestmentsPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PortfolioOverview />
    </MotionDiv>
  );
}
