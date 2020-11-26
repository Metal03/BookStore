import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afsAuth: AngularFireAuth
  ) { }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, password)
        .then( userData => resolve(userData),
        err => reject(err));
    });
  }

  loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, password)
      .then( userData => resolve(userData)
        , err =>  reject( err )
      );
    });
  }

  loginFacebookUser() {
    return this.afsAuth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider());
  }

  loginGoogleUser() {
    return this.afsAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }

  logoutUser() {
    return this.afsAuth.signOut();
  }

}


