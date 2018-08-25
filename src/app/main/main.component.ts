import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

import { environment } from '../../environments/environment';
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
  styleUrls: ['./main.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class MainComponent implements OnInit{

    private gstPercentage: number = 10;
    private displayedColumns = ['inputPrice', 'priceAfter', 'gstAmount'];
    public dataSource = new MatTableDataSource<CalcHistory>([]);
    private showTable: boolean = false
    private paginator: MatPaginator;
    private headers = new HttpHeaders({'Authorization': environment.apiKey});

    matcher = new MyErrorStateMatcher();

    constructor(
        private http: HttpClient,
        private location: Location,
        private router: Router
    ){}

    mainFormGroup = new FormGroup({
        priceControl: new FormControl('', Validators.compose([
            Validators.required
        ]))
    });

    ngOnInit() {

    }

    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }

    setDataSourceAttributes() {
        this.dataSource.paginator = this.paginator;
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

        this.http.post(url, params, {headers: this.headers})
            .subscribe(data => {

             this.refresh_dataTable();
        });
    }

    public refresh_dataTable(){

        var url = "api/getCalcHistory";

        this.http.get(url, {headers: this.headers})
            .subscribe(data => {

                if(data != null){
                  const dataString = JSON.stringify(data);

                  this.dataSource = new MatTableDataSource<CalcHistory>(JSON.parse(dataString));
                  this.dataSource.paginator = this.paginator;

                  console.log(this.dataSource);

                  this.showTable = true;
                }
        });
    }

    public close_btnClick(){
        this.location.back();
    }

}

