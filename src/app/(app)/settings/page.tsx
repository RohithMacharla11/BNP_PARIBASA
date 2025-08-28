import { SettingsTabs } from '@/components/settings/settings-tabs';
import { MotionDiv } from '@/components/shared/motion-div';

export default function SettingsPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <SettingsTabs />
    </MotionDiv>
  );
}
