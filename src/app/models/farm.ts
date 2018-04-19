export interface Farm {
  $key?: string;
  name?: string;
  description?: string;
  long?: number;
  lat?: number;
  activities?: string;
  adress?: string;
  contact?: string;
  prefecture?: string;
  canton?: string;
  ville?: string;
  gestionnaires?: any;
  enable: boolean;
}
