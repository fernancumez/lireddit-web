import React from 'react';
import { useMutation } from 'urql';
import { Form, Formik } from 'formik';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

interface registerProps {}

const REGISTER_MUT = `
  mutation registerUser($username: String!, $password: String!) {
    register(options:{ username: $username, password: $password} ) {
      errors {
        field
        message
      }
      user{
        id
        username
        createdAt
        updatedAt
      }
    }
  }
`;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          return register(values);
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
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
