import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticComponent } from './components/analytic.component';
import { ExposureSummaryComponent } from './components/exposure-summary/exposure-summary.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AnalyticComponent },
      { path: 'exposure-summary', component: ExposureSummaryComponent },
      {
        path: 'exposure-summary/select-analysis',
        component: ExposureSummaryComponent,
      },
      {
        path: 'exposure-summary/select-exposure',
        component: ExposureSummaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticRoutingModule {}
