import { Coin } from 'src/app/core/models/coin.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeMoneyService {
  private coins: Array<Coin> = [];

  loadCoins() {
    if (this.coins.length === 0) {
      this.generateStaticChangeCoin();
    }
    return this.coins;
  }

  private generateStaticChangeCoin() {
    this.coins = [];
    this.coins.push(
      {
        key: 'PEN',
        description: 'Sol',
        amount: 0,
        change: [
          { key: 'USD', defaultChange: 0.289134 },
          { key: 'EUR', defaultChange: 0.255855 },
        ],
      },
      {
        key: 'USD',
        description: 'Dolar',
        amount: 0,
        change: [
          { key: 'PEN', defaultChange: 3.4586 },
          { key: 'EUR', defaultChange: 0.8849 },
        ],
      },
      {
        key: 'EUR',
        description: 'EURO',
        amount: 0,
        change: [
          { key: 'PEN', defaultChange: 3.908464 },
          { key: 'USD', defaultChange: 1.130071 },
        ],
      }
    );
  }

  searchDescriptionCoinAndAddToCoinConverted(coinConverted: Coin) {
    this.coins.forEach((coin) => {
      if (coin.key === coinConverted.key) {
        coinConverted.description = coin.description;
      }
    });
  }

  converterCoin(coinSelected: Coin, coinConverter: Coin) {
    this.searchDescriptionCoinAndAddToCoinConverted(coinSelected);
    this.searchDescriptionCoinAndAddToCoinConverted(coinConverter);

    if (coinSelected.key === coinConverter.key) {
      coinConverter.lastChange = { defaultChange: 1 };
      coinConverter.amount = coinSelected.amount;
      return;
    }

    this.coins.forEach((coin) => {
      if (coin.key === coinSelected.key) {
        console.log(coin.key + '===' + coinSelected.key);
        coin.change.forEach((change) => {
          if (change.key === coinConverter.key) {
            console.log(change.key + '===' + coinConverter.key);
            console.log(change);
            coinConverter.amount =
              change.change !== undefined
                ? change.change
                : change.defaultChange * coinSelected.amount;

            coinConverter.lastChange = { ...change };
          }
        });
      }
    });
  }
}
