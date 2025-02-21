import { cn } from '~/lib/utils';

const H1 = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
      {...props}
    />
  );
};

export default H1;
