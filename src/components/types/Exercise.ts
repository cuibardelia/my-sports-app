export type TargetArea = {
  name: string;
  url: string;
  type: string;
};

export type Exercise = {
  name: string;
  gifUrl: string;
  id: string;
  target: string;
  bodyPart: string;
  equipment: string;
  _id?: string;
};
