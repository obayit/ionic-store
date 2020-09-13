import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoreService } from './store.service';

class CartItem{
  id: string;
  count: number; 
  price?: number;
  currency?: string;
}
export class Cart{
  items: CartItem[] = [];
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private storage: Storage,
  ) {
    // poc ((proof of concept))
    // let cartx = new Cart();
    // let items = [];
    // items.push({
    //   id: 'id1',
    //   count: 1
    // })
    // items.push({
    //   id: 'id2',
    //   count: 5
    // })
    // let itemsx = items as CartItem[];
    // cartx.items = itemsx;
    // let lolcat = cartx.items.find(r => r.id === 'id1');
    // lolcat.count = 9;
    // console.log(cartx);
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
      let item = value.items.find(r => r.id === itemId);
      if(!item){
        item = {id: itemId, count: 1};
        value.items.push(item);
      }else{
        item.count += 1;
      }
      amountRes.next(item.count);
      this.storage.set('cart', value);
      console.log(`cart after adding ${itemId}`);
      console.log(value);
    });
    return amountRes;
  }
  decreaseItem(itemId: string){
    var amountRes = new BehaviorSubject(-1);
    this.storage.get('cart').then((value: Cart) => {
      let item = value.items.find(r => r.id === itemId);
      if(!value){
        return;
      }
      else if(!item){
        return;
      }else{
        item.count -= 1;
      }
      amountRes.next(item.count);
      this.storage.set('cart', value)
      console.log(`cart after decreasing ${itemId}`);
      console.log(value);
    });
    return amountRes;
  }
  removeItem(itemId: string){
    var doneRes = new BehaviorSubject(-1);
    this.storage.get('cart').then((value: Cart) => {
      if(!value){
        return;
      }
      let item = value.items.find(r => r.id === itemId);
      const index = value.items.indexOf(item);
      if (index > -1) {
        value.items.splice(index, 1);
      }
      this.storage.set('cart', value)
      doneRes.next(1);
      console.log(`cart after removing ${itemId}`);
      console.log(value);
    });
    return doneRes;
  }

  get cart(): Promise<Cart> { return this.storage.get('cart'); }
}
