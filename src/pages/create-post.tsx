import React from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { Box, Button } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';

import { Layout } from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { InputField } from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });

          if (!error) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField name="title" label="title" placeholder="title" />
              <InputField
                textarea
                name="text"
                label="text"
                placeholder="text..."
              />
            </Box>

            <Button mt={4} type="submit" isLoading={isSubmitting} color="teal">
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
