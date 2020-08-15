import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreItemsPageRoutingModule } from './store-items-routing.module';

import { StoreItemsPage } from './store-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreItemsPageRoutingModule
  ],
  declarations: [StoreItemsPage]
})
export class StoreItemsPageModule {}
