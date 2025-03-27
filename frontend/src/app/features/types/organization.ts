import { RegionalOffice } from './regional-office';

export interface Organization {
  id: string;
  name: string;
  regionalOffices?: RegionalOffice[];
}
