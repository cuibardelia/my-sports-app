import * as React from 'react';
import { UserTable } from '../../Tables/UserTable';
import { AdminProvider } from '../../../Providers/AdminContext';
import UserModal from './UserModal';
import DeleteModal from './DeleteModal';
import PicSuccessModal from '../../Modal/PicSuccessModal';
import TrainerPicModal from '../../Modal/TrainerPicModal';
import AdminErrorModal from '../../Modal/AdminErrorModal';
import { IAuth } from '../../types/Auth';
import { AdminPageContainer } from '../../PageContainer.css';

const AdminUsers: React.FC<IAuth> = ({ userType }) => (
  <AdminPageContainer>
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
  </AdminPageContainer>
);
export default AdminUsers;
