import { AppRoutes } from '../routes/routes';
import { AuthProviderContext } from '../context';
import Accessibilik from 'accessibility-react-widget';

export default function App() {
  return (
    <AuthProviderContext>
      <AppRoutes />
      <Accessibilik />
    </AuthProviderContext>
  );
}
