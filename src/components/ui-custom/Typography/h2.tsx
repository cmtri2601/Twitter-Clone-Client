import { cn } from '~/lib/utils';

const H2 = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  );
};

export default H2;
