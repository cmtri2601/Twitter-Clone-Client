import Post from '~/components/common/Post';
import { fakePosts } from '~/mock-data/posts';

/**
 * Component
 */
const Home = () => {
  return (
    <div>
      {/* Create post */}
      <div> Create Post</div>

      {/* Posts */}
      <div>
        {fakePosts.map((post) => (
          <Post key={post.user.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
