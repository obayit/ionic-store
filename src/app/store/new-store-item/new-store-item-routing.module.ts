import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewStoreItemPage } from './new-store-item.page';

const routes: Routes = [
  {
    path: '',
    component: NewStoreItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewStoreItemPageRoutingModule {}
