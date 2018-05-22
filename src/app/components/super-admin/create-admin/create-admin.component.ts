import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


import {Admin} from '../../../models/admin';

import {AdminService} from '../../../services/admin/admin.service';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  admin: Admin = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    adress: '',
    username: '',
    password: '',
    conf_pass: '',
    enabled: false,
    role: 'ROLE_ADMIN',
    pic: 'https://firebasestorage.googleapis.com/v0/b/asdi-20ebf.appspot.com/o/uploads%2FAntu_im-invisible-user.svg.png?alt=media&token=1e456122-ad9b-44b7-a7af-2b2184755dd5'
};

  pic = 'https://firebasestorage.googleapis.com/v0/b/asdi-20ebf.appspot.com/o/uploads%2FAntu_im-invisible-user.svg.png?alt=media&token=1e456122-ad9b-44b7-a7af-2b2184755dd5'

  show = false

  empty_firstname = false
  empty_lastname = false
  empty_email = false
  empty_phoneNumber = false
  empty_adress = false
  empty_username = false
  empty_password = false

  contain_number = false
  contain_letter = false
  email_exits = false
  phone_exits = false
  username_exits = false
  short_password = false
  match_password = false

  admins: any


  constructor(public adminService: AdminService,
              public router: Router,
              public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.adminService.getAdmins().subscribe(
      admin => {
        this.admins = admin;
        this.show = true;
      });


  }

  onSubmit({value, valid}: {value: Admin, valid: boolean}) {
    this.validation(value);
    if (this.validation(value) === true) {
      value.enabled = false;
      value.pic = this.pic;
     this.adminService.addAdmin(value);
      this.router.navigate(['/super-admin/manage-admin']);
    }
  }

  validation(value) {
    let temp = 0;
    if (value.firstname === '') {
      this.empty_firstname = true;
    } else {
      temp ++;
      this.empty_firstname = false;
    }
    if (value.lastname === '') {
      this.empty_lastname = true;
    } else {
      temp ++;
      this.empty_lastname = false;
    }
    if (value.email === '') {
      this.empty_email = true;
    } else {
      temp ++;
      this.empty_email = false;
    }
    if (value.phone === '') {
      this.empty_phoneNumber = true;
    } else {
      temp ++;
      this.empty_phoneNumber = false;
    }
    if (value.adress === '') {
      this.empty_adress = true;
    } else {
      temp ++;
      this.empty_adress = false;
    }
    if (value.username === '') {
      this.empty_username = true;
    } else {
      temp ++;
      this.empty_username = false;
    }
    if (value.password === '') {
      this.empty_password = true;
    } else {
      temp ++;
      this.empty_password = false;
    }
    if (temp >=  7) {
      if ((/^[a-zA-Z]+$/.test(value.firstname)) && (/^[a-zA-Z]+$/.test(value.lastname)) ) {
         this.contain_number = false;
         const cars = ['90', '91', '92' , '93' , '70' , '99' , '98' , '97' , '96' , '22' , '21' , '23'];
         const start = value.phone.substr(0,2);
          if (/^\d+$/.test(value.phone) && value.phone.length === 8  && cars.includes(start) === true ) {
            this.contain_letter = false;
            const emails = [];
            const phones = [];
            const usernames = [];
            for (let i = 0 ; i < this.admins.length ; i++) {
              emails.push(this.admins[i].email);
              phones.push(this.admins[i].phone);
              usernames.push(this.admins[i].username);
            }
            if (emails.includes(value.email) !== true) {
                this.email_exits = false;
                if (phones.includes(value.phone) !== true) {
                  this.phone_exits = false;
                  if (usernames.includes(value.username) !== true) {
                    this.username_exits = false;
                    if (value.password.length >= 6) {
                      this.short_password = false;
                      if (value.password !== value.conf_password) {
                        this.match_password = true;
                        return false;
                      } else {
                        this.match_password = false;
                        return true;
                      }
                    } else {
                      this.short_password = true;
                    }
                  } else {
                    this.username_exits = true;
                  }
                } else {
                  this.phone_exits = true;
                }
            } else {
                this.email_exits = true;
            }
            // if {
            //
            // }
          } else {
            this.contain_letter = true;
          }
      } else {
        this.contain_number = true;
      }
    } else {
      //
    }

  }

}
