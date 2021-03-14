import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './components/alert.component';

import { PrimengModule } from 'app/shared/modules/primeng/primeng.module';
import { AlertsRoutingModule } from './alerts-routing.module';

@NgModule({
  imports: [CommonModule, PrimengModule, AlertsRoutingModule],
  declarations: [AlertComponent],
  exports: [],
  providers: [],
})
export class AlertModule {}
