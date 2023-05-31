import {Component} from '@angular/core';
import {UserServiceService} from "./shared/services/user-service.service";
import {HelperService} from "./shared/services/helper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sni-admin-manual';

  constructor(
    private userServ: UserServiceService,
    private helpServ: HelperService,
    private router: Router,
  ) {
    this.initApp();
  }


  initApp() {
    // this.router.navigate(['main/dashboard'])
    // const user = this.helpServ.getLocalItem('user');
    // if (user) {
    //   this.userServ.setUser(user);
    //   this.userServ.setCurrentBusinessId();
    // }
  }
}
