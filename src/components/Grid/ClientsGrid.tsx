import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Grid, Container, Pagination, styled,
} from '@mui/material';
import { IClient } from '../types/User';
import NoData from '../Empty/NoData';
import ClientCard from '../Card/ClientCard';

const GridContainer = styled(Container)({
  margin: '20px 0',
  height: '80%',
});

const itemsPerPage = 9;

export interface IClientsGrid {
  clients: IClient[];
  allowsMultiplePick?: boolean;
  setSelectedClient?: (c:IClient) => void;
}

const ClientsGrid: React.FC<IClientsGrid> = ({
  clients, allowsMultiplePick = false, setSelectedClient,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = clients.slice(startIndex, endIndex);
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => () => {
  	setCurrentPage(1);
  }, [clients]);

  if (!clients.length) {
  	return <NoData message="No clients yet" />;
  }

  // FIXME: no style props
  return (
    <GridContainer>
      { totalPages > 1 && (
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
      )}
      <Grid container spacing={2} sx={{ margin: '2rem' }}>
        {displayedItems?.map((buddy) => (
          <Grid item xs={6} sm={4} md={3} key={buddy.email} onClick={() => setSelectedClient(buddy)}>
            <ClientCard buddy={buddy} allowsPick={allowsMultiplePick} />
          </Grid>
        ))}
      </Grid>
    </GridContainer>
  );
};

export default ClientsGrid;
