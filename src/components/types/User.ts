import { specialtiesList } from '../../Types';
import { Appointment, SessionPlan } from '../../helpers/fnSession';
import { Exercise } from './Exercise';

export enum UserType {
  CLIENT = 'client',
  TRAINER = 'trainer',
  ADMIN = 'admin',
}

interface ICredentialData {
  email: string;
  password: string;
}

export interface IAdmin extends ICredentialData {
  userType: UserType;
}

// keys shared between Client and Trainer
export interface ICommonUserUntouched extends ICredentialData {
  lastName: string;
  firstName: string;
  picUrl: string;
  favoriteExercises: string[] | Exercise[];
  sessions: SessionPlan[];
  userType: UserType;
}

// backend keys
export interface ICommonAPIData extends ICommonUserUntouched {
  _id: string;
}

// frontend keys
export interface ICommonUser extends ICommonUserUntouched {
  id: string;
  name: string;
  appointments: Appointment[],
}

export interface ITrainerAPIData extends ICommonAPIData {
  dateOfBirth: string;
  bio: string;
  specialties: typeof specialtiesList;
  age: number;
}

export interface IClient extends ICommonUser {
  username: string;
  currentWeight: number;
  goalWeight: number;
  height: number;
  dateOfBirth: string;
  objectives: {
    dateInitial: string,
    goalWeight: number,
    initialWeight: number,
    dateAchieved?: string,
  }[],
  weightStats: {
    date: string;
    value: number;
  }[],
  favoriteTrainers: string[];
  _id?: string;
}

export interface ITrainer extends ICommonUser, ITrainerAPIData {
  age: number;
  formattedSpecialties: string;
}

// Shared data for Auth feature
export type IExtenderUser = IClient | ITrainer | IAdmin;
// Formatted Data for the app's main users
export type IUser = IClient | ITrainer;
