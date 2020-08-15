import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreItemsPage } from './store-items.page';

const routes: Routes = [
  {
    path: '',
    component: StoreItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreItemsPageRoutingModule {}
