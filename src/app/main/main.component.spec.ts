
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing'
import { APP_BASE_HREF } from '@angular/common';


import { MatPaginatorModule, MatTableModule } from '@angular/material';

import { MainComponent } from './main.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


interface CalcHistory {
  inputPrice: Number,
  priceAfter: Number,
  gstAmount: Number
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule, 
        HttpClientModule, 
        HttpClientTestingModule,
        MatInputModule, 
        MatPaginatorModule,
        MatTableModule,
        ReactiveFormsModule, 
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        {provide: APP_BASE_HREF, useValue: '/'}
      ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate Price forms', () =>{
    component.mainFormGroup.controls['priceControl'].setValue('');
   
    expect(component.mainFormGroup.controls['priceControl'].hasError('required')).toBe(true);

    expect(component.mainFormGroup.invalid).toBe(true);
  });

  it('should validate Price has been informed ', () =>{
    component.mainFormGroup.controls['priceControl'].setValue(1234);
   
    expect(component.mainFormGroup.controls['priceControl'].hasError('required')).toBe(false);

    expect(component.mainFormGroup.invalid).toBe(false);
  });

  it('should call add_btnClick', () => {

    fixture.detectChanges();
    spyOn(component, 'add_btnClick');
  
    let btn = fixture.debugElement.query(By.css('button'));

    btn.triggerEventHandler('click', null);
    
    fixture.detectChanges();

    expect(component.add_btnClick).toHaveBeenCalled();
  });

 
});
