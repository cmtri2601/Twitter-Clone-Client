import { ReactNode } from 'react';

type UnProtectedBackgroundProps = {
  children: ReactNode;
};

const UnProtectedBackground = ({ children }: UnProtectedBackgroundProps) => {
  return (
    <div className='flex h-screen items-center justify-center bg-black'>
      {children}
    </div>
  );
};

export default UnProtectedBackground;
