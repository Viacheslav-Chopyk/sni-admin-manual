import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {HelperService} from "../../../shared/services/helper.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apiServ: ApiService,
    private helpServ: HelperService,
    private fb: UntypedFormBuilder,
    private http: HttpClient,
  ) { }

  initFormLogin(): UntypedFormGroup {
    return this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
      ]]
    });
  }

  login(data: any) {
    // return this.apiServ.post('auth/login', data);
    return this.http.post(environment.urlNewBack + '/loginData', data).pipe(catchError(this.apiServ.formatErrors));
  }
  loginNewBack() {
    return this.http.get(environment.urlNewBack + '/authUrl?username=BarandSlavik&password=SheliFron');
  }

  getKeywordsData(businesid: number){
    const token2 = this.helpServ.getLocalItem('token2');
    return this.http.get(environment.urlNewBack + `/ALLKEYWORDS?Token=${token2}&BusinessID=${businesid}`)
  }
}
