import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputCommonStyle } from './Input';

const CustomDateField = styled(DatePicker)(() => ({
  ...InputCommonStyle,
}));

// eslint-disable-next-line react/prop-types
export const DateInput = ({ name, label }) => {
  const { control, register } = useFormContext();
  const {
    ref,
  } = register(name);

  // TODO: theme
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      defaultValue={null}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CustomDateField
            label={label}
            value={field.value}
            inputRef={ref}
            onChange={field.onChange}
            {...field}
          />
          {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
        </LocalizationProvider>
      )}
    />
  );
};
