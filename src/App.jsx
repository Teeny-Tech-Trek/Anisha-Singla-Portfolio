import AppRoutes from './routes/AppRoutes';
import LenisProvider from './providers/LenisProvider';
import { ChatbotProvider } from './components/chatbot/ChatbotProvider';
import AssistantLayout from './components/chatbot/AssistantLayout';
import './index.css';

export default function App() {
  return (
    <ChatbotProvider>
      <LenisProvider>
        <AssistantLayout>
          <AppRoutes />
        </AssistantLayout>
      </LenisProvider>
    </ChatbotProvider>
  );
}
