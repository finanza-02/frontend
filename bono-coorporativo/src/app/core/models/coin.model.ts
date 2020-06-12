import { Change } from './change.model';
export interface Coin {
  key?: string;
  description?: string;
  amount?: number;
  change?: Change[];
  lastChange?: Change;
}
