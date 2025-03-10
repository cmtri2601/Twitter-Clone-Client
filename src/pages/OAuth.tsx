import { useEffect, useRef } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '~/components/auth/Auth';

const OAuth = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const toastId = useRef<string | number | null>(null);

  // Auth
  const { authenticate } = useAuth();

  // Get query
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const user = JSON.parse(searchParams.get('user') as string);

  // Handle login by oauth
  useEffect(() => {
    //  Check if have queries
    if (accessToken && refreshToken && user) {
      authenticate(accessToken, refreshToken, user);
    }

    // handle dismiss toast
    if (toastId.current) toast.dismiss(toastId.current);

    // clean up fn
    return () => {
      if (accessToken && refreshToken && user) {
        toastId.current = toast.success(
          `Successfully login with ${params.resourceServer}`
        );
      } else {
        toastId.current = toast.success(
          `Cannot login with ${params.resourceServer}`
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigate to={'/'} />;
};

export default OAuth;
