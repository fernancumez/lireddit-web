import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { withUrqlClient } from 'next-urql';

import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>if an account with this email exists, we sent an email</Box>
          ) : (
            <Form>
              <InputField
                name="email"
                type="email"
                label="email"
                placeholder="email"
              />

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                color="teal"
              >
                Forgot Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
