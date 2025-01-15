import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../form';
import { Input } from '../input';
import React from 'react';

type FormTextbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label?: string;
  description?: string;
  isMessage?: boolean;
} & UseControllerProps<TFieldValues, TName> &
  React.InputHTMLAttributes<HTMLInputElement>;

const TextboxInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  {
    control,
    name,
    label,
    description,
    isMessage = true,
    ...props
  }: FormTextbox<TFieldValues, TName>,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} value={field.value || ''} {...props} ref={ref} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {isMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

// if use custom ref, need set ref (in react 19, ref as a prop )
// forwardRef no need to set ref
// Type assertion (Cast)
const Textbox = React.forwardRef(TextboxInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: FormTextbox<TFieldValues, TName> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  }
) => ReturnType<typeof TextboxInner>;

export default Textbox;
