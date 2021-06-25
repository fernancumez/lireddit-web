import React from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginUserMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
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
            <Button type="submit" isLoading={isSubmitting} color="teal">
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
