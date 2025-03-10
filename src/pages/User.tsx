import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '~/components/auth/Auth';
import Post from '~/components/common/Post';
import H2 from '~/components/ui-custom/Typography/h2';
import Muted from '~/components/ui-custom/Typography/muted';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { fakePosts } from '~/mock-data/posts';
import { useFollow, useGetUser, useUnfollow } from '~/queries/Users';

const User = () => {
  const { username } = useParams();
  const {
    auth: { user: ownUser }
  } = useAuth();

  // Get profile of user
  const res = useGetUser(username);
  const user = res.data?.data;

  // Handle follow
  const follow = useFollow(username);
  const handleFollow = async () => {
    await follow.mutateAsync(user?._id);
  };

  // Handle follow
  const unfollow = useUnfollow(username);
  const handleUnfollow = async () => {
    await unfollow.mutateAsync(user?._id);
  };

  // If same user as people login => forward to profile page
  if (ownUser?.username === username) return <Navigate to={'/profile'} />;

  // If user does not exist
  if (!user)
    return (
      <div className='w-full'>
        {/* Header */}
        <div className='w-full flex items-center justify-center'>
          {/* Avatar */}
          <Avatar className='m-3 h-24 w-24 min-[450px]:m-10 md:h-36 md:w-36'>
            <AvatarImage />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className='my-2 mr-3 min-[450px]:mr-10 flex-grow flex flex-col items-center justify-between'>
            {/* Username */}
            <div className='w-full'>
              <span className='font-bold mr-3'>{`@${username}`}</span>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col items-center justify-center'>
          {/* Unverified user */}
          <H2>This account doesn’t exist</H2>
          <Muted>Try searching for another.</Muted>
        </div>
      </div>
    );

  return (
    <div className='w-full'>
      {/* Header */}
      <div className='w-full flex items-center justify-center'>
        {/* Avatar */}
        <Avatar className='m-3 h-24 w-24 min-[450px]:m-10 md:h-36 md:w-36'>
          <AvatarImage src={user?.avatar?.url} />
          <AvatarFallback>{`${user?.firstName?.charAt(0)} ${user?.lastName?.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <div className='my-2 mr-3 min-[450px]:mr-10 flex-grow flex flex-col items-center justify-between'>
          {/* Username */}
          <div className='w-full'>
            <span className='font-bold mr-3'>{`@${user?.username}`}</span>
            {user.isFollow ? (
              <Button
                className='h-7'
                variant={'secondary'}
                onClick={handleUnfollow}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className='h-7'
                variant={'secondary'}
                onClick={handleFollow}
              >
                Follow
              </Button>
            )}
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
          </div>
          {/* Bio */}
          <div className='w-full'>
            <p>{user?.bio}</p>
          </div>
        </div>
      </div>

      <Separator className='my-1' />

      {/* Body - Post */}
      <div className='w-full'>
        {fakePosts.map((post) => (
          <Post key={post.user.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default User;
