import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/core/models/rate.model';
import { FinanceService } from 'src/app/core/services/finance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Coin } from 'src/app/core/models/coin.model';
import { Bond } from 'src/app/core/models/bond.model';

@Component({
  selector: 'app-bond',
  templateUrl: './bond.component.html',
  styleUrls: ['./bond.component.scss'],
})
export class BondComponent implements OnInit {
  togglePaymentPlan;

  rates: Rate[] = [];
  coins: Coin[] = [];
  bond: Bond = {};

  constructor(
    private financeService: FinanceService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRates();
    this.loadCoins();
    this.loadStorage();
  }

  loadStorage() {
    const bond: Bond = JSON.parse(sessionStorage.getItem('bond'));
    if (bond != null) {
      if (bond.rate) {
        this.bond.tasaEfectivaId = bond.rate.id;
        this.bond.valorTasaEfectiva = bond.rate.value;
      }

      if (bond.coin) {
        this.bond.monedaId = bond.coin.id;
        this.bond.valorNominal = bond.coin.amount;
      }
    }
  }

  async loadRates() {
    const response: any = await this.financeService.getEffectiveRates();
    this.rates = response.data;
  }

  async loadCoins() {
    const response: any = await this.financeService.getCoins();
    this.coins = response.data;
  }

  clean() {
    this.bond = {};
  }

  openOrClosePaymentPlan() {
    this.togglePaymentPlan = !this.togglePaymentPlan;
  }

  async generatePaymentPlan() {
    if (this.validateBond()) {
      const response: any = await this.financeService.saveBond(this.bond);
      console.log(response);
      this.bond.id = response.data.id;
      this.openOrClosePaymentPlan();
    }
  }

  validateBond() {
    if (
      this.bond.tasaDescuento &&
      this.bond.tasaDescuento > 0 &&
      this.bond.valorTasaEfectiva &&
      this.bond.valorTasaEfectiva > 0 &&
      this.bond.tasaEfectivaId &&
      this.bond.valorNominal &&
      this.bond.valorNominal > 0 &&
      this.bond.valorComercial &&
      this.bond.valorComercial > 0 &&
      this.bond.costosGastos &&
      this.bond.costosGastos >= 0 &&
      this.bond.monedaId &&
      this.bond.numeroCuotas &&
      this.bond.numeroCuotas > 0
    ) {
      return true;
    }

    this.matSnackBar.open(
      'Revise los datos ingresados, deben ser mayor a 0 a excepcion a los costos y gastos!'
    );
    return false;
  }
}
