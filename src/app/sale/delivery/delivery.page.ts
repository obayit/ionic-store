import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Delivery } from 'src/app/interfaces/delivery';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  item = new Delivery();
  form = this.fb.group({
    fullName: ['Obay Abdelgadir Mohamed Abdelgadir'],
    street: ['Manuna'],
    address: ['Western School Street'],
    city: ['Bahri'],
    state: 'Khartoum',
    zipCode: '11111',
  });
  response = '';
  showSpinner = false;

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    public storeService: StoreService,
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.showSpinner = true;
    this.item = {
      fullName: this.fullName,
      street: this.street,
      address: this.address,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
    };
    this.storeService.addOrder(this.item).then((value) => {
      this.showSpinner = false;
      this.response = 'Order added successfully id#' + value.id;
    }).catch((error) => {
      this.showSpinner = false;
      this.response = 'Adding item failed ' + error;
    });
  }

  get fullName() { return this.form.get('fullName').value; }
  get street() { return this.form.get('street').value; }
  get address() { return this.form.get('address').value; }
  get city() { return this.form.get('city').value; }
  get state() { return this.form.get('state').value; }
  get zipCode() { return this.form.get('zipCode').value; }
}
