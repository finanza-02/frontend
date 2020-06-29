import { Coin } from 'src/app/core/models/coin.model';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rate } from '../models/rate.model';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  async getCoins() {
    return await this.httpClient
      .get(
        `${environment.api}/monedas`,
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }

  async converterCoin(coinSelected: Coin, coinConverted: Coin) {
    return await this.httpClient
      .post(
        `${environment.api}/conversion/moneda`,
        {
          montoMonetario: coinSelected.amount,
          monedaInicialId: coinSelected.id,
          monedaFinalId: coinConverted.id,
        },
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }

  async getRates() {
    return await this.httpClient
      .get(
        `${environment.api}/tasas-efectivas`,
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }

  async converterRate(rateSelected: Rate, rateConverted: Rate) {
    return await this.httpClient
      .post(
        `${environment.api}/conversion/tasa-efectiva`,
        {
          valorTasa: rateSelected.value / 100,
          tasaNominalId: rateSelected.id,
          tasaEfectivaId: rateConverted.id,
        },
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }
}
