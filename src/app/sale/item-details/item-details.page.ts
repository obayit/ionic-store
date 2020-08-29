import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreItem } from 'src/app/interfaces/store-item';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  docId: string;
  doc: StoreItem;

  constructor(public route: ActivatedRoute,
    public storeService: StoreService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('#params');
      console.log(params);
      this.docId = params['docId'];
      if(this.docId){
        this.getItem();
      }
    })
  }
  getItem(){
    this.storeService.getItem(this.docId).valueChanges().subscribe((doc: StoreItem) => {
      this.doc = doc;
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
}
