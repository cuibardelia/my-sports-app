import * as React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import {
  Link, Navigate, useLocation,
} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../Login/Input';
import { IAuthData, useAuthContext } from '../../../Providers/AuthContext';
import { AuthCard, BottomLinks, Button } from '../../Login/Form.css';
import { FormDataType, UserType } from '../../../Types';
import { getAuthHeaders } from '../../../helpers/fnRequest';
import { AuthPaths, getDefaultRoute } from '../../../helpers/fnPaths';

const Login: React.FC<{ userType: UserType }> = ({ userType }) => {
  const loginValidationSchema = object({
    email: string()
      .required('Please enter an email address.')
      .email('Your email address does not seem valid.'),
    password: string()
      .required('Please enter a password')
      .min(6, 'Your password should be at least 6 characters long.'),
  }).required();

  const methods = useForm<FormDataType>({
    resolver: yupResolver(loginValidationSchema),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serverError, setServerError] = useState('');
  const { login, user } = useAuthContext();

  const location = useLocation();
  const isClient = userType === UserType.CLIENT;

  if (user) {
    const state = location.state as { from: string } | undefined;
    const destination = state?.from ?? getDefaultRoute(user.userType);
    return <Navigate to={`${destination}`} />;
  }

  async function handleSubmit(formData: FormDataType) {
    const data: IAuthData = await fetch(`${process.env.AUTH_API}/login`, {
      method: 'POST',
      headers: getAuthHeaders(userType),
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    if (typeof data !== 'object') {
      // TODO: modal for server error + add proper message for client user
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
              { isClient && (<Link to={AuthPaths.REGISTER}>Register here</Link>) }
            </div>
            <div><Link to={AuthPaths.FORGOT}>Forgot password?</Link></div>
          </BottomLinks>
        </form>
      </AuthCard>
    </FormProvider>
  );
};

export default Login;
