import * as React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Link, Navigate, useLocation,
} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { FormHelperText } from '@mui/material';
import { Input } from '../../Form/Input';
import { useAuthContext } from '../../../Providers/AuthContext';
import { AuthCard, BottomLinks } from '../../Form/Form.css';
import { FormDataType } from '../../../Types';
import { getAuthHeaders } from '../../../helpers/fnRequest';
import { AuthPaths, getDefaultRoute } from '../../../helpers/fnPaths';
import { UserType } from '../../types/User';
import { IAuth } from '../../types/Auth';
import { loginValidationSchema } from '../../../helpers/fnForm';
import DefaultButton from '../../Button/DefaultButton';
import { FormLinks, LinkContainer } from '../../Form/FormLinks';

const Login: React.FC<IAuth> = ({ userType }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serverError, setServerError] = useState('');
  const { login, user } = useAuthContext();
  const methods = useForm<FormDataType>({
    resolver: yupResolver(loginValidationSchema),
  });

  const location = useLocation();
  const isClient = userType === UserType.CLIENT;

  if (user) {
    const state = location.state as { from: string } | undefined;
    const destination = state?.from ?? getDefaultRoute(user.userType);
    return <Navigate to={`${destination}`} />;
  }

  async function handleSubmit(formData: FormDataType) {
    await axios.post(`${process.env.AUTH_API}/login`, JSON.stringify(formData), {
      headers: getAuthHeaders(userType),
    }).then((response) => {
      console.log(response);
      login(response.data);
    }).catch((error) => {
      console.log('here error', error);
      setServerError(error.response.data.error);
    });
  }

  // TODO: Form error handling
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <AuthCard>
        <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
          <Input name="email" type="email" labelText="Email" />
          <Input name="password" type="password" labelText="Password" />
          <DefaultButton text="Sign In" type="submit" />
          <BottomLinks>
            { isClient && <FormLinks message="Don't have an account?" link={AuthPaths.REGISTER} linkMessage="Register here" /> }
            <LinkContainer><Link to={AuthPaths.FORGOT}>Forgot password?</Link></LinkContainer>
          </BottomLinks>
          {serverError && (
          <FormHelperText error>
            {serverError}
          </FormHelperText>
          )}
        </form>
      </AuthCard>
    </FormProvider>
  );
};

export default Login;
