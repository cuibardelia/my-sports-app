import * as React from 'react';
import styled from 'styled-components';
import { Grid, Pagination } from '@mui/material';
import { useState } from 'react';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { IExerciseGrid } from '../../Providers/ExercisesContext';

// TODO: styling, responsiveness - need content container
const GridContainer = styled.div`
    margin: 40px 80px 100px 130px;
    height: 80%;
`;

const itemsPerPage = 9;

const ExerciseGrid: React.FC<IExerciseGrid> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indices of the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the items to display on the current page based on the calculated indices
  const displayedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // FIXME: no style props
  return (
    <GridContainer>
      <Grid container spacing={1}>
        {displayedItems.map((item, index) => (
          <Grid key={item.name} item xs={12} sm={6} md={4}>
            <ExerciseCard key={`${item.name}-${item.id || index}`} e={item} name={item.name} path={item.url || item.gifUrl} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: '20px' }}
      />
    </GridContainer>
  );
};

export default ExerciseGrid;
