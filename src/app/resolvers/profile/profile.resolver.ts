import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProfileService } from '../../pages/profile/profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<any> {
  constructor(private profileService: ProfileService) { }

  resolve(): any {
    const res = this.profileService.getUserData();
    return res;
  }
}
