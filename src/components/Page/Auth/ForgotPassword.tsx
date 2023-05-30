import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../../Providers/AuthContext';
import { Input } from '../../Form/Input';
import { AuthCard, BottomLinks } from '../../Form/Form.css';
import { FormDataType } from '../../../Types';
import { getAuthHeaders } from '../../../helpers/fnRequest';
import { IAuth } from '../../types/Auth';
import { ForgotPassValidationSchema } from '../../../helpers/fnForm';
import { GoBack } from '../../Form/GoBack';
import DefaultButton from '../../Button/DefaultButton';

const ForgotPassword: React.FC<IAuth> = ({ userType }) => {
  const methods = useForm<FormDataType>({
    resolver: yupResolver(ForgotPassValidationSchema),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serverError, setServerError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuthContext();
  const location = useLocation();

  if (user) {
    const state = location.state as { from: string } | undefined;
    const destination = state?.from ?? '/dashboard';
    return <Navigate to={destination} />;
  }

  async function handleSubmit(formData: FormDataType) {
    await axios.post(`${process.env.AUTH_API}/forgot-password`, JSON.stringify(formData), {
      headers: getAuthHeaders(userType),
    })
      .then((response) => {
      // TODO: show modal - response
        console.log(response);
      })
      .catch((error) => {
        setServerError(error.message);
      });
  }

  // TODO: Form error handling
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <AuthCard>
        <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
          <Input name="email" type="email" labelText="Email" />
          <DefaultButton text="Submit" type="submit" />
          <BottomLinks>
            <GoBack />
          </BottomLinks>
        </form>
      </AuthCard>
    </FormProvider>
  );
};

export default ForgotPassword;
