import AppRoutes from './routes/AppRoutes';
import LenisProvider from './providers/LenisProvider';
import { ChatbotProvider } from './components/chatbot/ChatbotProvider';
import AssistantLayout from './components/chatbot/AssistantLayout';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

export default function App() {
  return (
    <ThemeProvider>
      <ChatbotProvider>
        <LenisProvider>
          <AssistantLayout>
            <AppRoutes />
          </AssistantLayout>
        </LenisProvider>
      </ChatbotProvider>
    </ThemeProvider>
  );
}
