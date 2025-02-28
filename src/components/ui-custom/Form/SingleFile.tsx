import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormRegisterReturn
} from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';
import React, { ReactNode } from 'react';
import { cn } from '~/lib/utils';

type FormTextbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label?: string;
  description?: string;
  isMessage?: boolean;
  fileRef?: UseFormRegisterReturn<TName>;
  children?: ReactNode;
} & UseControllerProps<TFieldValues, TName> &
  React.InputHTMLAttributes<HTMLInputElement>;

const SingleFileInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  {
    control,
    name,
    label,
    description,
    isMessage = true,
    fileRef,
    children,
    ...props
  }: FormTextbox<TFieldValues, TName>,
  ref: React.Ref<HTMLInputElement>
) => {
  const id = 'form-single-file-' + name;
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          {children && <label htmlFor={id}>{children}</label>}
          <FormControl>
            <Input
              type='file'
              id={id}
              ref={ref}
              {...fileRef}
              {...props}
              className={cn({ hidden: children }, props.className)}
            />
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
const SingleFile = React.forwardRef(SingleFileInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: FormTextbox<TFieldValues, TName> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  }
) => ReturnType<typeof SingleFileInner>;

export default SingleFile;
