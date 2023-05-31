import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {IDataValue, ISocialNetwork} from "./types/dashboard.types";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tableData: any = [];
  dataValue:IDataValue[] = [];
  selectedValue: string = '';
  selectedNetwork: string = '';
  typeValue: string = '';

  socialNetwork: ISocialNetwork[] = [
    {value: 'Twitter', name: 'Twitter'},
    {value: 'Facebook', name: 'Facebook'},
    {value: 'Instagram', name: 'Instagram'},
    {value: 'Youtube', name: 'YouTube'},
    {value: 'TikTok', name: 'TikTok'},
    {value: 'Reddit', name: 'Reddit'},
    {value: 'Google Search', name: 'Google Search'}
  ];

  myForm = this.fb.group({})

  constructor(
    private dashboardService: DashboardService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.getData();
  }

  changeTableData(event: string) {
    this.dataValue = this.tableData[event];
    this.createForm();
  }

  getData() {
    this.dashboardService.getTableData().subscribe(res => {
      this.tableData = res;
    })
  }

  createForm() {
    this.myForm = this.fb.group({})
    this.dataValue.forEach(el => {
      const validators = el.required ? [Validators.required] : [];
      this.myForm.addControl(el.name, new FormControl(el.value, validators))
    });
  }

  isInputRequired(item: any): boolean {
    return item.required === true;
  }

  submitForm() {
    const tableData: Record<string, any> = {
      [this.selectedValue]: {
        ...this.myForm.value,
        network: this.selectedNetwork,
        //const data sent with every table
        StatusData: 21
      }
    };

    this.dataValue.forEach(el=>{
      if(el.type === 'int' || el.type === 'bigint') {
        tableData[this.selectedValue][el.name] = Number(tableData[this.selectedValue][el.name])
      }
    })

    this.dashboardService.sendTableData(tableData).subscribe(() => {
      this.selectedValue = '';
      this.selectedNetwork = '';
    })
  }

  downloadFile() {
    const fileUrl = 'https://example.com/file-url'; // Replace with your file URL
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.get(fileUrl, {
      responseType: 'blob',
      headers: headers
    }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'file-name.ext'; // Replace with your desired file name
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  protected readonly Object = Object;
  protected readonly event = event;
}

