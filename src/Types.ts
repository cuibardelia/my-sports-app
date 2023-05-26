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
export enum UserType {
  CLIENT = 'client',
  TRAINER = 'trainer',
  ADMIN = 'admin',
}

interface ICredentials {
  email: string;
  password: string;
}

export interface IAdmin extends ICredentials {
  userType: UserType;
}
// TODO: cleanup TrainerInfo & ITrainer
// shared between Client and Trainer
export interface ICommonUser {
  _id: string;
  lastName: string;
  firstName: string;
  favoriteExercises: string[];
  // TODO: update type
  sessions: any[];
  userType: UserType;
  picUrl: string;
  email: string;
}

export interface IClient extends ICommonUser {
  username: string;
  currentWeight: number;
  goalWeight: number;
  height: number;
  favoriteTrainers: string[]
}

// TODO: add trainers for SPECIAL EXERCISES - HEALTH
export const specialtiesList = ['HIIT', 'Pilates', 'Body Pump', 'Zumba', 'Circuit Training', 'TRX', 'Body Combat', 'Core', 'Rebounder'];

export interface ITrainer extends ICommonUser {
  dateOfBirth: string;
  bio: number;
  specialties: typeof specialtiesList;
}

export type IUser = ICommonUser | IClient | ITrainer | IAdmin;

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

/*
========================
	    EXERCISES
========================
*/

export type TargetArea = {
  name: string;
  url: string;
  type: string;
};

export type Exercise = {
  name: string;
  gifUrl: string;
  id: string;
  bodyPart: string;
  equipment: string;
  _id: string;
};
