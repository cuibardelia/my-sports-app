import * as React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Link, Navigate, useLocation,
} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { FieldContainer, Input } from '../../Form/Input';
import { useAuthContext } from '../../../Providers/AuthContext';
import { AuthCard, BottomLinks } from '../../Form/Form.css';
import { FormDataType } from '../../../Types';
import { getAuthHeaders } from '../../../helpers/fnRequest';
import { AuthPaths, getDefaultRoute, UserPaths } from '../../../helpers/fnPaths';
import { UserType } from '../../types/User';
import { IAuth } from '../../types/Auth';
import { loginValidationSchema } from '../../../helpers/fnForm';
import DefaultButton from '../../Button/DefaultButton';
import { FormLinks, LinkContainer } from '../../Form/FormLinks';
import { ErrorMessage } from '../../Form/ErrorMessage';

const Login: React.FC<IAuth> = ({ userType }) => {
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
      login(response.data);
    }).catch((error) => {
      setServerError(error.response.data.error);
    });
  }

  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <AuthCard>
        <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
          <FieldContainer>
            <Input name="email" type="email" labelText="Email" />
            <Input name="password" type="password" labelText="Password" />
            <DefaultButton text="Sign In" type="submit" />
            <BottomLinks>
              { isClient && (
              <>
                <LinkContainer><Link to={UserPaths.TRAINER}>Login as trainer</Link></LinkContainer>
                <FormLinks message="Don't have an account?" link={AuthPaths.REGISTER} linkMessage="Register here" />
              </>
              )}
              <LinkContainer><Link to={AuthPaths.FORGOT}>Forgot password?</Link></LinkContainer>
            </BottomLinks>
            {serverError && (
            <ErrorMessage message={serverError} />
            )}
          </FieldContainer>
        </form>
      </AuthCard>
    </FormProvider>
  );
};

export default Login;
