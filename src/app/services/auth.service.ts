import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  currentAfUser: firebase.User;
  // users: Observable<User[]>;
  usersCollection = this.firestore.collection<User>('users');

  constructor(public firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    ) {}
  async registerUser(user: User, password: string){
    const res = await this.afAuth.createUserWithEmailAndPassword(user.email, password);
    user.uid = res.user.uid;
    this.currentUser = user;
    this.currentAfUser = res.user;
    return this.usersCollection.add({...user});
  }
}
