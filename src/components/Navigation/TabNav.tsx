import * as React from 'react';
import {
  Tab, Tabs,
} from '@mui/material';
import { SelectedOption } from '../../Providers/ExercisesContext';
import theme from '../../theme';

// FIXME: types
type NavigableTabs = SelectedOption | string;

interface ITabs {
  optionsList: NavigableTabs[];
  tabIndex: number;
  handleClick: (option: NavigableTabs) => void;
  activeOption: NavigableTabs;
}

const TabNav: React.FC<ITabs> = ({
  optionsList, tabIndex, handleClick, activeOption,
}) => (
  <Tabs value={tabIndex} aria-label="exercises groups">
    {optionsList.map((option) => (
      <Tab
        key={`${option}-${tabIndex}`}
        onClick={() => handleClick(option)}
        label={option}
        style={{
          color: activeOption === option ? theme.palette.primary.main : theme.palette.primary.dark,
        }}
      />
    ))}
  </Tabs>
);

export default TabNav;
