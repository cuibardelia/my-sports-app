import {
  date, number, object, ref, string,
} from 'yup';
import { FieldType } from '../components/Form/Input';
import { UserType } from '../components/types/User';

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

const additionalFields: FieldType[] = [
  {
    name: 'phone',
    type: 'tel',
    labelText: 'Mobile number',
  },
  {
    name: 'gender',
    type: 'text',
    labelText: 'Gender',
  },
];
const commonRegistrationFields: FieldType[] = [
  ...nameFields,
  emailField,
  passwordField,
  recheckPasswordField,
  ...additionalFields,
];

export const clientInputs: FieldType[] = [
  {
    name: 'username',
    type: 'text',
    labelText: 'Username',
  },
  ...commonRegistrationFields,
];

export const trainerInputs: FieldType[] = [
  ...commonRegistrationFields,
  {
    name: 'dateOfBirth',
    type: 'date',
    labelText: 'Birth Date',
  },
  // TODO: dropdown, enum
  // TODO: correct birthday calendar
  // FIXME: date conversion
];

export const getRegisterFields = (userType: UserType): FieldType[] => (
  userType === UserType.CLIENT ? clientInputs : trainerInputs
);

export const ProfileFieldsGoal: FieldType[] = [
  {
    name: 'currentWeight',
    type: 'number',
    labelText: 'Weight',
  },
  {
    name: 'goalWeight',
    type: 'number',
    labelText: 'Goal weight',
  },
];

export const ProfileFieldsBasic: FieldType[] = [
  {
    name: 'height',
    type: 'number',
    labelText: 'Height',
  },
  {
    name: 'dateOfBirth',
    type: 'date',
    labelText: 'Birth Date',
  },
];

/*
=====================
	    YUP
=====================
*/

const emailMessage = 'Please enter an email address!';
const emailValidationMessage = 'Your email address does not seem valid.';
const passwordMessage = 'Please enter a password!';
const passwordValidationMessage = 'Your password should be at least 6 characters long.';
const passwordRecheckMessage = 'Please retype the password!';
const passwordRecheckValidationMessage = 'The passwords don\'t match';

const commonFieldsSchema = object({
  firstName: string()
    .required('Please enter your first name.')
    .min(2, 'The first name should be at least 2 characters long.'),
  lastName: string()
    .required('Please enter your last name')
    .min(2, 'The last name should be at least 2 characters long.'),
  email: string()
    .required(emailMessage)
    .email(emailValidationMessage),
  password: string()
    .required(passwordMessage)
    .min(6, passwordValidationMessage),
  passwordCheck: string()
    .required(passwordRecheckMessage)
    .oneOf([ref('password')], passwordRecheckValidationMessage),
  phone: string()
    .required('Please enter your mobile number')
    .min(6, 'This is not a valid phone number')
    .matches(/^07\d{8}$/, 'Invalid email address format.'),
  gender: string()
    .required('Please pick a gender'),
});

export const clientRegisterValidationSchema = commonFieldsSchema.concat(object({
  username: string()
    .required('Please enter your username')
    .min(2, 'Should be at least 2 characters long.'),
}).required());

const validateDateOfBirth = (dateOfBirth) => {
  const currentDate = new Date();
  const userDateOfBirth = new Date(dateOfBirth);
  const age = currentDate.getFullYear() - userDateOfBirth.getFullYear();

  if (currentDate.getMonth() < userDateOfBirth.getMonth()
      || (currentDate.getMonth() === userDateOfBirth.getMonth() && currentDate.getDate() < userDateOfBirth.getDate())) {
    return age - 1 >= 18;
  }

  return age >= 18;
};

export const trainerRegisterValidationSchema = commonFieldsSchema.concat(object({
  dateOfBirth: date()
    .required('Please add your birthday')
    .test('is-of-legal-age', 'You must be at least 18 years old', validateDateOfBirth),
}).required());

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

export const ForgotPassValidationSchema = object({
  email: string()
    .required(emailMessage)
    .email(emailValidationMessage),
}).required();

export const loginValidationSchema = object({
  email: string()
    .required(emailMessage)
    .email(emailValidationMessage),
  password: string()
    .required(passwordMessage)
    .min(6, passwordValidationMessage),
}).required();

export const forgotPasswordValidationSchema = object({
  password: string()
    .required(passwordMessage)
    .min(6, passwordValidationMessage),
  passwordCheck: string()
    .required(passwordRecheckMessage)
    .oneOf([ref('password')], passwordRecheckValidationMessage),
}).required();

export const profileSettings = object({
  currentWeight: number()
    .required('Weight is required')
    .min(35, 'Weight must be greater than 35 kgs')
    .max(600, 'Weight must be less than 600 kgs'),
  goalWeight: number()
    .min(35, 'Weight must be greater than 35kgs')
    .max(600, 'Weight must be less than 600 kgs'),
  height: number()
    .min(90, 'Height must be greater than 90cm')
    .max(600, 'Weight must be less than 600 kgs'),
  dateOfBirth: date()
    .required('Please add your birthday')
    .test('is-of-legal-age', 'You must be at least 18 years old', validateDateOfBirth),
});

export const SessionSchema = object({
  name: string()
    .required('Name is required')
    .min(2, 'Name should be at least 2 characters long.'),
  notes: string(),
  difficulty: string().required('Please select difficulty'),
});

export const AppointmentSchema = object({
  startDate: date()
    .required('Please add a start date')
    .test(
      'startDate',
      'Start date should be before end date',
      function (value) {
        const { endDate } = this.parent;
        return value < endDate;
      },
    ),
  endDate: date()
    .required('Please add an end time')
    .test(
      'endDate',
      'Incorrect end D'
        + 'date',
      function (value) {
        const { startDate } = this.parent;
        // @ts-ignore
        const timeDifference = Math.abs(value - startDate);
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        return startDate < value && hoursDifference <= 3;
      },
    ),
  room: string().required('Please select a room'),
});
