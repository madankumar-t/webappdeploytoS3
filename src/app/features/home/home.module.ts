import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { EventsComponent } from './components/events/events.component';
import { ManageObjectsComponent } from './components/manage-objects/manage-objects.component';
import { RecentActivitiesComponent } from './components/recent-activities/recent-activities.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreConfigService } from '@app/core/services/config.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [HomeRoutingModule, SharedModule, FormsModule],
  declarations: [
    HomeComponent,
    AlertsComponent,
    EventsComponent,
    ManageObjectsComponent,
    RecentActivitiesComponent,
  ],
  exports: [],
  providers: [],
})
export class HomeModule {}
