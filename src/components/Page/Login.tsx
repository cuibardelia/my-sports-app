import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'yup';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../Login/Input';
import { IAuthData, useAuthContext } from '../../Providers/AuthContext';
import { AuthCard, BottomLinks, Button } from '../Login/Form.css';
import { AuthPaths } from '../../Types';

const Login: React.FC = () => {
  const loginValidationSchema = object({
    email: string()
      .required('Please enter an email address.')
      .email('Your email address does not seem valid.'),
    password: string()
      .required('Please enter a password')
      .min(6, 'Your password should be at least 6 characters long.'),
  }).required();

  const methods = useForm<FormData>({
    resolver: yupResolver(loginValidationSchema),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serverError, setServerError] = useState('');
  const { login, user } = useAuthContext();

  const location = useLocation();

  if (user) {
    const state = location.state as { from: string } | undefined;
    const destination = state?.from ?? '/dashboard';
    return <Navigate to={destination} />;
  }

  async function handleSubmit(formData: FormData) {
    const data: IAuthData = await fetch(process.env.LOGIN_API, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    if (typeof data !== 'object') {
      // TODO: modal for server error + add proper message for user
      setServerError(data);
      return;
    }
    login(data);
  }
  // TODO: form error handling
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <AuthCard>
        <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
          <Input name="email" type="email" labelText="Email" />
          <Input name="password" type="password" labelText="Password" />
          <Button>Sign In</Button>
          <BottomLinks>
            <div>
              Don&#34t have an account?
              <Link to={AuthPaths.REGISTER}>Register here</Link>
            </div>
            <div><Link to={AuthPaths.FORGOT}>Forgot password?</Link></div>
          </BottomLinks>
        </form>
      </AuthCard>
    </FormProvider>
  );
};

export default Login;
