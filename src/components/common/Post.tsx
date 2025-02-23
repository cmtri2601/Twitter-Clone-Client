import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Separator } from '~/components/ui/separator';
import { User } from '~/dto/common/User';
import Muted from '../ui-custom/Typography/muted';
import {
  Bookmark,
  ChartColumn,
  Dot,
  Heart,
  MessageCircle,
  Repeat2,
  Share
} from 'lucide-react';

type PostProps = {
  user: User;
  content?: string;
};
const Post = ({ user, content }: PostProps) => {
  return (
    <div>
      <div className='flex p-3'>
        {/* Avatar */}
        <Avatar className='mr-3'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>{`${user?.firstName?.charAt(0)} ${user?.lastName?.charAt(0)}`}</AvatarFallback>
        </Avatar>
        <div className='flex-grow'>
          {/* Name - username - date */}
          <div>
            <span className='font-bold'>
              {`${user.firstName} ${user.lastName} `}
            </span>
            <Muted className='inline text-base'>
              <span>{`@${user.username}`}</span>
              <Dot className='inline' size={16} />
              <span> Feb 20</span>
            </Muted>
          </div>

          {/* Content */}
          <div>{content}</div>

          {/* Media */}
          <div className='my-2'>
            <img
              src='https://github.com/shadcn.png'
              // src='imgs/avt.png'
              alt='Post Media'
              width={600}
              height={400}
              className='w-full h-64 object-cover rounded-md'
              style={{ aspectRatio: '600/400', objectFit: 'cover' }}
            />
          </div>

          {/* Action */}
          <div className='w-full flex items-center justify-between  text-muted-foreground text-sm'>
            {/* Reply */}
            <div className='flex items-center justify-center'>
              <MessageCircle size={20} />
              <span>{'39K'}</span>
            </div>
            {/* Re post */}
            <div className='flex items-center justify-center'>
              <Repeat2 size={24} />
              <span>{'42K'}</span>
            </div>
            {/* Like */}
            <div className='flex items-center justify-center'>
              <Heart size={20} />
              <span>{'450K'}</span>
            </div>
            {/* Like */}
            <div className='flex items-center justify-center'>
              <ChartColumn size={20} />
              <span>{'5M'}</span>
            </div>
            {/* Bookmark - Share */}
            <div className='flex items-center justify-center'>
              <Bookmark size={20} />
              <Share size={20} />
            </div>
          </div>
        </div>
      </div>
      <Separator className='my-1' />
    </div>
  );
};

export default Post;
