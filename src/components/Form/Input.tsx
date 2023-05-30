import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';

export type FieldType = {
  name: string;
  labelText: string;
  type: InputTypes;
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
  borderColor: '#C9A0FF',
  background: '#E6F7E0',
  borderRadius: '4px',
  '&:focus': {
    background: '#C0EDB9',
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

const CustomTextField = styled(TextField)(() => ({
  ...InputCommonStyle,
}));

const CustomFormHelperText = styled(FormHelperText)({
  color: '#FF8C66',
});

export const Input: React.FC<FieldType> = ({ name, labelText, type = 'text' }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <div>
      <FormControl error={Boolean(errors[name])}>
        <CustomTextField
          id={name}
          label={labelText}
          type={type}
          {...register(name)}
        />
        {errors[name] && (
        <CustomFormHelperText>{errors[name].message}</CustomFormHelperText>
        )}
      </FormControl>
    </div>
  );
};
