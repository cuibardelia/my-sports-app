import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ErrorMessage } from './ErrorMessage';

export type FieldType = {
  name: string;
  labelText: string;
  type: InputTypes;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
};

type InputTypes =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'color'
  | 'date';

export const InputCommonStyle = {
  margin: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#6770D2',
  background: '#E3F2E7',
  borderRadius: '4px',
  '&:focus': {
    background: '#8ED1AC',
  },
  '&:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0px 1000px #C0EDB9 inset',
    transition: 'background-color 5000s ease-in-out 0s',
  },
  '&:-webkit-autofill:focus': {
    WebkitBoxShadow: '0 0 0px 1000px #C0EDB9 inset',
    transition: 'background-color 5000s ease-in-out 0s',
  },
};

export const FieldContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  marginBottom: '16px',
}));

const CustomTextField = styled(TextField)(() => ({
  ...InputCommonStyle,
}));

export const Input: React.FC<FieldType> = ({
  name, labelText, type = 'text', multiline = false, rows = 1, fullWidth = false,
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <div>
      <FormControl error={Boolean(errors[name])}>
        <FieldContainer>
          <CustomTextField
            id={name}
            label={labelText}
            type={type}
            multiline={multiline}
            rows={rows}
            fullWidth={fullWidth}
            {...register(name)}
          />
          {errors[name] && (
          <ErrorMessage message={errors[name].message} />
          )}
        </FieldContainer>
      </FormControl>
    </div>
  );
};
