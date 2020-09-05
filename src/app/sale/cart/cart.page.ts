import { Component, OnInit } from '@angular/core';
import { Cart, CartService } from 'src/app/services/cart.service';
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
  localCart: Cart;
  docs: any;
  emptyData = false;

  ngOnInit() {
    this.cartService.cart.then((cart: Cart) => {
      if(!cart){
        cart = new Cart();
      }
      this.localCart = cart;
      let items = this.storeService.getItemsByIds(Object.keys(this.localCart));
      if(items != null){
        items.subscribe((docs)=>{
          if(docs.length == 0){
            this.emptyData = true;
          }
          this.docs = docs;
          console.log('this.docs');
          console.log(this.docs);
        });
      }else{
        this.emptyData = true;
      }
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
  addCount(event, doc, docs){
    event.stopPropagation();
    console.log(`adding ${doc.id}`);
    console.log(doc);
    this.cartService.addItem(doc.id);
    console.log(this.cart);
  }
  subCount(event, doc){
    event.stopPropagation();
    this.cartService.decreaseItem(doc.id);
    console.log(this.cart);
  }
}
