
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing'
import { APP_BASE_HREF } from '@angular/common';


import { MatPaginatorModule, MatTableModule } from '@angular/material';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule, 
        HttpClientModule, 
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
});
