import { NgModule } from '@angular/core';
import { SidenavBarModule } from 'app/core/components/sidenav-bar/sidenav-bar.module';
import { TopnavBarModule } from 'app/core/components/topnav-bar/topnav-bar.module';
import { UserProfileModule } from 'app/core/components/user-profile/user-profile.module';
@NgModule({
  imports: [SidenavBarModule, TopnavBarModule, UserProfileModule],
  exports: [SidenavBarModule, TopnavBarModule, UserProfileModule],
  bootstrap: [],
})
export class CoreModule {}
