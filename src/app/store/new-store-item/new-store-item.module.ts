import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewStoreItemPageRoutingModule } from './new-store-item-routing.module';

import { NewStoreItemPage } from './new-store-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewStoreItemPageRoutingModule
  ],
  declarations: [NewStoreItemPage]
})
export class NewStoreItemPageModule {}
