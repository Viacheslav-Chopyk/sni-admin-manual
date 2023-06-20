import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ISocialNetwork } from './types/dashboard.types';

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
  isFileValid = true;
  networkSelected: string = '';
  data: any;

  socialNetwork: ISocialNetwork[] = [
    {value: 'Facebook', name: 'Facebook'},
    {value: 'GoogleSearch', name: 'GoogleSearch'},
    {value: 'Instagram', name: 'Instagram'},
    {value: 'Reddit', name: 'Reddit'},
    {value: 'TikTok', name: 'TikTok'},
    {value: 'Twitter', name: 'Twitter'},
    {value: 'YouTube', name: 'YouTube'},
    ];

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.checkCellValues();
  }

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

  changeNetwork(event:string){
    console.log(event);
    
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


  // checkCellValues() {
  //   if (this.selectedFile) {
  //     const fileReader = new FileReader();
  //     fileReader.onload = (e: any) => {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: 'array' });
  //       const firstSheetName = workbook.SheetNames[0];
  //       const secondSheetName = workbook.SheetNames[1];
  //       const thirdSheetName = workbook.SheetNames[2];
  //       const forthSheetName = workbook.SheetNames[3];
  //       const fifthSheetName = workbook.SheetNames[4];
  //       const sixthSheetName = workbook.SheetNames[5];
  //       const seventhSheetName = workbook.SheetNames[6];
  //       const firstSheet = workbook.Sheets[firstSheetName];
  //       const secondSheet = workbook.Sheets[secondSheetName];
  //       const thirdSheet = workbook.Sheets[thirdSheetName];
  //       const forthSheet = workbook.Sheets[forthSheetName];
  //       const fifthSheet = workbook.Sheets[fifthSheetName];
  //       const sixthSheet = workbook.Sheets[sixthSheetName];
  //       const seventhSheet = workbook.Sheets[seventhSheetName];

  //       // Checking the cells in the sheet
  //       const desiredCellsFirstSheet = ['A4', 'B4', 'A16', 'B16', 'A28', 'B28', 'A40'];
  //       for (const cell of desiredCellsFirstSheet) {
  //         const cellValue = firstSheet[cell]?.v;
  //         if (!cellValue) {
  //           alert(`The Cell ${cell} in the ${firstSheetName} sheet has no value.`);
  //           this.isFileValid = false;
  //           return;
  //         }
  //       }

  //       const desiredCellsSecondSheet = ['A4', 'B4'];
  //       for (const cell of desiredCellsSecondSheet) {
  //         const cellValue = secondSheet[cell]?.v;
  //         if (!cellValue) {
  //           alert(`The Cell ${cell} in the ${secondSheetName} sheet has no value.`);
  //           this.isFileValid = false;
  //           return;
  //         }
  //       }

  //       const desiredCellsThirdSheet = ['A4', 'B4', 'C4', 'A16', 'B16', 'A28'];
  //       for (const cell of desiredCellsThirdSheet) {
  //         const cellValue = thirdSheet[cell]?.v;
  //         if (!cellValue) {
  //           alert(`The Cell ${cell} in the ${thirdSheetName} sheet has no value.`);
  //           this.isFileValid = false;
  //           return;
  //         }
  //       }

  //       const desiredCellsForthSheet = ['A4', 'B4', 'A16', 'B16', 'A28', 'B28', 'A40'];
  //       for (const cell of desiredCellsForthSheet) {
  //         const cellValue = forthSheet[cell]?.v;
  //         if (!cellValue) {
  //           alert(`The Cell ${cell} in the ${forthSheetName} sheet has no value.`);
  //           this.isFileValid = false;
  //           return;
  //         }
  //       }

  //       const desiredCellsFifthSheet = ['A4', 'B4', 'C4', 'A16', 'B16', 'A28'];
  //       for (const cell of desiredCellsFifthSheet) {
  //         const cellValue = fifthSheet[cell]?.v;
  //         if (!cellValue) {
  //           alert(`The Cell ${cell} in the ${fifthSheetName} sheet has no value.`);
  //           this.isFileValid = false;
  //           return;
  //         }
  //       }

  //       const desiredCellsSixsthSheet = ['A4', 'B4', 'C4', 'A16', 'B16', 'A28'];
  //       for (const cell of desiredCellsSixsthSheet) {
  //         const cellValue = sixthSheet[cell]?.v;
  //         if (!cellValue) {
  //           alert(`The Cell ${cell} in the ${sixthSheetName} sheet has no value.`);
  //           this.isFileValid = false;
  //           return;
  //         }
  //       }

  //       const desiredCellsSeventhSheet = ['A4', 'B4', 'A16', 'B16', 'A28', 'B28', 'A40'];
  //       for (const cell of desiredCellsSeventhSheet) {
  //         const cellValue = seventhSheet[cell]?.v;
  //         if (!cellValue) {
  //           alert(`The Cell ${cell} in the ${seventhSheetName} sheet has no value.`);
  //           this.isFileValid = false;
  //           return;
  //         }
  //       }
  //     };

  //     fileReader.readAsArrayBuffer(this.selectedFile);
  //   }
  // }
  checkCellValues() {
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetNames = workbook.SheetNames;
  
        for (const sheetName of sheetNames) {
          if (this.networkSelected.includes(sheetName)) {
            const sheet = workbook.Sheets[sheetName];
            const desiredCells = this.getDesiredCellsForSheet(sheetName);
  
            for (const cell of desiredCells) {
              const cellValue = sheet[cell]?.v;
              console.log(cellValue);
  
              if (!cellValue) {
                alert(`The Cell ${cell} in the ${sheetName} sheet has no value.`);
                this.isFileValid = false;
                this.selectedFile = null;
                const fileInput = document.getElementById('fileInput') as HTMLInputElement;
                fileInput.value = '';
                this.networkSelected = '';
                return;
              }
            }
          }
        }
      };
  
      fileReader.readAsArrayBuffer(this.selectedFile);
    }
  }
  
  getDesiredCellsForSheet(sheetName: any) {
    const socialNetworkMappings: { [key: string]: string[] } = {
      Facebook: ['A4', 'B4', 'A16', 'B16', 'A28', 'B28', 'A40'],
      GoogleSearch: ['A4', 'B4'],
      Instagram: ['A4', 'B4', 'C4', 'A16', 'B16', 'A28'],
      Reddit: ['A4', 'B4', 'A16', 'B16', 'A28', 'B28', 'A40'],
      Twitter: ['A4', 'B4', 'C4', 'A16', 'B16', 'A28'],
      TikTok: ['A4', 'B4', 'C4', 'A16', 'B16', 'A28'],
      YouTube: ['A4', 'B4', 'A16', 'B16', 'A28', 'B28', 'A40']
    };
  
    return socialNetworkMappings[sheetName] || [];
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
            const fileInput = document.getElementById('fileInput') as HTMLInputElement;
            fileInput.value = '';
          }
        });
    }
  }

  protected readonly Object = Object;
  protected readonly event = event;
}
