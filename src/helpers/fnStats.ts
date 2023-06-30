import { IClient } from '../components/types/User';
import { Exercise } from '../components/types/Exercise';

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
  const isLossObjective = initialWeight - client.goalWeight > 0;

  return {
    initialWeight,
    latestWeight,
    previousWeight,
    weightChange,
    noResultsYet,
    latestObjective,
    isLossObjective,
  };
};

export const getProgress = (remainingKgs: number, initialWeight: number, goalWeight: number): number => {
  const interval = Math.abs(initialWeight - goalWeight);
  if (!interval) {
    return 0;
  }

  return ((interval - remainingKgs) / interval) * 100;
};

export const getStatsMessage = (isProgress: boolean, isLossObjective: boolean, noResultsYet: boolean): string => {
  const objective = isLossObjective ? 'loss' : 'gain';
  // eslint-disable-next-line no-nested-ternary
  return isProgress ? `Congratulations on your weight ${objective}!` : noResultsYet ? 'Welcome to your journey' : `Looks like you\'ve gone astray from your weight ${objective} objective`;
};

export const getLossClients = (clients: IClient[]): IClient[] => clients.filter((c) => {
  const { isLossObjective } = getStats(c);
  return isLossObjective;
});

export const getGainClients = (clients: IClient[]): IClient[] => clients.filter((c) => {
  const { isLossObjective } = getStats(c);
  return !isLossObjective;
});

export const getTargets = (exercises: Exercise[]): { name: string; value: number }[] => {
  if (!exercises) {
    return [];
  }

  const bodyPartsMap: { [key: string]: number } = {};

  exercises.forEach(({ target }) => {
    bodyPartsMap[target] = (bodyPartsMap[target] || 0) + 1;
  });

  const totalExercises = exercises.length || 1;

  const targets = Object.entries(bodyPartsMap).map(([bodyPart, count]) => ({
    name: bodyPart,
    value: Math.floor((count / totalExercises) * 100),
  }));

  return targets.sort((a, b) => b.value - a.value);
};
