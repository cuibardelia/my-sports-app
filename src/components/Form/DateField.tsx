import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { FieldContainer, InputCommonStyle } from './Input';
import { ErrorMessage } from './ErrorMessage';

const CustomDateField = styled(DatePicker)(() => ({
  ...InputCommonStyle,
}));

interface IDateInput {
  name: string;
  label: string;
}

export const maxRegistrationDate = dayjs().subtract(18, 'year');

export const DateInput: React.FC<IDateInput> = ({ name, label }) => {
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
          <FieldContainer>
            <CustomDateField
              label={label}
              value={field.value}
              inputRef={ref}
              onChange={field.onChange}
              maxDate={maxRegistrationDate}
              {...field}
            />
            {fieldState.error && (
              <ErrorMessage message={fieldState.error.message} />
            )}
          </FieldContainer>
        </LocalizationProvider>
      )}
    />
  );
};
