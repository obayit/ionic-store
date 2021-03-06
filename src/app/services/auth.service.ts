import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, Subject } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser  = new Subject<User[]>();
  // users: Observable<User[]>;
  usersCollection = this.afStore.collection<User>('users');
  private currentUserSubscriber: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    ) {}
  async registerUser(user: User, password: string){
    const res = await this.afAuth.createUserWithEmailAndPassword(user.email, password);
    user.uid = res.user.uid;
    this.currentUser.next([user]);
    return this.usersCollection.add({...user});
  }
  async login(email: string, password: string){
    let res = await this.afAuth.signInWithEmailAndPassword(email, password);
    console.log('login res');
    console.log(res);
    await this.updateUserData(res.user);
    console.log('currentUser');
    console.log(this.currentUser);
  }
  async updateUserData(afUser: firebase.User){
    this.afStore.collection<User>('users', ref => ref.where('uid', '==', afUser.uid).limit(1)).valueChanges().subscribe((user) => {
      this.currentUser.next(user);
    });
  }
  async currentAfUser() { return await this.afAuth.currentUser; }
}
