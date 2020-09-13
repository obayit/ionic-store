import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
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
    public cartService: CartService
  ) { }
  docs: any[] = [];
  renderList = false;
  emptyData = false;

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
      }
      this.docs = res;
      this.renderList = true;
    })
  }
  imageFailed(event, id){
    console.log('Image failed to load for id ', id);
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
  addToCart(event, doc){
    console.log(`addToCart(event, ${doc.id})`)
    event.stopPropagation();
    this.cartService.addItem(doc.id);
  }
  spliceText(text: string, length: number){
    if(text.length > length){
      return text.substring(0, length-1) + '...';
    }else{
      return text;
    }
  }
}