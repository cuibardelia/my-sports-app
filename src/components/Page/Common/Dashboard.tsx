import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { PageContainer } from '../../PageContainer.css';
import StepsChart from '../../Chart/StepsChart';
import ActiveZoneChart from '../../Chart/ActiveZoneChart';
import {
  dashboardOptions, OptionMapping, OptionMappingKeys,
} from '../../../Types';
import WeightStats from '../../Chart/WeightStats';
import TabNav from '../../Navigation/TabNav';
import DashboardCard from '../../Card/DashboardCard';

// Daily activity
// https://dev.fitbit.com/build/reference/web-api/activity/get-daily-activity-summary/

const ChartArea = styled.main`
    width: 600px;
    height: 500px;
`;
export function getKeyFromValue(value: string): string {
  return Object.keys(OptionMapping).find((key) => OptionMapping[key] === value);
}

const getChartIndex = (value: OptionMappingKeys): number => dashboardOptions.indexOf(value);

const Dashboard: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<string>('dailyStats');
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleOptionChange = (option: OptionMappingKeys) => {
    setSelectedChart(getKeyFromValue(option));
    setTabIndex(getChartIndex(option));
  };

  return (
  // TODO: best user of the week, month, results

    <PageContainer>
      <TabNav optionsList={dashboardOptions} tabIndex={tabIndex} handleClick={handleOptionChange} activeOption={OptionMapping[selectedChart]} />
      <ChartArea>
        {(() => {
          switch (selectedChart) {
            case 'dailyStats':
              return <DashboardCard />;
            case 'stepStats':
              return <StepsChart />;
            case 'weightEvolution':
              return <WeightStats />;
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
