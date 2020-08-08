import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  // users: Observable<User[]>;


  constructor(public firestore: AngularFirestore) {
  
  }
  registerUser(user: User){
    return this.firestore.collection<User>('users').add(user);
  }
}
