import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanzasRoutingModule } from './finanzas-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, FinanzasRoutingModule, MaterialModule, LayoutModule],
})
export class FinanzasModule {}
