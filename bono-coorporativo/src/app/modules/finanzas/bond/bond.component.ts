import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bond',
  templateUrl: './bond.component.html',
  styleUrls: ['./bond.component.scss'],
})
export class BondComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  seePaymentPlan() {
    this.router.navigate(['/finanzas/plan-de-pago']);
  }
}
