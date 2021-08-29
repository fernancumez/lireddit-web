import React from 'react';
import NextLink from 'next/link';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { Box, Flex, Link } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginUserMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { createUrqlClient } from '../utils/createUrqlClient';

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginUserMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            }
            // worked
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField name="email" label="email" placeholder="email" />
              <InputField
                name="password"
                type="password"
                label="password"
                placeholder="password"
              />
            </Box>
            <Flex mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto">forgot password?</Link>
              </NextLink>
            </Flex>
            <Button mt={4} type="submit" isLoading={isSubmitting} color="teal">
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
