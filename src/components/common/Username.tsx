import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip';

const MAX_LENGTH_VISIBLE = 12;

type UsernameProps = {
  username: string;
  className?: string;
};

export function Username({ username, className }: UsernameProps) {
  const handleUsername = (str: string) => {
    if (str?.length <= MAX_LENGTH_VISIBLE) {
      return str;
    }
    return str?.slice(0, MAX_LENGTH_VISIBLE) + '...';
  };

  const usernameConcise = handleUsername(username);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={className}>{`@${usernameConcise}`}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{username}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
