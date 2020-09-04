import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private storage: Storage,
    public storeService: StoreService
  ) { }
  addItem(itemId: string){
    this.storage.get('cart').then((value) => {
      if(!value){
        value = [];
      }
      value.push(itemId);
      this.storage.set('cart', value)
    });
  }
  get cart(){ return this.storage.get('cart'); }
}
