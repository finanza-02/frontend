import { Coin } from 'src/app/core/models/coin.model';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rate } from '../models/rate.model';
import { Bond } from '../models/bond.model';

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

  async getEffectiveRates() {
    return await this.httpClient
      .get(
        `${environment.api}/tasas-efectivas`,
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }

  async getNominalRates() {
    return await this.httpClient
      .get(
        `${environment.api}/tasas-nominales`,
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

  async saveBond(bond: Bond) {
    const newBond = { ...bond };
    newBond.tasaDescuento = bond.tasaDescuento / 100;
    newBond.valorTasaEfectiva = bond.valorTasaEfectiva / 100;
    newBond.fechaCreacion = new Date();
    return await this.httpClient
      .post(
        `${environment.api}/add-bono`,
        newBond,
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }

  async getBond(idBond: number) {
    return await this.httpClient
      .get(
        `${environment.api}/bono/${idBond}`,
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }

  async getBonds() {
    return await this.httpClient
      .get(
        `${environment.api}/bonos`,
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }

  async deleteBond(idBond: number) {
    return await this.httpClient
      .delete(
        `${environment.api}/bono/${idBond}`,
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }

  async getAmericanPaymentPlan(idBond: number) {
    return await this.httpClient
      .get<any>(
        `${environment.api}/flujo-caja?metodo=americano&bono_id=${idBond}`,
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }

  async getGermanPaymentPlan(idBond: number) {
    return await this.httpClient
      .get<any>(
        `${environment.api}/flujo-caja?metodo=aleman&bono_id=${idBond}`,
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }

  async getFrenchPaymentPlan(idBond: number) {
    return await this.httpClient
      .get<any>(
        `${environment.api}/flujo-caja?metodo=frances&bono_id=${idBond}`,
        this.authenticationService.getHeaderWithAuthorization()
      )
      .toPromise();
  }
}
