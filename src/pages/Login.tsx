import { Twitter } from 'lucide-react';
import { Button } from '~/components/ui/button';
import H2 from '~/components/ui/Typography/h2';
import googleLogo from '/imgs/google.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '~/components/ui/form';
import Textbox from '~/components/ui/Form/Textbox';
import { Link } from 'react-router-dom';

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

  // Define submit handler
  function onSubmit(values: LoginType) {
    console.log(values);
  }

  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
      <div className='h-screen w-screen sm:h-3/5 sm:w-3/6 md:w-5/12 lg:w-1/3 xl:w-1/4 bg-secondary flex items-center justify-center sm:rounded-lg'>
        <div className='sm:w-4/5 2xl:w-2/3 flex flex-col items-center justify-center bg-secondary'>
          {/* icon */}
          <Twitter color='black' fill='black' size={48} />

          {/* tittle */}
          <H2 className='mt-2 dark:text-white'>Sign in to Twitter</H2>

          {/* Login with vendor */}
          <Button className='mt-2 w-full rounded-3xl' variant={'outline'}>
            <img src={googleLogo} alt='Google logo' className='h-6' />
            <p className='dark:text-white'>Login with Google</p>
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
              <Textbox control={control} name='email' placeholder='Email' />
              {/* Password */}
              <Textbox
                control={control}
                name='password'
                placeholder='Password'
              />

              {/* Submit button */}
              <Button className='mt-2 w-full rounded-3xl' variant={'outline'}>
                <p className='dark:text-white'>Login</p>
              </Button>
            </form>
          </Form>

          {/* Forgot password button */}
          <Button className='mt-2 w-full rounded-3xl' variant={'default'}>
            <p>Forgot password?</p>
          </Button>

          {/* Sign up link */}
          <div className='mt-5 w-full flex items-center justify-start'>
            <p className='text-sm text-muted-foreground'>
              Don't have an account?{' '}
            </p>
            <Link to={'register'}>
              <Button variant={'link'} className='p-0 m-2'>
                <p>Sign up</p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
