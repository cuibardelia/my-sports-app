import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput, Label } from './Form.css';

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

export const Input = ({
  name,
  labelText,
  type = 'text',
}: FieldType) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <div>
      <Label htmlFor={name}>
        {labelText}
      </Label>
      <FormInput
        type={type}
        id={name}
        {...register(name)}
      />
      {errors?.[name] && (
      <span>
        {/* {errors[name]?.message} */}
        FIXME
      </span>
      )}
    </div>
  );
};
