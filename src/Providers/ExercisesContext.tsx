import * as React from 'react';
import {
  createContext, useContext, useEffect, useState,
} from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext';
import { Exercise, TargetArea } from '../Types';
import {
  getFavExercisesApi, getFormattedTargets, getProtectedHeaders, rapidOptions,
} from '../helpers/fnRequest';
import { abs } from '../components/ExerciseCard/abs-example';

export interface IExerciseGrid {
  items: TargetArea[] | Exercise[];
}

export enum SelectedOption {
  CAT = 'Categories',
  FAV = 'Favorites',
  SPEC = 'Special',
  LOAD = 'Loading',
}

interface IExercisesContext {
  setSelectedOption: (o: string) => void;
  activeOption: string;
  items: TargetArea[] | Exercise[];
  openExercise: Exercise;
  setModalDetail: (e: Exercise) => void;
}

const targetCategories = ['abductors', 'abs', 'adductors', 'biceps', 'calves', 'cardiovascular system', 'delts', 'forearms', 'glutes', 'hamstrings', 'lats', 'levator scapulae', 'pectorals', 'quads', 'serratus anterior', 'spine', 'traps', 'triceps', 'upper back'];
export const exerciseOptions = [SelectedOption.CAT, SelectedOption.FAV, SelectedOption.SPEC];
const specialCategories = ['cardiovascular system', 'levator scapulae', 'spine'];

export const ExercisesContext = createContext<IExercisesContext | null>(null);

export const ExercisesProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeOption, setActiveOption] = useState<string>(exerciseOptions[0]);
  const [items, setItems] = useState<TargetArea[] | Exercise[]>([]);
  const [openExercise, setOpenExercise] = useState<Exercise>(null);

  const { user, token } = useAuthContext();

  // TODO: check on other pages not to request data
  useEffect(() => {
    switch (activeOption) {
      case SelectedOption.CAT:
        // FIXME: REMOVE WHEN SHOWCASING (will add mock data in the meantime, as we pay per request)
        // axios.get(`${process.env.EXERCISES_API}/targetList`, rapidOptions)
        //   .then((response) => {
        //     setItems(getFormattedTargets(response.data));
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
        setItems(getFormattedTargets(targetCategories));
        break;
      case SelectedOption.FAV:
        axios.get(getFavExercisesApi(user.userType), { headers: getProtectedHeaders(token) })
          .then((response) => {
            setItems(response.data?.data);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case SelectedOption.SPEC:
        setItems(getFormattedTargets(specialCategories));
        break;
      case SelectedOption.LOAD:
        // TODO: spinner
        setItems([]);
        break;
      default:
        // FIXME: REMOVE WHEN SHOWCASING (will add mock data in the meantime, as we pay per request)
        // axios.get(`${process.env.EXERCISES_API}/target/${encodeURI(selectedTarget)}`, rapidOptions)
        //   .then((response) => {
        //     setItems(response.data);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
        // @ts-ignore
        setItems(abs);
    }
  }, [activeOption]);

  // todo: spinner
  const setSelectedOption = (option: SelectedOption) => {
    setActiveOption(option);
  };

  const setModalDetail = (e: Exercise) => {
    setOpenExercise(e);
  };

  return (
    <ExercisesContext.Provider value={{
      activeOption, setSelectedOption, items, setModalDetail, openExercise,
    }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export const useExercisesContext = () => {
  const value = useContext(ExercisesContext);

  if (value === null) {
    throw new Error('Please wrap your components in the ExerciseProvider if you want this data!');
  }

  return value;
};
