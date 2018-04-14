import { Component, OnInit } from '@angular/core';

import {AdminService} from '../../../services/admin/admin.service';
import {MzToastService} from 'ng2-materialize';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent implements OnInit {

  show = true;
  admins: any;
  key: string;
  modalOptions: Materialize.ModalOptions = {
    dismissible: true,
    opacity: .5,
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
      console.log(modal, trigger);
    },
    complete: () => { } // Callback for Modal close
  };

  constructor(public adminService: AdminService, private toastService: MzToastService) { }

  ngOnInit() {
    this.adminService.getAdmins().subscribe(
      admin => {
        this.admins = admin;
        console.log(this.admins)
        this.show = false;
      });
  }

  enableAdmin(key, enabled, index) {
    let admin = this.admins[index];
    if (enabled === true) {
      admin.enabled = false;
      this.adminService.activateAdmin(key, admin);
      console.log('ok');
    } else {
      admin.enabled = true;
      this.adminService.activateAdmin(key, admin);
    }
  }

  saveKey(key) {
    this.key = key;
  }

  deleteAdmin() {
    this.adminService.deleteAdmin(this.key);
    this.toastService.show('Administrateur supprimé avec succes', 4000, 'green');
  }


}
