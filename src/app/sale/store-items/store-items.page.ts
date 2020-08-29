import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
// import * as $ from 'jquery';

@Component({
  selector: 'app-store-items',
  templateUrl: './store-items.page.html',
  styleUrls: ['./store-items.page.scss'],
})
export class StoreItemsPage implements OnInit {
  constructor(
    public storeService: StoreService,
  ) { }
  docs: any[] = [];
  renderList = false;
  emptyData = false;

  async ngOnInit() {
    this.storeService.getItems().subscribe((snapshot)=>{
      if(snapshot.docs.length == 0){
        this.emptyData = true;
      }
      let res = [];
      for(let doc of snapshot.docs){
        res.push(doc.data());
      }
      this.docs = res;
      this.renderList = true;
    })
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
