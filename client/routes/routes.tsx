import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { useAuth } from '../context/index';





export function AppRoutes() {
  const { tokenState } = useAuth();
  return (
    <>
      {
        !!tokenState ? <PrivateRoutes /> : <PublicRoutes />
      }
    </>
  );
}
