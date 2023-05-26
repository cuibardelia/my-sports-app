import * as React from 'react';

import PageContainer from '../../PageContainer.css';
import { UserTable } from '../../Tables/UserTable';
import { UserType } from '../../../Types';
import { AdminProvider } from '../../../Providers/AdminContext';
import UserModal from './UserModal';
import DeleteModal from './DeleteModal';
import PicSuccessModal from '../../Modal/PicSuccessModal';
import TrainerPicModal from '../../Modal/TrainerPicModal';
import AdminErrorModal from '../../Modal/AdminErrorModal';

const AdminUsers: React.FC<{ userType: UserType }> = ({ userType }) => (
  <PageContainer>
    <AdminProvider userType={userType}>
      <main>
        <UserTable userType={userType} />
        <UserModal />
        <DeleteModal />
        <TrainerPicModal />
        <PicSuccessModal />
        <AdminErrorModal />
      </main>
    </AdminProvider>
  </PageContainer>
);
export default AdminUsers;
