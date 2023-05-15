import { Specialties, UserType } from '../Types';

export const getUserAPI = (userType: UserType): string => (userType === UserType.CLIENT ? process.env.GET_CLIENTS_API : process.env.GET_TRAINERS_API);

// FIXME: Sessions
type CommonInfo = {
  id: string;
  name: string,
  email: string;
  sessions?: any[];
  favoriteExercises?: any[];
};

export interface TrainerInfo extends CommonInfo {
  specialties: string,
}

export interface ClientInfo extends CommonInfo {
  username: string,
}

export type UserFormattedInfo = TrainerInfo | ClientInfo;

const formatSpecialties = (specialties: Specialties[]): string => specialties?.join(', ') || '';

// FIXME: TYPE
const getFormattedTrainer = (data: any) => ({
  specialties: formatSpecialties(data.specialties),
});

const getFormattedClient = (data: any) => ({
  username: data.username,
});

const getFormattedCommonValues = (data: any): CommonInfo => ({
  id: data.id,
  name: `${data.firstName} ${data.lastName}`,
  email: data.email,
});

const getParticularValues = (userData: any, userType: UserType) => (userType === UserType.CLIENT ? getFormattedClient(userData) : getFormattedTrainer(userData));

export const getFormattedUser = (userData: any, userType: UserType): UserFormattedInfo[] => {
  if (!userData) {
    return null;
  }
  return userData.map((t) => ({
    ...getFormattedCommonValues(t),
    ...getParticularValues(t, userType),
  }));
};

interface CommonHeaders {
  'Content-type': string;
}

// interface AuthHeader extends CommonHeaders {
//   'X-User-Type': UserType;
// }

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

// interface ProtectedHeader extends CommonHeaders {
//   Authorization: string;
// }

type ProtectedHeader = {
  Authorization: string;
  'Content-type': string;
};

export const getProtectedHeaders = (token: string): ProtectedHeader => (
  {
    ...cType,
    Authorization: `Bearer ${token}`,
  }
);
