import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../../../Providers/AuthContext';
import { Input } from '../../Login/Input';
import { AuthCard, BottomLinks, Button } from '../../Login/Form.css';
import { FormDataType, UserType } from '../../../Types';
import { getRegisterFields, getUserSchema } from '../../../helpers/fnForm';
import { getAuthHeaders } from '../../../helpers/fnRequest';
import { AuthPaths, getDefaultRoute } from '../../../helpers/fnPaths';

const Register: React.FC<{ userType: UserType }> = ({ userType }) => {
  const methods = useForm<FormDataType>({
    resolver: yupResolver(getUserSchema(userType)),
  });
  const [serverError, setServerError] = useState('');

  const { login } = useAuthContext();
  const navigate = useNavigate();

  async function onSubmit(formData: FormDataType) {
    const { passwordCheck, ...payload } = formData;
    const url = `${process.env.AUTH_API}/register/${userType}`;

    // TODO: axios
    const data = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(userType),
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    // FIXME: proper error handling
    if (data.success) {
      login(data);
      navigate(getDefaultRoute(userType));
    } else {
      setServerError(data.message);
    }
  }

  const fields = getRegisterFields(userType);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <div>
        <AuthCard>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            {fields.map((input) => <Input key={input.name} name={input.name} type={input.type} labelText={input.labelText} />)}
            <Button>Register</Button>
            <BottomLinks>
              <div>
                Got lost?
                <Link to={AuthPaths.LOGIN}>Go back to Login</Link>
              </div>
            </BottomLinks>
          </form>
        </AuthCard>
      </div>
    </FormProvider>
  );
};

export default Register;
