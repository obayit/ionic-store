import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/interfaces/user';
import { firestore } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { StoreItem } from 'src/app/interfaces/store-item';

@Component({
  selector: 'app-store-items',
  templateUrl: './store-items.page.html',
  styleUrls: ['./store-items.page.scss'],
})
export class StoreItemsPage implements OnInit {

  constructor(
    public authService: AuthService,
    public storeService: StoreService,
    public router: Router,
  ) { }
  docs: any[] = [];

  async ngOnInit() {
    this.authService.currentAfUser().then((res) => {
      console.log('store-items: currentAfUser is ');
      console.log(res);
      if(!res){
        // this.router.navigateByUrl('register');
      }
    });
    this.storeService.getItems().subscribe((snapshot)=>{
      for(let doc of snapshot.docs){
        this.docs.push(doc.data());
      }
    })
    // this.storeService.getItems().subscribe((snapshot)=>{
    //   console.log(snapshot);
    //   for(let doc of snapshot.docs){
    //     console.log(doc);
    //   }
    // })
  }
  populateList(){

  }
  refreshUser(){
    // this.currentUser = this.authService.currentUser;
  }

}
