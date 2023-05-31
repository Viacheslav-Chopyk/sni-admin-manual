import { IUser, IBusiness } from './../types/settings.model';
import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  user$: BehaviorSubject<IUser | any> = new BehaviorSubject(null);
  currentBusinessId$: BehaviorSubject<any> = new BehaviorSubject('');
  keywordsLimit$: BehaviorSubject<any> = new BehaviorSubject({
    limit: 0,
    current: 0
  });

  constructor(private helpServ: HelperService) {}

  setUser (data: IUser) {
    this.helpServ.setLocalItem('user', data);
    this.user$.next(data);
    if (data.business) {
      this.setKeywordsLimit(data);
    }

  }
  changeCurrentBusiness(business: IBusiness) {
    const user: IUser = this.user$.getValue();
    const idBusiness = user.business.findIndex((el: any) => el.id == business.id);

    if(idBusiness) {
      user.business[idBusiness] = business;
      this.setUser(user);
      this.currentBusinessId$.next(business.id);
    }

  }
  setCurrentBusinessId(id: string | number = '') {
    if (!id) {
      id = this.helpServ.getLocalItem('currentBusinessId');
    }
    if (id) {
      this.helpServ.setLocalItem('currentBusinessId', id);
    this.currentBusinessId$.next(id);
    }

  }

  getCurrentBusiness() {
    return this.user$.getValue().business.find((el: any) => el.id == this.currentBusinessId$.getValue());
  }

  setKeywordsLimit(user: IUser) {
    let current = 0;
    user.business.forEach(business => {
      current += business?.category?.length || 0
      current += business.general?.keywords?.length || 0
      current += business?.interesting?.facebookGroups?.length || 0;

      business.brands.forEach(brand => {
        current += brand?.keywords?.length ||  0;
      });
    });
    this.keywordsLimit$.next({
      limit: user.type.wordsLimit,
      current
    })

  }
}
