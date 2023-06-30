import * as React from 'react';
import {
  Container, Grid, Pagination, styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { IExerciseGrid } from '../../Providers/ExercisesContext';
import NoData from '../Empty/NoData';

// TODO: styling, responsiveness - need content container
const GridContainer = styled(Container)({
  margin: '20px 0',
  maxHeight: '100%',
});

const OuterContainer = styled(Container)({
  margin: '20px 0',
  height: '80%',
});

const InnerContainer = styled(Grid)({
  margin: '20px 0',
});

const LoadingSpinner = () => <CircularProgress color="inherit" />;

const ExerciseGrid: React.FC<IExerciseGrid> = ({ items, allowsMultiplePick = false, setSelectedExercise }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = allowsMultiplePick ? 6 : 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => () => {
    setCurrentPage(1);
  }, [items]);

  if (!items.length) {
    return <NoData message="No favorites yet" />;
  }

  // FIXME: no style props
  return (
    <OuterContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
      <GridContainer>
        <InnerContainer container spacing={1}>
          {displayedItems.map((item, index) => (
            <Grid key={item.name} item xs={12} sm={6} md={4}>
              <ExerciseCard allowsPick={allowsMultiplePick} setSelectedExercise={setSelectedExercise} key={`${item.name}-${item.id || index}`} e={item} name={item.name} />
            </Grid>
          ))}
        </InnerContainer>
      </GridContainer>
    </OuterContainer>
  );
};

export default ExerciseGrid;
