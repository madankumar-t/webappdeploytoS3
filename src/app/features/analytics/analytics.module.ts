import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticComponent } from './components/analytic.component';

import { PrimengModule } from 'app/shared/modules/primeng/primeng.module';
import { AnalyticRoutingModule } from './analytics-routing.module';
import { RecentlyUsedAnalysisTypesComponent } from './components/recently-used-analysis-types/recently-used-analysis-types.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreConfigService } from '@app/core/services/config.service';
import { RecentlyViewedAnalysisComponent } from './components/recently-viewed-analysis/recently-viewed-analysis.component';
import { AnalyticsService } from './services/analytics.service';
import { NewAnalysisComponent } from './components/new-analysis/new-analysis.component';
import { from } from 'rxjs';
import { ExposureSummaryComponent } from './components/exposure-summary/exposure-summary.component';
import { SelectExposureComponent } from './components/select-exposure/select-exposure.component';
import { MapComponent } from './components/exposure-summary/map/map.component';
import { SummaryComponent } from './components/exposure-summary/summary/summary.component';
import { SettingsPanelComponent } from './components/exposure-summary/settings-panel/settings-panel.component';
import { HeaderPanelComponent } from './components/exposure-summary/header-panel/header-panel.component';
import { ContributionComponent } from './components/exposure-summary/contribution/contribution.component';
import { TopAssetsComponent } from './components/exposure-summary/top-assets/top-assets.component';
@NgModule({
  imports: [CommonModule, PrimengModule, AnalyticRoutingModule, SharedModule],
  declarations: [
    AnalyticComponent,
    RecentlyUsedAnalysisTypesComponent,
    RecentlyViewedAnalysisComponent,
    NewAnalysisComponent,
    ExposureSummaryComponent,
    SelectExposureComponent,
    MapComponent,
    SummaryComponent,
    SettingsPanelComponent,
    HeaderPanelComponent,
    ContributionComponent,
    TopAssetsComponent,
  ],
  exports: [],
  providers: [AnalyticsService, CoreConfigService],
})
export class AnalyticsModule {}
