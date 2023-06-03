import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { InputCommonStyle } from './Input';

const CustomSelect = styled(Select)(() => ({
  ...InputCommonStyle,
}));

interface IDateInput {
  options: string[];
}

export const Dropdown: React.FC<IDateInput> = ({ options }) => {
  const { register } = useFormContext();

  return (
    <FormControl>
      <InputLabel id="dropdown-label">Select an option</InputLabel>
      <CustomSelect
        labelId="dropdown-label"
        id="dropdown-field"
        defaultValue={options[0]}
        {...register('dropdownField')}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
};
