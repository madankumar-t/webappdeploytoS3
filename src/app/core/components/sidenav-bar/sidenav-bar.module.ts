import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidenavBarComponent } from 'app/core/components/sidenav-bar/sidenav-bar.component';
import { SharedModule } from 'app/shared/shared.module';
import { SupportModule } from '@app/features/support/support.module';
@NgModule({
  declarations: [SidenavBarComponent],
  imports: [SharedModule, RouterModule, SupportModule],
  exports: [SidenavBarComponent],
  bootstrap: [],
  providers: [],
})
export class SidenavBarModule {}
