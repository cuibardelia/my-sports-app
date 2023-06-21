import { IClient } from '../components/types/User';

export const getStats = (client: IClient) => {
  let initialWeight = 0;
  let latestWeight = 0;
  let previousWeight = 0;
  let noResultsYet = true;
  let latestObjective = null;

  if (client.objectives?.length) {
    latestObjective = client.objectives.slice(-1);
    initialWeight = latestObjective[0].initialWeight;
  }

  if (client.weightStats?.length) {
    latestWeight = client.weightStats.slice(-1)[0].value || 0;
    previousWeight = client.weightStats.slice(-2)?.[0]?.value || initialWeight;
    noResultsYet = false;
  }

  const weightChange = latestWeight - previousWeight;

  return {
    initialWeight,
    latestWeight,
    previousWeight,
    weightChange,
    noResultsYet,
    latestObjective,
  };
};
