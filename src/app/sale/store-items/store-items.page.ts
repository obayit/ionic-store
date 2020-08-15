import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/interfaces/user';
import { firestore } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-items',
  templateUrl: './store-items.page.html',
  styleUrls: ['./store-items.page.scss'],
})
export class StoreItemsPage implements OnInit {
  currentUser: User;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  async ngOnInit() {
    this.authService.currentAfUser().then((res) => {
      console.log('store-items: currentAfUser is ');
      console.log(res);
      if(!res){
        this.router.navigateByUrl('register');
      }
    });
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user[0];
    });
  }
  refreshUser(){
    // this.currentUser = this.authService.currentUser;
  }

}
