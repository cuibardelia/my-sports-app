import * as React from 'react';
import WrongPage from '../Empty/WrongPage';

const NoRights: React.FC = () => (
  <WrongPage message="You&apos;re not allowed here, sorry!" buttonMessage="Go Home" />
);
export default NoRights;
