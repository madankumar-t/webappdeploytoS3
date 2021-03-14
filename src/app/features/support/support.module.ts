import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportRoutingModule } from './support-routing.module';
import { SidenavBarModule } from '@app/core/components/sidenav-bar/sidenav-bar.module';
import { SupportComponent } from './components/support.component';
import { SampleDataComponent } from './components/sample-data/sample-data.component';
import { AboutComponent } from './components/about/about.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { SharedModule } from '@app/shared/shared.module';
import { TableModule } from 'primeng/table';
@NgModule({
  imports: [SupportRoutingModule, SharedModule, TableModule],
  declarations: [
    SupportComponent,
    SampleDataComponent,
    AboutComponent,
    FeedbackComponent,
  ],
  exports: [SupportComponent],
  providers: [],
  entryComponents: [AboutComponent],
})
export class SupportModule {}
