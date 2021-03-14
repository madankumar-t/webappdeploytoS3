import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportComponent } from './components/report.component';

import { PrimengModule } from 'app/shared/modules/primeng/primeng.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { RecentItemsComponent } from './components/recent-items/recent-items.component';
import { ReportsService } from './services/reports.service';

@NgModule({
  imports: [CommonModule, PrimengModule, ReportsRoutingModule, SharedModule],
  declarations: [ReportComponent, RecentItemsComponent],
  exports: [],
  providers: [ReportsService],
})
export class ReportsModule {}
