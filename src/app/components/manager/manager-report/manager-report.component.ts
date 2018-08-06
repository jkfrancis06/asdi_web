import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';


import {ReportService} from '../../../services/farm/report.service';
import {FileService} from '../../../services/farm/file.service';
import {FarmService} from '../../../services/admin/farm.service';

import {Report} from '../../../models/report';
import {File} from '../../../models/file';
import {MzToastService} from 'ng2-materialize';

@Component({
  selector: 'app-manager-report',
  templateUrl: './manager-report.component.html',
  styleUrls: ['./manager-report.component.css']
})
export class ManagerReportComponent implements OnInit {

  constructor(private toastService: MzToastService,
              private uploadService: FileService,
              public route: ActivatedRoute,
              public router: Router,
              public reportService: ReportService,
              public farmService: FarmService
  ) { }

  loader = true
  reports: any;


  report: Report = {
    title : '',
    content : '',
    createdBy: localStorage.getItem('manager_data')
  };

  empty = {
    title: false,
    content: false
  }


  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    // Callback for Modal close
  };
  uploadedFiles = [];
  modal: any;

  ngOnInit() {
    this.farmService.getFarms().subscribe(farms => {
      let temp = false;
      for (let i = 0; i < farms.length; i++) {
        if (farms[i].key === this.route.snapshot.params['key']){
          temp = true;
        }
        if (temp === false) {
          this.router.navigate(['/manager']);
        }
      }
    })
    this.report.farm = this.route.snapshot.params['key'];
    console.log(this.report.farm);
    console.log(new Date().toUTCString());
    this.reportService.getReports(this.route.snapshot.params['key']).subscribe(
      reports => {
        console.log(reports);
        this.reports = reports;
        this.loader = false;
      });
    this.uploadService.getFileUploads(localStorage.getItem('manager_data')).subscribe(
      files => {
        console.log(files);
        for (let i = 0 ; i < files.length; i++) {
          this.uploadedFiles.push(files[i]);
          this.uploadService.deleteFileUpload(files[i].key);
        }
        console.log(this.uploadedFiles);
      });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    console.log(file.name);

    this.currentFileUpload = new File(file);
    this.currentFileUpload.user = localStorage.getItem('manager_data');
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  deleteFileUpload(file, index) {
    this.uploadService.deleteFileStorage(file.name)
    this.uploadedFiles.splice(index, 1);
  }

  getModalValue(modal) {
    this.modal = modal;
  }

  onChange({value, valid}: {value: Report, valid: boolean}) {
    if (value.title === '') {
      this.empty.title = true;
    } else {
      this.empty.title = false;
      if (value.content === '') {
        this.empty.content = true;
      } else {
        this.empty.content = false;
        this.report.createdAt =  new Date().toDateString();
        this.report.files = this.uploadedFiles;
        this.report.farm = this.route.snapshot.params['key'];
        console.log(this.report)
        this.reportService.addReport(this.report);
        this.modal.close();
        this.toastService.show('Rapport ajouté avec succces', 4000, 'green');
      }
    }
  }

}
