import * as React from 'react';
import { FieldType, Input } from './Input';
import { DateInput } from './DateField';

interface IFieldPicker {
  input: FieldType;
}

export const FieldPicker: React.FC<IFieldPicker> = ({ input }) => {
  switch (input.type) {
    case 'date':
      return <DateInput key={`date-${input.name}`} name={input.name} label={input.labelText} />;
    default:
      return <Input key={input.name} name={input.name} type={input.type} labelText={input.labelText} />;
  }
};
