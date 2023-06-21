import * as React from 'react';
import axios from 'axios';
import {
  Typography,
} from '@mui/material';
import { Divider } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { getProtectedHeaders } from '../../helpers/fnRequest';
import { useAuthContext } from '../../Providers/AuthContext';
import { IClient } from '../types/User';
import { ProfileSettingsFormData } from '../../Types';
import { ProfileFieldsBasic, ProfileFieldsGoal, profileSettings } from '../../helpers/fnForm';
import { Input } from '../Form/Input';
import { FieldPicker } from '../Form/FieldPicker';
import DefaultButton from '../Button/DefaultButton';

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  width: '100%',
}));

interface IPersonalData {
  handleSuccess: (data: IClient) => void;
}
const PersonalData: React.FC<IPersonalData> = ({ handleSuccess }) => {
  const { user, token } = useAuthContext();
  const client = user as IClient;

  const bd = client.dateOfBirth;

  const methods = useForm<ProfileSettingsFormData>({
    resolver: yupResolver(profileSettings),
    defaultValues: {
      currentWeight: client.currentWeight || 0,
      goalWeight: client.goalWeight || 0,
      height: client.height || 0,
      dateOfBirth: dayjs(bd),
    },
  });

  // TODO: is maintaining logic
  // TODO: message new objective?
  // FIXME: block second set of fields
  const onSubmit = (formData: ProfileSettingsFormData) => {
    axios.put(`${process.env.CLIENT_API}/update-settings`, JSON.stringify(formData), { headers: getProtectedHeaders(token) })
      .then((response) => {
        handleSuccess(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <FormProvider {...methods}>
      <Typography variant="h5">Settings</Typography>
      <Typography variant="h6">{'Set your Objective: '}</Typography>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        {ProfileFieldsGoal.map((input) => <Input key={`input-${input.name}`} name={input.name} type={input.type} labelText={input.labelText} />)}
        <StyledDivider />
        {ProfileFieldsBasic.map((input) => <FieldPicker key={`picker-${input.name}`} input={input} />)}
        <DefaultButton type="submit" text="Save" />
      </form>
    </FormProvider>
  );
};

export default PersonalData;
