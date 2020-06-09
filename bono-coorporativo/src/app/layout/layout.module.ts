import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [HeaderComponent, MenuComponent, LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule, MaterialModule],
})
export class LayoutModule {}
