import {
  IClient, ITrainer, IUser, UserType,
} from '../Types';

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
