import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { StoreItem } from '../interfaces/store-item';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

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
    console.log(`looking for items with ids ${ids}`);
    return this.afStore.collection<StoreItem>('items' , ref => ref.where( firebase.firestore.FieldPath.documentId() , 'in' , ids)).valueChanges();
  }
}
