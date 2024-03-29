import * as React from 'react';
import {
  Tab, Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SelectedOption } from '../../Providers/ExercisesContext';
import theme from '../../theme';

type NavigableTabs = SelectedOption | string;

interface ITabs {
  optionsList: NavigableTabs[];
  tabIndex: number;
  handleClick: (option: NavigableTabs) => void;
  activeOption: NavigableTabs;
}

const TabContainer = styled('div')({
  marginBottom: '2rem',
});

const TabNav: React.FC<ITabs> = ({
  optionsList, tabIndex, handleClick, activeOption,
}) => (
  <TabContainer>
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
  </TabContainer>
);

export default TabNav;
