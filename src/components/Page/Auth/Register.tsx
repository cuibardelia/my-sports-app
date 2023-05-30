import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { useAuthContext } from '../../../Providers/AuthContext';
import {
  AuthCard, BottomLinks,
} from '../../Form/Form.css';
import { FormDataType } from '../../../Types';
import { getRegisterFields, getUserSchema } from '../../../helpers/fnForm';
import { getAuthHeaders } from '../../../helpers/fnRequest';
import { getDefaultRoute } from '../../../helpers/fnPaths';
import { IAuth } from '../../types/Auth';
import { FieldPicker } from '../../Form/FieldPicker';
import { GoBack } from '../../Form/GoBack';
import DefaultButton from '../../Button/DefaultButton';

const Register: React.FC<IAuth> = ({ userType }) => {
  const methods = useForm<FormDataType>({
    resolver: yupResolver(getUserSchema(userType)),
  });
  const [serverError, setServerError] = useState('');

  const { login } = useAuthContext();
  const navigate = useNavigate();

  async function onSubmit(formData: FormDataType) {
    const { passwordCheck, ...payload } = formData;
    const url = `${process.env.AUTH_API}/register/${userType}`;

    await axios.post(url, JSON.stringify(payload), {
      headers: getAuthHeaders(userType),
    })
      .then((response) => {
        login(response.data);
        navigate(getDefaultRoute(userType));
      })
      .catch((error) => {
        setServerError(error.message);
      });

    // FIXME: proper error handling
  }

  const fields = getRegisterFields(userType);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...methods}>
      <div>
        <AuthCard>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <Box display="flex" flexDirection="column">
              {fields.map((input) => <FieldPicker key={`picker-${input.name}`} input={input} />)}
            </Box>
            <DefaultButton text="Register" type="submit" />
            <BottomLinks>
              <GoBack />
            </BottomLinks>
          </form>
        </AuthCard>
      </div>
    </FormProvider>
  );
};

export default Register;
