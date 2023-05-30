import React from 'react';
import WrongPage from '../Empty/WrongPage';

const NotFound: React.FC = () => (
  <WrongPage message="Ooops! This is not a correct URL" buttonMessage="Go Home" />
);

export default NotFound;
