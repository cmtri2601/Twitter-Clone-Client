import H1 from '~/components/ui/Typography/h1';
import Muted from '~/components/ui/Typography/muted';

export default function NotFound() {
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col bg-secondary'>
      <H1 className='text-7xl'>404 - Page Not Found</H1>
      <Muted className='text-lg font-semibold'>
        Sorry, the page you are looking for does not exist.
      </Muted>
    </div>
  );
}
