import { zodResolver } from '@hookform/resolvers/zod';
import { Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '~/components/auth/auth-provider';
import Textbox from '~/components/custom/Form/Textbox';
import H2 from '~/components/custom/Typography/h2';
import Muted from '~/components/custom/Typography/muted';
import { ModeToggle } from '~/components/darkmode/mode-toggle';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import { useForgotPassword } from '~/queries/Users';

/**
 * Define schema
 */
const forgotPasswordSchema = z.object({
  email: z.string().email()
});

/**
 * Define type
 */
type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  // Define form
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' }
  });
  const { control, handleSubmit } = form;

  // Auth
  const { auth } = useAuth();

  // Mutation hooks
  const forgotPassword = useForgotPassword();

  // Define submit handler
  async function onSubmit(values: ForgotPasswordType) {
    await forgotPassword.mutateAsync(values);
  }

  // Don't require auth
  if (auth?.user) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
      <div className='h-screen w-screen sm:h-auto sm:w-3/6 md:w-5/12 lg:w-1/3 xl:w-1/4 bg-secondary flex items-center justify-center sm:rounded-lg p-5'>
        <div className='sm:w-4/5 2xl:w-2/3 flex flex-col items-center justify-center bg-secondary'>
          {/* icon */}
          <Twitter size={48} fill='currentColor' />

          {/* tittle */}
          <H2 className='w-full mt-2 dark:text-white'>Find your account</H2>
          <Muted>
            Enter the email or username associated with your account to change
            your password.
          </Muted>

          {/* Login with account */}
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-3 my-6 w-full'
            >
              {/* Email */}
              <Textbox
                control={control}
                name='email'
                placeholder='Email'
                autoComplete='on'
              />

              {/* Submit button */}
              <Button className='mt-2 w-full rounded-3xl' variant={'outline'}>
                Send email
              </Button>
            </form>
          </Form>

          {/* Toggle */}
          <div className='w-full flex justify-end'>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
