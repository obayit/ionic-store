import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'register',
    redirectTo: 'test-input',
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
    path: 'test-input',
    loadChildren: () => import('./tools/test-input/test-input.module').then( m => m.TestInputPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
