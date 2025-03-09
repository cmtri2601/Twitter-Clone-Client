import { useEffect, useRef } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '~/components/auth/auth-provider';
import { StorageKey } from '~/constants/StorageKey';

const OAuth = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const toastId = useRef<string | number | null>(null);

  // Auth
  const { setAuth } = useAuth();

  // Handle login by oauth
  useEffect(() => {
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

    // handle dismiss toast
    if (toastId.current) toast.dismiss(toastId.current);

    // clean up fn
    return () => {
      toastId.current = toast.success(
        `Successfully login with ${params.resourceServer}`
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigate to={'/'} />;
};

export default OAuth;
