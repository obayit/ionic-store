import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'register',
    redirectTo: 'paytabs',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'store-items',
    loadChildren: () => import('./sale/store-items/store-items.module').then( m => m.StoreItemsPageModule)
  },
  {
    path: 'new-store-item',
    loadChildren: () => import('./store/new-store-item/new-store-item.module').then( m => m.NewStoreItemPageModule)
  },
  {
    path: 'item-details',
    loadChildren: () => import('./sale/item-details/item-details.module').then( m => m.ItemDetailsPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./sale/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'paytabs',
    loadChildren: () => import('./sale/paytabs/paytabs.module').then( m => m.PaytabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
