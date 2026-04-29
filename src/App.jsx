import AppRoutes from './routes/AppRoutes';
import LenisProvider from './providers/LenisProvider';
import ChatButton from './components/chatbot/components/ChatButton';
import './index.css';

export default function App() {
  return (
    <LenisProvider>
      <AppRoutes />
      <ChatButton />
    </LenisProvider>
  );
}
