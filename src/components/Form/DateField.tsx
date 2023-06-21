import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { FieldContainer, InputCommonStyle } from './Input';
import { ErrorMessage } from './ErrorMessage';

export const CustomDateField = styled(DatePicker)(() => ({
  ...InputCommonStyle,
}));

interface IDateInput {
  name: string;
  label: string;
  isRange?: boolean;
  onClose?: () => void
}

const getDefaultDate = (): Date => {
  const currentDate = dayjs();
  const monday = currentDate.day(1).startOf('day');
  if (currentDate.isAfter(monday)) {
    return monday.add(1, 'week').toDate();
  }
  return new Date(monday.toDate());
};

export const maxRegistrationDate = dayjs().subtract(18, 'year');

export const DateInput: React.FC<IDateInput> = ({
  name, label, isRange = false, onClose,
}) => {
  const { control, register } = useFormContext();
  const {
    ref,
  } = register(name);

  const maxDate = isRange ? undefined : maxRegistrationDate;

  const shouldDisableDate = (date: Date) => {
    const selectedDate = dayjs(date).toDate();
    return isRange ? selectedDate.getDay() !== 1 : false;
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      defaultValue={isRange ? getDefaultDate() : null}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FieldContainer>
            <CustomDateField
              label={label}
              value={field.value}
              inputRef={ref}
              onChange={field.onChange}
              shouldDisableDate={shouldDisableDate}
              maxDate={maxDate}
              {...(onClose && { onClose })}
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
