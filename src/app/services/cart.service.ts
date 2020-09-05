import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StoreService } from './store.service';

export class Cart{
  [key: string]: number // id: amount
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private storage: Storage,
    public storeService: StoreService
  ) {
    this.storage.remove('cart');
   }
  addItem(itemId: string){
    this.storage.get('cart').then((value: Cart) => {
      console.log('value');
      console.log(value);
      if(!value){
        value = new Cart();
      }
      if(!value[itemId]){
        value[itemId] = 1;
      }else{
        value[itemId] += 1;
      }
      this.storage.set('cart', value)
      console.log(`cart after adding ${itemId}`);
      console.log(value);
    });
  }
  decreaseItem(itemId: string){
    this.storage.get('cart').then((value: Cart) => {
      if(!value){
        return;
      }
      if(value[itemId] <= 0){
        delete value[itemId];
      }else{
        value[itemId] -= 1;
      }
      this.storage.set('cart', value)
      console.log(`cart after decreasing ${itemId}`);
      console.log(value);
    });
  }
  get cart(): Promise<Cart> { return this.storage.get('cart'); }
}
