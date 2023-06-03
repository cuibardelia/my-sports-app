import * as React from 'react';
import { useState } from 'react';
import UserModal from './UserModal';
import { useProtectedCall } from '../../../hooks/useProtectedCall';
import { IClient } from '../../types/User';
import { PageContainer } from '../../PageContainer.css';
import NoData from '../../Empty/NoData';
import ClientsGrid from '../../Grid/ClientsGrid';

const TrainerBuddies: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<IClient>(null);
  const { data } = useProtectedCall(`${process.env.TRAINER_API}/get-clients`, 'clients');

  const handleItemClick = (item) => {
    setSelectedUser(item);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  if (!data?.length) {
    return <NoData message="No clients yet" />;
  }

  return (
    <PageContainer>
      <ClientsGrid clients={data} setSelectedClient={handleItemClick} allowsMultiplePick={false} />
      <UserModal client={selectedUser} handleClose={handleModalClose} />
    </PageContainer>
  );
};

export default TrainerBuddies;
