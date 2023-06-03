export type difficulties = 'Easy' | 'Moderate' | 'High';
export interface SessionPlan {
  _id: string;
  name: string;
  notes: string;
  difficulty: difficulties;
  trainer: string;
  equipment: string[];
  targets: string[];
  exercises: string[];
}

export interface Appointment {
  _id: string;
  startDate: string;
  endDate: string;
  roomName: string;
  clients: string[];
  session: SessionPlan;
}

export const toggleIdInArray = (array: string[], id: string): string[] => {
  const index = array.indexOf(id);

  if (index !== -1) {
    array.splice(index, 1);
  } else {
    array.push(id);
  }

  return array;
};
