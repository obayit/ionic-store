import { Injectable } from '@angular/core';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    public storeService: StoreService
  ) { }
  private _cart: [string];
  addItem(itemId){
    this._cart.push(itemId);
  }
  get cart(){ return this._cart; }
  getItems(){
    this.storeService.getItemsByIds(this._cart);
  }
}
