import {
  IClient,
  ICommonAPIData,
  ICommonUser,
  ICommonUserUntouched,
  ITrainer, ITrainerAPIData,
  UserType,
} from '../components/types/User';
import { TargetArea } from '../components/types/Exercise';

// TODO: reuse, replace
export const getUserAPI = (userType: UserType): string => (process.env.GET_USERS_API.replace('REPLACE', userType));

const getFormattedTrainer = (data: ITrainerAPIData): Partial<ITrainer> => ({
  specialties: data.specialties || [],
  formattedSpecialties: data.specialties.join(', '),
  dateOfBirth: data.dateOfBirth,
  age: data.age,
  bio: data.bio || '',
});

const getFormattedClient = (data: IClient) => ({
  username: data.username,
  currentWeight: data.currentWeight || 0,
  goalWeight: data.goalWeight || 0,
  height: data.height || 0,
  favoriteTrainers: data.favoriteTrainers || [],
});

export const getFullName = (user: ICommonUserUntouched) => `${user.firstName} ${user.lastName}`;

const getFormattedCommonValues = (data: ICommonAPIData): Partial<ICommonUser> => ({
  id: data._id,
  picUrl: data.picUrl || '',
  name: getFullName(data),
  email: data.email,
  userType: data.userType,
});

// TODO: don't like this, think of options
const getParticularValues = (userData: ICommonAPIData, userType: UserType) => {
  if (userType === UserType.CLIENT) {
    const clientData = userData as IClient;
    return getFormattedClient(clientData);
  }
  const trainerData = userData as ITrainer;
  return getFormattedTrainer(trainerData);
};

export const getFormattedUser = (userData: ICommonAPIData[], userType: UserType) => {
  if (!userData) {
    return null;
  }
  return userData.map((data) => {
    const commonValues = getFormattedCommonValues(data);
    const particularValues = getParticularValues(data, userType);
    return { ...commonValues, ...particularValues };
  });
};

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

export const getProgressLabel = (date): string => (
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
);

export const getFormattedLabels = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const getEquipment = (equipment: string[]): string => (
  equipment?.join(', ') || 'None'
);

export const remapWeightStats = (stats) => stats.map((i) => ({
  date: getFormattedLabels(i.date),
  weight: i.value,
}));
