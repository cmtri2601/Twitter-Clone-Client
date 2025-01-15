import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';
import Textbox from '~/components/ui/Form/Textbox';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

/**
 * Define schema
 */
const homeSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  test1: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  test2: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
});

/**
 * Define type
 */
type HomeType = z.infer<typeof homeSchema>;

/**
 * Component
 */
const Home = () => {
  // Define form.
  const form = useForm<HomeType>({
    resolver: zodResolver(homeSchema),
    defaultValues: {
      username: '',
      test1: '',
      test2: ''
    }
  });
  const { control, handleSubmit, getValues } = form;

  // Define a submit handler.
  function onSubmit(values: HomeType) {
    console.log('values: ', values);
  }

  console.log('state errors: ', getValues());

  return (
    <div className='dark'>
      <div className='border-b-gray-900 m-5 p-5'>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Textbox
              control={control}
              name='test1'
              label='ShadCN'
              placeholder='ShadCN'
              description='ShadCN'
            />
            <Textbox
              control={control}
              name='test2'
              label='ShadCN'
              placeholder='ShadCN'
            />
            <Button type='submit' size={'lg'} variant={'default'}>
              <Label>
                <p>Submit</p>
              </Label>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Home;
