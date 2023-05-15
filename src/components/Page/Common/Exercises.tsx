import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import PageContainer from '../../PageContainer.css';
import ExerciseCard from '../../ExerciseCard/ExerciseCard';
import { example } from '../../ExerciseCard/exercise-data';

const imageDataList: ImageData[] = [
  { Abs: 'assets/planks.png' },
  { Legs: 'assets/squats.png' },
  { Chest: 'assets/pull-ups.png' },
  { Back: 'assets/kettle.png' },
];

interface ImageData {
  [key: string]: string;
}

const exerciseList = [
  'abductors',
  'abs',
  'adductors',
  'biceps',
  'calves',
  'cardiovascular system',
  'delts',
  'forearms',
  'glutes',
  'hamstrings',
  'lats',
  'levator scapulae',
  'pectorals',
  'quads',
  'serratus anterior',
  'spine',
  'traps',
  'triceps',
  'upper back',
];

const imageList: ImageData[] = [
  { abductors: 'assets/planks.png' },
  { abs: 'assets/squats.png' },
  { biceps: 'assets/pull-ups.png' },
  { glutes: 'assets/kettle.png' },
];

const pathToNameMapper: Record<string, string> = {};

imageDataList.forEach((imageData) => {
  const key = Object.keys(imageData)[0];
  pathToNameMapper[imageData[key]] = key;
});

// TODO: type & myfitpal DB
// const exercises = [
//   {
//     name: 'squats',
//     repetitions: 15,
//     pic: 'assets/squats.png',
//   },
//   {
//     name: 'kettle',
//     repetitions: 10,
//     pic: 'assets/kettle.png',
//   },
//   {
//     name: 'planks',
//     repetitions: 3,
//     pic: 'assets/planks.png',
//   },
//   {
//     name: 'pull ups',
//     repetitions: 15,
//     pic: 'assets/pull-ups.png',
//   },
//   {
//     name: 'ball squats',
//     repetitions: 15,
//     pic: 'assets/ball-squats.png',
//   },
//   {
//     name: 'kettle',
//     repetitions: 10,
//     pic: 'assets/kettle.png',
//   },
//   {
//     name: 'planks',
//     repetitions: 3,
//     pic: 'assets/planks.png',
//   },
//   {
//     name: 'pull ups',
//     repetitions: 15,
//     pic: 'assets/pull-ups.png',
//   },
// ];

const getPic = (e: any): string => {
  if (!e) {
    return '';
  }
  imageDataList.forEach((id) => {
    Object.keys(id).forEach((key) => {
      if (key === e.category?.name) {
        console.log(`Found image: ${key}: ${id[key]}`);
        return id[key];
      }
    });

    return '';
  });

  // return pic;
};

const ListContainer = styled.main`
  margin: 300px 0 300px 100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
`;

// https://api-ninjas.com/api/exercises if this one is ok we could asses muscle -> png
// https://wger.de/api/v2/exerciseinfo/ same here!!

const mapPics = (exercises: any) => {
  exercises.forEach((e) => {
    const { name } = e.category;

    imageDataList.forEach((id) => {
      for (const key in id) {
        console.log(`${key}: ${id[key]}`);
        if (key === name) {
          e.pic = id[key];
        }
      }
    });
  });
};

const options = {
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': '96a774b757msh7efcf2d13b7e65ep118082jsn2ba19560076c',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState([]);

  // TODO: Pagination
  useEffect(() => {
    // axios.get('https://exercisedb.p.rapidapi.com/exercises/target/abs', options)
    //   .then((response) => {
    //     console.log('HEREE', response);
    //     setExercises(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    setExercises(example);
  }, []);

  return (
    <PageContainer>
      <ListContainer>
        {/* eslint-disable-next-line max-len */}
        {exercises?.map((exercise, index) => (<ExerciseCard key={`${exercise?.name}-${index}`} e={exercise} name={exercise?.name} path={exercise.gifUrl} />))}
      </ListContainer>
    </PageContainer>
  );
};
export default Exercises;
