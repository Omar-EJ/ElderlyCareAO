import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  selectedRole : Number =1;
  visibility=true;
  visibility2=false;
  visibility3=false;
  @Output() newItemEvent = new EventEmitter<any>();
  varr = "N/A";

  constructor(private httpclient : HttpClient,private cookie: CookieService) { }

  ngOnInit(): void {
    this.afficher();

  }

  connectUser(){

    var form: FormGroup;


    console.log('connect');
    var formData = new FormData();
    var pass=(document.getElementById('5') as HTMLInputElement).value;
    var login=(document.getElementById('6')as HTMLInputElement).value;
    
    if (this.validateEmail(login)){

      formData.append('login',login);
      formData.append('pass',pass);
  
      /*
      this.httpclient.get<any>(environment.baseurl+'/login.php?login='+login+'&pass='+pass).subscribe(view=>{
        
        console.log(view.data);
        this.afficher();
  
      });*/ 
     
      this.httpclient.post(environment.baseurl+'/login2.php',formData).subscribe((res)=>{
        
        if(!res['data'].role)
        {
          console.log("Login ou mot de passe incorrect");
        }
        else{
          
          this.cookie.set('Id',res['data'].id);
          this.cookie.set('role',res['data'].role);
          this.cookie.set("name","SMITI");
          // if role == civilhelper || medical helper  (balance = value) else don't set balance
          this.cookie.set('balance',"7aze9");
          document.location.href="./UserProfil";
        }
      },(err)=>{
        console.log(err);
      })
    }

      
  }
  signupUser(){
    var Role : Number;
    var formData = new FormData();
    var nom=(document.getElementById('1') as HTMLInputElement).value;
    var prenom=(document.getElementById('2')as HTMLInputElement).value;
    var adresse=(document.getElementById('3') as HTMLInputElement).value;
    var login=(document.getElementById('4')as HTMLInputElement).value;
    var pass=(document.getElementById('7') as HTMLInputElement).value;
    
    if(this.selectedRole==1)
    {
      var job=(document.getElementById('12') as HTMLInputElement).value;
    }
    if(this.selectedRole==0)
    {
      var Date=(document.getElementById('13') as HTMLInputElement).value;
    }
    if (this.validateEmail(login)){
      formData.append('nom',nom);
      formData.append('prenom',prenom);
      formData.append('adresse',adresse);
      formData.append('login',login);
      formData.append('pass',pass);
      formData.append('role',this.selectedRole.toString());
      formData.append('job',job);
      formData.append('date',Date)
      
      this.httpclient.post(environment.baseurl+'/signup.php',formData).subscribe((res)=>{
        console.log(res);
        if(res["data"].includes("succès")){
          this.visibility = true;
        }else{
          alert("Catastrophe");
        }
      },(err)=>{
        console.log(err);
      })
    }
    else{
      console.log("login incorrect");
    }
   
  }
  afficher(){
    //console.log('azeazeazeaz');
  }
  afficherpage(f)
  {
    this.visibility=f;
  }
  afficherProfession(a,s)
  {
    this.visibility2=a;
    this.selectedRole=Number(s);
  }
  afficherDate(a)
  {
    this.visibility3=a;
  }
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
}
