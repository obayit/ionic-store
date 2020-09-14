import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { StoreItem } from '../interfaces/store-item';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Delivery } from '../interfaces/delivery';
import { Cart, CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private itemsCollection = this.afStore.collection<StoreItem>('items');
  private ordersCollection = this.afStore.collection<Delivery>('orders');
  constructor(public afStore: AngularFirestore,
    public cartService: CartService,
    public afStorage: AngularFireStorage) {}
  addItem(item: StoreItem){
    return this.itemsCollection.add(item);
  }
  getItems(){
    return this.itemsCollection.get();
  }
  getItem(docId: string){
    console.log('#single item');
    console.log(docId)
    return this.itemsCollection.doc(docId);
  }
  getItemsByIds(ids: string[]){
    console.log(`looking for items with ids ${ids}`);
    if(ids.length == 0){
      return null;
    }
    return this.afStore.collection<StoreItem>('items' , ref => ref.where(firebase.firestore.FieldPath.documentId() , 'in' , ids)).valueChanges({ idField: 'id' });
  }
  addOrder(delivery: Delivery){
    return this.cartService.cart.then((cart: Cart) => {
      let items = [];
      for(let item of cart.items){
        items.push({'id': item.id, 'amount': item.count});
      }
      delivery.items = items;
      return this.ordersCollection.add(delivery);
    });
  }
}
