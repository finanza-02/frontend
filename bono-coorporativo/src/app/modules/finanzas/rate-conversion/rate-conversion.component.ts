import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/core/models/rate.model';
import { FinanceService } from 'src/app/core/services/finance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bond } from 'src/app/core/models/bond.model';

@Component({
  selector: 'app-rate-conversion',
  templateUrl: './rate-conversion.component.html',
  styleUrls: ['./rate-conversion.component.scss'],
})
export class RateConversionComponent implements OnInit {
  effectiveRates: Rate[] = [];
  nominalRates: Rate[] = [];
  rateSelected: Rate = {};
  rateConverted: Rate = {};

  constructor(
    private financeService: FinanceService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRates();
  }

  async loadRates() {
    const responseGetNominalRates: any = await this.financeService.getNominalRates();
    this.nominalRates = responseGetNominalRates.data;

    const responseEffectiveRates: any = await this.financeService.getEffectiveRates();
    this.effectiveRates = responseEffectiveRates.data;
  }

  async converterRate() {
    try {
      if (
        this.rateSelected.value == null ||
        this.rateSelected.value < 0 ||
        this.rateSelected.id == null ||
        this.rateConverted.id == null
      ) {
        throw Error();
      } else {
        const response: any = await this.financeService.converterRate(
          this.rateSelected,
          this.rateConverted
        );
        this.updateRateWithInformation(this.rateSelected, this.nominalRates);
        this.updateRateWithInformation(this.rateConverted, this.effectiveRates);
        this.rateConverted.value = response.data * 100;
      }
    } catch (error) {
      this.matSnackBar.open(
        `Debes colocar la 'Tasa Nominal' en %, y el tipo de 'Tasa Efectiva' a convertir`
      );
    }
  }

  updateRateWithInformation(rateUpdate: Rate, rates: Rate[]) {
    const index = rates.findIndex((rate) => {
      return rate.id === rateUpdate.id;
    });
    if (index !== -1) {
      rateUpdate.nombre = rates[index].nombre;
    }
  }

  clear() {
    this.rateConverted.value = undefined;
  }

  bond() {
    this.matSnackBar.open(
      `Se guardo temporalmente ${this.rateConverted.value}% de  ${this.rateConverted.nombre} para el calculo de Bono`
    );
    let bond: Bond = JSON.parse(sessionStorage.getItem('bond'));
    if (bond == null) {
      bond = {};
    }
    bond.rate = this.rateConverted;
    sessionStorage.setItem('bond', JSON.stringify(bond));
  }
}
