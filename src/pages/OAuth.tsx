import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '~/components/auth/auth-provider';
import { StorageKey } from '~/constants/StorageKey';
import { useDidUpdateEffect } from '~/hooks/useDidUpdateEffect';

const OAuth = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  // Auth
  const { setAuth } = useAuth();

  // Handle login by oauth
  useDidUpdateEffect(() => {
    localStorage.setItem(
      StorageKey.ACCESS_TOKEN,
      searchParams.get('access_token') as string
    );
    localStorage.setItem(
      StorageKey.REFRESH_TOKEN,
      searchParams.get('refresh_token') as string
    );

    // set auth
    setAuth({ user: JSON.parse(searchParams.get('user') as string) });

    // toast
    toast.success(`Successfully login with ${params.resourceServer}`);
  }, []);

  return <Navigate to={'/'} />;
};

export default OAuth;
