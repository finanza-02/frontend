import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/core/models/coin.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeMoneyService } from 'src/app/core/services/change-money.service';

@Component({
  selector: 'app-change-money',
  templateUrl: './change-money.component.html',
  styleUrls: ['./change-money.component.scss'],
})
export class ChangeMoneyComponent implements OnInit {
  coins: Array<Coin>;
  coinSelected: Coin;
  coinConverted: Coin;

  constructor(
    private matSnackBar: MatSnackBar,
    private changeMoneyService: ChangeMoneyService
  ) {}

  ngOnInit(): void {
    this.coinSelected = {};
    this.coinConverted = {};
    this.coins = this.changeMoneyService.loadCoins();
    this.coinConverted.key = this.coins[0].key;
  }

  converterCoin() {
    if (
      this.coinSelected.amount == null ||
      this.coinSelected.amount < 0 ||
      this.coinSelected.key == null ||
      this.coinConverted.key == null
    ) {
      this.matSnackBar.open(
        `Debes colocar 'Monto a convertir', su 'Moneda' asociada y la 'Moneda' de cambio`,
        null,
        {
          duration: 5000,
        }
      );

      return;
    } else {
      this.changeMoneyService.converterCoin(
        this.coinSelected,
        this.coinConverted
      );
    }
  }

  bond() {
    this.matSnackBar.open(
      `Se guardo temporalmente ${this.coinConverted.amount}  ${this.coinConverted.description} para el calculo de Bono`,
      null,
      {
        duration: 3000,
      }
    );

    let bond = JSON.parse(localStorage.getItem('bond'));

    if (bond == null) {
      bond = {};
    }

    bond.coinConverted = this.coinConverted;

    localStorage.setItem('bond', JSON.stringify(bond));
  }
}
