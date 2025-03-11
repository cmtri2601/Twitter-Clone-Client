import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Textbox from '~/components/ui-custom/Form/Textbox';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import { Form } from '~/components/ui/form';
import { useChangePassword } from '~/queries/Users';

type ChangePasswordProps = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Define schema
 */
const changePasswordSchema = z.object({
  oldPassword: z.string().max(50),
  newPassword: z.string().max(50),
  confirmPassword: z.string().max(50)
});

/**
 * Define type
 */
type ChangePasswordType = z.infer<typeof changePasswordSchema>;

export function ChangePasswordDialog({ open, setOpen }: ChangePasswordProps) {
  // Define form
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {}
  });
  const { control, handleSubmit, reset, formState } = form;

  // Handle toggle dialog
  const toggleDialog = () => {
    if (open) {
      reset();
      setOpen?.((open) => !open);
    } else {
      setOpen?.((open) => !open);
    }
  };

  // Mutation hooks
  const changePassword = useChangePassword();

  // Define submit handler
  async function onSubmit(values: ChangePasswordType) {
    await changePassword.mutateAsync(values);
    setOpen?.(false);
  }

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent
        closeButtonCustom={true}
        onOpenAutoFocus={(event) => event.preventDefault()}
        className='sm:max-w-[400px] p-0'
      >
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-3 overflow-auto p-4 pt-12'
          >
            <DialogHeader className='fixed top-0 left-0 right-0 z-10 px-3 py-2 bg-primary-foreground bg-opacity-95'>
              <div className='flex items-center justify-center'>
                <DialogClose className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
                  <X className='h-5 w-5' />
                  <span className='sr-only'>Close</span>
                </DialogClose>
                <DialogTitle className='grow ml-2'>Change password</DialogTitle>
                <Button
                  type='submit'
                  disabled={!formState.isDirty}
                  className='rounded-3xl h-8'
                >
                  Save
                </Button>
              </div>
            </DialogHeader>

            {/* Old password */}
            <Textbox
              control={control}
              name='oldPassword'
              type='password'
              label='Old password'
              autoComplete='current-password'
              maxLength={50}
            />

            {/* New password */}
            <Textbox
              control={control}
              name='newPassword'
              type='password'
              label='New password'
              autoComplete='current-password'
              maxLength={50}
            />

            {/* Confirm password */}
            <Textbox
              control={control}
              name='confirmPassword'
              label='Confirm password'
              type='password'
              autoComplete='off'
              maxLength={50}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
