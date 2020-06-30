import { Rate } from './rate.model';
import { Coin } from './coin.model';

export interface Bond {
  coin?: Coin;
  rate?: Rate;
  id?: number;
  tasaDescuento?: number;
  valorTasaEfectiva?: number;
  valorNominal?: number;
  valorComercial?: number;
  costosGastos?: number;
  numeroCuotas?: number;
  tasaEfectivaId?: any | number;
  monedaId?: any | number;
  fechaCreacion?: Date;
}
