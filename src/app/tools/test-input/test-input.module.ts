import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestInputPageRoutingModule } from './test-input-routing.module';

import { TestInputPage } from './test-input.page';
import { CharInputComponent } from '../char-input/char-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestInputPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TestInputPage,
  CharInputComponent]
})
export class TestInputPageModule {}
