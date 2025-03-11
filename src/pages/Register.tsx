import { zodResolver } from '@hookform/resolvers/zod';
import { Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '~/components/auth/Auth';
import UnProtectedBackground from '~/components/common/UnProtectedBackground';
import { ModeToggle } from '~/components/dark-mode/mode-toggle';
import DatePicker from '~/components/ui-custom/Form/DatePicker';
import Textbox from '~/components/ui-custom/Form/Textbox';
import H2 from '~/components/ui-custom/Typography/h2';
import Muted from '~/components/ui-custom/Typography/muted';
import { Button } from '~/components/ui/button';
import { Form } from '~/components/ui/form';
import { RegisterResponse } from '~/dto/users/Register';
import { useRegister } from '~/queries/Users';

/**
 * Define schema
 */
const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().max(40),
  firstName: z.string().max(30),
  lastName: z.string().max(30),
  password: z.string().max(50),
  confirmPassword: z.string().max(50),
  dateOfBirth: z.string()
});

/**
 * Define type
 */
type RegisterType = z.infer<typeof registerSchema>;

/**
 * Component
 */
const Register = () => {
  // Define form
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: ''
    }
  });
  const { control, handleSubmit } = form;

  // Auth
  const {
    auth: { isLogin },
    authenticate
  } = useAuth();

  // Mutation hooks
  const register = useRegister();

  // Define submit handler
  async function onSubmit(values: RegisterType) {
    const res = await register.mutateAsync(values);
    const { accessToken, refreshToken, user } = res.data as RegisterResponse;
    authenticate(accessToken, refreshToken, user);
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
          <H2 className='mt-2 dark:text-white'>Join Twitter today</H2>

          {/* Login with account */}
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-3 w-full mt-5'
            >
              {/* Email */}
              <Textbox control={control} name='email' placeholder='Email' />

              {/* Username */}
              <Textbox
                control={control}
                name='username'
                placeholder='Username'
                maxLength={40}
              />

              {/* First name */}
              <Textbox
                control={control}
                name='firstName'
                placeholder='First name'
                maxLength={30}
              />

              {/* Last name */}
              <Textbox
                control={control}
                name='lastName'
                placeholder='Last name'
                autoComplete='off'
                maxLength={30}
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

              {/* Confirm password */}
              <Textbox
                control={control}
                name='confirmPassword'
                placeholder='Confirm password'
                type='password'
                autoComplete='off'
                maxLength={50}
              />

              {/* Date of birth */}
              <DatePicker control={control} name='dateOfBirth' />

              {/* Submit button */}
              <Button
                type='submit'
                className='w-full rounded-3xl'
                variant={'outline'}
              >
                Sign up
              </Button>
            </form>
          </Form>

          {/* Sign up link */}
          <div className='mt-5 w-full flex items-center justify-start'>
            <Muted>You have an account? </Muted>
            <Link to={'/login'}>
              <Button variant={'link'} className='p-0 m-2'>
                <p>Sign in</p>
              </Button>
            </Link>
          </div>

          {/* Toggle */}
          <div className='w-full flex justify-end '>
            <ModeToggle />
          </div>
        </div>
      </div>
    </UnProtectedBackground>
  );
};

export default Register;
