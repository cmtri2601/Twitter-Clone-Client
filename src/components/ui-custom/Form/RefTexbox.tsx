import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';
import React from 'react';

type FormRefTextbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label?: string;
  placeholder?: string;
  description?: string;
  isMessage?: boolean;
} & UseControllerProps<TFieldValues, TName> &
  React.InputHTMLAttributes<HTMLInputElement>;

const RefTextboxInner = <
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
  }: FormRefTextbox<TFieldValues, TName>,
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

/**
 * Solution for generic components for React.forwardRef...
 */

// 1. Type assertion (Cast) - "as"
// const RefTextbox = React.forwardRef(RefTextboxInner) as <
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
// >(
//   props: FormRefTextbox<TFieldValues, TName> & {
//     ref?: React.ForwardedRef<HTMLInputElement>;
//   }
// ) => ReturnType<typeof RefTextboxInner>;
// export default RefTextbox;

// 2. Wrap forwarded component
// const RefTextbox = React.forwardRef(RefTextboxInner);
// export const Wrapper = <
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
// >({
//   ref,
//   ...rest
// }: FormRefTextbox<TFieldValues, TName> & {
//   ref: React.Ref<HTMLInputElement>;
// }) => <RefTextbox {...rest} ref={ref} />;
// don't work

// 3. Omit forwardRef all together - should use in react 19
export default RefTextboxInner;

// 4.Use global type augmentation
// declare module 'react' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//   function forwardRef<T, P = {}>(
//     render: (props: P, ref: ForwardedRef<T>) => ReactElement | null
//   ): (props: P & RefAttributes<T>) => ReactElement | null;
// }
// work but affect other
