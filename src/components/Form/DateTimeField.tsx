import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { FieldContainer, InputCommonStyle } from './Input';
import { ErrorMessage } from './ErrorMessage';

const CustomDateTimeField = styled(DateTimePicker)(() => ({
  ...InputCommonStyle,
}));

interface IDateInput {
  name: string;
  label: string;
}

export const DateTimeInput: React.FC<IDateInput> = ({ name, label }) => {
  const { control, register } = useFormContext();
  const {
    ref,
  } = register(name);

  const currentDate = dayjs();

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
            <CustomDateTimeField
              label={label}
              value={field.value}
              inputRef={ref}
              onChange={field.onChange}
              {...field}
              minDate={currentDate}
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
