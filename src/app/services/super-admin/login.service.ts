import { Injectable } from '@angular/core';
import {SuperAdmin} from '../../models/super-admin';
import {AngularFireAuth} from 'angularfire2/auth';


@Injectable()
export class LoginService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });

  }


  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error)
        throw error;
      });
  }

  logoutWithEmail(): void {
    this.afAuth.auth.signOut();
  }

}
