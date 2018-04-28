import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';


import {ReportService} from '../../../services/farm/report.service';
import {Report} from '../../../models/report';

@Component({
  selector: 'app-manager-report',
  templateUrl: './manager-report.component.html',
  styleUrls: ['./manager-report.component.css']
})
export class ManagerReportComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router, public reportService: ReportService) { }

  loader = true
  reports: any;


  report: Report = {
    title: '',
    content: '',
    farm: '',
    createdAt: '' // new Date().toUTCString()
  }

  modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    // Callback for Modal close
  };

  ngOnInit() {
    this.report.farm = this.route.snapshot.params['key'];
    console.log(this.report.farm);
    console.log(new Date().toUTCString());
    this.reportService.getReports().subscribe(
      reports => {
        console.log(reports);
        this.reports = reports;
        this.loader = false;
      });
  }

}
