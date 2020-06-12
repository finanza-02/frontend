import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ChangeMoneyComponent } from './change-money/change-money.component';
import { RateConversionComponent } from './rate-conversion/rate-conversion.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'cambio-moneda',
        component: ChangeMoneyComponent,
      },
      {
        path: 'conversion-tasa',
        component: RateConversionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanzasRoutingModule {}
