import { cn } from '~/lib/utils';

const Muted = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
};

export default Muted;
