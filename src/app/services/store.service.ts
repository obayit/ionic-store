import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { StoreItem } from '../interfaces/store-item';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private itemsCollection = this.afStore.collection<StoreItem>('items');
  constructor(public afStore: AngularFirestore,
    public afStorage: AngularFireStorage) {}
  addItem(item: StoreItem){
    return this.itemsCollection.add(item);
  }
  getItems(){
    return this.itemsCollection.get();
  }

}
