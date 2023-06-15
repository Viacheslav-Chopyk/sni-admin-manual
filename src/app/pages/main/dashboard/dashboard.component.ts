import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { IDataValue, ISocialNetwork } from './types/dashboard.types';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tableData: any = [];
  dataValue: any;
  selectedNetwork: string = '';
  selectedFile: File | null = null;

  socialNetwork: ISocialNetwork[] = [
    { value: 'Twitter', name: 'Twitter' },
    { value: 'Facebook', name: 'Facebook' },
    { value: 'Instagram', name: 'Instagram' },
    { value: 'Youtube', name: 'YouTube' },
    { value: 'TikTok', name: 'TikTok' },
    { value: 'Reddit', name: 'Reddit' },
    { value: 'Google Search', name: 'Google Search' },
  ];

  myForm: any = {};

  constructor(
    private dashboardService: DashboardService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getData();
  }

  changeTableData(event: string) {
    this.dataValue = this.tableData[event];

    this.createForm();
  }

  getData() {
    this.dashboardService.getTableData().subscribe((res) => {
      this.tableData = res;
    });
  }

  createForm() {
    this.myForm = {};
    Object.keys(this.dataValue).forEach((el) => {
      this.myForm[el] = this.fb.group({});
      this.dataValue[el].forEach((item: any) => {
        const validators = item.required ? [Validators.required] : [];
        this.myForm[el].addControl(
          item.name,
          new FormControl(item.value, validators)
        );
      });
    });
  }

  isInputRequired(input: any): boolean {
    return input.required === true;
  }

  submitForm() {
    const tableData: Record<string, any> = {
      data: [
        ],
    };
    Object.keys(this.myForm).forEach(el=>{
      tableData['data'].push( {[el]:{
        ...this.transformData(this.myForm[el].value, el),
        network: this.selectedNetwork,
        //const data sent with every table
        StatusData: 21,
      }})
    })

    this.dashboardService.sendTableData(tableData).subscribe((resp) => {
      if (resp) {
        alert('Data send successfully');
        this.selectedNetwork = '';
      }
    });
  }

  transformData(data: any, nameForm: any){
    this.dataValue[nameForm].forEach((el:any)=>{
      if(el.type === 'int' || el.type === 'bigint'){
        data[el.name] = Number(data[el.name])
      }
    })
    return data;
  }

  formValidation(){
    let valid = false;
    Object.keys(this.myForm).forEach(el=>{
      if(!this.myForm[el].valid){
        valid = true;
      }
    })
    return valid;
  }

  downloadFile(fileUrl: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.get(fileUrl, {responseType: 'blob',headers: headers,})
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.getFileName(fileUrl);
        link.click();
        window.URL.revokeObjectURL(url);
      });
  }

  getFileName(fileUrl: string): string {
    const lastSlashIndex = fileUrl.lastIndexOf('/');
    return fileUrl.substring(lastSlashIndex + 1);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('upload_file', this.selectedFile, this.selectedFile.name);
      this.http
        .post('https://midapi.sni.ai/sending_files_repair', formData, {
          observe: 'response',
          responseType: 'text',
        })
        .subscribe((res: HttpResponse<any>) => {
          if (res.status === 200) {
            alert('File uploaded successfully');
            this.selectedFile = null;
            const fileInput = document.getElementById(
              'fileInput'
            ) as HTMLInputElement;
            fileInput.value = '';
          }
        });
    }
  }

  protected readonly Object = Object;
  protected readonly event = event;
}
