import Post from '~/components/common/Post';

/**
 * Component
 */
const Home = () => {
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
    <div>
      {/* Create post */}
      <div> Create Post</div>

      {/* Posts */}
      <div>
        {fakePosts.map((post) => (
          <Post {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
