import * as React from 'react';
import { object, ref, string } from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import { IAuthData, useAuthContext } from '../../../Providers/AuthContext';
import { Input } from '../../Login/Input';
import { AuthCard, Button } from '../../Login/Form.css';
import { FormDataType } from '../../../Types';

const ResetPassword: React.FC = () => {
  const forgotPasswordValidationSchema = object({
    password: string()
      .required('Please enter a password')
      .min(6, 'Your password should be at least 6 characters long.'),
    passwordCheck: string()
      .required('Please retype the password.')
      .oneOf([ref('password')], 'The passwords don\'t match'),
  }).required();

  const methods = useForm<FormDataType>({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serverError, setServerError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { login, user } = useAuthContext();
  const { resetToken } = useParams();

  const location = useLocation();

  if (user) {
    const state = location.state as { from: string } | undefined;
    const destination = state?.from ?? '/dashboard';
    return <Navigate to={destination} />;
  }

  // FIXME: type
  async function handleSubmit(formData) {
    const data: IAuthData = await fetch(`${process.env.AUTH_API}/reset-password/${resetToken}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    if (typeof data !== 'object') {
      // TODO: modal for server error
      setServerError(data);
    }
    // TODO: modal for success + redirect
  }

  // TODO: form error handling, seems like pwd check doesn't work
  // TODO: view pwd options
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
        </form>
      </AuthCard>
    </FormProvider>
  );
};

export default ResetPassword;
