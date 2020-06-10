import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/core/models/coin.model';

@Component({
  selector: 'app-change-money',
  templateUrl: './change-money.component.html',
  styleUrls: ['./change-money.component.scss'],
})
export class ChangeMoneyComponent implements OnInit {
  coins: Array<Coin>;
  coinSelected: Coin;
  coinConverted: Coin;

  constructor() {}

  ngOnInit(): void {
    this.coinSelected = {};
    this.coinConverted = {};
    this.coins = new Array<Coin>();
    this.coins.push(
      { value: 'PE', description: 'Sol PE', amount: 0 },
      { value: 'US', description: 'Dolar US', amount: 0 }
    );
  }
}
