import React, { useEffect, useState } from 'react';
import {
  Grid, Container, Typography, Pagination,
} from '@mui/material';
import { styled } from '@mui/system';
import NoData from '../Empty/NoData';
import { useProtectedCall } from '../../hooks/useProtectedCall';
import SessionCard from '../Card/SessionCard';
import { FeaturePaths } from '../../helpers/fnPaths';

const GridContainer = styled(Container)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  height: '80%',
  width: '100%',
}));

const itemsPerPage = 9;

const CardContainer = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '& .MuiTypography-root': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

// FIXME: need resposnive
const FixedGrid = styled(Grid)(() => ({
  height: '100%',
}));

const StyledCardContainer = styled(CardContainer)(() => ({
  width: '80%',
}));

const SessionsGrid = ({ onCardClick, allowsPick = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useProtectedCall(`${process.env.TRAINER_API}/get-sessions`, 'sessions');

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  if (!data.length) {
    return <NoData message="No sessions yet" buttonText="Create New Session" link={FeaturePaths.NEW_SESSION} />;
  }

  return (
    <GridContainer>
      {totalPages > 1 && (
      <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
      )}
      <FixedGrid container spacing={2} sx={{ margin: '2rem' }}>
        {displayedItems.map((s) => (
          <Grid item xs={12} sm={6} md={4} key={s._id}>
            <StyledCardContainer onClick={() => onCardClick(s)}>
              <SessionCard session={s} allowsPick={allowsPick} />
              <Typography variant="body2" component="p">
                {s.title}
              </Typography>
            </StyledCardContainer>
          </Grid>
        ))}
      </FixedGrid>
    </GridContainer>
  );
};

export default SessionsGrid;
