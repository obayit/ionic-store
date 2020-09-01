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
  getItem(docId: string){
    console.log('#single item');
    console.log(docId)
    return this.itemsCollection.doc(docId);
  }
  getItemsByIds(ids: [string]){
    if(!ids){
      return [];
    }
    let res = [];
    for(let id of ids){
      res.push(this.itemsCollection.doc(id));
    }
    return res;
  }
}
