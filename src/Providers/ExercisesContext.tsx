import * as React from 'react';
import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { useAuthContext } from './AuthContext';
import { Exercise, TargetArea } from '../Types';
import {
  getFavExercisesApi, getFormattedTargets,
} from '../helpers/fnRequest';
import { abs } from '../components/ExerciseCard/abs-example';
import { getRapidAPI, useProtectedCallback } from '../hooks/useProtectedCall';

export interface IExerciseGrid {
  items: TargetArea[] | Exercise[];
  allowsMultiplePick?: boolean;
  setSelectedExercise?: (e:Exercise) => void;
}

// TODO: special cant be seen by those who don't have the speciality
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
  const { user } = useAuthContext();

  const callFavAPI = useProtectedCallback(getFavExercisesApi(user?.userType), 'data', setItems);
  const fetchTargetList = getRapidAPI('targetList', (data) => {
    const formattedTargets = getFormattedTargets(data);
    setItems(formattedTargets);
  });
  const fetchAllFromCategory = getRapidAPI(`target/${encodeURI(activeOption)}`, setItems);

  // TODO: Redux
  useEffect(() => {
    switch (activeOption) {
      case SelectedOption.CAT:
        // FIXME: REMOVE WHEN SHOWCASING (will add mock data in the meantime, as we pay per request)
        // fetchTargetList();
        setItems(getFormattedTargets(targetCategories));
        break;
      case SelectedOption.FAV:
        callFavAPI();
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
        // fetchAllFromCategory();
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
