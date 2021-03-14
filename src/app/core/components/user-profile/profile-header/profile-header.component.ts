import { Component, OnInit, Input } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { ProfileService } from '@app/core/services/profile.service';
import { CoreConfigService } from '@app/core/services/config.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  @Input() visible: any;
  isNotification: boolean = false;
  isUserProfile: boolean = false;
  userName: string = '';
  userLabel: string = 'modeler';
  constructor(
    private route: Router,
    private profileService: ProfileService,
    private configService: CoreConfigService
  ) {}
  ngOnInit(): void {
    this.configService.on<any>().subscribe((data) => {
      if (data && data.isNotification) {
        this.isNotification = true;
        this.userName = 'Notifications';
      } else if (data && data.isUserProfile) {
        this.isUserProfile = true;
        this.userName = data.firstName + ' ' + data.lastName;
      }
    });
  }
  async logout() {
    try {
      await Auth.signOut();
      localStorage.removeItem('user_email');
      this.route.navigate(['auth/login']);
      this.configService.emit<boolean>(false);
    } catch (error) {}
  }
}
