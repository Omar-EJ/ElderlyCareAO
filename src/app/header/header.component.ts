import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private cookie: CookieService,public router: Router) { }

  ngOnInit(): void {
    if(this.cookie.get('Id')){ // if user connected 
      document.getElementById('log').innerHTML = "Log Out"
      document.getElementById('log').onclick = ()=>{
        this.cookie.deleteAll();
        document.location.href="/Login"
      }

      // set name and balance 
      var v =  document.getElementById('profile').children[0];
      v.innerHTML = v.innerHTML+ this.cookie.get('name');
      // if role == civilhelper || medical helper  (balance = value) else don't add balance
      var mstrong = document.createElement('strong');
      mstrong.innerHTML = this.cookie.get('balance');
      document.getElementById('profile').append(mstrong);
    }else{
      document.getElementById('profile').style.display = "none";
    }
  }

}
