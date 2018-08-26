import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

interface User {
  username: String,
  password: String
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule, 
        HttpClientModule, 
        HttpClientTestingModule,
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

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate required forms', fakeAsync(() =>{
    component.validationsForm.controls['usernameControl'].setValue('');
    component.validationsForm.controls['passwordControl'].setValue('');
   
    expect(component.validationsForm.controls['usernameControl'].hasError('required')).toBe(true);
    expect(component.validationsForm.controls['passwordControl'].hasError('required')).toBe(true);

    expect(component.validationsForm.invalid).toBe(true);
  }));

  it('should invalidate email format forms', fakeAsync(() =>{
    const tesUser = {
      email: 'test.com'
    }

    component.validationsForm.controls['usernameControl'].setValue(tesUser.email);
   
    expect(component.validationsForm.controls['usernameControl'].hasError('email')).toBe(true);
    expect(component.validationsForm.controls['usernameControl'].hasError('required')).toBe(false);

    expect(component.validationsForm.invalid).toBe(true);
  }));

  it('should validate input forms', fakeAsync(() =>{
    const tesUser = {
      email: 'test@test.com',
      password: '12345'
    }

    component.validationsForm.controls['usernameControl'].setValue(tesUser.email);
    component.validationsForm.controls['passwordControl'].setValue(tesUser.email);

    expect(component.validationsForm.controls['usernameControl'].hasError('email')).toBe(false);
    expect(component.validationsForm.controls['usernameControl'].hasError('required')).toBe(false);

    expect(component.validationsForm.controls['passwordControl'].hasError('required')).toBe(false);

    expect(component.validationsForm.invalid).toBe(false);
  }));


  it('should call login_btnClick', () => {

    fixture.detectChanges();
    spyOn(component, 'login_btnClick');
  
    let btn = fixture.debugElement.query(By.css('button'));

    btn.triggerEventHandler('click', null);
  
    fixture.detectChanges();

    expect(component.login_btnClick).toHaveBeenCalled();
  })

  it('should validate the user password', () => {

    const testUrl = "/api/findUser/test@test.com";

    const responseUser: User = {
      username: 'test@test.com',
      password: '12345'
    };

    // Test HTTP Request
    httpClient.get<User>(testUrl)
      .subscribe(data => 

         // When observable resolves, result should match test data
        expect(data).toEqual(responseUser)
      );


    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(testUrl);
    
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(responseUser);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();


  });

});
