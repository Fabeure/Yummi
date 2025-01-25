import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../../pages/profile/profile.service';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<any> {
  constructor(private profileService: ProfileService,private fb: FormBuilder) {}

  resolve(): any | void  {
    return this.fb.group({
          fullName: ['Saboua Abd'],
          username: ['Miller'],
          email: ['sousou@gmail.com'],
          password: ['********'],
        });
  //  return this.profileService.getUserProfile();
  }
}
