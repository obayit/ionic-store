import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StoreItemModel } from '../models/store-item';
import { FormFactoryService } from '../services/form-factory.service';

@Component({
  selector: 'app-test-input',
  templateUrl: './test-input.page.html',
  styleUrls: ['./test-input.page.scss'],
})
export class TestInputPage implements OnInit {
  form: FormGroup;
  storeItem = new StoreItemModel();

  constructor(
    public formFactory: FormFactoryService,
  ) { }

  ngOnInit() {
    this.form = this.formFactory.generate(this.storeItem);
  }

}
