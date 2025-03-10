import { zodResolver } from '@hookform/resolvers/zod';
import { Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '~/components/auth/Auth';
import { ModeToggle } from '~/components/dark-mode/mode-toggle';
import Textbox from '~/components/ui-custom/Form/Textbox';
import H2 from '~/components/ui-custom/Typography/h2';
import Muted from '~/components/ui-custom/Typography/muted';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import { LoginResponse } from '~/dto/users/Login';
import { useLogin } from '~/queries/Users';
import { oathGoogleUrl } from '~/utils/oauth';
import googleLogo from '/imgs/google.svg';

/**
 * Define schema
 */
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

/**
 * Define type
 */
type LoginType = z.infer<typeof loginSchema>;

/**
 * Component
 */
const Login = () => {
  // Define form
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });
  const { control, handleSubmit } = form;

  // Auth
  const {
    auth: { isLogin },
    authenticate
  } = useAuth();

  // Mutation hooks
  const login = useLogin();

  // Define submit handler
  async function onSubmit(values: LoginType) {
    const res = await login.mutateAsync(values);
    const { accessToken, refreshToken, user } = res.data as LoginResponse;
    authenticate(accessToken, refreshToken, user);
  }

  // Handle login with google oauth
  function onGoogle() {
    window.location.href = oathGoogleUrl;
  }

  // Don't require auth
  if (isLogin) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
      <div className='h-screen w-screen sm:h-auto sm:w-3/6 md:w-5/12 lg:w-1/3 xl:w-1/4 bg-secondary flex items-center justify-center sm:rounded-lg p-5'>
        <div className='sm:w-4/5 2xl:w-2/3 flex flex-col items-center justify-center bg-secondary'>
          {/* icon */}
          <Twitter size={48} fill='currentColor' />

          {/* tittle */}
          <H2 className='mt-2 dark:text-white'>Login to Twitter</H2>

          {/* Login with vendor */}
          <Button
            onClick={onGoogle}
            className='mt-2 w-full rounded-3xl'
            variant={'outline'}
          >
            <img src={googleLogo} alt='Google logo' className='h-6' />
            Login with Google
          </Button>

          {/* Divider */}
          <div className='flex items-center justify-between my-4 w-full'>
            <hr className='flex-grow border-t border-gray-300' />
            <span className='mx-4 font-medium text-gray-300'>Or</span>
            <hr className='flex-grow border-t border-gray-300' />
          </div>

          {/* Login with account */}
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-3 w-full'
            >
              {/* Email */}
              <Textbox
                control={control}
                name='email'
                placeholder='Email'
                autoComplete='on'
              />

              {/* Password */}
              <Textbox
                control={control}
                name='password'
                placeholder='Password'
                type='password'
                autoComplete='current-password'
                maxLength={50}
              />

              {/* Submit button */}
              <Button className='mt-2 w-full rounded-3xl' variant={'outline'}>
                Sign in
              </Button>
            </form>
          </Form>

          {/* Forgot password button */}
          <Link to={'/forgot-password'} className='mt-2 w-full'>
            <Button className='w-full rounded-3xl' variant={'default'}>
              Forgot password?
            </Button>
          </Link>

          {/* Sign up link */}
          <div className='mt-5 w-full flex items-center justify-start'>
            <Muted>Don't have an account? </Muted>
            <Link to={'/register'}>
              <Button variant={'link'} className='p-0 m-2'>
                <p>Sign up</p>
              </Button>
            </Link>
          </div>

          {/* Toggle */}
          <div className='w-full flex justify-end'>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
