import PageContainer from "../Component/PageContainer.css";
import ExerciseCard from "../Component/ExerciseCard/ExerciseCard";
import styled from 'styled-components';


// TODO: type
const exercises = [
    {
        name: "squats",
        repetitions: 15,
        pic: "assets/squats.png"
    },
    {
        name: "kettle",
        repetitions: 10,
        pic: "assets/kettle.png"
    },
    {
        name: "planks",
        repetitions: 3,
        pic: "assets/planks.png"
    },
    {
        name: "pull ups",
        repetitions: 15,
        pic: "assets/pull-ups.png"
    },
    {
        name: "ball squats",
        repetitions: 15,
        pic: "assets/ball-squats.png"
    },
    {
        name: "kettle",
        repetitions: 10,
        pic: "assets/kettle.png"
    },
    {
        name: "planks",
        repetitions: 3,
        pic: "assets/planks.png"
    },
    {
        name: "pull ups",
        repetitions: 15,
        pic: "assets/pull-ups.png"
    },
];

const ListContainer = styled.main`
    display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 30px;
  grid-column-gap: 30px;
`;

const Exercises: React.FC = () => {
    return (
        <PageContainer>
            <ListContainer>
                {exercises.map(exercise => (<ExerciseCard name={exercise.name} path={exercise.pic} />))}
            </ListContainer>
        </PageContainer>
    );
}
export default Exercises;
