import { Injectable } from '@angular/core';
import {SuperAdmin} from '../../models/super-admin';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class LoginService {

  constructor(public af: AngularFireAuth) { }


  login(){
    // this.af.auth().signInWithEmailAndPassword()
  }

}
