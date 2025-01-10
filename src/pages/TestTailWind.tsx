interface Data {
  id: string;
  name: string;
  desc: string;
}

const TestTailWind = () => {
  const data: Data[] = [
    { id: '1', name: 'Chip', desc: 'very cranky' },
    { id: '2', name: 'Xo', desc: 'very crazy' },
    { id: '3', name: 'Chip', desc: 'very cranky' },
    { id: '4', name: 'Xo', desc: 'very crazy' },
    { id: '5', name: 'Chip', desc: 'very cranky' },
    { id: '6', name: 'Xo', desc: 'very crazy' },
    { id: '7', name: 'Chip', desc: 'very cranky' },
    { id: '8', name: 'Xo', desc: 'very crazy' }
  ];
  return (
    // mobile first
    <div className='bg-background'>
      <div className='p-1 md:p-5 lg:p-10 xl:p-20 m-10 '>
        <section className='h-screen bg-indigo-300 flex items-center justify-center text-center text-3xl m-3'>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error in
            sequi repudiandae eligendi illum. Nihil, tempora eius nemo
            reprehenderit sint veritatis, blanditiis debitis rem inventore
            commodi dolorum possimus officiis? Natus?
          </p>
        </section>
        <section>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 '>
            {data.map((item) => {
              return <TestCard key={item.id} data={item} />;
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TestCard = ({ data }: { data: Data }) => {
  const { name, desc } = data;

  return (
    <div className='test-card'>
      <p className='font-semibold'>{name}</p>
      <p>{desc}</p>
    </div>
  );
};

export default TestTailWind;
