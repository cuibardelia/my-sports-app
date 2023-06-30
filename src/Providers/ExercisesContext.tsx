import * as React from 'react';
import {
  createContext, MutableRefObject, useContext, useEffect, useRef, useState,
} from 'react';
import { useAuthContext } from './AuthContext';
import {
  favEx,
  getFormattedTargets,
} from '../helpers/fnRequest';
import { abs } from '../components/ExerciseCard/abs-example';
import { fetchFavExercises, getRapidAPI } from '../hooks/useProtectedCall';
import { Exercise, TargetArea } from '../components/types/Exercise';

export interface IExerciseGrid {
  items: TargetArea[] | Exercise[];
  allowsMultiplePick?: boolean;
  setSelectedExercise?: (e:Exercise) => void;
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
  favExercises: MutableRefObject<Exercise[]>
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
  const favExercises = useRef<Exercise[]>([]);
  const { user } = useAuthContext();

  const fetchTargetList = getRapidAPI('targetList', (data) => {
    const formattedTargets = getFormattedTargets(data);
    setItems(formattedTargets);
  });
  const fetchAllFromCategory = getRapidAPI(`target/${encodeURI(activeOption)}`, setItems);

  useEffect(() => {
    const getFavExercises = async () => {
      if (user?.favoriteExercises) {
        // FIXME!:
        // favExercises.current = await fetchFavExercises(user.favoriteExercises as string[]);
        favExercises.current = favEx;
      }
    };

    if (user) {
      getFavExercises().then(null);
    }
  }, [user]);

  useEffect(() => {
    switch (activeOption) {
      case SelectedOption.CAT:
        // FIXME!:
        // fetchTargetList();
        setItems(getFormattedTargets(targetCategories));
        break;
      case SelectedOption.FAV:
        setItems(favExercises.current);
        break;
      case SelectedOption.SPEC:
        setItems(getFormattedTargets(specialCategories));
        break;
      case SelectedOption.LOAD:
        setItems([]);
        break;
      default:
        // FIXME!:
        // fetchAllFromCategory();
        // @ts-ignore
        setItems(abs);
    }
  }, [activeOption]);

  const setSelectedOption = (option: SelectedOption) => {
    setActiveOption(option);
  };

  const setModalDetail = (e: Exercise) => {
    setOpenExercise(e);
  };

  return (
    <ExercisesContext.Provider value={{
      activeOption, setSelectedOption, items, setModalDetail, openExercise, favExercises,
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
