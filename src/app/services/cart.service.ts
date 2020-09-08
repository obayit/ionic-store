import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoreService } from './store.service';

export class Cart{
  items: {
    [key: string]: number; // id: amount
  } = {};
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private storage: Storage,
    public storeService: StoreService
  ) {
    // this.storage.remove('cart');
   }
  addItem(itemId: string){
    var amountRes = new BehaviorSubject(-1);
    this.storage.get('cart').then((value: Cart) => {
      console.log('value');
      console.log(value);
      if(!value){
        value = new Cart();
      }
      if(!value.items[itemId]){
        value.items[itemId] = 1;
      }else{
        value.items[itemId] += 1;
      }
      amountRes.next(value.items[itemId]);
      this.storage.set('cart', value);
      console.log(`cart after adding ${itemId}`);
      console.log(value);
    });
    return amountRes;
  }
  decreaseItem(itemId: string){
    var amountRes = new BehaviorSubject(-1);
    this.storage.get('cart').then((value: Cart) => {
      if(!value){
        return;
      }
      else{
        value.items[itemId] -= 1;
      }
      amountRes.next(value.items[itemId]);
      this.storage.set('cart', value)
      console.log(`cart after decreasing ${itemId}`);
      console.log(value);
    });
    return amountRes;
  }
  get cart(): Promise<Cart> { return this.storage.get('cart'); }
}
