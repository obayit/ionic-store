import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
// import * as $ from 'jquery';

@Component({
  selector: 'app-store-items',
  templateUrl: './store-items.page.html',
  styleUrls: ['./store-items.page.scss'],
})
export class StoreItemsPage implements OnInit {
  constructor(
    public storeService: StoreService,
    private router: Router,
  ) { }
  docs: any[] = [];
  renderList = false;
  emptyData = false;
  cart = {};

  async ngOnInit() {
    this.storeService.getItems().subscribe((snapshot)=>{
      if(snapshot.docs.length == 0){
        this.emptyData = true;
      }
      let res = [];
      for(let doc of snapshot.docs){
        res.push({
          ...doc.data(),
          ref: doc.ref,
          id: doc.id
        });
        this.cart[doc.id] = 1;
      }
      this.docs = res;
      this.renderList = true;
    })
  }
  imageFailed(event){
    console.log('Image failed to load');
    console.log(event);
    let imgElement = event.target;
    let imgParent = imgElement.parentElement;
    if(imgParent.classList.contains('item-image')){
      imgParent.remove();
    }
  }
  getItemDetails(doc){
    let id: number = doc.id;
    console.log('#id');
    console.log(id);
    console.log(doc);
    this.router.navigate(['item-details'], { queryParams: {
      docId: doc.ref.id
    } });
  }
  addCount(event, doc){
    event.stopPropagation();
    if(!this.cart[doc.id]){
      this.cart[doc.id] = 1;
    }else{
      this.cart[doc.id] += 1;
    }
    console.log(this.cart);
  }
  subCount(event, doc){
    event.stopPropagation();
    if(!this.cart[doc.id]){
      this.cart[doc.id] = 0;
    }else{
      this.cart[doc.id] -= 1;
    }
    console.log(this.cart);
  }
  finalCart = {}
  addCart(event, doc){
    event.stopPropagation();
    if(this.cart[doc.id] && this.cart[doc.id] > 0){
      this.finalCart[doc.id] = this.cart[doc.id];
      //TODO: notify user, maybe just a brief visual cart color shift
    }
    console.log('Final Cart');
    console.log(this.finalCart);
  }
}