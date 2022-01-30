import { Injectable } from '@angular/core';

import { getAuth,
         signOut,
         signInWithEmailAndPassword,
         createUserWithEmailAndPassword,
         sendEmailVerification,
         signInWithPopup,
         GoogleAuthProvider,
         sendPasswordResetEmail,
         onAuthStateChanged
        } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Observable, of } from 'rxjs';

import { User } from '../shared/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;

  constructor() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const db = getFirestore();
        return doc(db, `users/${user.uid}`);

      } else {
        // User is signed out
        return of(null);
      }
    });

  }

  async resetPassword(email: string): Promise<void> {
    try{

      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

    } catch(error){
      console.log('Error->', error);
    }

  }

  async loginGoogle(){
    try{

      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const {user} = await signInWithPopup(auth, provider);
      this.updateUserData(user);
      return user;

    } catch(error){
      console.log('Error->', error);
    }
  }

  async register( email: string, password: string ){
    try{

      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      this.sendVerificationEmail();
      return user;

    } catch(error){
      console.log('Error->', error);
    }
  }

  async login( email: string, password: string ){
    try{

      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      this.updateUserData(user);

      return user;

    } catch(error){
      console.log('Error->', error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try{

      const auth = getAuth();
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
          // ...
        });

    } catch(error){
      console.log('Error->', error);
    }
  }

  async logout(): Promise<void> {
    try{

      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    } catch(error){
      console.log('Error->', error);
    }
  }

  private updateUserData(user){

    const db = getFirestore();

    const userRef = doc(db, `users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerifed: user.emailVerifed,
      displayName: user.displayName
    };

    setDoc(userRef, data, { merge: true });

  }

}
