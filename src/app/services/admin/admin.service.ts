import { Injectable } from '@angular/core';
import {Admin} from '../../models/admin';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminService {

  admins: FirebaseListObservable<any[]>
  admin: FirebaseObjectObservable<any>;

  constructor(public af: AngularFireDatabase) {
    this.admins = this.af.list('/admins') as FirebaseListObservable<Admin[]>;
  }

  getAdmins() {
    return this.admins;
  }

  addAdmin(admin: Admin) {
    this.admins.push(admin);
  }

  loadLoginData(username): FirebaseObjectObservable<Admin> {


    return this.af.list('/admins', {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    });

  }

  loadLocalAdmin(key) {
    this.admin = this.af.object('/admins/' + key) as FirebaseObjectObservable<Admin>;
    return this.admin;
  }



}
