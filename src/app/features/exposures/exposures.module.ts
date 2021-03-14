import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExposureComponent } from './components/exposure.component';
import { PrimengModule } from 'app/shared/modules/primeng/primeng.module';
import { ExposuresRoutingModule } from './exposures-routing.module';
import { ExposureService } from './services/exposure.service';
import { SharedModule } from '@app/shared/shared.module';
import { RecentItemsComponent } from './components/recent-items/recent-items.component';
import { AddExposureComponent } from './components/add-exposure/add-exposure.component';
import { UploadStepComponent } from './components/add-exposure/upload-step/upload-step.component';
import { MapStepComponent } from './components/add-exposure/map-step/map-step.component';
import { ValidateDataStepComponent } from './components/add-exposure/validate-data-step/validate-data-step.component';
import { GeoCodeStepComponent } from './components/add-exposure/geo-code-step/geo-code-step.component';
import { AugmentStepComponent } from './components/add-exposure/augment-step/augment-step.component';
import { ImportStepComponent } from './components/add-exposure/import-step/import-step.component';
import { UploadComponent } from './components/add-exposure/upload-step/upload/upload.component';

@NgModule({
  imports: [CommonModule, PrimengModule, ExposuresRoutingModule, SharedModule],
  declarations: [
    ExposureComponent,
    RecentItemsComponent,
    AddExposureComponent,
    UploadStepComponent,
    MapStepComponent,
    ValidateDataStepComponent,
    GeoCodeStepComponent,
    AugmentStepComponent,
    ImportStepComponent,
    UploadComponent,
  ],
  exports: [],
  providers: [ExposureService],
})
export class ExposuresModule {}
