import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { UserPaths } from '../../helpers/fnPaths';
import { FormLinks } from './FormLinks';

const getLoginPath = (pathName: string): string => `..${pathName.includes(UserPaths.TRAINER) ? (`/${UserPaths.TRAINER}`) : ''}`;

export const GoBack: React.FC = () => {
  const location = useLocation();

  return (
    <FormLinks message="Got Lost" link={getLoginPath(location.pathname)} linkMessage="Go back to Login" />
  );
};
