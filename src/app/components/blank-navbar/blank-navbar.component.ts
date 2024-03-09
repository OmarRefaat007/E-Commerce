import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-blank-navbar',
  templateUrl: './blank-navbar.component.html',
  styleUrls: ['./blank-navbar.component.css']
})
export class BlankNavbarComponent {

  constructor(private _AuthServiceService:AuthServiceService) {  }

  logOut(){
    this._AuthServiceService.signOut();
  }

}
