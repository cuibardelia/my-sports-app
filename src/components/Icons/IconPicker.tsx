import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { ConnectionPaths, FeaturePaths, SidePaths } from '../../helpers/fnPaths';

const IconPicker: React.FC<{ path: SidePaths }> = ({ path }) => {
  switch (path) {
    case ConnectionPaths.CLIENTS:
    case ConnectionPaths.TRAINERS:
      return <PeopleIcon />;
    case FeaturePaths.EXERCISES:
      return <FitnessCenterIcon />;
    case FeaturePaths.APPOINTMENTS:
      return <EventIcon />;
    case FeaturePaths.SESSIONS:
      return <PersonIcon />;
    case FeaturePaths.DASHBOARD:
      return <CelebrationIcon />;
    default:
      return <InboxIcon />;
  }
};

export default IconPicker;
