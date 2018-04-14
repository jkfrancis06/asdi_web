import { Component, OnInit } from '@angular/core';
import {ManagerService} from '../../../services/admin/manager.service';
import {Manager} from '../../../models/manager';
import {MzToastService} from 'ng2-materialize';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  show = true

  modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%'
  }

  managers: any;

  key: string;

  manager: Manager = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    adress: '',
    username: '',
    password: '',
    conf_pass: '',
    enabled: false
  };

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

  constructor(public managerService: ManagerService, private toastService: MzToastService) { }

  ngOnInit() {
    this.managerService.getManagers().subscribe(
      managers => {
        this.managers = managers;
        this.show = false;
        console.log(this.managers);
      });
  }

  onSubmit({value, valid}: {value: Manager, valid: boolean}) {
    this.validation(value);
    if (this.validation(value) === true) {
      value.enabled = false;
      this.managerService.addManager(value);
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
          for (let i = 0 ; i < this.managers.length ; i++) {
            emails.push(this.managers[i].email);
            phones.push(this.managers[i].phone);
            usernames.push(this.managers[i].username);
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

  enableManager(key, enabled, index){
    let manager = this.managers[index];
    if (enabled === true) {
      this.manager.enabled = false;
      this.managerService.activateManager(key, manager);
      console.log('ok');
    } else {
      manager.enabled = true;
      this.managerService.activateManager(key, manager);
    }
  }

  saveKey(key) {
    this.key = key;
  }

  deleteManager() {
    this.managerService.deleteManager(this.key);
    this.toastService.show('Le gestionnaire a été supprimé avec succes', 4000, 'green');
  }


}
