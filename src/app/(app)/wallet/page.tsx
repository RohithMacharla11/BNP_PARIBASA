import { WalletDashboard } from '@/components/wallet/wallet-dashboard';
import { MotionDiv } from '@/components/shared/motion-div';

export default function WalletPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
        <WalletDashboard />
    </MotionDiv>
  );
}
