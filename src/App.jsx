import AppRoutes from './routes/AppRoutes';
import LenisProvider from './providers/LenisProvider';
import './index.css';

export default function App() {
  return (
    <LenisProvider>
      <AppRoutes />
    </LenisProvider>
  );
}
