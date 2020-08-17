import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StoreItem } from 'src/app/interfaces/store-item';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-store-item',
  templateUrl: './new-store-item.page.html',
  styleUrls: ['./new-store-item.page.scss'],
})
export class NewStoreItemPage implements OnInit {
  currentUser: User;
  item = new StoreItem();
  itemForm = this.fb.group({
    name: ['USB Cable'],
    description: ['Charging & Data Cable'],
    additionalFeatures: ['Can also be used as a whip'],
  });

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user[0];
    });
  }
  onSubmit(){}

}
