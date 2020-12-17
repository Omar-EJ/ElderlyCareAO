import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  json ;
  title = 'ElderlyCareV0';
  data = [];
  login : boolean = true;
  constructor(private cookie: CookieService) {
    
    }
    ajouterItem($event){
      this.json=$event;
      this.cookie.set('Id',this.json.id);
      this.cookie.set('role',this.json.role);
      document.location.href="/UserProfil";
    }
  }

