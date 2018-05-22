import { Injectable } from '@angular/core';
import {Admin} from '../../models/admin';

import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminService {

  admins: Observable<any[]>;
  adminsRef: AngularFireList<any>
  admin: Observable<any>
  adminRef: AngularFireObject<any>;

  constructor(public af: AngularFireDatabase) {
    this.adminsRef = this.af.list('/admins');
    // this.admins = this.adminsRef.valueChanges();
    this.admins = this.adminsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getAdmins() {
    return this.admins;
  }

  addAdmin(admin: Admin) {
    this.adminsRef.push(admin);
  }

  loadLoginData(username) {
    this.adminsRef =  this.af.list('/admins', ref => ref.orderByChild('username').equalTo(username));
    this.admin = this.adminsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    return this.admin;
  }

  updateAdmin(key, value){
    return this.adminsRef.update(key, value);
  }

  getKey() {
//     this.itemsRef = db.list('messages');
// // Use snapshotChanges().map() to store the key
//     this.items = this.itemsRef.snapshotChanges().map(changes => {
//       return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
//     });
    this.admins = this.adminsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  loadLocalAdmin(key) {
    this.adminRef = this.af.object('/admins/' + key);
    this.admin = this.adminRef.valueChanges()
    return this.admin;
  }

  activateAdmin(key, value) {
    return this.adminsRef.update(key, value);
  }

  deleteAdmin(key) {
    return this.adminsRef.remove(key);
  }

}
