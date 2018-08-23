import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher } from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Injectable()
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent{

  userInvalid: boolean = false

  constructor(private http: HttpClient){
  }

  validationsForm = new FormGroup({
      usernameControl: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email,
      ])),
      passwordControl: new FormControl('', Validators.required)
  });

  matcher = new MyErrorStateMatcher();

  public login_btnClick() {

      var email = this.validationsForm.get('usernameControl').value
      var pass = this.validationsForm.get("passwordControl").value
      var url = "/api/findUser";
      var params = {"username":email}

      this.http.post(url, params)
          .subscribe(data => {

            if(pass == data['password']){

            }
            else{
                this.userInvalid = true;
            }
      });
  }

  public openMainPage(){
      console.log("open main page");
  }
}

