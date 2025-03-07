import React, { ReactNode } from 'react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormRegisterReturn
} from 'react-hook-form';
import { MediaType } from '~/constants/MediaType';
import { Media } from '~/dto/common/Media';
import { cn } from '~/lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';

type FormTextbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  fileRef: UseFormRegisterReturn<TName>;
  type: string;
  label?: string;
  description?: string;
  isMessage?: boolean;
  children?: ReactNode;
} & UseControllerProps<TFieldValues, TName> &
  React.InputHTMLAttributes<HTMLInputElement>;

const SingleFile = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  fileRef,
  type,
  label,
  description,
  isMessage = true,
  children,
  ...props
}: FormTextbox<TFieldValues, TName>) => {
  const id = 'form-single-file-' + name;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeHandler = (onChange: (...event: any[]) => void) => (e: any) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newUrl = URL.createObjectURL(new Blob([files[0]], { type }));
      const file = new Media(newUrl, MediaType.IMAGE, files[0]);
      onChange({ target: { name, value: file } });
      // onChange(file); // don't have target ({name, value})
    }
  };
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
              {...fileRef}
              {...props}
              onChange={changeHandler(fileRef?.onChange)}
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

export default SingleFile;
