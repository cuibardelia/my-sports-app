import * as React from 'react';
import {
  Container, Grid, Pagination, styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { IExerciseGrid } from '../../Providers/ExercisesContext';

// TODO: styling, responsiveness - need content container

const GridContainer = styled(Container)({
  margin: '40px 80px 100px 130px',
  height: '80%',
});

const StyledPagination = styled(Pagination)({
  marginTop: '40px',
});

const itemsPerPage = 9;

const ExerciseGrid: React.FC<IExerciseGrid> = ({ items, allowsMultiplePick = false, setSelectedExercise }) => {
  const [currentPage, setCurrentPage] = useState(1);

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

  // FIXME: no style props
  return (
    <GridContainer>
      <Grid container spacing={1}>
        {displayedItems.map((item, index) => (
          <Grid key={item.name} item xs={12} sm={6} md={4}>
            <ExerciseCard allowsPick={allowsMultiplePick} setSelectedExercise={setSelectedExercise} key={`${item.name}-${item.id || index}`} e={item} name={item.name} path={item.url || item.gifUrl} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </GridContainer>
  );
};

export default ExerciseGrid;
