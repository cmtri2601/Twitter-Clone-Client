import { zodResolver } from '@hookform/resolvers/zod';
import { Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '~/components/auth/Auth';
import UnProtectedBackground from '~/components/common/UnProtectedBackground';
import { ModeToggle } from '~/components/dark-mode/mode-toggle';
import Textbox from '~/components/ui-custom/Form/Textbox';
import H2 from '~/components/ui-custom/Typography/h2';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import { useResetPassword } from '~/queries/Users';

/**
 * Define schema
 */
const resetPasswordSchema = z.object({
  forgotPasswordToken: z.string(),
  password: z.string().max(50),
  confirmPassword: z.string().max(50)
});

/**
 * Define type
 */
type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token') as string;

  // Define form
  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      forgotPasswordToken: token,
      password: '',
      confirmPassword: ''
    }
  });
  const { control, handleSubmit } = form;

  // navigate
  const navigate = useNavigate();

  // Auth
  const {
    auth: { isLogin }
  } = useAuth();

  // Mutation hooks
  const resetPassword = useResetPassword();

  // Define submit handler
  async function onSubmit(values: ResetPasswordType) {
    await resetPassword.mutateAsync(values);
    navigate('/login');
  }

  // Don't require auth
  if (isLogin) {
    return <Navigate to='/' />;
  }

  return (
    <UnProtectedBackground>
      <div className='h-screen w-screen sm:h-auto sm:w-3/6 md:w-5/12 lg:w-1/3 xl:w-1/4 bg-secondary flex items-center justify-center sm:rounded-lg p-5'>
        <div className='sm:w-4/5 2xl:w-2/3 flex flex-col items-center justify-center bg-secondary'>
          {/* icon */}
          <Twitter size={48} fill='currentColor' />

          {/* tittle */}
          <H2 className='w-full mt-2 dark:text-white'>Reset your account</H2>

          {/* Login with account */}
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-3 my-6 w-full'
            >
              {/* Password */}
              <Textbox
                control={control}
                name='password'
                placeholder='Password'
                type='password'
                autoComplete='current-password'
                maxLength={50}
              />

              {/* Confirm password */}
              <Textbox
                control={control}
                name='confirmPassword'
                placeholder='Confirm password'
                type='password'
                autoComplete='off'
                maxLength={50}
              />

              {/* Submit button */}
              <Button className='mt-2 w-full rounded-3xl' variant={'outline'}>
                Reset password
              </Button>
            </form>
          </Form>

          {/* Toggle */}
          <div className='w-full flex justify-end'>
            <ModeToggle />
          </div>
        </div>
      </div>
    </UnProtectedBackground>
  );
};

export default ResetPassword;
