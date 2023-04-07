import { CardContainer, CardInner, Snap } from "./ExerciseCard.css";

type CardExercisePropType = {
    name: string;
    path: string;
};

const ExerciseCard: React.FC<CardExercisePropType> = ({name='', path=''}) => {
    return (
        <CardContainer>
            <CardInner>
                <Snap path={path} />
            </CardInner>
        </CardContainer>

    );
}

export default ExerciseCard;
