import * as React from 'react';
import { useEffect, useState } from 'react';
import UserModal from './UserModal';
import { useProtectedCallback } from '../../../hooks/useProtectedCall';
import { IClient } from '../../types/User';
import { PageContainer } from '../../PageContainer.css';
import NoData from '../../Empty/NoData';
import ClientsGrid from '../../Grid/ClientsGrid';
import TabNav from '../../Navigation/TabNav';
import { OptionMappingKeys } from '../../../Types';
import { getGainClients, getLossClients } from '../../../helpers/fnStats';

const clientOptions = ['All', 'Weightloss', 'Weightgain'];

const TrainerBuddies: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<IClient>(null);
  const [data, setData] = useState<IClient[]>([]);
  const [clients, setClients] = useState<IClient[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('All');
  const [tabIndex, setTabIndex] = useState<number>(0);
  const callAPI = useProtectedCallback(`${process.env.TRAINER_API}/get-clients`, 'clients', setData);

  const handleOptionChange = (option: OptionMappingKeys) => {
    setSelectedOption((option));
    setTabIndex(clientOptions.indexOf(option));
  };

  useEffect(() => {
    setClients(data);
  }, [data]);

  useEffect(() => {
    callAPI();
  }, []);

  useEffect(() => {
    switch (selectedOption) {
      case clientOptions[1]:
        setClients(getLossClients(data));
        break;
      case clientOptions[2]:
        setClients(getGainClients(data));
        break;
      default:
        setClients(data);
        break;
    }
  }, [selectedOption]);

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
      <TabNav optionsList={clientOptions} tabIndex={tabIndex} handleClick={handleOptionChange} activeOption={selectedOption} />
      <ClientsGrid clients={clients} setSelectedClient={handleItemClick} allowsMultiplePick={false} />
      <UserModal client={selectedUser} handleClose={handleModalClose} />
    </PageContainer>
  );
};

export default TrainerBuddies;
