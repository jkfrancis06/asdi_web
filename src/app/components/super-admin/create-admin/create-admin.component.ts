import { Component, OnInit } from '@angular/core';

import {Admin} from '../../../models/admin';

import {AdminService} from '../../../services/admin/admin.service';


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
    role: 'ROLE_ADMIN'
  };

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


  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAdmins().subscribe(
      admin => {
        this.admins = admin;
        console.log(this.admins);
        this.show = true;
      });
  }

  onSubmit({value, valid}: {value: Admin, valid: boolean}) {
    console.log(value)
    this.validation(value);
    // if (this.validation(value) === true) {
    //   this.adminService.addAdmin(value);
    // }
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

    console.log(temp)
    if (temp >=  7) {
      if ((/^[a-zA-Z]+$/.test(value.firstname)) && (/^[a-zA-Z]+$/.test(value.lastname)) ) {
         this.contain_number = false;
         const cars = ['90', '91', '92' , '93' , '70' , '99' , '98' , '97' , '96' , '22' , '21' , '23'];
         const start = value.phone.substr(0,2);
         console.log(cars.includes(start));
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
                  if (usernames.includes(value.username) !== true){
                    this.username_exits = false;
                    if (value.password.length >= 6) {
                      this.short_password = false;
                      if (value.password === value.conf_pass) {
                        this.match_password = false;
                        console.log('ok');
                      } else {
                        this.match_password = true;
                      }
                    } else {
                      this.short_password = true;
                    }
                  } else {
                    this.username_exits = true;
                  }
                }else {
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
      console.log('error');
    }

  }

}
