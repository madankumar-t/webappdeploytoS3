import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { PrimengModule } from '@app/shared/modules/primeng/primeng.module';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { NotificationComponent } from './notification/notification.component';
import { CoreConfigService } from '@app/core/services/config.service';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfileFooterComponent } from './profile-footer/profile-footer.component';
import { NotificationSettingComponent } from './notification-setting/notification-setting.component';
import { ProfileService } from '@app/core/services/profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserProfileComponent,
    ProfileSettingComponent,
    NotificationComponent,
    ProfileHeaderComponent,
    ProfileFooterComponent,
    NotificationSettingComponent,
  ],
  imports: [CommonModule, PrimengModule, FormsModule, ReactiveFormsModule],
  exports: [
    UserProfileComponent,
    ProfileSettingComponent,
    NotificationComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CoreConfigService, ProfileService],
})
export class UserProfileModule {}
