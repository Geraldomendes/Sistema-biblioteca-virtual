import { AppRoutes } from '../routes/routes';
import { AuthProviderContext } from '../context';

export default function App() {
  return (
    <AuthProviderContext>
      <AppRoutes />
    </AuthProviderContext>
  );
}
