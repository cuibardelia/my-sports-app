import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Grid, Container, Pagination, styled,
} from '@mui/material';
import NoData from '../Empty/NoData';
import { useProtectedCall } from '../../hooks/useProtectedCall';
import { SessionPlan } from '../../helpers/fnSession';
import SessionCard from '../Card/SessionCard';
import { FeaturePaths } from '../../helpers/fnPaths';

const GridContainer = styled(Container)({
  margin: '20px 0',
  height: '80%',
});

const itemsPerPage = 9;

export interface IClientsGrid {
  onCardClick: (s: SessionPlan) => void;
  allowsPick?: boolean;
}

const SessionsGrid: React.FC<IClientsGrid> = ({ onCardClick, allowsPick = false }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useProtectedCall(`${process.env.TRAINER_API}/get-sessions`, 'sessions');

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => () => {
    setCurrentPage(1);
  }, [data]);

  if (!data.length) {
	  return <NoData message="No sessions yet" buttonText="Create New Session" link={FeaturePaths.NEW_SESSION} />;
  }

  // FIXME: no style props
  return (
    <GridContainer>
      <Grid container spacing={2} sx={{ margin: '2rem' }}>
        {displayedItems?.map((s) => (
          <Grid item xs={6} sm={4} md={3} key={s._id} onClick={() => onCardClick(s)}>
            <SessionCard session={s} allowsPick={allowsPick} />
          </Grid>
        ))}
      </Grid>
      { totalPages > 1 && (
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
      )}
    </GridContainer>
  );
};

export default SessionsGrid;
