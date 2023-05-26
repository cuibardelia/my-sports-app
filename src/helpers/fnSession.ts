export type difficulties = 'Easy' | 'Moderate' | 'High';
export interface SessionPlan {
  _id: string;
  name: string;
  notes: string;
  difficulty: difficulties;
  trainer: string;
  equipment: string[];
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
