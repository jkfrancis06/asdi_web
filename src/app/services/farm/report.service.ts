import { Injectable } from '@angular/core';

import {Report} from '../../models/report';

import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportService {

  reports: Observable<any[]>;
  reportsRef: AngularFireList<any>
  report: Observable<any>
  reportRef: AngularFireObject<any>;

  constructor(public af: AngularFireDatabase) {
    this.reportsRef = this.af.list('/reports');
    // this.admins = this.adminsRef.valueChanges();
    this.reports = this.reportsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getReports() {
    return this.reports;
  }

  addReport(report: Report) {
    this.reportsRef.push(report);
  }

}
