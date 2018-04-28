import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import {Router} from '@angular/router';

import {ManagerService} from '../../services/admin/manager.service';

@Injectable()
export class ManagerGuard implements CanActivate {

  constructor(private managerService: ManagerService, private router: Router){
  }

  val: boolean ;

  canActivate() {
    // Check if the user is logged in
    return this.managerService.loadLocalManager(localStorage.getItem('manager_data')).map(
      manager => {
        console.log('ok')
        console.log(manager);
        if (manager) {
          if (manager.enabled === true) {
            return true;
          } else {
            this.router.navigate(['/manager/login']);
            return false;
          }
        } else {
          this.router.navigate(['/manager/login']);
          return false;
        }
      });
  }

}
