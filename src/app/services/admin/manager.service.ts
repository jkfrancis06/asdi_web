import { Injectable } from '@angular/core';

import {Manager} from "../../models/manager";

import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ManagerService {

  managers: Observable<any[]>;
  managersRef: AngularFireList<any>
  manager: Observable<any>
  managerRef: AngularFireObject<any>;

  constructor(public af: AngularFireDatabase) {
    this.managersRef = this.af.list('/managers');
    // this.admins = this.adminsRef.valueChanges();
    this.managers = this.managersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getManagers() {
    return this.managers;
  }

  addManager(manager: Manager) {
    this.managersRef.push(manager);
  }

  activateManager(key, value) {
    return this.managersRef.update(key, value);
  }


  loadLoginData(username) {
    this.managersRef =  this.af.list('/managers', ref => ref.orderByChild('username').equalTo(username));
    this.manager = this.managersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    return this.manager;
  }

  loadLocalManager(key) {
    // this.adminsRef = this.af.list('/admins');
    // this.admins = this.adminsRef.valueChanges();
    this.managerRef = this.af.object('/managers/' + key);
    this.manager = this.managerRef.valueChanges()
    return this.manager;
  }


  deleteManager(key) {
    return this.managersRef.remove(key);
  }

  loadManagersForSelect() {
    this.managersRef =  this.af.list('/managers', ref => ref.orderByChild('enabled').equalTo(true));
    this.managers = this.managersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    return this.managers;
  }


}
