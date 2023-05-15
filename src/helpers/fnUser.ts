import {
  AdminMenu, ClientMenu,
  FeaturePaths, IClient, ITrainer, IUser, TrainerMenu, UserType,
} from '../Types';

type AuthHeader = {
  'Content-type': string;
  'X-User-Type': UserType;
};

export const cType = {
  'Content-type': 'application/json',
};

export const getAuthHeaders = (userType: UserType): AuthHeader => (
  {
    ...cType,
    'X-User-Type': userType,
  }
);

export const getUserName = (user: IUser): string => {
  if (!user) {
    return '';
  }
  switch (user.userType) {
    case UserType.CLIENT:
      const client = user as IClient;
      return client.username || client.firstName;
    case UserType.TRAINER:
      const trainer = user as ITrainer;
      return trainer.firstName;
    default:
      return 'admin';
  }
};

export const getDefaultRoute = (userType: UserType): string => `/${userType}/${FeaturePaths.DASHBOARD}`;

// FIXME
type MenuType = {
  SidePaths,
  TopPaths?,
};

export const getMenu = (userType: UserType): MenuType => {
  switch (userType) {
    case UserType.CLIENT:
      return ClientMenu;
    case UserType.TRAINER:
      return TrainerMenu;
    default:
      return AdminMenu;
  }
};

export const hasLogout = (userType: UserType): boolean => [UserType.ADMIN, UserType.TRAINER].includes(userType);
