import { ChatInterface } from '@/components/chat/chat-interface';
import { MotionDiv } from '@/components/shared/motion-div';

export default function ChatPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[calc(100vh-8rem)]"
    >
      <ChatInterface />
    </MotionDiv>
  );
}
