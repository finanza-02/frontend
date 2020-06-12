import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FinanzasRoutingModule } from './finanzas-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ChangeMoneyComponent } from './change-money/change-money.component';
import { RateConversionComponent } from './rate-conversion/rate-conversion.component';

@NgModule({
  declarations: [HomeComponent, ChangeMoneyComponent, RateConversionComponent],
  imports: [
    CommonModule,
    FinanzasRoutingModule,
    FormsModule,
    MaterialModule,
    LayoutModule,
  ],
})
export class FinanzasModule {}
