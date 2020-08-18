import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestInputPage } from './test-input.page';

const routes: Routes = [
  {
    path: '',
    component: TestInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestInputPageRoutingModule {}
