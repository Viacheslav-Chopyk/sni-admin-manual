
import { Router } from '@angular/router';
import { API_URL } from './../../core/constants/url.constants';
import { ApiService } from './../../core/services/api.service';

import { COMMON } from './../../core/constants/common.constants';
import { Injectable } from '@angular/core';
import { interval, of, retry, Subscription, timeout, Observable, tap, mergeMap, forkJoin, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  intervalSubscribe: Subscription | undefined;
  lastTime$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(
    private router: Router) { }

  setLocalItem(key: string, data: any = {}) {
    localStorage.setItem(COMMON.LOCALSTORE[key], JSON.stringify(data));
  }

  getLocalItem(key: string) {
    if (localStorage.getItem(COMMON.LOCALSTORE[key])) {
      return JSON.parse(localStorage.getItem(COMMON.LOCALSTORE[key]) || '');
    } else {
      return false;
    }
  }

  destroyLocalItem(key: string) {
    localStorage.removeItem(COMMON.LOCALSTORE[key]);
  }

  destroyAllItem(): void {
    localStorage.clear();
  }
}
