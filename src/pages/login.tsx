import React from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginUserMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginUserMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
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
            <InputField
              name="username"
              label="username"
              placeholder="username"
            />
            <Box mt={4}>
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

export default Login;
