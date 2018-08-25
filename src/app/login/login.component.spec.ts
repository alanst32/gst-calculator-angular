import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing'
import {ErrorStateMatcher } from '@angular/material/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let formGroup: FormGroup;
  let usernameControl: FormControl;
  let passwordControl: FormControl;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule, 
        HttpClientModule, 
        MatInputModule, 
        ReactiveFormsModule, 
        RouterTestingModule
      ],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    // // // Mock the form controls
    // // usernameControl = new FormControl('', Validators.compose([
    // //   Validators.required,
    // //   Validators.email,
    // // ]));

    // // passwordControl = new FormControl('', Validators.required);

    // // formGroup = new FormGroup( {
    // //   usernameControl, passwordControl
    // // });

    // // component.validationsForm = formGroup;

    // // errorStateMatcher = new ErrorStateMatcher();

    // component.matcher = errorStateMatcher;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


 
});
