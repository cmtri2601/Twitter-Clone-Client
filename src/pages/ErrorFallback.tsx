import H1 from '~/components/ui-custom/Typography/h1';
import Muted from '~/components/ui-custom/Typography/muted';
import { FallbackProps } from 'react-error-boundary';
import { Button } from '~/components/ui/button';

export default function ErrorFallback(props: FallbackProps) {
  const { resetErrorBoundary } = props;

  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col bg-secondary'>
      <H1 className='text-7xl'>Oops!</H1>
      <Muted className='text-lg font-semibold'>
        Sorry, an unexpected error has occurred.
      </Muted>

      <Button className='m-3' onClick={resetErrorBoundary}>
        Reset
      </Button>
    </div>
  );
}
