import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
} from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useAuthContext } from '../../Providers/AuthContext';
import { IClient } from '../types/User';
import TabNav from '../Navigation/TabNav';
import { PageContainer } from '../PageContainer.css';
import ProfilePictureUpdate from '../Profile/ProfilePictureUpdate';
import PersonalData from '../Profile/PersonalData';
import ConfirmActionModal from '../Modal/Presentational/ConfirmActionModal';

const SettingsContainer = styled(Container)({
  marginTop: '2rem',
  height: '70vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const settingsList = ['Personal Data', 'Profile Pic'];

const SettingsPage = () => {
  const { resetUser } = useAuthContext();
  const [selectedOption, setSelectedOption] = useState('Personal Data');
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [savedSuccessfully, setSavedSuccessfully] = useState<boolean>(false);

  const handleSuccess = (data: IClient) => {
    setSavedSuccessfully(true);
    resetUser(data);
  };

  const handleMenuClick = (item: string) => {
    setSelectedOption(item);
    setTabIndex(settingsList.indexOf(item));
  };

  const onModalClose = () => {
    setSavedSuccessfully(false);
  };

  const message = 'Your settings have been updated successfully.';

  return (
    <PageContainer>
      <TabNav optionsList={settingsList} tabIndex={tabIndex} handleClick={handleMenuClick} activeOption={selectedOption} />
      <SettingsContainer maxWidth="sm">
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              {
            selectedOption === 'Personal Data' ? (
              <PersonalData handleSuccess={handleSuccess} />
            ) : (
              <ProfilePictureUpdate handleSuccess={handleSuccess} />)
          }
            </Box>
          </CardContent>
        </Card>
        <ConfirmActionModal open={savedSuccessfully} onClose={onModalClose} message={message} title="Success" />
      </SettingsContainer>
    </PageContainer>
  );
};

export default SettingsPage;
