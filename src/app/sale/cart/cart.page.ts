import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(public cartService: CartService,
    public storeService: StoreService
    ) { }
  ids: [string];
  docs: any;
  emptyData = false;

  ngOnInit() {
    this.cartService.cart.then((ids) => {
      this.ids = ids;
      this.storeService.getItemsByIds(this.ids).subscribe((docs)=>{
        if(docs.length == 0){
          this.emptyData = true;
        }
        this.docs = docs;
        console.log('this.docs');
        console.log(this.docs);
      });
    });
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
  cart = {};
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
}
