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

type FormTextbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  // control: Control<Record<any, any>>;
  // name: string;

  label?: string;
  placeholder?: string;
  description?: string;
  isMessage?: boolean;
} & UseControllerProps<TFieldValues, TName>;

const Textbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: FormTextbox<TFieldValues, TName>
) => {
  const {
    control,
    name,
    label,
    placeholder,
    description,
    isMessage = true
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              value={field.value || ''}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {isMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default Textbox;
