import * as React from 'react';
import { PageContainer } from '../../PageContainer.css';
import ClientCard from '../Client/ClientCard';
import { useAuthContext } from '../../../Providers/AuthContext';
import { UserType } from '../../types/User';
import TrainerCard from '../../Card/TrainerCard';

const UserProfile: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <PageContainer>
      { user.userType === UserType.CLIENT ? (<ClientCard user={user} />) : (<TrainerCard user={user} isOwn />)}
    </PageContainer>
  );
};

export default UserProfile;
