import {
  specialtiesList, TargetArea, UserType,
} from '../Types';

/*
=========================
	    GET USERS
=========================
*/
// TODO: reuse, replace
export const getUserAPI = (userType: UserType): string => (process.env.GET_USERS_API.replace('REPLACE', userType));

// FIXME: Sessions type
type CommonInfo = {
  id: string;
  name: string,
  email: string;
  userType: UserType;
  bio: string;
  sessions?: any[];
  favoriteExercises?: any[];
  picUrl: string;
};

export interface TrainerInfo extends CommonInfo {
  specialties: typeof specialtiesList,
}

export interface ClientInfo extends CommonInfo {
  username: string,
}

export type UserFormattedInfo = TrainerInfo | ClientInfo;

// FIXME: TYPE
const getFormattedTrainer = (data: any) => ({
  specialties: data.specialties,
});

const getFormattedClient = (data: any) => ({
  username: data.username,
});

export const getFullName = (user: any) => `${user.firstName} ${user.lastName}`;

const getFormattedCommonValues = (data: any): CommonInfo => ({
  id: data._id,
  bio: data.bio,
  picUrl: data.picUrl || '',
  name: getFullName(data),
  email: data.email,
  userType: data.userType,
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

export const buddyAPIMapping = {
  All: `${process.env.CLIENT_API}/all-trainers`,
  'My Personal Trainers': `${process.env.CLIENT_API}/get-personal-trainers`,
};

/*
=========================
	   PROTECTED
=========================
*/
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

/*
==============================
	    EXERCISES API
==============================
*/
export const getFavExercisesApi = (userType: UserType): string => (process.env.FAV_EXERCISES_API.replace('REPLACE', userType));

const addFavExerciseApi = (userType: UserType): string => (process.env.ADD_TO_FAV_API.replace('REPLACE', userType));

const removeFavExerciseApi = (userType: UserType): string => (process.env.REMOVE_FROM_FAV_API.replace('REPLACE', userType));

export const getFavActionApi = (userType: UserType, isFavorite: boolean): string => (isFavorite ? removeFavExerciseApi(userType) : addFavExerciseApi(userType));

export const rapidOptions = {
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.RAPID_API_HOST,
  },
};

const formatTargetPicName = (t: string) => (t?.split(' ')?.join('-') || '');

export const getFormattedTargets = (apiAreas: string[]): TargetArea[] => apiAreas.map((t) => ({
  name: t,
  url: `/assets/targets/${formatTargetPicName(t)}.png`,
  type: 'category',
}));

/*
==============================
	    UPLOAD
==============================
*/
export const getUploadApi = (userType: UserType): string => (process.env.UPLOAD_API.replace('REPLACE', userType));

export const getFormattedDate = (date): string => `${date.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
})}: ${date.toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
})}`;

export const getHours = (date): string => (
  `${date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })}`
);

export const getDate = (date): string => (
  `${date.toLocaleTimeString('en-GB', {
    day: '2-digit',
    month: '2-digit',
  })}`
);

export const getEquipment = (equipment: string[]): string => (
  equipment?.join(', ') || 'None'
);
