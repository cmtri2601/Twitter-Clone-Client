import { useAuth } from '~/components/auth/auth-provider';

const Profile = () => {
  const { auth } = useAuth();
  return (
    <div className='h-screen'>
      Profile
      <p>{JSON.stringify(auth?.user)}</p>
    </div>
  );
};

export default Profile;
