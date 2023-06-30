import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';
import { useAuthContext } from '../../../Providers/AuthContext';
import { Input } from '../../Form/Input';
import { AuthCard, Button } from '../../Form/Form.css';
import { FormDataType } from '../../../Types';
import { cType } from '../../../helpers/fnRequest';
import { forgotPasswordValidationSchema } from '../../../helpers/fnForm';
import { ErrorMessage } from '../../Form/ErrorMessage';

const ResetPassword: React.FC = () => {
  const [serverError, setServerError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { login, user } = useAuthContext();
  const { resetToken } = useParams();
  const location = useLocation();
  const methods = useForm<FormDataType>({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });

  if (user) {
    const state = location.state as { from: string } | undefined;
    const destination = state?.from ?? '/dashboard';
    return <Navigate to={destination} />;
  }

  // FIXME: type
  async function handleSubmit(formData) {
    await axios.put(`${process.env.AUTH_API}/reset-password/${resetToken}`, JSON.stringify(formData), {
      headers: cType,
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      setServerError(error.message);
    });
    // TODO: modal for success + redirect
  }

  return (
    <FormProvider {...methods}>
      <AuthCard>
        <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
          <Input name="password" type="password" labelText="Password" />
          <Input
            name="passwordCheck"
            type="password"
            labelText="Retype Password"
          />
          <Button>Submit</Button>
          {serverError && (
          <ErrorMessage message={serverError} />
          )}
        </form>
      </AuthCard>
    </FormProvider>
  );
};

export default ResetPassword;
