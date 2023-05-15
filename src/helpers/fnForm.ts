import {
  date, object, ref, string,
} from 'yup';
import { FieldType } from '../components/Login/Input';
import { UserType } from '../Types';

const emailField: FieldType = {
  name: 'email',
  type: 'email',
  labelText: 'Email',
};
const passwordField: FieldType = {
  name: 'password',
  type: 'password',
  labelText: 'Password',
};

const recheckPasswordField: FieldType = {
  name: 'passwordCheck',
  type: 'password',
  labelText: 'Retype Password',
};

const nameFields: FieldType[] = [
  {
    name: 'firstName',
    type: 'text',
    labelText: 'First name',
  },
  {
    name: 'lastName',
    type: 'text',
    labelText: 'Last name',
  },
];

export const clientInputs: FieldType[] = [
  {
    name: 'username',
    type: 'text',
    labelText: 'Username',
  },
  ...nameFields,
  emailField,
  passwordField,
  recheckPasswordField,
];

export const trainerInputs: FieldType[] = [
  emailField,
  ...nameFields,
  {
    name: 'phone',
    type: 'tel',
    labelText: 'Mobile number',
  },
  passwordField,
  recheckPasswordField,
  {
    name: 'dateOfBirth',
    type: 'date',
    labelText: 'Birth Date',
  },
  // TODO: dropdown, enum
  // TODO: correct birthday calendar
  // FIXME: date conversion
  {
    name: 'gender',
    type: 'text',
    labelText: 'Gender',
  },
];

export const getRegisterFields = (userType: UserType): FieldType[] => (
  userType === UserType.CLIENT ? clientInputs : trainerInputs
);

export const clientRegisterValidationSchema = object({
  email: string()
    .required('Please enter an email address.')
    .email('Your email address does not seem valid.'),
  password: string()
    .required('Please enter a password')
    .min(6, 'Your password should be at least 6 characters long.'),
  passwordCheck: string()
    .required('Please retype the password.')
    .oneOf([ref('password')], 'The passwords don\'t match'),
  firstName: string()
    .required('Please enter your first name.')
    .min(2, 'The first name should be at least 2 characters long.'),
  lastName: string()
    .required('Please enter your last name')
    .min(2, 'The last name should be at least 2 characters long.'),
  username: string()
    .required('Please enter your username')
    .min(2, 'Should be at least 2 characters long.'),
}).required();

export const trainerRegisterValidationSchema = object({
  email: string()
    .required('Please enter an email address.')
    .email('Your email address does not seem valid.'),
  phone: string()
    .required('Please enter your mobile number'),
  // .min(6, 'This is not a valid phone number'),
  password: string()
    .required('Please enter a password')
    .min(6, 'Your password should be at least 6 characters long.'),
  passwordCheck: string()
    .required('Please retype the password.')
    .oneOf([ref('password')], 'The passwords don\'t match'),
  firstName: string()
    .required('Please enter your first name.')
    .min(2, 'The first name should be at least 2 characters long.'),
  lastName: string()
    .required('Please enter your last name')
    .min(2, 'The last name should be at least 2 characters long.'),
  dateOfBirth: date()
    .required('Please add your birthday'),
  // .min(2, 'The last name should be at least 2 characters long.'),
  gender: string()
    .required('Please pick a gender'),
}).required();

export const getUserSchema = (userType: UserType) => {
  switch (userType) {
    case UserType.CLIENT:
      return clientRegisterValidationSchema;
    case UserType.TRAINER:
      return trainerRegisterValidationSchema;
    default:
      return 'admin';
  }
};
