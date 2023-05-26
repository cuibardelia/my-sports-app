import * as React from 'react';
import { object, string } from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { IAuthData, useAuthContext } from '../../../Providers/AuthContext';
import { Input } from '../../Login/Input';
import { AuthCard, BottomLinks, Button } from '../../Login/Form.css';
import { FormDataType, UserType } from '../../../Types';
import { getAuthHeaders } from '../../../helpers/fnRequest';
import { AuthPaths } from '../../../helpers/fnPaths';

const ForgotPassword: React.FC<{ userType: UserType }> = ({ userType }) => {
  const forgotPasswordValidationSchema = object({
    email: string()
      .required('Please enter an email address.')
      .email('Your email address does not seem valid.'),
  }).required();

  const methods = useForm<FormDataType>({
    resolver: yupResolver(forgotPasswordValidationSchema),
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
    // TODO: axios
    const data: IAuthData = await fetch(`${process.env.AUTH_API}/forgot-password`, {
      method: 'POST',
      headers: getAuthHeaders(userType),
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    if (typeof data !== 'object') {
      // TODO: modal for server error
      setServerError(data);
    }
    // TODO: modal for success
  }

  // TODO: form error handling
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <AuthCard>
        <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
          <Input name="email" type="email" labelText="Email" />
          <Button>Submit</Button>
          <BottomLinks>
            <div>
              Got lost?
              <Link to={AuthPaths.LOGIN}>Go back to Login</Link>
            </div>
          </BottomLinks>
        </form>
      </AuthCard>
    </FormProvider>
  );
};

export default ForgotPassword;
