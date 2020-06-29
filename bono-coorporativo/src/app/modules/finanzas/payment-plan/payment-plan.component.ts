import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bond } from 'src/app/core/models/bond.model';
import { FinanceService } from 'src/app/core/services/finance.service';
import { PaymentPlan } from 'src/app/core/models/payment-plan.model';
@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.scss'],
})
export class PaymentPlanComponent implements OnInit {
  germanPaymentPlan: any = {};
  americanPaymentPlan: any = {};
  frenchPaymentPlan: any = {};
  tceaBonista = 0;
  tceaEmisor = 0;

  @Input()
  bond: Bond = {};

  @Output()
  eventClosePaymentPlan: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = [
    'periodo',
    'cupon',
    'amortizacion',
    'costosGastos',
    'cuota',
    'saldoInsoluto',
    'deudaExtinguida',
    'valorActual',
    'flujoEmisor',
    'flujoBonista',
  ];

  constructor(
    private financeService: FinanceService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPaymentPlan();
  }

  async loadPaymentPlan() {
    this.frenchPaymentPlan = (
      await this.financeService.getFrenchPaymentPlan(this.bond.id)
    ).data;
    this.convertPaymentPlan(this.frenchPaymentPlan);
    this.germanPaymentPlan = (
      await this.financeService.getGermanPaymentPlan(this.bond.id)
    ).data;
    this.convertPaymentPlan(this.germanPaymentPlan);
    this.americanPaymentPlan = (
      await this.financeService.getAmericanPaymentPlan(this.bond.id)
    ).data;
    this.convertPaymentPlan(this.americanPaymentPlan);

    this.selectedTabChange(null);
    console.log(this.frenchPaymentPlan);
  }

  selectedTabChange($event) {
    if ($event == null || $event.index === 0) {
      this.tceaBonista = this.frenchPaymentPlan.tceaBonista;
      this.tceaEmisor = this.frenchPaymentPlan.tceaEmisor;
    } else if ($event.index === 1) {
      this.tceaBonista = this.germanPaymentPlan.tceaBonista;
      this.tceaEmisor = this.germanPaymentPlan.tceaEmisor;
    } else {
      this.tceaBonista = this.americanPaymentPlan.tceaBonista;
      this.tceaEmisor = this.americanPaymentPlan.tceaEmisor;
    }
  }

  convertPaymentPlan(paymentPlan: any) {
    let newPaymentPlan: PaymentPlan;
    paymentPlan.flujo.forEach((element, index) => {
      newPaymentPlan = {};
      newPaymentPlan.periodo = element[0];
      newPaymentPlan.cupon = element[1];
      newPaymentPlan.amortizacion = element[2];
      newPaymentPlan.costosGastos = element[3];
      newPaymentPlan.cuota = element[4];
      newPaymentPlan.saldoInsoluto = element[5];
      newPaymentPlan.deudaExtinguida = element[6];
      newPaymentPlan.valorActual = element[7];
      newPaymentPlan.flujoEmisor = element[8];
      newPaymentPlan.flujoBonista = element[9];

      paymentPlan.flujo[index] = newPaymentPlan;
    });
  }

  closePaymentPlan() {
    this.eventClosePaymentPlan.emit();
  }

  async deleteBond() {
    await this.financeService.deleteBond(this.bond.id);
    this.matSnackBar.open(`Se eliminó el bono correctamente`);
    this.closePaymentPlan();
  }
}
