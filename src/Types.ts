/*
====================
	    MENU
====================
*/

export type Menu = {
  name: string;
  path: AppPaths;
};

export enum SidePaths {
  DASHBOARD = 'dashboard',
  BUDDIES = 'buddies',
  // HISTORIC = 'historic',
  EXERCISES = 'exercises',
  CLIENTS = 'clients',
  TRAINERS = 'trainers',
}

export enum TopPaths {
  DASHBOARD = 'dashboard',
  TRAINERS = 'trainers',
  SETTINGS = 'settings',
}

type MenuPaths = SidePaths | TopPaths;
export type AppPaths = MenuPaths | AuthPaths;

type MenuOptionsType = {
  [key in keyof typeof SidePaths]: string;
} & {
  [key in keyof typeof TopPaths]: string;
};

export const MenuOptions: MenuOptionsType = {
  DASHBOARD: 'Dashboard',
  BUDDIES: 'My Buddies',
  EXERCISES: 'Exercises',
  CLIENTS: 'Clients',
  TRAINERS: 'Trainers',
  SETTINGS: 'Settings',
};

// TODO: backend
export const AdminMenu = {
  TopPaths: {
    DASHBOARD: 'dashboard',
    CLIENTS: 'clients',
    TRAINERS: 'trainers',
  },
};

export const TrainerMenu = {
  SidePaths: {
    DASHBOARD: 'dashboard',
    CLIENTS: 'clients',
    EXERCISES: 'exercises',
    SESSIONS: 'sessions',
  },
};

export const ClientMenu = {
  SidePaths: {
    DASHBOARD: 'dashboard',
    TRAINERS: 'trainers',
    EXERCISES: 'exercises',
    // MY_TRAINERS: 'my-trainers',
    SESSIONS: 'sessions',
  },
  TopPaths: {
    SETTINGS: 'settings',
  },
};

export enum UserPaths {
  CLIENT = 'client',
  TRAINER = 'trainer',
  ADMIN = 'admin',
}

export enum AuthPaths {
  AUTH = 'auth',
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT = 'forgotpassword',
  RESET = 'passwordreset',
  INVITE = 'invite',
}

export enum FeaturePaths {
  DASHBOARD = 'dashboard',
  EXERCISES = 'exercises',
  HISTORIC = 'historic',
  SESSIONS = 'sessions',
  SETTINGS = 'settings',
}

export enum ConnectionPaths {
  BUDDIES = 'buddies',
  TRAINERS = 'trainers',
  CLIENTS = 'clients',
}

/*
========================
	    DROPDOWN
========================
*/
export const OptionMapping = {
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

interface ICommonUser {
  lastName: string;
  firstName: string;
  favoriteExercises: string[];
  // TODO: update type
  sessions: any[];
  userType: UserType;
}

export interface IClient extends ICommonUser {
  username: string;
  currentWeight: number;
  goalWeight: number;
}

export type Specialties = 'HIIT' | 'Pilates' | 'Body Pump' | 'Zumba' | 'Circuit Training' | 'TRX' | 'Body Combat' | 'Core' | 'Rebounder';

export interface ITrainer extends ICommonUser {
  dateOfBirth: string;
  bio: number;
  specialties: Specialties[];
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
