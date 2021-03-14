import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'alerts',
    loadChildren: () =>
      import('./features/alerts/alerts.module').then((m) => m.AlertModule),
  },
  {
    path: 'analytics',
    loadChildren: () =>
      import('./features/analytics/analytics.module').then(
        (m) => m.AnalyticsModule
      ),
  },
  {
    path: 'exposures',
    loadChildren: () =>
      import('./features/exposures/exposures.module').then(
        (m) => m.ExposuresModule
      ),
  },
  {
    path: 'models',
    loadChildren: () =>
      import('./features/models/models.module').then((m) => m.ModelsModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./features/reports/reports.module').then((m) => m.ReportsModule),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ApptRoutingModule {}
