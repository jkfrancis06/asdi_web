import { Component, OnInit } from '@angular/core';

import {ManagerService} from '../../../services/admin/manager.service';
import {FarmService} from '../../../services/admin/farm.service';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  constructor(private router: Router, private managerService: ManagerService, private farmService: FarmService) { }

  managers: any;
  farms: any;
  manager_farms = [];
  loader = true;
  managerId = localStorage.getItem('manager_data');

  ngOnInit() {
    console.log(this.managerId)
    this.farmService.getFarms().subscribe(
      farms => {
        this.farms = farms;
        this.loader = false;
        console.log(this.farms);
        for (let i = 0; i < this.farms.length; i++) {
          for (let j = 0; j < this.farms[i].gestionnaires.length; j++) {
            if (this.managerId === this.farms[i].gestionnaires[j].key) {
              this.manager_farms.push(this.farms[i]);
              console.log(this.manager_farms);
            }
          }
        }
        console.log(this.manager_farms);
      });
  }

  getFarm (key) {
    console.log(key);
    this.router.navigate(['/manager/' + key]);

  }

}
