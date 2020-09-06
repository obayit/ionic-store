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
      console.log(`localCart is`);
      console.log(this.localCart);
      let items = this.storeService.getItemsByIds(Object.keys(this.localCart.items));
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
        console.log(`getItemsByIds() returned ${items}`);
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
  amounts = [];
  addCount(event, doc, docs){
    event.stopPropagation();
    console.log(`adding ${doc.id}`);
    console.log(doc);
    let amount = this.cartService.addItem(doc.id);
    amount.subscribe((value) => {
      if(value != -1){
        this.amounts[doc.id] = value;
      }
    });
  }
  subCount(event, doc){
    event.stopPropagation();
    this.cartService.decreaseItem(doc.id);
  }
}
