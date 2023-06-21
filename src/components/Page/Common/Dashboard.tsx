import * as React from 'react';
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
import { useAuthContext } from '../../../Providers/AuthContext';
import { IClient } from '../../types/User';

// Daily activity
// https://dev.fitbit.com/build/reference/web-api/activity/get-daily-activity-summary/

export function getKeyFromValue(value: string): string {
  return Object.keys(OptionMapping).find((key) => OptionMapping[key] === value);
}

const getChartIndex = (value: OptionMappingKeys): number => dashboardOptions.indexOf(value);

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const client = user as IClient;
  const [selectedChart, setSelectedChart] = useState<string>('dailyStats');
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleOptionChange = (option: OptionMappingKeys) => {
    setSelectedChart(getKeyFromValue(option));
    setTabIndex(getChartIndex(option));
  };

  return (
    <PageContainer>
      <TabNav optionsList={dashboardOptions} tabIndex={tabIndex} handleClick={handleOptionChange} activeOption={OptionMapping[selectedChart]} />
      <div>
        {(() => {
          switch (selectedChart) {
            case 'dailyStats':
              return <DashboardCard />;
            case 'stepStats':
              return <StepsChart />;
            case 'weightEvolution':
              return <WeightStats client={client} />;
            case 'activeZoneStats':
              return <ActiveZoneChart />;
            default:
              return null;
          }
        })()}
      </div>
    </PageContainer>
  );
};
export default Dashboard;
