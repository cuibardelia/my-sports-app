import * as React from 'react';

import PageContainer from '../../PageContainer.css';
import { UserTable } from '../../Tables/UserTable';
import { UserType } from '../../../Types';
import { AdminProvider } from '../../../Providers/AdminContext';
import UserModal from './UserModal';
import DeleteModal from './DeleteModal';
import PicModal from './PicModal';

const AdminUsers: React.FC<{ userType: UserType }> = ({ userType }) => (
  <PageContainer>
    <AdminProvider userType={userType}>
      <main>
        <UserTable />
        <UserModal />
        <DeleteModal />
        <PicModal />
      </main>
    </AdminProvider>
  </PageContainer>
);
export default AdminUsers;
