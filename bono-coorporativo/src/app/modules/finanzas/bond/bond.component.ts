import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bond',
  templateUrl: './bond.component.html',
  styleUrls: ['./bond.component.scss'],
})
export class BondComponent implements OnInit {
  togglePaymentPlan;

  constructor() {}

  ngOnInit(): void {}

  openOrClosePaymentPlan() {
    this.togglePaymentPlan = !this.togglePaymentPlan;
  }

  seePaymentPlan() {
    this.openOrClosePaymentPlan();
  }
}
