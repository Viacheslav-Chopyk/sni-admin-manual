import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) {
  }

  getTableData() {
    return this.http.get(environment.urlNewBack + `/api/repair/dataNew`)
  }

  sendTableData(data: Record<string, any>) {
    return this.http.post(environment.urlNewBack + `/api/repair/RepairDateIns`, data)
  }
}
