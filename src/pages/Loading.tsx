import { Spinner } from '~/components/ui/spinner';

const Loading = () => {
  return (
    <div className='h-screen w-full bg-secondary flex justify-center items-center'>
      <Spinner size={'large'} />
    </div>
  );
};

export default Loading;
