import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {  
  ID : Number = 2;
  name : String ="";
  forname : String ="";
  code : Number = 1; 
  Profil : any;
  constructor(private httpclient : HttpClient, private cookie: CookieService) { }
  ngOnInit(): void {
  this.ID=Number(this.cookie.get('Id'));
  this.code=Number(this.cookie.get('role'));
  this.DisplayDataAsCards();
  }
DisplayDataAsCards(){
  var form: FormGroup;
  var formData = new FormData();
  formData.append("ID",this.ID.toString());
  formData.append("role",this.code.toString());
  this.httpclient.post(environment.baseurl+'/Profil.php',formData).subscribe((res)=>{
    //console.log(res);
    if(!res['data'].nom){
      console.log("error",res,this.ID,this.code,this.cookie.get('ID'));  //Update later
    }
    else{
      this.name=res['data'].nom;
      this.forname=res['data'].prenom;
      if(res['data'].points)
      {
        var li = document.createElement('li');
        li.innerHTML=res['data'].points;
        document.getElementById("infoUser").append(li);
      }
    }
  },(err)=>{
    console.log(err);
  })
  
}
typeUtilisateur(){ //UpdateLater ajouter views database
  if(this.code==0)
  {
    return "Personneinneed";
  }
  if(this.code==1)
  {
    return "MedicalHelper";
  }
  if(this.code==2)
  {
    return "CivilHelper";
  }
}

}
