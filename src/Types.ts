export enum SidePaths {
  DASHBOARD = '/dashboard',
  BUDDIES = '/buddies',
  HISTORIC = '/historic',
  EXERCISES = '/exercises',
}

export enum AuthPaths {
  LOGIN = '/',
  REGISTER = '/register',
  FORGOT = '/forgotpassword',
  RESET = '/passwordreset',
}

export enum TopPaths {
  DASHBOARD = '/dashboard',
  TRAINERS = '/trainers',
  SETTINGS = '/settings',
}

export type AppPaths = TopPaths | SidePaths | AuthPaths;
