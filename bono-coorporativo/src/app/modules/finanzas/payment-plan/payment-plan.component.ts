import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bond } from 'src/app/core/models/bond.model';

const ELEMENT_DATA: any[] = [
  {
    periodo: 1,
    saldoInicial: 1000,
    interes: 10,
    cuota: 110,
    amortizacion: 100,
    saldoFinal: 890,
  },
  {
    periodo: 1,
    saldoInicial: 1000,
    interes: 10,
    cuota: 110,
    amortizacion: 100,
    saldoFinal: 890,
  },
  {
    periodo: 1,
    saldoInicial: 1000,
    interes: 10,
    cuota: 110,
    amortizacion: 100,
    saldoFinal: 890,
  },
  {
    periodo: 1,
    saldoInicial: 1000,
    interes: 10,
    cuota: 110,
    amortizacion: 100,
    saldoFinal: 890,
  },
  {
    periodo: 1,
    saldoInicial: 1000,
    interes: 10,
    cuota: 110,
    amortizacion: 100,
    saldoFinal: 890,
  },
  {
    periodo: 1,
    saldoInicial: 1000,
    interes: 10,
    cuota: 110,
    amortizacion: 100,
    saldoFinal: 890,
  },
  {
    periodo: 1,
    saldoInicial: 1000,
    interes: 10,
    cuota: 110,
    amortizacion: 100,
    saldoFinal: 890,
  },
  {
    periodo: 1,
    saldoInicial: 1000,
    interes: 10,
    cuota: 110,
    amortizacion: 100,
    saldoFinal: 890,
  },
  {
    periodo: 1,
    saldoInicial: 1000,
    interes: 10,
    cuota: 110,
    amortizacion: 100,
    saldoFinal: 890,
  },
];

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.scss'],
})
export class PaymentPlanComponent implements OnInit {
  @Input()
  bond: Bond;

  @Output()
  eventClosePaymentPlan: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = [
    'periodo',
    'saldoInicial',
    'interes',
    'cuota',
    'amortizacion',
    'saldoFinal',
  ];
  dataSource = ELEMENT_DATA;

  constructor(private matSnackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.bond = {};
    this.bond.TCEA = 80;
    this.bond.TEP = 10;
  }

  closePaymentPlan() {
    this.eventClosePaymentPlan.emit();
  }

  saveBond() {
    localStorage.setItem('bond', JSON.stringify(this.bond));
    this.matSnackBar.open(`Se guardo el bono correctamente`, null, {
      duration: 5000,
    });
  }
}
