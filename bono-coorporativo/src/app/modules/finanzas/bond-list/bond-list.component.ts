import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/core/services/finance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bond } from 'src/app/core/models/bond.model';

@Component({
  selector: 'app-bond-list',
  templateUrl: './bond-list.component.html',
  styleUrls: ['./bond-list.component.scss'],
})
export class BondListComponent implements OnInit {
  bonds: Bond[];
  bond: Bond;
  togglePaymentPlan = false;

  constructor(
    private financeService: FinanceService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBonds();
  }

  async loadBonds() {
    const response: any = await this.financeService.getBonds();
    this.bonds = response.data;
    this.bonds.sort((bond1, bond2) =>
      bond1.id < bond2.id ? 1 : -1
    );
  }

  openOrClosePaymentPlan() {
    this.togglePaymentPlan = !this.togglePaymentPlan;
    if (!this.togglePaymentPlan) {
      this.loadBonds();
    }
  }

  selectBond(bond: Bond) {
    this.bond = bond;
    this.openOrClosePaymentPlan();
  }
}
