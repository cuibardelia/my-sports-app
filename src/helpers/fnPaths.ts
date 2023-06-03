import { UserType } from '../components/types/User';

export const MenuOptions = {
  DASHBOARD: 'Dashboard',
  BUDDIES: 'My TrainerBuddies',
  EXERCISES: 'Exercises',
  CLIENTS: 'Clients',
  TRAINERS: 'Trainers',
  SETTINGS: 'Settings',
  APPOINTMENTS: 'Appointments',
  SESSIONS: 'Sessions',
};

export const AdminMenu = [MenuOptions.DASHBOARD, MenuOptions.TRAINERS, MenuOptions.CLIENTS];

export const TrainerMenu = [MenuOptions.DASHBOARD, MenuOptions.CLIENTS, MenuOptions.EXERCISES, MenuOptions.SESSIONS, MenuOptions.APPOINTMENTS];

export const ClientMenu = [MenuOptions.DASHBOARD, MenuOptions.TRAINERS, MenuOptions.EXERCISES, MenuOptions.APPOINTMENTS];

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
  NEW_SESSION = 'new-session',
  SETTINGS = 'settings',
  APPOINTMENTS = 'appointments',
  PROFILE = 'profile',
  NEW_APPOINTMENT = 'new-appointment',
}

export enum ConnectionPaths {
  BUDDIES = 'buddies',
  TRAINERS = 'trainers',
  CLIENTS = 'clients',
}
export type SidePaths = FeaturePaths | ConnectionPaths;

export const getSideMenu = (userType: UserType) => {
  if (userType === UserType.CLIENT) {
    return ClientMenu;
  }

  if (userType === UserType.TRAINER) {
    return TrainerMenu;
  }
};

export const getDefaultRoute = (userType: UserType): string => `/${userType}/${FeaturePaths.DASHBOARD}`;

const getObjectKeyByValue = (obj, value) => Object.keys(obj).find((key) => obj[key] === value);

export const getMenu = (list) => list.map((item) => ({
  path: FeaturePaths[getObjectKeyByValue(MenuOptions, item)] || ConnectionPaths[getObjectKeyByValue(MenuOptions, item)],
  name: item,
}));
