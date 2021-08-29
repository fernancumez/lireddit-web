import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useGetPostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import { Link } from '@chakra-ui/layout';
import NextLink from 'next/link';

const Index = () => {
  const [{ data }] = useGetPostsQuery();
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link> create post</Link>
      </NextLink>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.getPosts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
