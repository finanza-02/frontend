import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ChangeMoneyComponent } from './change-money/change-money.component';
import { RateConversionComponent } from './rate-conversion/rate-conversion.component';
import { BondComponent } from './bond/bond.component';
import { AuthenticationGuard } from 'src/app/core/services/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        // canActivate: [AuthenticationGuard],
        component: HomeComponent,
      },
      {
        path: 'cambio-moneda',
        // canActivate: [AuthenticationGuard],
        component: ChangeMoneyComponent,
      },
      {
        path: 'conversion-tasa',
        // canActivate: [AuthenticationGuard],
        component: RateConversionComponent,
      },
      {
        path: 'calculo-bono',
        // canActivate: [AuthenticationGuard],
        component: BondComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanzasRoutingModule {}
