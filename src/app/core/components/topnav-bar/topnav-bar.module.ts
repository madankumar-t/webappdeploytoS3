import { NgModule } from '@angular/core';
import { CoreConfigService } from '@app/core/services/config.service';
import { TopnavBarComponent } from 'app/core/components/topnav-bar/topnav-bar.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [TopnavBarComponent],
  imports: [SharedModule],
  exports: [TopnavBarComponent],
})
export class TopnavBarModule {}
