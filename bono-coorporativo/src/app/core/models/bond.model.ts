import { Rate } from './rate.model';
import { Coin } from './coin.model';

export interface Bond {
  coin?: Coin;
  rate?: Rate;
}
