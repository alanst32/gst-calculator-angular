import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      this.http.get("api/findUser").subscribe(data => {
          console.log(data);
      });
  }
}



