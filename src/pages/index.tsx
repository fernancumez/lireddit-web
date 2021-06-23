import { withUrqlClient } from 'next-urql';
import { NavBar } from '../components/Navbar';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useGetPostsQuery } from '../generated/graphql';

const Index = () => {
  const [{ data }] = useGetPostsQuery();
  return (
    <>
      <NavBar />
      <div>Hello world</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.getPosts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
