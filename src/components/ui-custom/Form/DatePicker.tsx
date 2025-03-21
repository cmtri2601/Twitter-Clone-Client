import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { toISOString } from '~/utils/date';

type FormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label?: string;
  description?: string;
  isMessage?: boolean;
  outerClass?: string;
  modal?: boolean;
} & UseControllerProps<TFieldValues, TName> &
  React.InputHTMLAttributes<HTMLInputElement>;

const DatePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  isMessage = true,
  modal = false
  // ...props
}: FormDatePicker<TFieldValues, TName>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeHandler = (onChange: (...event: any[]) => void) => (e: any) => {
    const isoString = toISOString(e);
    onChange(isoString);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover modal={modal}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal bg-transparent text-secondary-foreground',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={changeHandler(field.onChange)}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          {isMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default DatePicker;
