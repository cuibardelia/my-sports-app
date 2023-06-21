import { Dayjs } from 'dayjs';

/*
========================
	    DROPDOWN
========================
*/
export const OptionMapping = {
  dailyStats: 'Daily Goals',
  weightEvolution: 'Your progress',
  stepStats: 'Your Steps',
  activeZoneStats: 'AZM',
};
export type OptionMappingKeys = keyof typeof OptionMapping;

export const dashboardOptions = Object.values(OptionMapping);
export const optionMappingKeys: (keyof typeof OptionMapping)[] = Object.keys(OptionMapping) as (keyof typeof OptionMapping)[];

/*
=====================
	    USERS
=====================
*/

// ------------- AUTH -------------

// TODO: add trainers for SPECIAL EXERCISES - HEALTH
export const specialtiesList = ['HIIT', 'Pilates', 'Body Pump', 'Zumba', 'Circuit Training', 'TRX', 'Body Combat', 'Core', 'Rebounder'];

// ------------- FORM -------------
export type ClientFormData = {
  email: string;
  password: string;
  passwordCheck: string;
  fName: string;
  lName: string;
};

export type Gender = 'Male' | 'Female' | 'Other';

export type TrainerFormData = {
  email: string;
  phone: string;
  password: string;
  passwordCheck: string;
  fName: string;
  lName: string;
  dateOfBirth: Dayjs,
  gender: Gender;
};

export type ProfileSettingsFormData = {
  currentWeight: number,
  goalWeight: number,
  height: number,
  dateOfBirth: Dayjs,
};

export type DateRangeForm = {
  startDate: Dayjs,
};

export type AppointmentForm = {
  startDate: Dayjs,
  endDate: Dayjs,
  room: string,
};

export type SessionForm = {
  name: string,
  notes: string,
  difficulty: string,
};

export type FormDataType = TrainerFormData | ClientFormData;
