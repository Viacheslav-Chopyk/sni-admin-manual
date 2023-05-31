import { environment } from './../../../environments/environment';
import { HelperService } from './helper.service';
import { IPost, IGroupPosts } from './../types/shared.types';
import { IGroup, IComment } from 'src/app/shared/types/shared.types';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from "../../pages/auth/login/login.service";
import { UserServiceService } from "./user-service.service";

interface IPostReportResponse {
  data: IGroupPosts[];
  isResponse: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  dataPosts$: BehaviorSubject<IPostReportResponse> = new BehaviorSubject<IPostReportResponse>({ data: [], isResponse: false });

  constructor(private http: HttpClient,
    private helpServ: HelperService,
    private loginService: LoginService,
    private userServ: UserServiceService,
    private helperService: HelperService
  ) { }


  getData(businessId: any) {
    const token = this.helpServ.getLocalItem('token2');
    this.http.get(environment.urlNewBack + '/myapiBusinessID?username=' + encodeURIComponent('BarandSlavik') + '&passwordToken=' + encodeURIComponent(token) + '&BusinessIDlst=' + businessId).subscribe((res: any) => {
      this.dataPosts$.next({ data: res.data, isResponse: true });
    });
  }

  loginNewBack() {
    return this.http.get(environment.urlNewBack + '/authUrl?username=BarandSlavik&password=SheliFron');
  }

  /*setBusinessId(id: string, url: string, data: any) {
    const token2 = this.helpServ.getLocalItem('token2');
    this.http.get(environment.urlNewBack + '/DATABS?username=' + encodeURIComponent('SNIFRONTEND') + '&passwordToken=' + encodeURIComponent(token2) + '&BusinessID=' + id + '&CategoryID=' + url + '&KwStatus=1').subscribe((res: any) => {

    });
  }*/

  setBusinessById(id: string, data: any) {
    const token2 = this.helpServ.getLocalItem('token2');
    const dataReq = {
      ...data,
      BusinessID: id,
      KwStatus: 1,
      Token: token2,
      information: [],
      BizStatus: 1
    }
    return this.http.post(environment.urlNewBack + '/UpdateBiz', dataReq);
  }

  // updateDataKeywords() {
  //   const currentBusinesId = this.userServ.currentBusinessId$.getValue();
  //   const userInfo = this.userServ.user$.getValue();
  //   const indexBusines = userInfo.business.findIndex((item: any) => item.id === currentBusinesId);
  //   this.loginService.getKeywordsData(currentBusinesId).subscribe((res: any) => {
  //     const busines = {
  //       ...userInfo.business[indexBusines],
  //       category: [],
  //       interesting: {
  //         facebookGroups: []
  //       },
  //       general: {
  //         keywords: []
  //       },
  //       brands: []
  //     }
  //     res.data.forEach((el: any) => {
  //       if (el.CategoryID != 'brands') {
  //         if (el.CategoryID === 'category') {
  //           busines[el.CategoryID].push(el)
  //         }
  //         if (el.CategoryID === 'interesting') {
  //           busines[el.CategoryID].facebookGroups.push(el)
  //         }
  //         if (el.CategoryID === 'general') {
  //           busines[el.CategoryID].keywords.push(el)
  //         }
  //       } else {
  //         const index = busines.brands.findIndex((element: any) => element.name === el.name);
  //         if (index != -1) {
  //           busines.brands[index].keywords.push(el);
  //         } else {
  //           busines.brands.push({
  //             name: el.name,
  //             keywords: [
  //               el
  //             ]
  //           })
  //         }
  //       }
  //     })
  //     userInfo.business[indexBusines] = busines;
  //     this.userServ.setUser(userInfo);
  //   })
  // }
}
