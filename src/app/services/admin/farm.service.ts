import { Injectable } from '@angular/core';
import {Farm} from '../../models/farm';

import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FarmService {

  farms: Observable<any[]>;
  farmsRef: AngularFireList<any>
  farm: Observable<any>
  farmRef: AngularFireObject<any>;

  constructor(public af: AngularFireDatabase) {
    this.farmsRef = this.af.list('/farms');
    // this.admins = this.adminsRef.valueChanges();
    this.farms = this.farmsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getFarms() {
    return this.farms;
  }

  addFarm(farm: Farm) {
    this.farmsRef.push(farm);
  }

  activateFarm(key, value) {
    return this.farmsRef.update(key, value);
  }

  updateFarm(value, key) {
    return this.farmsRef.update(key, value);
  }

}
