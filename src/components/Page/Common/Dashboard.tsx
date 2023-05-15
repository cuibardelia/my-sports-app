import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import PageContainer from '../../PageContainer.css';
import StepsChart from '../../Chart/StepsChart';
import ActiveZoneChart from '../../Chart/ActiveZoneChart';
import DailyGoalChart from '../../Chart/DailyGoalChart';
import Dropdown from '../../Dropdown/Dropdown';
import { optionMappingKeys, OptionMappingKeys } from '../../../Types';

// Daily activity
// https://dev.fitbit.com/build/reference/web-api/activity/get-daily-activity-summary/

const ChartArea = styled.main`
    width: 600px;
    height: 500px;
`;

const Dashboard: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<OptionMappingKeys>('dailyStats');

  const handleOptionChange = (option: OptionMappingKeys) => {
    setSelectedChart(option);
  };

  return (
  // TODO: some cheering message

    <PageContainer>
      <Dropdown options={optionMappingKeys} selectedOption="dailyStats" onOptionChange={handleOptionChange} />
      <ChartArea>
        {(() => {
          switch (selectedChart) {
            case 'dailyStats':
              return <DailyGoalChart />;
            case 'stepStats':
              return <StepsChart />;
            case 'activeZoneStats':
              return <ActiveZoneChart />;
            default:
              return null;
          }
        })()}
      </ChartArea>
    </PageContainer>
  );
};
export default Dashboard;
