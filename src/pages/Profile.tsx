import { useAuth } from '~/components/auth/auth-provider';
import Post from '~/components/common/Post';
import Muted from '~/components/ui-custom/Typography/muted';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { UserStatus } from '~/constants/UserStatus';

const Profile = () => {
  const { auth } = useAuth();
  const user = auth?.user;
  const verifyText =
    user?.status === UserStatus.VERIFIED ? 'Get verified' : 'Unverified';

  const fakePosts = [
    {
      user: { firstName: 'Tri', lastName: 'Cao', username: 'tri0126210' },
      content: 'Test nho'
    },
    {
      user: { firstName: 'Tri', lastName: 'Cao', username: 'tri0126210' },
      content: 'Test nho'
    },
    {
      user: { firstName: 'Tri', lastName: 'Cao', username: 'tri0126210' },
      content: 'Test nho'
    },
    {
      user: { firstName: 'Tri', lastName: 'Cao', username: 'tri0126210' },
      content: 'Test nho'
    }
  ];

  return (
    <div className='w-full'>
      {/* Header */}
      <div className='w-full flex items-center justify-center'>
        {/* Avatar */}
        <Avatar className='m-3 h-24 w-24 min-[450px]:m-10 md:h-36 md:w-36'>
          {/* <AvatarImage src={user?.avatar} /> */}
          <AvatarImage src='imgs/avt.png' />
          <AvatarFallback>{`${user?.firstName?.charAt(0)} ${user?.lastName?.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <div className='my-2 mr-3 min-[450px]:mr-10 flex-grow flex flex-col items-center justify-between'>
          {/* Username */}
          <div className='w-full'>
            <span className='font-bold mr-3'>{user?.username}</span>
            <Button className='h-7' variant={'secondary'}>
              Edit profile
            </Button>
          </div>
          {/* Post - Followers - Following */}
          <div className='w-full flex items-center justify-between'>
            <div className='mr-3'>
              <span className='font-bold'>{1} </span>
              <Muted className='inline-grid text-base'>post</Muted>
            </div>
            <div className='mr-3'>
              <span className='font-bold'>{1} </span>
              <Muted className='inline-grid text-base'>followers</Muted>
            </div>
            <div className=''>
              <span className='font-bold'>{1} </span>
              <Muted className='inline-grid text-base'>following</Muted>
            </div>
          </div>
          {/* Name */}
          <div className='w-full'>
            <span className='font-bold'>{`${user?.firstName} ${user?.lastName}`}</span>
            <Muted>{verifyText}</Muted>
          </div>
          {/* Bio */}
          <div className='w-full'>
            <p>{user?.bio} bio</p>
          </div>
        </div>
      </div>

      <Separator className='my-1' />

      {/* Body - Post */}
      <div className='w-full'>
        {fakePosts.map((post) => (
          <Post {...post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
