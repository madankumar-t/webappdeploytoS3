import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExposureComponent } from './components/exposure.component';
import { AddExposureComponent } from './components/add-exposure/add-exposure.component';
import { UploadStepComponent } from './components/add-exposure/upload-step/upload-step.component';
import { MapStepComponent } from './components/add-exposure/map-step/map-step.component';
import { ValidateDataStepComponent } from './components/add-exposure/validate-data-step/validate-data-step.component';
import { GeoCodeStepComponent } from './components/add-exposure/geo-code-step/geo-code-step.component';
import { AugmentStepComponent } from './components/add-exposure/augment-step/augment-step.component';
import { ImportStepComponent } from './components/add-exposure/import-step/import-step.component';

const routes: Routes = [
  { path: '', component: ExposureComponent },
  {
    path: 'add',
    component: AddExposureComponent,
    children: [
      { path: 'upload', component: UploadStepComponent },
      { path: 'map', component: MapStepComponent },
      { path: 'validate-data', component: ValidateDataStepComponent },
      { path: 'geocode', component: GeoCodeStepComponent },
      { path: 'augment', component: AugmentStepComponent },
      { path: 'import', component: ImportStepComponent },
      { path: '**', redirectTo: 'upload' },
    ],
  },
  { path: '**', redirectTo: 'import' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExposuresRoutingModule {}
