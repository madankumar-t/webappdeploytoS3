import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@app/core/services/profile.service';
import { CoreConfigService } from '@app/core/services/config.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss'],
  providers: [MessageService],
})
export class ProfileSettingComponent implements OnInit {
  userName: string = '';
  userMail: string = '';
  firstName: string = '';
  lastName: string = '';
  role: string = 'Modeler';
  mobile: string = '9612220012';
  profileForm!: FormGroup;
  constructor(
    private profileService: ProfileService,
    private configService: CoreConfigService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loginUser();
    this.profileForm = this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl('9945676666', [Validators.pattern('^[0-9]*$')]),
    });
  }
  loginUser() {
    this.configService.on<any>().subscribe((data) => {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.userMail = data.email;
      this.userName = data.firstName + ' ' + data.lastName;
    });
  }
  save() {
    // this.profileService.updateProfileData();
    let lastName = this.profileForm.value.lastName;
    this.profileService
      .updateProfileData({
        mobile_number: this.mobile,
        fname: this.firstName,
        lname: lastName,
      })
      .subscribe(
        (data: any) => {
          if (data && data.UpdateUser) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully updated',
            });
          }
        },
        (error) => {
          // to do error handling
          console.log('error', error);
        }
      );
  }
  cancel() {
    this.configService.emit<boolean>(false);
  }
}
