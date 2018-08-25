import { Component, Injectable, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

import { CalcHistory } from '../../../server/model/CalcHistory.js';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Injectable()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit{

  gstPercentage: number = 10;
  displayedColumns = ['inputPrice', 'priceAfter', 'gstAmount'];
  calcHistoryList: CalcHistory[];
  dataSource = new MatTableDataSource<CalcHistory>();
  showTable: boolean = false

  matcher = new MyErrorStateMatcher();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
      private http: HttpClient,
      private router: Router
  ){}

  mainFormGroup = new FormGroup({
      priceControl: new FormControl('', Validators.compose([
          Validators.required
      ]))
  });

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.refresh_dataTable();

  }

  ngAfterViewInit() {
        this.dataSource.paginator = this.paginator
  }

  public add_btnClick(){
      var url = "/api/saveCalc";

      var inputPrice = this.mainFormGroup.get('priceControl').value
      var gstAmount = inputPrice * this.gstPercentage / 100;
      var priceAfter = inputPrice + gstAmount;

      var params = {
          "inputPrice": inputPrice,
          "priceAfter": priceAfter,
          "gstAmount": gstAmount
      }

      this.http.post(url, params)
          .subscribe(data => {

           this.refresh_dataTable();
      });
  }


  public refresh_dataTable(){

      var url = "api/getCalcHistory";

      this.http.get(url)
          .subscribe(data => {
              const dataString = JSON.stringify(data);

              this.dataSource = JSON.parse(dataString);

              console.log(this.dataSource);

              this.showTable = true;
      });
  }

  public close_btnClick(){
      this.router.navigate(['/login', {}]);
  }

}

