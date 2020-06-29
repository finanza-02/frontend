import { FinanceService } from './../../../core/services/finance.service';
import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/core/models/coin.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bond } from 'src/app/core/models/bond.model';

@Component({
  selector: 'app-change-money',
  templateUrl: './change-money.component.html',
  styleUrls: ['./change-money.component.scss'],
})
export class ChangeMoneyComponent implements OnInit {
  coins: Coin[] = [];
  coinSelected: Coin = {};
  coinConverted: Coin = {};
  information: boolean = false;

  constructor(
    private financeService: FinanceService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCoins();
  }

  async loadCoins() {
    const response: any = await this.financeService.getCoins();
    this.coins = response.data;
  }

  async converterCoin() {
    try {
      if (
        this.coinSelected.amount == null ||
        this.coinSelected.amount < 0 ||
        this.coinSelected.id == null ||
        this.coinConverted.id == null
      ) {
        throw Error();
      } else {
        const response: any = await this.financeService.converterCoin(
          this.coinSelected,
          this.coinConverted
        );
        this.updateCoinWithInformation(this.coinSelected);
        this.updateCoinWithInformation(this.coinConverted);
        this.coinConverted.amount = response.data;
        this.information = true;
      }
    } catch (error) {
      this.matSnackBar.open(
        `Debes colocar 'Monto a convertir', su 'Moneda' asociada y la 'Moneda' de cambio`
      );
    }
  }

  updateCoinWithInformation(coinUpdate: Coin) {
    const index = this.coins.findIndex((coin) => {
      return coin.id === coinUpdate.id;
    });
    if (index !== -1) {
      coinUpdate.nombre = this.coins[index].nombre;
      coinUpdate.simbolo = this.coins[index].simbolo;
    }
  }

  hideInformation() {
    this.information = false;
    this.coinConverted.amount = undefined;
  }

  bond() {
    this.matSnackBar.open(
      `Se guardo temporalmente ${this.coinConverted.amount}  ${this.coinConverted.simbolo} para el calculo de Bono`
    );
    let bond: Bond = JSON.parse(sessionStorage.getItem('bond'));
    if (bond == null) {
      bond = {};
    }
    bond.coin = this.coinConverted;
    sessionStorage.setItem('bond', JSON.stringify(bond));
  }
}
