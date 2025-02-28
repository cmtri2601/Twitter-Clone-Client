import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DatePicker from '~/components/ui-custom/Form/DatePicker';
import SingleFile from '~/components/ui-custom/Form/SingleFile';
import Textbox from '~/components/ui-custom/Form/Textbox';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog';
import { Form } from '~/components/ui/form';
import useFilePreview from '~/hooks/useFilePreview';

type EditProfileDialogProps = {
  children: ReactNode;
};

/**
 * Define schema
 */
const profileSchema = z.object({
  firstName: z.string().max(30),
  lastName: z.string().max(30),
  bio: z.string().max(200),
  location: z.string().max(100),
  website: z.string().max(100),
  avatar: z.instanceof(FileList),
  coverPhoto: z.string().max(200),
  dateOfBirth: z.string()
});

/**
 * Define type
 */
type ProfileType = z.infer<typeof profileSchema>;

export function EditProfileDialog({ children }: EditProfileDialogProps) {
  // Define form
  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      bio: '',
      location: '',
      website: '',
      avatar: undefined,
      coverPhoto: '',
      dateOfBirth: ''
    }
  });
  const { control, handleSubmit, watch } = form;

  // Mutation hooks
  // const register = useRegister();

  // Define submit handler
  async function onSubmit(values: ProfileType) {
    // const res = await register.mutateAsync(values);
    console.log(values);
  }

  // TODO:
  // mock data
  const user = {
    avatar: '',
    username: 'mtri_c',
    firstName: 'Tri',
    lastName: 'Cao'
  };

  // Watch value of avatar
  const fileRef = form.register('avatar');
  const file = watch('avatar');

  // Convert avatar to blob => preview
  const [avatar] = useFilePreview(file, 'image/png, image/jpeg');

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        closeButtonCustom={true}
        className='sm:max-w-[425px] h-1/2 p-0'
      >
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-3 overflow-auto p-4 pt-12'
          >
            <DialogHeader className='fixed top-0 left-0 right-0 z-10 px-3 py-2 bg-gray-50 bg-opacity-95'>
              <div className='flex items-center justify-center'>
                <DialogClose className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
                  <X className='h-5 w-5' />
                  <span className='sr-only'>Close</span>
                </DialogClose>
                <DialogTitle className='grow ml-2'>Edit profile</DialogTitle>
                <Button type='submit' className='rounded-3xl h-8'>
                  Save
                </Button>
              </div>
            </DialogHeader>

            {/* Avatar */}
            <div className='bg-zinc-200 rounded-xl p-4 flex items-center justify-center'>
              <Avatar className='h-12 w-12 my-0 mx-2'>
                <AvatarImage src={avatar} />
                <AvatarFallback>{`${user?.firstName?.charAt(0)} ${user?.lastName?.charAt(0)}`}</AvatarFallback>
              </Avatar>
              <span className='grow font-medium'>{user.username}</span>
              <SingleFile control={control} name='avatar' fileRef={fileRef}>
                <Button asDiv className='rounded-3xl h-8'>
                  Change photo
                </Button>
              </SingleFile>
            </div>

            {/* First name */}
            <Textbox
              control={control}
              label='First name'
              name='firstName'
              maxLength={30}
            />

            {/* Last name */}
            <Textbox
              control={control}
              label='Last name'
              name='lastName'
              autoComplete='off'
              maxLength={30}
            />

            {/* Bio */}
            <Textbox
              control={control}
              label='Bio'
              name='bio'
              autoComplete='off'
              maxLength={200}
            />

            {/* Location */}
            <Textbox
              control={control}
              label='Location'
              name='location'
              autoComplete='off'
              maxLength={100}
            />

            {/* Website */}
            <Textbox
              control={control}
              label='Website'
              name='website'
              autoComplete='off'
              maxLength={100}
            />

            {/* Date of birth */}
            <DatePicker
              control={control}
              label='Date of birth'
              name='dateOfBirth'
              modal={true}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
