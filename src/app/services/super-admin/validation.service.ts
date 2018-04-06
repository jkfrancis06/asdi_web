import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  admin : any;

  constructor() { }

  loadData(admin) {
    this.admin = admin;
  }

}
