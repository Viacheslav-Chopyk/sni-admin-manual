import { PostReportsService } from '../../main/reports/monitoring/posts-reports/post-reports.service';
import { ProfilesReportsService } from '../../main/reports/monitoring/profiles-reports/profiles-reports.service';
import { IUser } from '../../../shared/types/shared.types';
import { catchError} from 'rxjs/operators';
import { HighlightsService } from '../../main/reports/monitoring/highlights/highlights.service';
import { GroupsReportsService } from '../../main/reports/monitoring/groups-reports/groups-reports.service';
import { Observable, of, retry, BehaviorSubject } from 'rxjs';
import { SharedServiceService } from '../../../shared/services/shared-service.service';
import { IBusiness } from '../../../shared/types/settings.model';
import { UserServiceService } from '../../../shared/services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { LoginService } from "./login.service";
import { HelperService } from "../../../shared/services/helper.service";
import { AuthModel } from "../../../shared/types/auth.model";
import { Router } from "@angular/router";
import { IResponce } from 'src/app/shared/types/shared.types';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  code = { text: '' };
  auth: AuthModel | undefined;
  step = 'login';

  highlightsData = new BehaviorSubject<object>({});

  constructor(private loginService: LoginService,
    private helperService: HelperService,
    private router: Router,
    private userServ: UserServiceService,
    private sharedServ: SharedServiceService,
    private groupsReportsServ: GroupsReportsService,
    private highlightsServ: HighlightsService,
    private profServ: ProfilesReportsService,
    private postReportsServ: PostReportsService
  ) {
    this.loginForm = this.loginService.initFormLogin();
  }

  ngOnInit(): void {
  }

  sendLogin(): void {
    if (this.loginForm.valid) {
      this.loginService.login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).subscribe({
        next:(result: any) => {
          this.loginService.loginNewBack().subscribe((res: any) => {
            this.helperService.setLocalItem('token2', res.BarandSlavik);
            /*this.sharedServ.getData(this.userServ.currentBusinessId$.getValue());*/
            this.setCurrentBusinessId(result.data.userInfo.business);
            this.loginService.getKeywordsData(result.data.userInfo.business[0].id).subscribe((res: any) => {
              const business = {
                ...result.data.userInfo.business[0],
                category: [],
                interesting: {
                  facebookGroups: []
                },
                general: {
                  keywords: []
                },
                brands: []
              }
              res.data.forEach((el: any) => {
                if (el.CategoryID != 'brands') {
                  if (el.CategoryID === 'category') {
                    business[el.CategoryID].push(el)
                  }
                  if (el.CategoryID === 'interesting') {
                    business[el.CategoryID].facebookGroups.push(el)
                  }
                  if (el.CategoryID === 'general') {
                    business[el.CategoryID].keywords.push(el)
                  }
                }
                else {
                  const index = business.brands.findIndex((element: any) => element.name === el.name);
                  if (index != -1) {
                    business.brands[index].keywords.push(el);
                  } else {
                    business.brands.push({
                      name: el.name,
                      keywords: [
                        el
                      ]
                    })
                  }
                }
              })
              result.data.userInfo.business[0] = business;
              this.helperService.setLocalItem('token', result.data.token);
              this.userServ.setUser(result.data.userInfo);
              this.getInitialData();
              this.router.navigate(['main/dashboard']);
            })
          });
        },
        error:(error: HttpErrorResponse)=>{
        }
      })
    }
  }

  isStep(o1: string): boolean {
    return this.step === o1;
  }

  switch(step: string): void {
    this.step = step;
  }

  selectMethodVerify(method: string = 'sms', step?: string): void {
    this.loginService.chengeVerify(method).subscribe(() => {
      if (step) {
        this.switch(step);
      }
    })
  }

  sendVerify(method: string): void {
    if (this.code.text.length === 6 || this.code.text === '777777') {
      this.loginService.sendCodeVerify(method, {
        code: this.code.text
      }).subscribe((result: any) => {
        this.helperService.setLocalItem('token', result.data.token);
        this.userServ.setUser(result.data.userInfo);
        this.setCurrentBusinessId(result.data.userInfo.business);
        this.router.navigate(['main/dashboard']);
      });
    } else {
      alert('Error code');
    }
  }
  setCurrentBusinessId(businesses: IBusiness[]): void {
    const id = this.helperService.getLocalItem('currentBusinessId');
    const business = businesses.find((el) => el.id == id);
    if (business) {
      this.userServ.setCurrentBusinessId(business.id);
    } else {
      this.userServ.setCurrentBusinessId(businesses[0].id);
    }
  }
  toRegister(): void {
    this.router.navigate(['auth/registration']);
  }

  toReset(): void {
    this.router.navigate(['auth/reset']);
  }

  getInitialData(): void {
    const getGroups$ = this.groupsReportsServ.getGroups().pipe(
      catchError(error => {
        retry(3)
        console.log('Error in getGroups API call:', error);
        return of(null);
      }),
    );

    const getUsers$: Observable<IResponce<IUser[]> | null> = this.profServ.getUsersNew().pipe(
      catchError(error => {
        retry(3)
          console.log('Error in getUsers API call:', error);
        return of(null);
      }),
    );

    const getDataHighlights$ = this.highlightsServ.getDataHighlights().pipe(
      catchError(error => {
        retry(3)
          console.log('Error in getDataHighlights API call:', error);
        return of(null);
      }),
    );

    const getPosts$: Observable<IResponce<any> | null> = this.postReportsServ.getPosts().pipe(
      catchError(error => {
        retry(3)
          console.log('Error in getPosts API call:', error);
        return of(null);
      }),
    );

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    getDataHighlights$.subscribe();

    sleep(500).then(() => {
      getGroups$.subscribe();

      sleep(500).then(() => {
        getUsers$.subscribe();

        sleep(500).then(() => {
          getPosts$.subscribe();
        }
        );
      });
    });

  }
}
