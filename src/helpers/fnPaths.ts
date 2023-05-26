import { UserType } from '../Types';

export enum SidePaths {
  DASHBOARD = 'dashboard',
  BUDDIES = 'buddies',
  // HISTORIC = 'historic',
  EXERCISES = 'exercises',
  CLIENTS = 'clients',
  TRAINERS = 'trainers',
  APPOINTMENTS = 'appointments',
  SESSIONS = 'sessions',
}

export enum TopPaths {
  DASHBOARD = 'dashboard',
  TRAINERS = 'trainers',
  SETTINGS = 'settings',
}

type MenuOptionsType = {
  [key in keyof typeof SidePaths]: string;
} & {
  [key in keyof typeof TopPaths]: string;
};

export const MenuOptions: MenuOptionsType = {
  DASHBOARD: 'Dashboard',
  BUDDIES: 'My TrainerBuddies',
  EXERCISES: 'Exercises',
  CLIENTS: 'Clients',
  TRAINERS: 'Trainers',
  SETTINGS: 'Settings',
  APPOINTMENTS: 'Appointments',
  SESSIONS: 'Sessions',
};

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
    APPOINTMENTS: 'appointments',
  },
};

export const ClientMenu = {
  SidePaths: {
    DASHBOARD: 'dashboard',
    TRAINERS: 'trainers',
    EXERCISES: 'exercises',
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
  NEW_SESSION = 'new-session',
  SETTINGS = 'settings',
  APPOINTMENTS = 'appointments',
  NEW_APPOINTMENT = 'new-appointment',
}

export enum ConnectionPaths {
  BUDDIES = 'buddies',
  TRAINERS = 'trainers',
  CLIENTS = 'clients',
}

// FIXME
type MenuType = {
  SidePaths?,
  TopPaths?,
};

export const getMenu = (userType: UserType): MenuType => {
  if (userType === UserType.CLIENT) {
    return ClientMenu;
  } if (userType === UserType.TRAINER) {
    return TrainerMenu;
  }
  return AdminMenu;
};

export const getDefaultRoute = (userType: UserType): string => `/${userType}/${FeaturePaths.DASHBOARD}`;

export const hasLogout = (userType: UserType): boolean => [UserType.ADMIN, UserType.TRAINER].includes(userType);
