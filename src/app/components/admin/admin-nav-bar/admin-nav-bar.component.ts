import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../services/admin/admin.service";
import {Admin} from "../../../models/admin";

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  admin = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    adress: '',
    username: '',
    password: '',
    conf_password: '',
    enabled: true,
    role: 'ROLE_ADMIN',
    key: '',
    pic: ''
  };

  ngOnInit() {
    this.adminService.loadLocalAdmin(localStorage.getItem('admin_data')).subscribe(
      admin => {
        this.admin = admin;
        console.log(this.admin);
      }
    );
  }

}
