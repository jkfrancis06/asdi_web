import { Component, OnInit } from '@angular/core';

import {ReportService} from '../../../services/farm/report.service';
import {FarmService} from '../../../services/admin/farm.service';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.css']
})
export class ActivityReportComponent implements OnInit {

  farms = [];
  reports = [];
  farm_report = [];
  selected_farm = '';

  constructor(private reportService: ReportService,
              private farmService: FarmService) { }

  ngOnInit() {
    this.farmService.getFarms().subscribe(farms => {
      this.farms = farms;
    });
  }

  loadReport() {
    this.reportService.getReports(this.selected_farm).subscribe(report => {
      this.reports = report;
    });
  }

}
