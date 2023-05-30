/*
========================
	    DROPDOWN
========================
*/
export const OptionMapping = {
  profile: 'Me',
  dailyStats: 'Daily Goals',
  stepStats: 'Your Steps',
  activeZoneStats: 'AZM',
};
export type OptionMappingKeys = keyof typeof OptionMapping;

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
  // FIXME
  dateOfBirth: string;
  gender: Gender;
};

export type FormDataType = TrainerFormData | ClientFormData;
